import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

const anfrageSchema = z.object({
  name: z.string().trim().min(2, "Bitte Namen angeben").max(120),
  telefon: z.string().trim().min(5, "Bitte Telefonnummer angeben").max(60),
  email: z.string().trim().max(160).optional().or(z.literal("")),
  ort: z.string().trim().max(120).optional().or(z.literal("")),
  flaeche: z.string().trim().max(60).optional().or(z.literal("")),
  leistung: z.string().trim().max(200).optional().or(z.literal("")),
  nachricht: z.string().trim().max(4000).optional().or(z.literal("")),
  // Honeypot: von Menschen nie ausgefüllt, von einfachen Bots fast immer.
  website: z.string().max(200).optional().or(z.literal("")),
});

export type AnfrageInput = z.infer<typeof anfrageSchema>;

export const anfrageSenden = createServerFn({ method: "POST" })
  .inputValidator(anfrageSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      // Bot erkannt: stillschweigend als Erfolg quittieren, nichts speichern.
      return { ok: true as const };
    }

    const { DB } = bindings();
    if (!DB) {
      throw new Error("Datenbank nicht verfügbar");
    }

    await DB.prepare(
      `INSERT INTO anfragen (name, telefon, email, ort, flaeche, leistung, nachricht)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        data.name,
        data.telefon,
        data.email || null,
        data.ort || null,
        data.flaeche || null,
        data.leistung || null,
        data.nachricht || null,
      )
      .run();

    return { ok: true as const };
  });
