import { createFileRoute } from "@tanstack/react-router";

import { Abschnitt, Rechtsseite } from "../components/site/Rechtsseite";
import { betrieb } from "../data/site";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz | K1 concept 24" },
      {
        name: "description",
        content:
          "Informationen zur Verarbeitung personenbezogener Daten auf der Website von K1 concept 24.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Datenschutz,
});

function Datenschutz() {
  return (
    <Rechtsseite titel="Datenschutz">
      <Abschnitt titel="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
          <br />
          {betrieb.name}, Inhaber {betrieb.inhaber}
          <br />
          {betrieb.strasse}, {betrieb.plzOrt}
          <br />
          Telefon {betrieb.telefon}, E-Mail{" "}
          <a href={`mailto:${betrieb.email}`} className="border-b border-ink/30 text-ink">
            {betrieb.email}
          </a>
        </p>
      </Abschnitt>

      <Abschnitt titel="2. Zugriffsdaten und Server-Logfiles">
        <p>
          Bei jedem Aufruf dieser Website werden technische Zugriffsdaten
          protokolliert: Name der abgerufenen Datei, Datum und Uhrzeit des
          Abrufs, übertragene Datenmenge, Meldung über erfolgreichen Abruf,
          verwendeter Browser, anfragende Domain und die IP-Adresse des
          anfragenden Rechners.
        </p>
        <p>
          Diese Verarbeitung erfolgt zur Sicherstellung eines störungsfreien
          Betriebs und zur Abwehr von Angriffen. Rechtsgrundlage ist Art. 6
          Abs. 1 lit. f DSGVO (berechtigtes Interesse). Eine Zusammenführung
          dieser Daten mit anderen Datenquellen findet nicht statt.
        </p>
      </Abschnitt>

      <Abschnitt titel="3. Kontaktformular, Telefon und E-Mail">
        <p>
          Wenn Sie uns über das Anfrageformular, telefonisch oder per E-Mail
          kontaktieren, verarbeiten wir die von Ihnen gemachten Angaben (Name,
          Telefonnummer und, sofern angegeben, E-Mail-Adresse, Ort, Fläche,
          gewünschte Leistung und Ihre Nachricht) ausschließlich zur Bearbeitung
          Ihrer Anfrage.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage
          auf den Abschluss eines Vertrags gerichtet ist, im Übrigen Art. 6
          Abs. 1 lit. f DSGVO aufgrund unseres berechtigten Interesses an der
          Beantwortung von Anfragen. Die Angabe von Name und Telefonnummer ist
          erforderlich, damit wir zurückrufen können; alle weiteren Felder sind
          freiwillig.
        </p>
      </Abschnitt>

      <Abschnitt titel="4. Weitergabe von Daten">
        <p>
          Ihre personenbezogenen Daten werden an Dritte nur weitergegeben, wenn
          dies zur Bearbeitung Ihrer Anfrage oder zur Ausführung eines Auftrags
          erforderlich ist, etwa an ein beteiligtes Partnergewerk. Ein Verkauf
          oder eine Vermietung Ihrer Daten findet nicht statt.
        </p>
        <p>
          In Ausnahmefällen sind wir aufgrund behördlicher oder gerichtlicher
          Anordnung gesetzlich verpflichtet, Daten herauszugeben. Dies erfolgt
          nur im Rahmen zwingender Rechtsvorschriften.
        </p>
      </Abschnitt>

      <Abschnitt titel="5. Hosting">
        <p>
          Diese Website wird bei einem Dienstleister betrieben, der die Daten in
          unserem Auftrag und nach unseren Weisungen verarbeitet
          (Auftragsverarbeitung nach Art. 28 DSGVO). Die dabei anfallenden
          Zugriffsdaten sind unter Punkt 2 beschrieben.
        </p>
      </Abschnitt>

      <Abschnitt titel="6. Keine Cookies, keine Analyse, keine externen Dienste">
        <p>
          Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken ein und
          bindet keine Tracking-Dienste ein. Auch die verwendeten Schriftarten
          werden vom eigenen Server ausgeliefert, sodass beim Aufruf der Seite
          keine Verbindung zu einem externen Anbieter hergestellt wird und Ihre
          IP-Adresse nicht an Dritte übermittelt wird.
        </p>
      </Abschnitt>

      <Abschnitt titel="7. Speicherdauer">
        <p>
          Anfragedaten werden gelöscht, sobald sie für die Erreichung des Zwecks
          ihrer Erhebung nicht mehr erforderlich sind und keine gesetzlichen
          Aufbewahrungsfristen entgegenstehen. Server-Logfiles werden nach kurzer
          Zeit automatisch gelöscht oder gekürzt.
        </p>
      </Abschnitt>

      <Abschnitt titel="8. Ihre Rechte">
        <p>
          Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten
          Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf Löschung
          (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO),
          auf Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht, einer
          Verarbeitung auf Grundlage berechtigter Interessen zu widersprechen
          (Art. 21 DSGVO).
        </p>
        <p>
          Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die
          Zukunft widerrufen. Zur Ausübung Ihrer Rechte genügt eine formlose
          Nachricht an die oben genannte Adresse.
        </p>
        <p>
          Unabhängig davon steht Ihnen ein Beschwerderecht bei einer
          Datenschutz-Aufsichtsbehörde zu, in Hessen beim Hessischen
          Beauftragten für Datenschutz und Informationsfreiheit.
        </p>
      </Abschnitt>

      <Abschnitt titel="9. Sicherheit">
        <p>
          Wir treffen technische und organisatorische Maßnahmen, um Ihre Daten
          gegen den Zugriff Dritter zu schützen. Die Übertragung dieser Website
          erfolgt verschlüsselt über HTTPS. Bei der Kommunikation per E-Mail kann
          die vollständige Datensicherheit nicht gewährleistet werden; bei
          vertraulichen Informationen empfehlen wir den Postweg oder einen Anruf.
        </p>
      </Abschnitt>
    </Rechtsseite>
  );
}
