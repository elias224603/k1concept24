# K1 concept 24

Website für den Bodenlegerbetrieb **K1 concept 24**, Krzysztof Jarmuszczak,
Offenbach am Main. Ablösung der alten Seite k1concept24.de.

## Was drin ist

- **Startseite** mit Hero, Leistungen, Bauablauf, Projekten, Vorher/Nachher,
  Betriebsvorstellung und Anfrageformular
- **Bauablauf in sechs Kapiteln**, abgelesen an der echten Fotostrecke einer
  Dachgeschossbaustelle: Untergrund, Unterkonstruktion, Dämmung, Beplankung,
  Verlegung, Schliff. Beim Scrollen schiebt sich jede Schicht über die vorherige.
- **Impressum** und **Datenschutz** als eigene Seiten
- **Anfrageformular** mit Leistungsauswahl und Rückfallebene: scheitert der
  Versand, bekommt der Besucher eine fertig ausgefüllte E-Mail angeboten, damit
  keine Anfrage verloren geht.

Alle Projektfotos stammen aus echten Aufträgen des Betriebs und wurden von der
Bestandsseite übernommen. Generiert wurden nur Icons, zwei Materialflächen und
die Social-Media-Vorschaukarte.

## Technik

React 19 + TanStack Start, serverseitig gerendert. Tailwind v4 für die
Gestaltung. Schriften (Cabinet Grotesk, Satoshi) liegen selbst gehostet unter
`app/public/assets/fonts`, damit beim Seitenaufruf keine Verbindung zu einem
fremden Server aufgebaut wird.

Das Projekt baut auf **zwei Ziele**. `app/vite.config.ts` schaltet automatisch
um, sobald `VERCEL=1` (setzt Vercel selbst) oder `DEPLOY_TARGET=vercel` gesetzt
ist:

| | Cloudflare (Vorgabe) | Vercel |
|---|---|---|
| Ausgabe | `dist/server/server.js`, ein Worker | `.vercel/output`, Build Output API |
| Anfragen landen | in der D1-Datenbank (`env.DB`) | als E-Mail beim Betrieb |
| zuständiges Modul | `src/lib/anfrage-speicher.ts` | `src/lib/anfrage-speicher.vercel.ts` |

## Auf Vercel veröffentlichen

Das Repo ist so vorbereitet, dass Vercel ohne weitere Einstellung baut: die
`vercel.json` in der Wurzel installiert und baut in `app/` und legt das Ergebnis
dort ab, wo Vercel es erwartet. Root Directory also auf der Vorgabe lassen.

**Damit das Formular E-Mails verschickt**, im Vercel-Projekt unter Settings →
Environment Variables eintragen:

| Variable | Pflicht | Bedeutung |
|---|---|---|
| `RESEND_API_KEY` | ja | Schlüssel aus dem Konto bei [resend.com](https://resend.com) |
| `ANFRAGE_AN` | nein | Empfänger, Vorgabe `info@k1concept24.de` |
| `ANFRAGE_VON` | nein | Absender. Muss eine bei Resend verifizierte Domain sein. Ohne Eintrag wird `onboarding@resend.dev` benutzt, das funktioniert nur zum Testen. |

Ohne `RESEND_API_KEY` läuft die Seite normal, nur das Absenden des Formulars
schlägt fehl. Der Besucher sieht dann die Rückfallebene mit Telefonnummer und
vorbereiteter E-Mail, es geht also keine Anfrage verloren.

## Entwickeln

```bash
cd app
bun install
bun run dev             # lokaler Entwicklungsserver
bun run typecheck       # Typen prüfen
bun run build           # Build für Cloudflare
bun run build:vercel    # Build für Vercel (.vercel/output)
```

## Ordner

| Pfad | Inhalt |
|---|---|
| `app/src/routes` | Seiten (Start, Impressum, Datenschutz, robots, sitemap) |
| `app/src/components/site` | Die Sektionen der Startseite |
| `app/src/data/site.ts` | Alle Texte, Leistungen, Bauschritte und Projektdaten |
| `app/src/lib/anfrage-speicher*.ts` | Wohin die Formularanfragen gehen |
| `app/migrations` | Datenbankschema (nur Cloudflare) |
| `app/design-brief.md` | Gestaltungskonzept: Palette, Typografie, Sektionsplan |
| `refs` | Arbeitsmaterial: Designentwürfe und die Originalfotos |

## Offene Punkte

- Impressum und Datenschutzerklärung sollten vor dem endgültigen Start
  **juristisch geprüft** werden.
- Für die eigene Domain k1concept24.de muss die DNS-Einstellung auf die neue
  Seite umgestellt werden.
