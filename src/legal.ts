/**
 * Templates for /impressum and /datenschutz (German).
 *
 * NOT legal advice, and not published: see `site.legalPublished` in content.ts.
 * Everything in [[double brackets]] is a placeholder or a note. Fill in or delete every one;
 * the build refuses to publish the pages while any is left.
 * Preview: `bun dev`, then open /impressum or /datenschutz.
 */

import type { LegalPage } from './lib/pages'

export interface LegalText {
  title: string
  description: string
  sections: { heading: string; paragraphs: string[] }[]
}

export const legal: Record<LegalPage, LegalText> = {
  impressum: {
    title: 'Impressum',
    description: 'Impressum von sonikrish.com',
    sections: [
      {
        heading: 'Angaben gemäß § 5 DDG',
        paragraphs: [
          '[[VOR- UND NACHNAME]]',
          '[[STRASSE UND HAUSNUMMER]]',
          '[[PLZ UND ORT]]',
          '[[LAND]]',
          '[[Hinweis: Es muss eine ladungsfähige Anschrift sein. Ein Postfach genügt nicht.]]',
        ],
      },
      {
        heading: 'Kontakt',
        paragraphs: [
          'E-Mail: [[E-MAIL-ADRESSE]]',
          'Telefon: [[TELEFONNUMMER oder ein anderer Weg zur schnellen, unmittelbaren Kontaktaufnahme]]',
        ],
      },
      {
        heading: 'Umsatzsteuer-ID',
        paragraphs: ['[[UMSATZSTEUER-ID, nur falls vorhanden. Sonst diesen Abschnitt löschen.]]'],
      },
      {
        heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
        paragraphs: [
          '[[NAME UND ANSCHRIFT, nur bei journalistisch-redaktionellen Inhalten wie einem Blog. Sonst diesen Abschnitt löschen.]]',
        ],
      },
    ],
  },

  datenschutz: {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung von sonikrish.com',
    sections: [
      {
        heading: '1. Verantwortlicher',
        paragraphs: [
          '[[VOR- UND NACHNAME]]',
          '[[STRASSE UND HAUSNUMMER, PLZ UND ORT, LAND]]',
          'E-Mail: [[E-MAIL-ADRESSE]]',
        ],
      },
      {
        heading: '2. Hosting und Server-Protokolle',
        paragraphs: [
          'Diese Website wird bei GitHub Pages gehostet. Anbieter: [[NAME UND ANSCHRIFT DES ANBIETERS, aktuell bei GitHub nachsehen]].',
          'Beim Aufruf der Website verarbeitet der Anbieter technisch notwendige Daten, insbesondere die IP-Adresse, um die Seite auszuliefern und ihre Sicherheit zu gewährleisten. Details: [[LINK ZUR DATENSCHUTZERKLÄRUNG DES ANBIETERS]].',
          'Rechtsgrundlage: [[RECHTSGRUNDLAGE PRÜFEN, meist Art. 6 Abs. 1 lit. f DSGVO]].',
          'Übermittlung in Drittländer: [[GARANTIE PRÜFEN, z. B. EU-US Data Privacy Framework oder Standardvertragsklauseln]].',
          'Speicherdauer: [[ANGABE DES ANBIETERS]].',
        ],
      },
      {
        heading: '3. Speicherung im Browser',
        paragraphs: [
          'Diese Website setzt keine Cookies. Wenn Sie das Farbschema oder die Sprache umschalten, wird Ihre Auswahl im lokalen Speicher Ihres Browsers abgelegt (Schlüssel „portfolio-theme“ und „portfolio-lang“). Diese Angaben werden nicht übertragen. Sie können sie jederzeit in den Browsereinstellungen löschen.',
          'Rechtsgrundlage: [[PRÜFEN, meist § 25 Abs. 2 Nr. 2 TDDDG]].',
        ],
      },
      {
        heading: '4. Keine Analyse, keine eingebetteten Inhalte Dritter',
        paragraphs: [
          'Diese Website verwendet keine Analyse- oder Trackingdienste. Schriftarten werden vom eigenen Server geladen. Inhalte Dritter sind nicht eingebettet.',
          '[[Hinweis: Nach jeder Änderung an der Website prüfen, ob das noch stimmt.]]',
        ],
      },
      {
        heading: '5. Kontakt per E-Mail',
        paragraphs: [
          'Wenn Sie eine E-Mail schreiben, werden Ihre Angaben zur Bearbeitung der Anfrage verarbeitet. E-Mail-Anbieter: [[NAME DES E-MAIL-ANBIETERS]].',
          'Rechtsgrundlage: [[PRÜFEN, meist Art. 6 Abs. 1 lit. b oder f DSGVO]]. Speicherdauer: [[ZEITRAUM]].',
        ],
      },
      {
        heading: '6. Externe Links',
        paragraphs: [
          'Diese Website verlinkt auf externe Seiten wie GitHub und LinkedIn. Erst beim Anklicken werden Daten an deren Betreiber übertragen.',
        ],
      },
      {
        heading: '7. Ihre Rechte',
        paragraphs: [
          'Sie haben nach der DSGVO das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21).',
          'Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77). Zuständig: [[AUFSICHTSBEHÖRDE, in Nordrhein-Westfalen die LDI NRW]].',
        ],
      },
      { heading: 'Stand', paragraphs: ['[[MONAT UND JAHR]]'] },
    ],
  },
}

export const hasPlaceholders = (text: LegalText) => JSON.stringify(text).includes('[[')
