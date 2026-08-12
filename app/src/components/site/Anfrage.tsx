import { useState } from "react";

import { anfrageSenden } from "../../lib/api/anfrage.functions";
import { betrieb, leistungen } from "../../data/site";

type Status = "bereit" | "sendet" | "fertig" | "fehler";

type Eingaben = {
  name: string;
  telefon: string;
  email: string;
  ort: string;
  flaeche: string;
  leistung: string;
  nachricht: string;
};

/** Baut eine fertig ausgefüllte E-Mail, falls der Versand über den Server scheitert. */
function baueMailLink(e: Eingaben): string {
  const zeilen = [
    `Name: ${e.name}`,
    `Telefon: ${e.telefon}`,
    e.email ? `E-Mail: ${e.email}` : "",
    e.ort ? `Ort: ${e.ort}` : "",
    e.flaeche ? `Fläche: ${e.flaeche} m²` : "",
    e.leistung ? `Leistung: ${e.leistung}` : "",
    e.nachricht ? `\n${e.nachricht}` : "",
  ].filter(Boolean);
  const betreff = encodeURIComponent(`Anfrage von ${e.name}`);
  const koerper = encodeURIComponent(zeilen.join("\n"));
  return `mailto:${betrieb.email}?subject=${betreff}&body=${koerper}`;
}

const feld =
  "mt-2 block w-full border border-ink/25 bg-limestone px-4 py-3 text-base text-ink placeholder:text-ink/35 transition-colors focus:border-signal focus:outline-none";
const label = "block text-[0.7rem] uppercase tracking-[0.16em] text-inksoft";

export function Anfrage({
  gewaehlt,
  setGewaehlt,
}: {
  gewaehlt: string[];
  setGewaehlt: (slugs: string[]) => void;
}) {
  const [status, setStatus] = useState<Status>("bereit");
  const [fehler, setFehler] = useState<string | null>(null);
  // Scheitert der Versand, bekommt der Besucher eine fertig ausgefüllte E-Mail,
  // damit die Anfrage nicht verloren geht.
  const [rueckfallLink, setRueckfallLink] = useState<string | null>(null);

  function umschalten(slug: string) {
    setGewaehlt(
      gewaehlt.includes(slug)
        ? gewaehlt.filter((s) => s !== slug)
        : [...gewaehlt, slug],
    );
  }

  async function absenden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const daten = new FormData(form);
    const name = String(daten.get("name") ?? "").trim();
    const telefon = String(daten.get("telefon") ?? "").trim();

    if (name.length < 2) {
      setFehler("Bitte tragen Sie Ihren Namen ein.");
      return;
    }
    if (telefon.length < 5) {
      setFehler("Ohne Telefonnummer können wir nicht zurückrufen.");
      return;
    }

    const eingaben = {
      name,
      telefon,
      email: String(daten.get("email") ?? ""),
      ort: String(daten.get("ort") ?? ""),
      flaeche: String(daten.get("flaeche") ?? ""),
      leistung: gewaehlt
        .map((s) => leistungen.find((l) => l.slug === s)?.titel ?? s)
        .join(", "),
      nachricht: String(daten.get("nachricht") ?? ""),
      website: String(daten.get("website") ?? ""),
    };

    setFehler(null);
    setRueckfallLink(null);
    setStatus("sendet");
    try {
      await anfrageSenden({ data: eingaben });
      setStatus("fertig");
      form.reset();
      setGewaehlt([]);
    } catch {
      setStatus("fehler");
      setFehler(
        "Das Formular konnte gerade nicht abgeschickt werden. Ihre Angaben sind aber nicht verloren.",
      );
      setRueckfallLink(baueMailLink(eingaben));
    }
  }

  return (
    <section
      id="anfrage"
      className="relative scroll-mt-20 overflow-hidden bg-stone py-20 md:py-28"
    >
      <img
        src="/assets/plate-papier.jpg"
        alt=""
        aria-hidden
        width={1400}
        height={788}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-signal">
              Anfrage
            </p>
            <h2 className="mt-5 max-w-[18ch] font-display text-[2.4rem] leading-[1.02] tracking-tighter text-ink md:text-[3.6rem]">
              Sagen Sie uns, was ansteht.
            </h2>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-inksoft">
              Wir melden uns zurück, besprechen die Fläche und machen bei Bedarf
              einen Termin zum Aufmaß. Kostenlos und unverbindlich.
            </p>

            {status === "fertig" ? (
              <div className="mt-10 border-l-2 border-signal bg-limestone p-7">
                <h3 className="font-display text-2xl tracking-tight text-ink">
                  Angekommen. Danke.
                </h3>
                <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-inksoft">
                  Wir melden uns bei Ihnen. Wenn es eilig ist, erreichen Sie uns
                  direkt unter{" "}
                  <a
                    href={betrieb.telefonHref}
                    className="border-b border-signal text-ink"
                  >
                    {betrieb.telefon}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("bereit")}
                  className="mt-6 border-b border-ink/30 pb-0.5 font-display text-base tracking-tight text-inksoft transition-colors hover:border-signal hover:text-ink"
                >
                  Weitere Anfrage stellen
                </button>
              </div>
            ) : (
              <form onSubmit={absenden} className="mt-10" noValidate>
                {/* Honigtopf gegen einfache Bots. */}
                <div className="absolute left-[-9999px]" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="name">
                      Name
                    </label>
                    <input id="name" name="name" className={feld} autoComplete="name" required />
                  </div>
                  <div>
                    <label className={label} htmlFor="telefon">
                      Telefon
                    </label>
                    <input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      inputMode="tel"
                      className={feld}
                      autoComplete="tel"
                      required
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="email">
                      E-Mail (optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      className={feld}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="ort">
                      Ort (optional)
                    </label>
                    <input id="ort" name="ort" className={feld} autoComplete="address-level2" />
                  </div>
                  <div>
                    <label className={label} htmlFor="flaeche">
                      Fläche in m² (optional)
                    </label>
                    <input
                      id="flaeche"
                      name="flaeche"
                      inputMode="numeric"
                      className={feld}
                    />
                  </div>
                </div>

                <fieldset className="mt-8">
                  <legend className={label}>Worum geht es?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {leistungen.map((l) => {
                      const an = gewaehlt.includes(l.slug);
                      return (
                        <button
                          key={l.slug}
                          type="button"
                          aria-pressed={an}
                          onClick={() => umschalten(l.slug)}
                          className={`border px-3 py-2 text-sm transition-colors ${
                            an
                              ? "border-signal bg-signal text-limestone"
                              : "border-ink/25 bg-limestone text-inksoft hover:border-ink hover:text-ink"
                          }`}
                        >
                          {l.titel}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-8">
                  <label className={label} htmlFor="nachricht">
                    Nachricht (optional)
                  </label>
                  <textarea
                    id="nachricht"
                    name="nachricht"
                    rows={5}
                    className={feld}
                    placeholder="Zum Beispiel: Altbau, 60 m², vorhandenes Parkett soll geschliffen werden."
                  />
                </div>

                {fehler ? (
                  <div role="alert" className="mt-5 border-l-2 border-signal bg-limestone p-4">
                    <p className="text-sm leading-relaxed text-ink">{fehler}</p>
                    {rueckfallLink ? (
                      <p className="mt-3 text-sm leading-relaxed text-inksoft">
                        Schicken Sie sie einfach direkt:{" "}
                        <a
                          href={rueckfallLink}
                          className="border-b border-signal text-ink"
                        >
                          als E-Mail öffnen
                        </a>{" "}
                        oder anrufen unter{" "}
                        <a
                          href={betrieb.telefonHref}
                          className="border-b border-signal text-ink"
                        >
                          {betrieb.telefon}
                        </a>
                        .
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* Stempel-CTA: presst sich beim Drücken ins Papier. */}
                <button
                  type="submit"
                  disabled={status === "sendet"}
                  className="mt-8 w-full bg-signal px-8 py-4 font-display text-lg tracking-tight text-limestone transition-transform duration-100 hover:bg-ink active:translate-y-0.5 active:skew-x-[-1deg] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
                >
                  {status === "sendet" ? "Wird gesendet …" : "Anfrage senden"}
                </button>

                <p className="mt-4 max-w-[46ch] text-xs leading-relaxed text-inksoft">
                  Ihre Angaben nutzen wir ausschließlich zur Bearbeitung dieser
                  Anfrage. Mehr dazu in der{" "}
                  <a href="/datenschutz" className="border-b border-ink/30 text-ink">
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5">
            <div className="border-t-2 border-ink pt-6">
              <p className={label}>Lieber direkt</p>
              <a
                href={betrieb.telefonHref}
                className="mt-3 block font-display text-[2.2rem] leading-none tracking-tighter text-ink transition-colors hover:text-signal md:text-[2.8rem]"
              >
                {betrieb.telefon}
              </a>
              <a
                href={`mailto:${betrieb.email}`}
                className="mt-4 inline-block border-b border-ink/30 pb-0.5 text-base text-ink transition-colors hover:border-signal"
              >
                {betrieb.email}
              </a>

              <address className="mt-8 not-italic text-base leading-relaxed text-inksoft">
                {betrieb.name}
                <br />
                {betrieb.inhaber}
                <br />
                {betrieb.strasse}
                <br />
                {betrieb.plzOrt}
              </address>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
