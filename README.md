# K1 concept 24

Website für den Bodenlegerbetrieb **K1 concept 24**, Krzysztof Jarmuszczak,
Offenbach am Main. Ablösung der alten Seite k1concept24.de.

Live: <https://k1concept24.higgsfield.app>

## Was drin ist

- **Startseite** mit Hero, Leistungen, Bauablauf, Projekten, Vorher/Nachher,
  Betriebsvorstellung und Anfrageformular
- **Bauablauf in sechs Kapiteln**, abgelesen an der echten Fotostrecke einer
  Dachgeschossbaustelle: Untergrund, Unterkonstruktion, Dämmung, Beplankung,
  Verlegung, Schliff. Beim Scrollen schiebt sich jede Schicht über die vorherige.
- **Impressum** und **Datenschutz** als eigene Seiten
- **Anfrageformular**, das in eine Cloudflare-D1-Datenbank schreibt

Alle Projektfotos stammen aus echten Aufträgen des Betriebs und wurden von der
Bestandsseite übernommen. Generiert wurden nur Icons, zwei Materialflächen und
die Social-Media-Vorschaukarte.

## Technik

React 19 + TanStack Start, serverseitig gerendert, deployt als ein einzelner
Cloudflare Worker. Tailwind v4 für die Gestaltung. Schriften (Cabinet Grotesk,
Satoshi) liegen selbst gehostet unter `app/public/assets/fonts`, damit beim
Seitenaufruf keine Verbindung zu einem fremden Server aufgebaut wird.

## Entwickeln

```bash
cd app
bun install
bun run dev          # lokaler Entwicklungsserver
bun run typecheck    # Typen prüfen
bun run build        # Produktionsbuild
```

## Ordner

| Pfad | Inhalt |
|---|---|
| `app/src/routes` | Seiten (Start, Impressum, Datenschutz, robots, sitemap) |
| `app/src/components/site` | Die Sektionen der Startseite |
| `app/src/data/site.ts` | Alle Texte, Leistungen, Bauschritte und Projektdaten |
| `app/src/lib/api` | Serverfunktion für das Anfrageformular |
| `app/migrations` | Datenbankschema für die Anfragen |
| `app/design-brief.md` | Gestaltungskonzept: Palette, Typografie, Sektionsplan |
| `refs` | Arbeitsmaterial: Designentwürfe und die Originalfotos |

## Offene Punkte

- Die Anfragen landen in der Datenbank, es geht noch **keine E-Mail** an den
  Betrieb. Dafür wird ein Versanddienst mit eigenem Schlüssel benötigt.
- Impressum und Datenschutzerklärung sollten vor dem endgültigen Start
  **juristisch geprüft** werden.
- Für die eigene Domain k1concept24.de muss die DNS-Einstellung auf die neue
  Seite umgestellt werden.
