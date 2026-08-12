# K1 concept 24 — Design Brief

## Design read
Für Bauherren, Hausverwaltungen und Privatkunden im Rhein-Main-Gebiet, die einen
Bodenleger suchen, dem sie den Rohbau anvertrauen. Emotionaler Register: ruhige,
handfeste Kompetenz. Kein Hochglanz-Marketing, sondern der Beweis am Material.

## Concept spine
**Journey / Waypoints — "Schicht für Schicht".** Ein Boden entsteht in Lagen, und
genau diese Lagen sind der rote Faden: Untergrund, Unterkonstruktion, Dämmung,
Beplankung, Verlegung, Schliff. Die Seite ist ein Schnitt durch den Aufbau. Die
Nummerierung (01…06) und die durchlaufende Haarlinien-Rasterung tragen das Motiv
in jede Sektion, auch dort, wo es nicht um Bauabschnitte geht.

## Delivery tier
`cinema` — Lenis + GSAP, Tier-1 Kapitel-Stack, Scroll-Kapitel. Mobil bewusst
reduziert (siehe Motion).

## Animation mode
`non-animated — Nutzer hat im Intake "Klassisch, schnell" gewählt (Handwerker-Site,
Ladezeit auf der Baustelle priorisiert)`

## Locked palette
| Rolle | Hex |
|---|---|
| Ground (Limestone) | `#ECEDE8` |
| Surface tief | `#E1E3DC` |
| Surface hell | `#F6F7F3` |
| Ink | `#15181B` |
| Ink gedämpft | `#5B6167` |
| Akzent (Marke) | `#C6112B` |

Verteidigung: Rot und Anthrazit sind die **vorhandenen Markenfarben** aus dem Logo
(roter Winkel + "24" in Rot, "concept" in Anthrazit) und überschreiben damit die
Default-Verbote. Der Limestone-Ground ist kühl-mineralisch gewählt, nicht
beige-warm, damit er als Estrich/Zementton liest statt als Premium-Craft-Creme,
und damit die warmen Eichentöne der echten Fotos die einzige Wärme auf der Seite
sind. Genau ein Akzent, seitenweit.

**Ein Theme:** Die Seite ist durchgehend hell. Einzige, hier deklarierte Ausnahme
ist das Kontaktband/Footer, das als Marken-Chrome auf Ink `#15181B` invertiert,
sowie die Kapitel-Sektion, deren Vollbild-Baustellenfotos eigene Tiefe mitbringen.

## Locked type
- Display: **Cabinet Grotesk** (Fontshare) — kantig, leicht kondensiert, technisch.
- Body: **Satoshi** (Fontshare) — neutrale Grotesk, hohe Lesbarkeit auf Mobil.
- Kein Serif. Die Boards 4 und 5 haben eine Serif-Headline gezeichnet; das ist
  Board-Drift und wird zugunsten der Grotesk überschrieben (Boards 1, 2, 3 sind sans).

## Combinatorial pick
- Theme paradigm: **Pristine Light** (Limestone/Papier, dunkle Tinte)
- Background character: **technisches Raster / Haarlinien** plus Vollbild-Fotografie
- Typography character: **Swiss rational sans mit harter Hierarchie**
- Hero architecture: **massive image-first mit zurückgenommenem Text**
- Section system: **alternating editorial blocks**
- Signature components: nummerierte Zeilenliste mit Haarlinien · Kapitel-Stack mit
  übergroßer Ziffer · versetzte Bild-Crop-Rahmen (Masonry) · Vorher/Nachher-Schieber
- Narrative spine: **journey / waypoints**
- Second-read moment: **eine übergroße Ziffer als Struktur** (Kapitel 01–06), genau
  einmal auf der Seite eingesetzt.

## Tier-1 technique
**D2 — Sticky-Stack Chapters** ("Der Aufbau"). Sechs vollflächige Kapitel aus den
echten Baustellenfotos stapeln sich beim Scrollen übereinander; pro Kapitel eine
übergroße Ziffer, ein Titel und zwei Zeilen Text, dazu eine Fortschrittsleiste am
rechten Rand.

Verteidigung der Paarung: Der Spine ist der Schichtaufbau eines Bodens. Ein
Stack, bei dem sich jede Lage physisch über die vorherige schiebt, **ist** dieser
Aufbau, nicht bloß eine Illustration davon. Der Besucher baut den Boden mit dem
Daumen auf.

Mobile-Degradation (deklariert): kein Pin. Auf `<md` wird der Stack zu einer
scroll-gesnappten vertikalen Sequenz mit `position: sticky` und reduzierter
Kapitelhöhe (80vh statt 100vh), ohne GSAP-Timeline. Bei `prefers-reduced-motion`
werden alle sechs Kapitel statisch untereinander ausgegeben.

## Section plan
| # | Sektion | Layout-Familie | Composition anchor |
|---|---|---|---|
| 1 | Hero | Vollbild image-as-canvas | Text unten links über Foto |
| 2 | Leistungen | Editorial-Zeilenliste mit Haarlinien | Top-left lead |
| 3 | Der Aufbau | Vollbild-Kapitel-Stack | Off-grid, gepinnter Textblock |
| 4 | Projekte | Versetztes Masonry-Raster | Image-as-canvas |
| 5 | Vorher / Nachher | Interaktiver Bildvergleich | Gestapelt mittig |
| 6 | Über K1 concept 24 | Asymmetrischer Split + Faktenband | Editorial offset |
| 7 | Anfrage | Formularpanel auf tiefem Stein | Gestapelt links |
| 8 | Kontakt / Footer | Invertiertes Ink-Band | Inverted classic |

8 Sektionen, 8 verschiedene Layout-Familien, keine Wiederholung in Folge.
Eyebrow-Budget: ceil(8/3) = 3.

## Asset plan
- **Echte Kundenfotos gewinnen.** 27 Originalfotos wurden von der bestehenden Seite
  übernommen und aufbereitet: Hero, 6 Bauablauf-Schritte, 8 Projektbilder,
  Vorher/Nachher-Paar. Das Hero-Foto wurde auf 2K hochskaliert (Higgsfield).
- Logo des Kunden unverändert übernommen; Favicon/Head-Kit aus dem roten
  Markenzeichen abgeleitet (ico, 32, 180, 192, 512, maskable, webmanifest).
- Generiert (Lücken): 9-teiliges Icon-Set (2px-Strich, Ink, transparent),
  Eichen-Makro-Plate, Papier-Plate, Launch-Cover + OG.
- **Nicht generiert:** keine erfundenen Projektbilder. Alles, was als Arbeit von
  K1 concept 24 gezeigt wird, ist eine echte Aufnahme des Betriebs.

## Copy-Regeln für diese Seite
Keine erfundenen Kennzahlen (keine "250+ Projekte", keine Mitarbeiterzahlen, kein
Gründungsjahr) — die Boards haben solche Zahlen gezeichnet, sie sind hier verboten,
weil sie nicht belegt sind. Fakten nur aus echten Quellen: Sitz Offenbach am Main,
Inhaber Krzysztof Jarmuszczak, USt-IdNr., Leistungsliste der Bestandsseite.

## CTA inventory
| Ort | Label | Garment / Interaktion |
|---|---|---|
| Nav (Desktop) | Telefonnummer | Mono-Readout, Haarlinie wandert beim Hover |
| Nav (Mobil) | Anrufen | Fixe Ruf-Leiste am unteren Rand, Ink-Band, `:active` senkt sich |
| Hero | Anfrage stellen | Viewfinder: vier Eckwinkel schließen sich um das Label |
| Leistungen-Zeile | ganze Zeile | Zeilen-Shear: Streifen verschiebt Grade, Index-Ziffer fährt ein |
| Projekte | Bildkachel | Crop-Rahmen öffnet, Bildunterschrift steigt auf |
| Formular | Anfrage senden | Stempel: `:active` presst das Label (Skew + Ton-Shift) |
| Footer | Telefonnummer | Unterstrich als Fugenlinie, zeichnet sich von links |

Kein geteilter Button-Stil, keine globale `.btn`-Klasse. Ein Label pro Intent.

## Corner language
Durchgehend **scharf** (radius 0). Passt zu Dielen, Winkel, Aufmaß. Genau eine
Ausnahme: keine.
