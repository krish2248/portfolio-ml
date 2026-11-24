/**
 * German content. Only text is overridden here; links, covers and ids come from data.ts,
 * so a project or job added there shows up in German too (in English until translated).
 * Reference quotes stay in the original English of the letters.
 */

import { contentEn, Content, Project, Experience, Education } from './data'

const projectText: Record<string, Pick<Project, 'kind' | 'summary'> & { title?: string }> = {
  'lhcb-tau-3mu': {
    title: 'LHCb-Klassifikator für τ → μμμ',
    kind: 'ML · In Arbeit',
    summary:
      'XGBoost-Klassifikator mit SHAP-Erklärungen auf LHCb-Daten aus der Kaggle-Challenge „Flavours of Physics“; ausgelegt darauf, den Übereinstimmungstest zwischen echten und simulierten Daten sowie den Massenkorrelationstest der Challenge zu bestehen.',
  },
  'scikit-hep': {
    title: 'Beiträge zu Scikit-HEP',
    kind: 'Open Source',
    summary:
      'In Arbeit: Dokumentation, Tests und Beispiele für die Python-Werkzeuge, mit denen in der Teilchenphysik Daten ausgewertet werden.',
  },
  'breast-cancer': {
    title: 'Brustkrebs-Diagnosemodell',
    kind: 'ML',
    summary: 'Klassifikationsmodell für die Brustkrebsdiagnose.',
  },
  futology: {
    kind: 'Web · Analytics',
    summary:
      'Web-App für Fußballanalysen auf Basis von API-Football mit Live-Ergebnissen, OTP-Login und einem Tippspiel mit Ranglisten; über 530 Commits. Nächster Meilenstein: ein Machine-Learning-Service mit FastAPI.',
  },
  'prm-commerce': {
    kind: 'Beruf · Datenprodukt',
    summary:
      'Onlineshop im Direktvertrieb, den ich für PRM & Company konzipiert und gebaut habe: sechs Produktkategorien, Zahlung per UPI, Karte und Nachnahme, dazu ein Echtzeit-Dashboard mit Umsatzentwicklung, regionalen Bestellungen, Topsellern und Live-KPIs.',
  },
  medxai: {
    kind: 'ML · Explainable AI',
    summary:
      'Multimodales, erklärbares KI-System für die Medizin mit einem „Wellness Atlas“, für Forschung und Lehre. Vorhersagen kommen mit Interpretierbarkeits-Ausgaben, damit man sie prüfen kann, statt ihnen blind zu vertrauen.',
  },
  'auto-valuator': {
    kind: 'ML · Regression',
    summary:
      'Schätzt den Preis eines Gebrauchtwagens anhand von Alter, Laufleistung, Marke und Zustand. Fünf Regressionsmodelle im Vergleich; das beste erreicht ein R² über 0,85.',
  },
  rems: {
    kind: 'Full Stack · Praktikum',
    summary:
      'System, das ich bei IT Hub allein entwickelt habe: Rollen und Rechte für Käufer, Verkäufer, Makler und Admins, Suche mit Mehrfachfiltern, Lead-Management sowie Zahlungen über Razorpay und PayPal.',
  },
  'connect4-nemotron': {
    kind: 'LLM · Spiel',
    summary:
      'Vier gewinnt gegen ein LLM. Der Spielstand wird in den Prompt serialisiert, und jeder Zug des Modells wird gegen die erlaubten Züge geprüft.',
  },
  'ai-agent': {
    kind: 'LLM',
    summary: 'LLM-Agent auf Llama 4 über die Groq-API, um Tool-Nutzung und mehrstufige Aufgaben zu erkunden.',
  },
  'virtual-classroom': {
    kind: 'Full Stack',
    summary: 'Live-Unterricht über die Zoom-API plus Abgabe von Aufgaben, entwickelt unter Betreuung von Lehrenden am GMIT.',
  },
  ampere: {
    kind: 'Android',
    summary: 'Offline-Diagnose für Akku, Ladevorgang und Temperatur unter Android.',
  },
  '2048-dark': {
    kind: 'Web · Android',
    summary:
      'Zweimal veröffentlicht: als Webspiel in einer einzigen Datei ohne Abhängigkeiten, mit Rückgängig, Tipps und 13 Erfolgen, und als native Android-App.',
  },
  rpsls: {
    kind: 'Echtzeit-Web',
    summary: 'Echtzeit-Multiplayer-Spiel mit Online-Räumen, Offline-Modus und als PWA installierbar.',
  },
  'fut-score': { kind: 'Fußball', summary: 'Personalisierte Übersicht für Fußballergebnisse.' },
  'coffee-journal': {
    kind: 'Kaffee',
    summary:
      'Über 60 Specialty Coffees von mehr als 25 indischen Röstereien, mit Aroma-Radardiagrammen und neun Zubereitungsanleitungen.',
  },
  'text-adventure': {
    kind: 'Indie-Games',
    summary: 'Neun verzweigte Geschichten, darunter „Der Graf von Monte Christo“.',
  },
  'vellum-codex': {
    kind: 'Literatur',
    summary: 'Archiv meiner 74 Bücher mit Statistik-Dashboard, Genrefiltern, Suche und Lesestatus.',
  },
}

const experienceText: Record<string, Partial<Experience>> = {
  prm: {
    location: 'Bhavnagar, Indien',
    period: 'Juni 2025 – Okt. 2026',
    type: 'Vollzeit',
    points: [
      'Analyse und Visualisierung von Verkaufs-, Online-Bestell-, Bewertungs- und Einkaufsdaten in Python; daraus entstanden die Diagramme und Kennzahlen für Vertriebs- und Marketingentscheidungen.',
      'Auswertung von Verkaufsförderungsaktionen und Identifikation schwacher Regionen und Produkte. Die Ergebnisse veränderten die Vertriebsstrategie: +8 % Umsatz in zuvor schwachen Gebieten und +17 % in den Zielsegmenten.',
      'Modellierung der Nachfrage nach Saison und Region, um zu entscheiden, welche Produkte wann und wo forciert werden; dieselbe Analyse diente der Zielgruppenauswahl für Social-Media-Kampagnen.',
      'Zusammenführung uneinheitlicher Vertriebs- und Betriebsdaten aus mehreren Quellen zu prüfungsfähigen Datensätzen für die Jahreshauptversammlung sowie Management-Reporting, z. B. eine Versandanalyse mit 1.427 Sendungen in zwei Bundesstaaten und KPI-Tracking für den Außendienst.',
      'Aufbau eines statistischen Echtzeit-Dashboards auf den Daten des Onlineshops für das Business-Team: Umsatzentwicklung, regionale Bestellverteilung, Topseller und Live-KPIs.',
      'Aufbau und Launch des Direktvertriebs-Onlineshops prmherbovilla.com auf Shopify mit eigenem JavaScript und CSS (sechs Produktkategorien; Zahlung per UPI, Karte und Nachnahme).',
      'Analyse des indischen Marktes für pflanzliche Hustenbonbons (nationale Marken und 39 regionale Anbieter), um unbesetzte Bundesstaaten für neue Produkte zu finden.',
    ],
    stack: 'Python, pandas, Matplotlib, Seaborn, XGBoost, Excel, Shopify',
  },
  ithub: {
    title: 'Full-Stack-Entwickler (Praktikum)',
    location: 'Bhavnagar, Indien',
    period: 'Jan. 2025 – Apr. 2025',
    type: 'Praktikum',
    points: [
      'Alleinige Entwicklung eines Immobilienverwaltungssystems: Rollen und Rechte für Käufer, Verkäufer, Makler und Admins, Suche mit Mehrfachfiltern, Lead-Management, Zahlungen über Razorpay und PayPal.',
      'Entwurf des relationalen Schemas aus einem ER-Modell; schnellere Suche durch Indizes, Query-Optimierung und Caching.',
      'Unit-, Integrations-, Abnahme-, Last- und Sicherheitstests; strukturiertes Fehler-Logging und automatische Backups.',
    ],
  },
  infolabz: {
    title: 'Flutter-Entwickler (Praktikum)',
    location: 'Ahmedabad, Indien',
    period: 'Juni 2024 – Juli 2024',
    type: 'Praktikum',
    points: [
      'Zweiwöchiges Sommerpraktikum: plattformübergreifende News-App in Flutter und Dart auf Basis der Inshorts News API (REST, JSON).',
    ],
    stack: 'Flutter, Dart, REST-APIs',
  },
  'ssip-hackathon': {
    title: 'SSIP-24-Stunden-Hackathon',
    location: 'Bhavnagar, Indien',
    period: 'Juli 2022',
    points: [
      'Studierendenverwaltungssystem im Zweierteam: rollenbasiertes Portal für Admins, Lehrende und Studierende mit Vorlesungen, Aufgaben und Mitteilungen.',
    ],
  },
}

const educationText: Record<string, Partial<Education>> = {
  'tu-dortmund': {
    institution: 'TU Dortmund, Fakultät Statistik',
    location: 'Dortmund, Deutschland',
    period: 'Okt. 2026 – Sep. 2028 (voraussichtlich)',
    details: [
      'Module: Statistical Theory (maßtheoretische Wahrscheinlichkeitstheorie, Entscheidungstheorie), Applied Bayesian Data Analysis, Advanced R, Data Science in Context.',
    ],
  },
  gtu: {
    location: 'Bhavnagar, Indien',
    period: 'Juni 2021 – Mai 2025',
    details: [
      'CGPA 7,73 / 10 (entspricht ca. der Note 2,1); obere 15 % des Jahrgangs; obere 5 % des Kurses in Software Engineering; ca. 240 ECTS.',
      'Relevante Module: Wahrscheinlichkeitsrechnung und Statistik, Diskrete Mathematik, Datenstrukturen, Algorithmen, Datenbanksysteme, Künstliche Intelligenz, Big Data Analytics.',
    ],
  },
}

const referenceRoles: Record<string, string> = {
  'Sagar Makwana': 'Personalleiter, PRM & Company',
  'Prof. Prashant J. Viradiya': 'Leiter des Fachbereichs Computer Engineering, GMIT',
  'Prof. Ritesh D. Chimnani': 'Assistant Professor, Computer Engineering, GMIT',
}

const skillGroups: Record<string, string> = {
  'Data & statistics': 'Daten & Statistik',
  'Software & web': 'Software & Web',
  Tools: 'Werkzeuge',
  'Learning now': 'Lerne gerade',
  'Basic knowledge': 'Grundkenntnisse',
  Languages: 'Sprachen',
}

const skillItems: Record<string, string> = {
  'Hypothesis testing': 'Hypothesentests',
  'Data visualisation': 'Datenvisualisierung',
  'REST APIs': 'REST-APIs',
  'Git and GitHub': 'Git und GitHub',
  'Excel (pivot tables, SUMIFS, INDEX/MATCH)': 'Excel (Pivot-Tabellen, SUMIFS, INDEX/MATCH)',
  'Scikit-HEP Python tools for particle physics (uproot, hist)': 'Scikit-HEP: Python-Werkzeuge für die Teilchenphysik (uproot, hist)',
  'English C1 (IELTS Academic 7.5)': 'Englisch C1 (IELTS Academic 7,5)',
  'German A1 (course at TU Dortmund)': 'Deutsch A1 (Kurs an der TU Dortmund)',
  'Hindi and Gujarati (native)': 'Hindi und Gujarati (Muttersprachen)',
}

const withProjectText = (list: Project[]) => list.map((p) => ({ ...p, ...projectText[p.id] }))

export const contentDe: Content = {
  siteConfig: {
    ...contentEn.siteConfig,
    role: 'Data Scientist · Masterstudent Data Science, TU Dortmund',
    statement:
      'Ich verwandle unübersichtliche Geschäftsdaten in Entscheidungen und baue die Software, die diese Entscheidungen sichtbar macht.',
    intro:
      'Bis Oktober 2026 war ich Data Scientist bei PRM & Company, einem Pharma-Marketingunternehmen in Indien. Dort habe ich die Vertriebs- und Marketinganalysen verantwortet und den Onlineshop sowie das KPI-Dashboard des Unternehmens aufgebaut. Seit dem Wintersemester 2026/27 studiere ich Data Science (M.Sc.) an der TU Dortmund und wende Statistik und Machine Learning auf Daten aus der Teilchenphysik an.',
    description:
      'Data Scientist mit 17 Monaten Erfahrung in der Pharma-Vertriebsanalyse und Masterstudent Data Science an der TU Dortmund. Python, Statistik, Machine Learning; aktuell mit Daten aus der Teilchenphysik. Offen für Jobs und Forschung.',
    location: 'Dortmund, Deutschland',
    updated: 'November 2026',
  },
  availability: {
    ...contentEn.availability,
    headline: 'Offen für Jobs / Forschung',
    terms: 'Dortmund oder remote · bis zu 20 Std./Woche im Semester, Vollzeit in der vorlesungsfreien Zeit',
  },
  quickFacts: [
    { label: 'Aktuell', value: 'M.Sc. Data Science, TU Dortmund' },
    { label: 'Zuvor', value: 'Data Scientist, PRM & Company' },
    { label: 'Abschluss', value: 'B.E. Computer Engineering, obere 15 %' },
    { label: 'Wohnort', value: 'Dortmund, Deutschland' },
    { label: 'Sprachen', value: 'Englisch C1 (IELTS 7,5), Deutsch A1, Hindi, Gujarati' },
  ],
  openTo: [
    {
      title: 'Jobs',
      body: 'Data Science, Analytics oder ML Engineering in einem Produkt- oder Fachteam: Reporting und Dashboards, Datenpipelines, statistische Analysen, Prognosen und die internen Tools dazu.',
    },
    {
      title: 'Forschung',
      body: 'Unterstützung eines Lehrstuhls oder einer Forschungsgruppe bei Datenaufbereitung, statistischer Analyse, Tooling für Experimente, Visualisierung oder Web-Frontends für Forschungssoftware.',
    },
  ],
  featuredProjects: withProjectText(contentEn.featuredProjects),
  moreProjects: withProjectText(contentEn.moreProjects),
  personalProjects: withProjectText(contentEn.personalProjects),
  experiences: contentEn.experiences.map((job) => ({ ...job, ...experienceText[job.id] })),
  education: contentEn.education.map((item) => ({ ...item, ...educationText[item.id] })),
  skills: contentEn.skills.map((row) => ({
    group: skillGroups[row.group] ?? row.group,
    items: row.items.map((item) => skillItems[item] ?? item),
  })),
  references: contentEn.references.map((ref) => ({ ...ref, role: referenceRoles[ref.name] ?? ref.role })),
}
