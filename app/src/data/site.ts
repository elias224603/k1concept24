/**
 * Alle Inhalte stammen aus dem Bestand von k1concept24.de (Leistungsliste,
 * Impressum, Fotos) oder beschreiben, was auf den echten Baustellenfotos zu
 * sehen ist. Es werden bewusst keine Kennzahlen erfunden.
 */

export const betrieb = {
  name: "K1 concept 24",
  inhaber: "Krzysztof Jarmuszczak",
  strasse: "Waldstr. 5",
  plzOrt: "63065 Offenbach am Main",
  land: "Deutschland",
  telefon: "0179 9454659",
  telefonHref: "tel:+491799454659",
  fax: "03212 9454659",
  email: "info@k1concept24.de",
  ustId: "DE 243390473",
  finanzamt: "Finanzamt Offenbach am Main",
  gebiet: "Offenbach, Frankfurt und das Rhein-Main-Gebiet",
} as const;

export type Leistung = {
  nr: string;
  titel: string;
  text: string;
  icon: string;
  slug: string;
};

export const leistungen: Leistung[] = [
  {
    nr: "01",
    slug: "parkett",
    titel: "Parkettverlegung",
    text: "Vollholz, Stab- und Mosaikparkett, Hochkantlamelle, Industrieparkett, Kork und Bambus.",
    icon: "/assets/icons/parkett.png",
  },
  {
    nr: "02",
    slug: "dielen",
    titel: "Landhausdielen und Fertigparkett",
    text: "Schwimmend verlegt oder vollflächig verklebt, je nach Untergrund und Raumnutzung.",
    icon: "/assets/icons/kleber.png",
  },
  {
    nr: "03",
    slug: "terrasse",
    titel: "Terrassendielen",
    text: "Unterkonstruktion, Gefälle und Belag für Holzterrassen, Stufen und Podeste im Freien.",
    icon: "/assets/icons/terrasse.png",
  },
  {
    nr: "04",
    slug: "schleifen",
    titel: "Parkett schleifen und sanieren",
    text: "Abschleifen, Fehlstellen ergänzen, versiegeln oder ölen. Auch Sanierung von Holztreppen.",
    icon: "/assets/icons/schleifmaschine.png",
  },
  {
    nr: "05",
    slug: "doppelboden",
    titel: "Doppelböden",
    text: "Lieferung und Montage kompletter Doppelbodensysteme für Büro und Gewerbe.",
    icon: "/assets/icons/doppelboden.png",
  },
  {
    nr: "06",
    slug: "belaege",
    titel: "Laminat, PVC und textile Beläge",
    text: "Bodenbeläge aller Art, neu verlegt, ausgetauscht oder repariert.",
    icon: "/assets/icons/daemmung.png",
  },
  {
    nr: "07",
    slug: "treppen",
    titel: "Treppen, Fenster und Türen",
    text: "Einbau, Umbau und Reparatur, auf Wunsch als Sonderanfertigung.",
    icon: "/assets/icons/treppe.png",
  },
  {
    nr: "08",
    slug: "renovierung",
    titel: "Renovierung und Raumausstattung",
    text: "Maler- und Tapezierarbeiten, Wandgestaltung und Renovierungsarbeiten rund um den Boden.",
    icon: "/assets/icons/zollstock.png",
  },
];

export const partnerGewerke = [
  "Elektroinstallation",
  "Gas und Wasser",
  "Spenglerarbeiten",
  "Sanitäranlagen",
  "Schreinerarbeiten",
];

export type Kapitel = {
  nr: string;
  titel: string;
  text: string;
  bild: string;
  alt: string;
};

/** Der Bauablauf, abgelesen an der echten Fotostrecke einer Dachgeschoss-Baustelle. */
export const aufbau: Kapitel[] = [
  {
    nr: "01",
    titel: "Untergrund prüfen",
    text: "Aufmaß, Feuchtemessung, Höhen abgleichen. Erst wenn der Untergrund trägt und trocken ist, wird gebaut.",
    bild: "/assets/schritt-1-untergrund.jpg",
    alt: "Leerer, vorbereiteter Raum mit Estrichboden vor Beginn der Verlegung",
  },
  {
    nr: "02",
    titel: "Unterkonstruktion setzen",
    text: "Lagerhölzer werden ausgerichtet, unterlegt und fixiert. Sie entscheiden, ob der Boden in zehn Jahren noch ruhig ist.",
    bild: "/assets/schritt-2-unterkonstruktion.jpg",
    alt: "Ausgerichtete Lagerhölzer der Unterkonstruktion auf einem Dachgeschossboden",
  },
  {
    nr: "03",
    titel: "Dämmung einbringen",
    text: "Mineralwolle vollflächig zwischen die Lagerhölzer. Weniger Trittschall im Haus, weniger Wärmeverlust nach unten.",
    bild: "/assets/schritt-3-daemmung.jpg",
    alt: "Dämmwolle zwischen den Lagerhölzern der Unterkonstruktion",
  },
  {
    nr: "04",
    titel: "Beplankung verlegen",
    text: "Platten fugenversetzt verleimt und verschraubt. Das ist die tragende Ebene, auf die der sichtbare Belag kommt.",
    bild: "/assets/schritt-4-beplankung.jpg",
    alt: "Fertig verlegte Holzwerkstoffplatten als Trockenestrich",
  },
  {
    nr: "05",
    titel: "Belag verlegen",
    text: "Dielen werden nach Maserung sortiert, eingepasst und verklebt oder schwimmend verlegt. Randfugen bleiben frei.",
    bild: "/assets/schritt-5-verlegen.jpg",
    alt: "Handwerker beim Verlegen heller Eichendielen in einer Neubauwohnung",
  },
  {
    nr: "06",
    titel: "Schleifen und versiegeln",
    text: "Grobschliff, Zwischenschliff, Feinschliff, danach Versiegelung oder Öl. Danach ist der Boden begehbar.",
    bild: "/assets/schritt-6-schleifen.jpg",
    alt: "Handwerker schleift ein Mosaikparkett mit einer Bandschleifmaschine",
  },
];

export type Projekt = {
  bild: string;
  titel: string;
  ort: string;
  alt: string;
};

export const projekte: Projekt[] = [
  {
    bild: "/assets/projekt-terrasse-lounge.jpg",
    titel: "Holzterrasse mit Stufenanlage",
    ort: "Privatgarten",
    alt: "Fertige Holzterrasse mit Stufen, Gartenmöbeln und Pflanzkübeln",
  },
  {
    bild: "/assets/projekt-wohnraum-eiche.jpg",
    titel: "Eichendiele im Wohnraum",
    ort: "Einfamilienhaus",
    alt: "Wohnraum mit durchgehend verlegter Eichendiele",
  },
  {
    bild: "/assets/projekt-terrasse-feld.jpg",
    titel: "Terrassendielen mit Gabionenkante",
    ort: "Hanglage",
    alt: "Holzterrasse mit Blick über Wiesen und Felder",
  },
  {
    bild: "/assets/projekt-altbau-mosaik.jpg",
    titel: "Mosaikparkett nach dem Schliff",
    ort: "Altbauwohnung",
    alt: "Frisch geschliffenes und versiegeltes Mosaikparkett im Sonnenlicht",
  },
  {
    bild: "/assets/projekt-terrasse-stufen.jpg",
    titel: "Terrassenstufen im Neubau",
    ort: "Neubau",
    alt: "Neu gebaute Terrassenstufen aus hellem Holz",
  },
  {
    bild: "/assets/projekt-neubau-diele.jpg",
    titel: "Dielenverlegung im Neubau",
    ort: "Wohnung",
    alt: "Teilweise verlegte helle Dielen in einer Neubauwohnung",
  },
  {
    bild: "/assets/projekt-terrasse-haus.jpg",
    titel: "Terrasse mit Teichanlage",
    ort: "Einfamilienhaus",
    alt: "Hausansicht mit Holzterrasse und angrenzendem Gartenteich",
  },
  {
    bild: "/assets/projekt-unterbau.jpg",
    titel: "Unterbau einer Terrasse",
    ort: "Sanierung",
    alt: "Unterkonstruktion einer Terrasse auf Abdichtungsbahn vor dem Belag",
  },
];

export const fakten = [
  {
    icon: "/assets/icons/zollstock.png",
    titel: "Aufmaß vor Ort",
    text: "Beratung telefonisch oder bei Ihnen zu Hause, vor dem Angebot.",
  },
  {
    icon: "/assets/icons/parkett.png",
    titel: "Alle Holzarten",
    text: "Massivparkett, Fertigparkett, Kork, Bambus, Hochkantlamelle.",
  },
  {
    icon: "/assets/icons/treppe.png",
    titel: "Auch Sonderwünsche",
    text: "Umbauten, Reparaturen und Spezialanfertigungen nach Maß.",
  },
  {
    icon: "/assets/icons/telefon.png",
    titel: "Kurze Wege",
    text: "Sitz in Offenbach am Main, tätig im ganzen Rhein-Main-Gebiet.",
  },
];
