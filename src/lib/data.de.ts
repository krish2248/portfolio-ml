/**
 * German content. Only text is overridden here; links, covers and ids come from data.ts,
 * so a project or job added there shows up in German too (in English until translated).
 * Reference quotes stay in the original English of the letters.
 */

import { contentEn, Content, Project, Experience, Education } from './data'

const projectText: Record<string, Pick<Project, 'kind' | 'summary'>> = {
  futology: {
    kind: 'Web · Analytics',
    summary:
      'Web-App für Fußballanalysen mit Live-Ergebnissen, OTP-Login und einem Tippspiel mit Ranglisten; über 530 Commits in zwei Iterationen. Nächster Meilenstein: ein ML-Service mit FastAPI – XGBoost-Spielprognose, k-Means-Clustering von Spielertypen und SHAP-basierte Transferwerte.',
  },
  'prm-commerce': {
    kind: 'Beruf · Datenprodukt',
    summary:
      'Onlineshop im Direktvertrieb, den ich für PRM & Company konzipiert und gebaut habe: Katalog, Warenkorb, Checkout, Zahlungen und Bestellverwaltung, dazu ein Live-Dashboard mit Umsatzentwicklung, regionalen Bestellungen und Topsellern.',
  },
  medxai: {
    kind: 'ML · Explainable AI',
    summary:
      'Multimodales, erklärbares KI-System für die Medizin mit einem „Wellness Atlas“, für Forschung und Lehre. Vorhersagen kommen mit Interpretierbarkeits-Ausgaben, damit man sie prüfen kann, statt ihnen blind zu vertrauen.',
  },
  'auto-valuator': {
    kind: 'ML · Regression',
    summary:
      'Schätzt den Wiederverkaufswert eines Gebrauchtwagens anhand von Alter, Laufleistung, Marke und Zustand. Fünf Regressionsmodelle im Vergleich; das beste erreicht ein R² über 0,85.',
  },
  rems: {
    kind: 'Full Stack · Praktikum',
    summary:
      'Produktivsystem, das ich bei IT Hub allein entwickelt habe: Rollen und Rechte für Käufer, Verkäufer, Makler und Admins, Suche mit Mehrfachfiltern, Lead-Management, Zahlungsanbindung und Dokumentenprüfung.',
  },
  'connect4-nemotron': {
    kind: 'LLM · Spiel',
    summary:
      'Vier gewinnt gegen ein LLM. Der Spielstand wird in den Prompt serialisiert, und jeder Zug des Modells wird gegen die erlaubten Züge geprüft.',
  },
  'ai-agent': {
    kind: 'LLM',
    summary: 'Mein erster LLM-Agent: Llama 4 über die Groq-API, um Tool-Nutzung und mehrstufige Aufgaben zu erkunden.',
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
    summary: 'Online-Multiplayer-Spiel mit eigenem Socket.IO-Spielserver, Offline-Modus und als PWA installierbar.',
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
      'Auswertung von Verkaufsförderungsaktionen und Identifikation schwacher Regionen und Produkte. Die Ergebnisse veränderten die Vertriebsstrategie: 8 % Umsatzerholung in diesen Regionen und 17 % Wachstum in den Zielsegmenten.',
      'Modellierung der Nachfrage nach Saison und Region, um zu entscheiden, welche Produkte wann und wo forciert werden; dieselbe Analyse diente der Zielgruppenauswahl für Social-Media-Kampagnen.',
      'Zusammenführung uneinheitlicher Vertriebs- und Betriebsdaten aus mehreren Quellen zu prüfungsfähigen Datensätzen für die Jahreshauptversammlung sowie Excel-Reporting für die Geschäftsleitung, z. B. eine Versandanalyse mit 1.427 Sendungen.',
      'Konzeption und Aufbau von prmherbovilla.com, dem Onlineshop des Unternehmens im Direktvertrieb, mit Live-KPI-Dashboard für das Business-Team.',
    ],
    stack: 'Python, pandas, Matplotlib, Seaborn, Excel, statistische Analyse, Shopify',
  },
  ithub: {
    title: 'Full-Stack-Entwickler (Praktikum)',
    location: 'Bhavnagar, Indien',
    period: 'Jan. 2025 – Apr. 2025',
    type: 'Praktikum',
    points: [
      'Alleinige Entwicklung eines produktiv eingesetzten Immobilienverwaltungssystems nach einem 12-wöchigen Meilensteinplan.',
      'Entwurf des relationalen Schemas aus ER-Modellen; schnellere Immobiliensuche über große Datenmengen durch Indizes, Query-Optimierung und Caching.',
      'Rollenbasierte Zugriffskontrolle und Anbindung von Razorpay und PayPal; Unit-, Integrations-, Last- und Sicherheitstests.',
    ],
  },
  infolabz: {
    title: 'Flutter-Entwickler (Praktikum)',
    location: 'Ahmedabad, Indien',
    period: 'Juni 2024 – Juli 2024',
    type: 'Praktikum',
    points: [
      'Plattformübergreifende News-App auf Basis der Inshorts News API mit Material UI, List- und Grid-Buildern und JSON-Parsing.',
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
      'Module im 1. Semester: Statistical Theory (maßtheoretische Wahrscheinlichkeitstheorie, Entscheidungstheorie), Advanced R, Data Science in Context.',
    ],
  },
  gtu: {
    location: 'Bhavnagar, Indien',
    period: 'Juni 2021 – Mai 2025',
    details: [
      'CGPA 7,73 / 10, obere 15 % des Jahrgangs. Entspricht ca. der Note 2,1 (modifizierte bayerische Formel); ca. 240 ECTS.',
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
  'Data & ML': 'Daten & ML',
  Statistics: 'Statistik',
  Languages: 'Programmiersprachen',
  'Web & apps': 'Web & Apps',
  'Data stores': 'Datenbanken',
  'LLM tooling': 'LLM-Tools',
  Tools: 'Werkzeuge',
}

const skillItems: Record<string, string> = {
  'Hypothesis testing': 'Hypothesentests',
  Forecasting: 'Prognosen',
  'Sentiment analysis': 'Sentimentanalyse',
  'REST APIs': 'REST-APIs',
  'ER modelling': 'ER-Modellierung',
  'Indexing & query optimisation': 'Indizes & Query-Optimierung',
  'Local quantised models': 'Lokale quantisierte Modelle',
}

const withProjectText = (list: Project[]) => list.map((p) => ({ ...p, ...projectText[p.id] }))

export const contentDe: Content = {
  siteConfig: {
    ...contentEn.siteConfig,
    role: 'Masterstudent Data Science, TU Dortmund',
    statement:
      'Ich verwandle unübersichtliche Geschäftsdaten in Entscheidungen und baue die Software, die diese Entscheidungen sichtbar macht.',
    intro:
      'Bis Oktober 2026 war ich Data Scientist bei PRM & Company, einem Pharmaunternehmen in Indien. Dort habe ich die Vertriebs- und Marketinganalysen verantwortet und den Onlineshop sowie das KPI-Dashboard des Unternehmens aufgebaut. Seit dem Wintersemester 2026/27 studiere ich Data Science (M.Sc.) an der TU Dortmund.',
    location: 'Dortmund, Deutschland',
    updated: 'Oktober 2026',
  },
  availability: {
    ...contentEn.availability,
    roles: ['Werkstudent', 'Praktikum', 'HiWi / studentische Hilfskraft'],
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
      title: 'Werkstudent',
      body: 'Data Science, Analytics oder ML Engineering in einem Produkt- oder Fachteam: Reporting und Dashboards, Datenpipelines, statistische Analysen, Prognosen und die internen Tools dazu.',
    },
    {
      title: 'Praktikum',
      body: 'Ein Praktikum in Data Science oder ML Engineering in der vorlesungsfreien Zeit – am liebsten dort, wo Modelle tatsächlich bei Nutzern oder in Entscheidungen ankommen, statt im Notebook zu bleiben.',
    },
    {
      title: 'HiWi / studentische Hilfskraft',
      body: 'Unterstützung eines Lehrstuhls oder einer Forschungsgruppe an der TU Dortmund bei Datenaufbereitung, statistischer Analyse, Tooling für Experimente, Visualisierung oder Web-Frontends für Forschungssoftware.',
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
