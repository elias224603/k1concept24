import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Anfrage } from "../components/site/Anfrage";
import { Aufbau } from "../components/site/Aufbau";
import { Betrieb } from "../components/site/Betrieb";
import { Hero } from "../components/site/Hero";
import { Leistungen } from "../components/site/Leistungen";
import { Projekte } from "../components/site/Projekte";
import { RufLeiste } from "../components/site/RufLeiste";
import { SiteFooter } from "../components/site/SiteFooter";
import { SiteNav } from "../components/site/SiteNav";
import { VorherNachher } from "../components/site/VorherNachher";
import { betrieb, leistungen } from "../data/site";

export const Route = createFileRoute("/")({
  component: Index,
});

const strukturierteDaten = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: betrieb.name,
  description:
    "Parkettverlegung, Landhausdielen, Terrassendielen, Parkettsanierung und Bodenbeläge aller Art aus Offenbach am Main.",
  founder: betrieb.inhaber,
  telephone: "+49 179 9454659",
  faxNumber: betrieb.fax,
  email: betrieb.email,
  vatID: betrieb.ustId.replace(/\s/g, ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: betrieb.strasse,
    postalCode: "63065",
    addressLocality: "Offenbach am Main",
    addressCountry: "DE",
  },
  areaServed: ["Offenbach am Main", "Frankfurt am Main", "Rhein-Main-Gebiet"],
  knowsAbout: leistungen.map((l) => l.titel),
};

function Index() {
  const [gewaehlt, setGewaehlt] = useState<string[]>([]);

  function leistungWaehlen(slug: string) {
    setGewaehlt((vorher) =>
      vorher.includes(slug) ? vorher : [...vorher, slug],
    );
    const ziel = document.getElementById("anfrage");
    ziel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturierteDaten) }}
      />
      <SiteNav />
      <main>
        <Hero />
        <Leistungen onWaehlen={leistungWaehlen} />
        <Aufbau />
        <Projekte />
        <VorherNachher />
        <Betrieb />
        <Anfrage gewaehlt={gewaehlt} setGewaehlt={setGewaehlt} />
      </main>
      <SiteFooter />
      <RufLeiste />
    </>
  );
}
