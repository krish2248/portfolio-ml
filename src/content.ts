/**
 * All the text on the site, in English and German. Edit it here and nowhere else.
 *
 * The one exception: the English page title and description are also in index.html
 * (the build fails if the two differ).
 */

import type { CoverMotif } from './components/ui/ProjectCover'
import type { Lang } from './lib/lang'

// ─── Shared by both languages ────────────────────────────────────────────────

export const site = {
  name: 'Krish Soni',
  fullName: 'Krish Hemang Soni',
  email: 'sonikrish2248@gmail.com',
  cv: '/cv/Krish_Soni_CV.pdf',
  github: 'https://github.com/krish2248',
  linkedin: 'https://www.linkedin.com/in/krish-soni-460932228/',
  source: 'https://github.com/krish2248/portfolio-ml',
}

/** "More" line under the projects. */
export const moreProjects = [
  { title: 'Coffee Journal', url: 'https://krish2248.github.io/Coffee-Journal' },
  { title: 'Vellum Codex', url: 'https://krish2248.github.io/Vellum-Codex' },
  { title: '2048 Dark', url: 'https://krish2248.github.io/2048-Dark' },
]

/** Quotes from the recommendation letters, always in the original English. */
export const quotes = {
  hr: 'Through his efforts, the company achieved notable improvements, including an 8% sales increase in previously underperforming areas and a 17% overall growth in targeted product segments.',
  hod: 'One of the most dependable and inventive students in his cohort, eager to apply concepts beyond the textbook.',
  professor:
    'A curious, disciplined, and methodical learner. He was always receptive to feedback, improving his code structure and documentation after every review.',
}

// ─── Shape ───────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  badge?: string
  summary: string
  stack?: string[]
  url?: string
  motif: CoverMotif
}

export interface Content {
  meta: { title: string; description: string; imageAlt: string }
  hero: { tagline: string; statement: string; buttons: { cv: string; email: string } }
  now: { title: string; updated: string; items: string[] }
  projects: { title: string; more: string; code: string; items: Project[] }
  experience: {
    title: string
    items: { id: string; period: string; role: string; company: string; location: string; text: string }[]
    quotesTitle: string
    quotes: { quote: string; name: string; role: string }[]
  }
  education: { title: string; items: { id: string; period: string; degree: string; school: string; note?: string }[] }
  skills: { title: string; rows: string[] }
  contact: { title: string; email: string; location: string; locationValue: string }
  nav: { now: string; projects: string; experience: string; education: string; contact: string }
  ui: {
    skipLink: string
    menuOpen: string
    menuClose: string
    toLight: string
    toDark: string
    language: string
    source: string
  }
}

// ─── English ─────────────────────────────────────────────────────────────────

const en: Content = {
  meta: {
    title: 'Krish Soni · Data Scientist · M.Sc. Data Science, TU Dortmund',
    description:
      'Data scientist with 17 months in pharma sales analytics and M.Sc. Data Science student at TU Dortmund. Python, statistics, machine learning; now working with particle-physics data. Open to Werkstudent, HiWi and internship roles.',
    imageAlt: 'Krish Soni, Data Scientist, M.Sc. Data Science at TU Dortmund. sonikrish.com',
  },
  hero: {
    tagline: 'Data scientist · M.Sc. Data Science student at TU Dortmund',
    statement:
      'I turn messy data into decisions: 17 months of pharma sales analytics, now applying statistics and machine learning to particle-physics data.',
    buttons: { cv: 'Download CV', email: 'Email' },
  },
  now: {
    title: 'Now',
    updated: 'Updated November 2026',
    items: [
      'Building an LHCb τ → μμμ decay classifier (XGBoost + SHAP), in progress',
      'Contributing to Scikit-HEP (uproot, hist), in progress',
      'Studying Statistical Theory, Applied Bayesian Data Analysis and Advanced R at TU Dortmund',
      'Open to Werkstudent, HiWi and internship roles in data science: up to 20 h/week during lectures, full-time in semester breaks',
    ],
  },
  projects: {
    title: 'Projects',
    more: 'More',
    code: 'Code',
    items: [
      {
        id: 'lhcb-tau-3mu',
        title: 'LHCb τ → μμμ decay classifier',
        badge: 'In progress',
        summary:
          'XGBoost classifier with SHAP explanations on LHCb data from Kaggle’s “Flavours of Physics” challenge, designed to pass the challenge’s real-vs-simulated agreement test and mass-correlation test.',
        stack: ['Python', 'XGBoost', 'SHAP'],
        url: 'https://github.com/krish2248/lhcb-tau-3mu',
        motif: 'tracks',
      },
      {
        id: 'futology',
        title: 'FUTOLOGY: football analytics web app',
        summary:
          'Live scores, OTP login and a prediction game with leaderboards; 530+ commits and a live demo. Next: a FastAPI machine-learning service.',
        stack: ['Next.js', 'TypeScript', 'Supabase'],
        url: 'https://github.com/krish2248/futology',
        motif: 'pitch',
      },
      {
        id: 'auto-valuator',
        title: 'Auto-Valuator: used-car price prediction',
        summary: 'Five regression models compared on age, mileage, make and condition; best R² above 0.85.',
        stack: ['Python', 'scikit-learn', 'XGBoost'],
        url: 'https://github.com/krish2248/Auto-Valuator',
        motif: 'scatter',
      },
      {
        id: 'rpsls',
        title: 'RPSLS: real-time multiplayer game',
        summary: 'Online rooms, offline mode, installable as a PWA.',
        stack: ['React', 'Redux Toolkit', 'TypeScript', 'Node.js', 'Socket.IO'],
        url: 'https://github.com/krish2248/Rock-Paper-Scissors-Lizard-Spock',
        motif: 'nodes',
      },
      {
        id: 'llm-experiments',
        title: 'LLM experiments',
        summary:
          'An agent on Llama 4 via the Groq API exploring tool use; Connect 4 against NVIDIA Nemotron with every model move validated against the rules.',
        motif: 'board',
      },
    ],
  },
  experience: {
    title: 'Experience',
    items: [
      {
        id: 'prm',
        period: '06/2025 – 10/2026',
        role: 'Data Scientist',
        company: 'PRM & Company (PRM Pharmaceuticals)',
        location: 'Bhavnagar, India',
        text: 'Promotion analysis (+8% sales in underperforming areas, +17% in targeted segments), seasonal and regional demand modelling, audit-ready datasets for the Annual General Meeting, and a real-time statistical dashboard for the business team. Built the online shop prmherbovilla.com on Shopify with custom JavaScript and CSS.',
      },
      {
        id: 'ithub',
        period: '01/2025 – 04/2025',
        role: 'Full-Stack Developer Intern',
        company: 'IT Hub Software Solutions',
        location: 'Bhavnagar',
        text: 'Sole developer of a real-estate management system (PHP, MySQL, JavaScript).',
      },
      {
        id: 'infolabz',
        period: '06/2024 – 07/2024',
        role: 'Flutter Developer Intern',
        company: 'InfoLabz IT Services',
        location: 'Ahmedabad',
        text: 'Cross-platform news app in Flutter and Dart.',
      },
    ],
    quotesTitle: 'What people I’ve worked with say',
    quotes: [
      { quote: quotes.hr, name: 'Sagar Makwana', role: 'Head of HR, PRM & Company' },
      { quote: quotes.hod, name: 'Prof. Prashant J. Viradiya', role: 'Head of Department, Computer Engineering, GMIT' },
      { quote: quotes.professor, name: 'Prof. Ritesh D. Chimnani', role: 'Assistant Professor, Computer Engineering, GMIT' },
    ],
  },
  education: {
    title: 'Education',
    items: [
      { id: 'tu-dortmund', period: 'since 10/2026', degree: 'M.Sc. Data Science', school: 'TU Dortmund University (expected 09/2028)' },
      {
        id: 'gtu',
        period: '2021 – 2025',
        degree: 'B.E. Computer Engineering',
        school: 'GMIT, degree by Gujarat Technological University',
        note: 'CGPA 7.73/10, top 15% of the cohort.',
      },
    ],
  },
  skills: {
    title: 'Skills',
    rows: [
      'Python (pandas, NumPy, scikit-learn, XGBoost), SQL, R, statistics',
      'TypeScript, React, Next.js, Node.js',
      'Git',
    ],
  },
  contact: { title: 'Contact', email: 'Email', location: 'Location', locationValue: 'Dortmund, Germany' },
  nav: { now: 'Now', projects: 'Projects', experience: 'Experience', education: 'Education', contact: 'Contact' },
  ui: {
    skipLink: 'Skip to content',
    menuOpen: 'Menu',
    menuClose: 'Close',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    language: 'Language',
    source: 'Source',
  },
}

// ─── German ──────────────────────────────────────────────────────────────────

const de: Content = {
  meta: {
    title: 'Krish Soni · Data Scientist · M.Sc. Data Science, TU Dortmund',
    description:
      'Data Scientist mit 17 Monaten Erfahrung in der Pharma-Vertriebsanalyse und Masterstudent Data Science an der TU Dortmund. Python, Statistik, Machine Learning; aktuell mit Daten aus der Teilchenphysik. Offen für Werkstudenten-, HiWi- und Praktikumsstellen.',
    imageAlt: 'Krish Soni, Data Scientist, M.Sc. Data Science an der TU Dortmund. sonikrish.com',
  },
  hero: {
    tagline: 'Data Scientist · Masterstudent Data Science an der TU Dortmund',
    statement:
      'Ich mache aus unübersichtlichen Daten Entscheidungen: 17 Monate Vertriebsanalyse in der Pharmabranche, jetzt Statistik und Machine Learning auf Daten aus der Teilchenphysik.',
    buttons: { cv: 'Lebenslauf herunterladen (Englisch)', email: 'E-Mail' },
  },
  now: {
    title: 'Aktuell',
    updated: 'Stand: November 2026',
    items: [
      'Entwicklung eines LHCb-Klassifikators für den Zerfall τ → μμμ (XGBoost + SHAP), in Arbeit',
      'Beiträge zu Scikit-HEP (uproot, hist), in Arbeit',
      'Studium an der TU Dortmund: Statistical Theory, Applied Bayesian Data Analysis und Advanced R',
      'Offen für Werkstudenten-, HiWi- und Praktikumsstellen in Data Science: bis zu 20 Std./Woche in der Vorlesungszeit, Vollzeit in der vorlesungsfreien Zeit',
    ],
  },
  projects: {
    title: 'Projekte',
    more: 'Weitere',
    code: 'Code',
    items: [
      {
        ...en.projects.items[0],
        title: 'LHCb-Klassifikator für den Zerfall τ → μμμ',
        badge: 'In Arbeit',
        summary:
          'XGBoost-Klassifikator mit SHAP-Erklärungen auf LHCb-Daten aus der Kaggle-Challenge „Flavours of Physics“, ausgelegt darauf, den Übereinstimmungstest zwischen echten und simulierten Daten sowie den Massenkorrelationstest der Challenge zu bestehen.',
      },
      {
        ...en.projects.items[1],
        title: 'FUTOLOGY: Web-App für Fußballanalysen',
        summary:
          'Live-Ergebnisse, OTP-Login und ein Tippspiel mit Ranglisten; über 530 Commits und eine Live-Demo. Als Nächstes: ein Machine-Learning-Service mit FastAPI.',
      },
      {
        ...en.projects.items[2],
        title: 'Auto-Valuator: Preisprognose für Gebrauchtwagen',
        summary: 'Fünf Regressionsmodelle im Vergleich, anhand von Alter, Laufleistung, Marke und Zustand; bestes R² über 0,85.',
      },
      {
        ...en.projects.items[3],
        title: 'RPSLS: Echtzeit-Multiplayer-Spiel',
        summary: 'Online-Räume, Offline-Modus, als PWA installierbar.',
      },
      {
        ...en.projects.items[4],
        title: 'LLM-Experimente',
        summary:
          'Ein Agent auf Llama 4 über die Groq-API, der Tool-Nutzung erkundet; Vier gewinnt gegen NVIDIA Nemotron, wobei jeder Zug des Modells gegen die Regeln geprüft wird.',
      },
    ],
  },
  experience: {
    title: 'Erfahrung',
    items: [
      {
        ...en.experience.items[0],
        location: 'Bhavnagar, Indien',
        text: 'Analyse von Verkaufsaktionen (+8 % Umsatz in schwachen Gebieten, +17 % in Zielsegmenten), saisonale und regionale Nachfragemodelle, prüfungsfähige Datensätze für die Jahreshauptversammlung und ein statistisches Echtzeit-Dashboard für das Business-Team. Aufbau des Onlineshops prmherbovilla.com auf Shopify mit eigenem JavaScript und CSS.',
      },
      {
        ...en.experience.items[1],
        role: 'Full-Stack-Entwickler (Praktikum)',
        text: 'Alleinige Entwicklung eines Immobilienverwaltungssystems (PHP, MySQL, JavaScript).',
      },
      {
        ...en.experience.items[2],
        role: 'Flutter-Entwickler (Praktikum)',
        text: 'Plattformübergreifende News-App in Flutter und Dart.',
      },
    ],
    quotesTitle: 'Aus Empfehlungsschreiben (Originalzitate)',
    quotes: [
      { quote: quotes.hr, name: 'Sagar Makwana', role: 'Personalleitung, PRM & Company' },
      { quote: quotes.hod, name: 'Prof. Prashant J. Viradiya', role: 'Leitung des Fachbereichs Computer Engineering, GMIT' },
      { quote: quotes.professor, name: 'Prof. Ritesh D. Chimnani', role: 'Assistant Professor, Computer Engineering, GMIT' },
    ],
  },
  education: {
    title: 'Ausbildung',
    items: [
      { id: 'tu-dortmund', period: 'seit 10/2026', degree: 'M.Sc. Data Science', school: 'TU Dortmund (voraussichtlich bis 09/2028)' },
      {
        id: 'gtu',
        period: '2021 – 2025',
        degree: 'B.E. Computer Engineering',
        school: 'GMIT, Abschluss der Gujarat Technological University',
        note: 'CGPA 7,73/10, obere 15 % des Jahrgangs.',
      },
    ],
  },
  skills: {
    title: 'Kenntnisse',
    rows: [
      'Python (pandas, NumPy, scikit-learn, XGBoost), SQL, R, Statistik',
      'TypeScript, React, Next.js, Node.js',
      'Git',
    ],
  },
  contact: { title: 'Kontakt', email: 'E-Mail', location: 'Wohnort', locationValue: 'Dortmund, Deutschland' },
  nav: { now: 'Aktuell', projects: 'Projekte', experience: 'Erfahrung', education: 'Ausbildung', contact: 'Kontakt' },
  ui: {
    skipLink: 'Zum Inhalt springen',
    menuOpen: 'Menü',
    menuClose: 'Schließen',
    toLight: 'Zum hellen Modus wechseln',
    toDark: 'Zum dunklen Modus wechseln',
    language: 'Sprache',
    source: 'Quellcode',
  },
}

export const content: Record<Lang, Content> = { en, de }
