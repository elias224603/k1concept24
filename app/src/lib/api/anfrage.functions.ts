import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Beim Vercel-Build tauscht vite.config.ts dieses Modul gegen
// `anfrage-speicher.vercel.ts` (E-Mail statt Datenbank).
import { speichereAnfrage } from "../anfrage-speicher";

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

    await speichereAnfrage({
      name: data.name,
      telefon: data.telefon,
      email: data.email,
      ort: data.ort,
      flaeche: data.flaeche,
      leistung: data.leistung,
      nachricht: data.nachricht,
    });

    return { ok: true as const };
  });
