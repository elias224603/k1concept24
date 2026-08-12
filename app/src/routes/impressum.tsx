import { createFileRoute } from "@tanstack/react-router";

import { Abschnitt, Rechtsseite } from "../components/site/Rechtsseite";
import { betrieb } from "../data/site";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum | K1 concept 24" },
      {
        name: "description",
        content:
          "Anbieterkennzeichnung nach § 5 TMG für K1 concept 24, Krzysztof Jarmuszczak, Offenbach am Main.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Impressum,
});

function Impressum() {
  return (
    <Rechtsseite titel="Impressum">
      <Abschnitt titel="Angaben gemäß § 5 TMG">
        <p>
          {betrieb.name}
          <br />
          Inhaber: {betrieb.inhaber}
          <br />
          {betrieb.strasse}
          <br />
          {betrieb.plzOrt}
          <br />
          {betrieb.land}
        </p>
      </Abschnitt>

      <Abschnitt titel="Kontakt">
        <p>
          Telefon:{" "}
          <a href={betrieb.telefonHref} className="border-b border-ink/30 text-ink">
            {betrieb.telefon}
          </a>
          <br />
          Fax: {betrieb.fax}
          <br />
          E-Mail:{" "}
          <a href={`mailto:${betrieb.email}`} className="border-b border-ink/30 text-ink">
            {betrieb.email}
          </a>
        </p>
      </Abschnitt>

      <Abschnitt titel="Umsatzsteuer-Identifikationsnummer">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          {betrieb.ustId}
          <br />
          Zuständiges Finanzamt: {betrieb.finanzamt}
        </p>
      </Abschnitt>

      <Abschnitt titel="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          {betrieb.inhaber}
          <br />
          {betrieb.strasse}
          <br />
          {betrieb.plzOrt}
        </p>
      </Abschnitt>

      <Abschnitt titel="Haftung für Inhalte">
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.
        </p>
      </Abschnitt>

      <Abschnitt titel="Haftung für Links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
        <p>
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft. Eine permanente inhaltliche Kontrolle ist
          ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links
          umgehend.
        </p>
      </Abschnitt>

      <Abschnitt titel="Urheberrecht">
        <p>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors beziehungsweise Erstellers.
        </p>
        <p>
          Sämtliche auf dieser Website gezeigten Projektfotos stammen aus eigenen
          Aufträgen von {betrieb.name} und dürfen nicht ohne Zustimmung verwendet
          werden.
        </p>
      </Abschnitt>

      <Abschnitt titel="Streitschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            rel="noopener noreferrer"
            target="_blank"
            className="border-b border-ink/30 text-ink"
          >
            ec.europa.eu/consumers/odr
          </a>
          . Wir sind nicht bereit und nicht verpflichtet, an
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </Abschnitt>
    </Rechtsseite>
  );
}
