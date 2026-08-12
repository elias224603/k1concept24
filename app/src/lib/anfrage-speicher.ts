/**
 * Ablage der Anfragen auf CLOUDFLARE (Standard dieses Repos).
 * Geschrieben wird in die D1-Datenbank, gebunden als env.DB.
 *
 * Beim Build für Vercel ersetzt vite.config.ts dieses Modul durch
 * `anfrage-speicher.vercel.ts` (E-Mail-Versand statt Datenbank). Beide Module
 * exportieren dieselbe Funktion mit derselben Signatur.
 */
import { bindings } from "./bindings.server";

export type AnfrageDaten = {
  name: string;
  telefon: string;
  email?: string;
  ort?: string;
  flaeche?: string;
  leistung?: string;
  nachricht?: string;
};

export async function speichereAnfrage(daten: AnfrageDaten): Promise<void> {
  const { DB } = bindings();
  if (!DB) {
    throw new Error("Datenbank nicht verfügbar");
  }

  await DB.prepare(
    `INSERT INTO anfragen (name, telefon, email, ort, flaeche, leistung, nachricht)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      daten.name,
      daten.telefon,
      daten.email || null,
      daten.ort || null,
      daten.flaeche || null,
      daten.leistung || null,
      daten.nachricht || null,
    )
    .run();
}
