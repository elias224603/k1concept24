/**
 * Ablage der Anfragen auf VERCEL.
 *
 * Dort gibt es keine Cloudflare-D1-Datenbank, also geht die Anfrage direkt als
 * E-Mail an den Betrieb. Versendet wird über die HTTP-Schnittstelle von Resend,
 * dafür ist keine zusätzliche Abhängigkeit nötig.
 *
 * Benötigte Umgebungsvariablen im Vercel-Projekt:
 *   RESEND_API_KEY   Pflicht. Schlüssel aus dem Resend-Konto.
 *   ANFRAGE_AN       Optional. Empfängeradresse, Vorgabe info@k1concept24.de
 *   ANFRAGE_VON      Optional. Absender, muss eine bei Resend verifizierte
 *                    Domain sein. Vorgabe: onboarding@resend.dev (nur Tests).
 *
 * Fehlt der Schlüssel, wird ein klarer Fehler geworfen. Das Formular zeigt dann
 * eine Rückfallebene mit Telefonnummer und vorbereiteter E-Mail an, damit keine
 * Anfrage still verloren geht.
 */

export type AnfrageDaten = {
  name: string;
  telefon: string;
  email?: string;
  ort?: string;
  flaeche?: string;
  leistung?: string;
  nachricht?: string;
};

function zeile(bezeichnung: string, wert?: string): string {
  return wert && wert.trim() ? `${bezeichnung}: ${wert.trim()}\n` : "";
}

export async function speichereAnfrage(daten: AnfrageDaten): Promise<void> {
  const schluessel = process.env.RESEND_API_KEY;
  if (!schluessel) {
    throw new Error(
      "E-Mail-Versand ist nicht eingerichtet (RESEND_API_KEY fehlt).",
    );
  }

  const an = process.env.ANFRAGE_AN || "info@k1concept24.de";
  const von = process.env.ANFRAGE_VON || "onboarding@resend.dev";

  const text =
    "Neue Anfrage über k1concept24.de\n\n" +
    zeile("Name", daten.name) +
    zeile("Telefon", daten.telefon) +
    zeile("E-Mail", daten.email) +
    zeile("Ort", daten.ort) +
    zeile("Fläche", daten.flaeche ? `${daten.flaeche} m²` : undefined) +
    zeile("Leistung", daten.leistung) +
    (daten.nachricht?.trim()
      ? `\nNachricht:\n${daten.nachricht.trim()}\n`
      : "");

  const antwort = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${schluessel}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `K1 concept 24 Website <${von}>`,
      to: [an],
      subject: `Anfrage von ${daten.name}`,
      text,
      ...(daten.email?.trim() ? { reply_to: daten.email.trim() } : {}),
    }),
  });

  if (!antwort.ok) {
    const grund = await antwort.text().catch(() => "");
    throw new Error(
      `E-Mail konnte nicht versendet werden (${antwort.status}). ${grund}`.trim(),
    );
  }
}
