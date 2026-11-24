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
  email: 'sonikrish2248@gmail.com',
  /** public/cv/Krish_Soni_CV.pdf: replace that file to update the CV, keeping the name. */
  cv: '/cv/Krish_Soni_CV.pdf',
  github: 'https://github.com/krish2248',
  linkedin: 'https://www.linkedin.com/in/krish-soni-460932228/',
  medium: 'https://medium.com/@krish2248',
  youtube: 'https://www.youtube.com/@krishsoni1',
  source: 'https://github.com/krish2248/portfolio-ml',
  /**
   * true builds /impressum and /datenschutz, links them in the footer and adds them to the sitemap.
   * Fill in src/legal.ts first: the build stops if a placeholder is left.
   */
  legalPublished: false,
}

/** Quotes from the recommendation letters, always in the original English. */
export const quotes = {
  hr: 'Through his efforts, the company achieved notable improvements, including an 8% sales increase in previously underperforming areas and a 17% overall growth in targeted product segments.',
  hod: 'One of the most dependable and inventive students in his cohort, eager to apply concepts beyond the textbook.',
  professor:
    'A curious, disciplined, and methodical learner. He was always receptive to feedback, improving his code structure and documentation after every review.',
}

/** 404 page. */
export const notFound = {
  en: { title: 'Page not found', text: 'There is nothing at this address.', link: 'Go to the start page' },
  de: { text: 'Unter dieser Adresse gibt es nichts.', link: 'Zur Startseite' },
}

// ─── Shape ───────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  badge?: string
  summary: string
  stack?: string[]
  url?: string
  /** Live demo. */
  live?: string
  motif: CoverMotif
}

export interface SmallProject {
  id: string
  title: string
  summary: string
  url?: string
  live?: string
  motif: CoverMotif
}

export interface Content {
  meta: { title: string; description: string; imageAlt: string }
  hero: { tagline: string; statement: string; buttons: { cv: string; email: string } }
  now: { title: string; updated: string; items: string[] }
  projects: {
    title: string
    code: string
    live: string
    items: Project[]
    more: { title: string; less: string; live: string; items: SmallProject[] }
    graph: { title: string; label: string; alt: string }
  }
  experience: {
    title: string
    items: { id: string; period: string; role: string; company: string; location: string; text: string }[]
    quotesTitle: string
    quotes: { quote: string; name: string; role: string }[]
  }
  education: {
    title: string
    items: {
      id: string
      period: string
      degree: string
      school: string
      notes: string[]
    }[]
    skillsTitle: string
    skills: { group: string; text: string }[]
  }
  bored: {
    title: string
    youtube: { title: string; text: string }
    blogs: { title: string; items: { title: string; type: string; url: string }[] }
  }
  contact: {
    title: string
    pitch: string
    email: string
    cv: string
    cvValue: string
    location: string
    locationValue: string
  }
  nav: { projects: string; experience: string; education: string; contact: string }
  ui: {
    skipLink: string
    mainNav: string
    menuOpen: string
    menuClose: string
    toLight: string
    toDark: string
    language: string
    source: string
    impressum: string
    privacy: string
  }
}

// ─── English ─────────────────────────────────────────────────────────────────

const en: Content = {
  meta: {
    title: 'Krish Soni · Data Scientist · M.Sc. Data Science, TU Dortmund',
    description:
      'Data scientist with 17 months in pharma sales analytics and M.Sc. Data Science student at TU Dortmund. Python, statistics, machine learning; now working with particle-physics data. Open to work, internship and research opportunities.',
    imageAlt: 'Krish Soni, Data Scientist, M.Sc. Data Science at TU Dortmund. sonikrish.com',
  },
  hero: {
    tagline: 'Data scientist · M.Sc. Data Science student at TU Dortmund',
    statement:
      'I build models and dashboards teams actually use (17 months in pharma analytics). Off the clock, every curiosity turns into a full research project: surveyed, sorted, charted.',
    buttons: { cv: 'Download CV', email: 'Email' },
  },
  now: {
    title: 'Now',
    updated: 'Updated November 2026',
    items: [
      'Building an LHCb τ → μμμ decay classifier (XGBoost + SHAP), in progress',
      'Contributing to Scikit-HEP (uproot, hist), in progress',
      'Studying M.Sc. Data Science at TU Dortmund, semester 1',
      'Open to work, internship and research opportunities',
    ],
  },
  projects: {
    title: 'Projects',
    code: 'Code',
    live: 'Live demo',
    items: [
      {
        id: 'lhcb-tau-3mu',
        title: 'LHCb τ → μμμ decay classifier',
        badge: 'In progress',
        summary:
          'XGBoost classifier with SHAP explanations on LHCb data from Kaggle’s “Flavours of Physics” challenge, designed to pass the challenge’s real-vs-simulated agreement test and mass-correlation test.',
        stack: ['Python', 'XGBoost', 'SHAP'],
        url: 'https://github.com/krish2248/lhcb-tau-3mu',
        motif: 'tracks',
      },
      {
        id: 'scikit-hep',
        title: 'Scikit-HEP contributions',
        badge: 'In progress',
        summary: 'Documentation, tests and examples for the Python tools used in particle-physics analysis.',
        stack: ['Python', 'uproot', 'hist'],
        url: 'https://github.com/krish2248/scikit-hep-contributions',
        motif: 'histogram',
      },
      {
        id: 'futology',
        title: 'FUTOLOGY: football analytics web app',
        summary:
          'Live scores, OTP login and a prediction game with leaderboards; 530+ commits and a live demo. Next: a FastAPI machine-learning service.',
        stack: ['Next.js', 'TypeScript', 'Supabase'],
        url: 'https://github.com/krish2248/futology',
        live: 'https://krish2248.github.io/futology/',
        motif: 'pitch',
      },
      {
        id: 'medxai',
        title: 'MedXAI',
        summary:
          'Multi-modal medical explainable-AI system for research and teaching, with interpretability output for its predictions.',
        stack: ['Python', 'Explainable AI'],
        url: 'https://github.com/krish2248/medxai',
        motif: 'pulse',
      },
    ],
    more: {
      title: 'More projects',
      less: 'Show fewer projects',
      live: 'Live',
      items: [
        {
          id: 'rpsls',
          title: 'RPSLS: real-time multiplayer game',
          summary: 'Online rooms, offline mode, installable as a PWA. React, Redux Toolkit, TypeScript, Node.js, Socket.IO.',
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
        {
          id: 'auto-valuator',
          title: 'Auto-Valuator: used-car price prediction',
          summary:
            'Five regression models compared on age, mileage, make and condition; best R² above 0.85. Python, scikit-learn, XGBoost.',
          url: 'https://github.com/krish2248/Auto-Valuator',
          motif: 'scatter',
        },
        {
          id: 'prm-herbovilla',
          title: 'PRM Herbovilla',
          summary:
            'Online shop for PRM & Company on Shopify with custom JavaScript and CSS: six product categories, UPI, card and cash-on-delivery payments, and a real-time dashboard.',
          url: 'https://github.com/krish2248/PRM-SHOPIFY',
          live: 'https://prmherbovilla.com',
          motif: 'bars',
        },
        {
          id: 'rems',
          title: 'Real Estate Management System',
          summary:
            'Built solo at IT Hub in PHP, MySQL and JavaScript: role-based access, multi-criteria search, lead management, Razorpay and PayPal payments.',
          url: 'https://github.com/krish2248/REMS',
          motif: 'listings',
        },
        {
          id: 'breast-cancer',
          title: 'Breast Cancer Diagnosis Predictor',
          summary:
            'Classification model for breast-cancer diagnosis in Python and scikit-learn.',
          motif: 'scatter',
        },
        {
          id: 'virtual-classroom',
          title: 'Virtual Classroom',
          summary:
            'Live classes through the Zoom API plus assignment submission, built under faculty supervision at GMIT.',
          url: 'https://github.com/krish2248/Virtual-Classroom-Using-Zoom-API',
          motif: 'classroom',
        },
        {
          id: 'ampere',
          title: 'Ampere',
          summary:
            'Offline battery, charging and thermal diagnostics for Android, in Kotlin and Jetpack Compose.',
          url: 'https://github.com/krish2248/ampere',
          motif: 'battery',
        },
        {
          id: '2048-dark',
          title: '2048 Dark',
          summary:
            'Single-file web game with undo, hints and 13 achievements, plus a native Android version in Kotlin.',
          url: 'https://github.com/krish2248/2048-Dark',
          live: 'https://krish2248.github.io/2048-Dark/',
          motif: 'tiles',
        },
        {
          id: 'coffee-journal',
          title: 'Coffee Journal',
          summary:
            '60+ specialty coffees from 25+ Indian roasters, with flavour radar charts and nine brewing guides. Astro, React, Three.js.',
          url: 'https://github.com/krish2248/Coffee-Journal',
          live: 'https://krish2248.github.io/Coffee-Journal/',
          motif: 'cup',
        },
        {
          id: 'vellum-codex',
          title: 'Vellum Codex',
          summary:
            'Archive of my 74 books, with a statistics dashboard, genre filters, search and reading status.',
          url: 'https://github.com/krish2248/Vellum-Codex',
          live: 'https://krish2248.github.io/Vellum-Codex/',
          motif: 'books',
        },
        {
          id: 'text-adventure',
          title: 'Text Adventure',
          summary:
            'Nine branching stories, including The Count of Monte Cristo.',
          url: 'https://github.com/krish2248/Text-Adventure-Game',
          live: 'https://krish2248.github.io/Text-Adventure-Game/',
          motif: 'branches',
        },
        {
          id: 'fut-score',
          title: 'Fut-Score',
          summary:
            'Personalised football scores hub.',
          url: 'https://github.com/krish2248/Fut-Score',
          live: 'https://futology.vercel.app',
          motif: 'scores',
        },
      ],
    },
    graph: {
      title: 'On GitHub',
      label: 'GitHub contribution graph, opens GitHub profile',
      alt: 'Krish Soni’s GitHub contributions over the past year',
    },
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
      { quote: quotes.professor, name: 'Prof. Ritesh D. Chimnani', role: 'Professor of Software Engineering, Department of Computer Engineering, GMIT' },
    ],
  },
  education: {
    title: 'Education & skills',
    items: [
      {
        id: 'tu-dortmund',
        period: 'since 10/2026',
        degree: 'M.Sc. Data Science',
        school: 'TU Dortmund University (expected 09/2028)',
        notes: [],
      },
      {
        id: 'gtu',
        period: '2021 – 2025',
        degree: 'B.E. Computer Engineering',
        school: 'GMIT, degree by Gujarat Technological University',
        notes: [
          'CGPA 7.73/10 (about 2.1 on the German scale), top 15% of the cohort, top 5% of the class in Software Engineering.',
        ],
      },
    ],
    skillsTitle: 'Skills',
    skills: [
      { group: 'Data and statistics', text: 'Python (pandas, NumPy, scikit-learn, XGBoost, Matplotlib, Seaborn), SQL, R' },
      { group: 'Software and web', text: 'TypeScript, JavaScript, React, Next.js, Node.js, PHP, MySQL, PostgreSQL/Supabase, REST APIs, Socket.IO' },
      { group: 'Tools', text: 'Git and GitHub, Excel' },
      { group: 'Learning now', text: 'Scikit-HEP tools for particle physics (uproot, hist)' },
      { group: 'Basic knowledge', text: 'TensorFlow' },
      { group: 'Languages', text: 'English C1 · German A1 · Hindi and Gujarati (native)' },
    ],
  },
  bored: {
    title: 'What I do when I’m\u00a0bored',
    youtube: { title: 'YouTube channel', text: 'My channel, @krishsoni1.' },
    blogs: {
      title: 'Medium blogs',
      // Demo links for now: all three open the Medium profile. Replace each url when the post is published.
      items: [
        { title: 'Journaling guide', type: 'Journaling', url: site.medium },
        { title: 'Coffee guide', type: 'Coffee', url: site.medium },
        { title: 'Meatless, not macro-less: nutrition-maxing as a vegetarian', type: 'Nutrition', url: site.medium },
      ],
    },
  },
  contact: {
    title: 'Contact',
    pitch: 'Email is the quickest way to reach me.',
    email: 'Email',
    cv: 'CV',
    cvValue: 'Download PDF',
    location: 'Location',
    locationValue: 'Dortmund, Germany',
  },
  nav: { projects: 'Projects', experience: 'Experience', education: 'Education', contact: 'Contact' },
  ui: {
    skipLink: 'Skip to content',
    mainNav: 'Main',
    menuOpen: 'Menu',
    menuClose: 'Close',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    language: 'Language',
    source: 'Source',
    impressum: 'Impressum',
    privacy: 'Privacy (German)',
  },
}

// ─── German ──────────────────────────────────────────────────────────────────

const de: Content = {
  meta: {
    title: 'Krish Soni · Data Scientist · M.Sc. Data Science, TU Dortmund',
    description:
      'Data Scientist mit 17 Monaten Erfahrung in der Pharma-Vertriebsanalyse und Masterstudent Data Science an der TU Dortmund. Python, Statistik, Machine Learning; aktuell mit Daten aus der Teilchenphysik. Offen für Jobs, Praktika und Forschung.',
    imageAlt: 'Krish Soni, Data Scientist, M.Sc. Data Science an der TU Dortmund. sonikrish.com',
  },
  hero: {
    tagline: 'Data Scientist · Masterstudent Data Science an der TU Dortmund',
    statement:
      'Ich baue Modelle und Dashboards, die Teams wirklich nutzen (17 Monate Pharma-Analytics). Nach Feierabend wird aus jeder Neugier ein ganzes Forschungsprojekt: erhoben, sortiert, visualisiert.',
    buttons: { cv: 'Lebenslauf herunterladen (Englisch)', email: 'E-Mail' },
  },
  now: {
    title: 'Aktuell',
    updated: 'Stand: November 2026',
    items: [
      'Entwicklung eines LHCb-Klassifikators für den Zerfall τ → μμμ (XGBoost + SHAP), in Arbeit',
      'Beiträge zu Scikit-HEP (uproot, hist), in Arbeit',
      'M.Sc. Data Science an der TU Dortmund, 1. Semester',
      'Offen für Jobs, Praktika und Forschung',
    ],
  },
  projects: {
    title: 'Projekte',
    code: 'Code',
    live: 'Live-Demo',
    items: [
      {
        ...en.projects.items[0],
        title: 'LHCb-Klassifikator für den Zerfall τ → μμμ',
        badge: 'In Arbeit',
        summary:
          'XGBoost-Klassifikator mit SHAP-Erklärungen auf LHCb-Daten aus der Kaggle-Challenge „Flavours of Physics“, ausgelegt darauf, den Übereinstimmungstest zwischen echten und simulierten Daten sowie den Massenkorrelationstest der Challenge zu bestehen.',
      },
      {
        ...en.projects.items[1],
        title: 'Beiträge zu Scikit-HEP',
        badge: 'In Arbeit',
        summary: 'Dokumentation, Tests und Beispiele für die Python-Werkzeuge, mit denen in der Teilchenphysik Daten ausgewertet werden.',
      },
      {
        ...en.projects.items[2],
        title: 'FUTOLOGY: Web-App für Fußballanalysen',
        summary:
          'Live-Ergebnisse, OTP-Login und ein Tippspiel mit Ranglisten; über 530 Commits und eine Live-Demo. Als Nächstes: ein Machine-Learning-Service mit FastAPI.',
      },
      {
        ...en.projects.items[3],
        summary:
          'Multimodales, erklärbares KI-System für die Medizin, für Forschung und Lehre, mit Interpretierbarkeits-Ausgaben zu den Vorhersagen.',
      },
    ],
    more: {
      title: 'Weitere Projekte',
      less: 'Weniger Projekte anzeigen',
      live: 'Live',
      items: [
        {
          ...en.projects.more.items[0],
          title: 'RPSLS: Echtzeit-Multiplayer-Spiel',
          summary: 'Online-Räume, Offline-Modus, als PWA installierbar. React, Redux Toolkit, TypeScript, Node.js, Socket.IO.',
        },
        {
          ...en.projects.more.items[1],
          title: 'LLM-Experimente',
          summary:
            'Ein Agent auf Llama 4 über die Groq-API, der Tool-Nutzung erkundet; Vier gewinnt gegen NVIDIA Nemotron, wobei jeder Zug des Modells gegen die Regeln geprüft wird.',
        },
        {
          ...en.projects.more.items[2],
          title: 'Auto-Valuator: Preisprognose für Gebrauchtwagen',
          summary:
            'Fünf Regressionsmodelle im Vergleich, anhand von Alter, Laufleistung, Marke und Zustand; bestes R² über 0,85. Python, scikit-learn, XGBoost.',
        },
        {
          ...en.projects.more.items[3],
          summary:
            'Onlineshop für PRM & Company auf Shopify mit eigenem JavaScript und CSS: sechs Produktkategorien, Zahlung per UPI, Karte und Nachnahme sowie ein Echtzeit-Dashboard.',
        },
        {
          ...en.projects.more.items[4],
          title: 'Immobilienverwaltungssystem',
          summary:
            'Allein bei IT Hub entwickelt, mit PHP, MySQL und JavaScript: Rollen und Rechte, Suche mit Mehrfachfiltern, Lead-Management, Zahlungen über Razorpay und PayPal.',
        },
        {
          ...en.projects.more.items[5],
          title: 'Brustkrebs-Diagnosemodell',
          summary:
            'Klassifikationsmodell für die Brustkrebsdiagnose mit Python und scikit-learn.',
        },
        {
          ...en.projects.more.items[6],
          summary:
            'Live-Unterricht über die Zoom-API plus Abgabe von Aufgaben, entwickelt unter Betreuung von Lehrenden am GMIT.',
        },
        {
          ...en.projects.more.items[7],
          summary:
            'Offline-Diagnose für Akku, Ladevorgang und Temperatur unter Android, mit Kotlin und Jetpack Compose.',
        },
        {
          ...en.projects.more.items[8],
          summary:
            'Webspiel in einer einzigen Datei mit Rückgängig, Tipps und 13 Erfolgen, dazu eine native Android-Version in Kotlin.',
        },
        {
          ...en.projects.more.items[9],
          summary:
            'Über 60 Specialty Coffees von mehr als 25 indischen Röstereien, mit Aroma-Radardiagrammen und neun Zubereitungsanleitungen. Astro, React, Three.js.',
        },
        {
          ...en.projects.more.items[10],
          summary:
            'Archiv meiner 74 Bücher mit Statistik-Dashboard, Genrefiltern, Suche und Lesestatus.',
        },
        {
          ...en.projects.more.items[11],
          summary:
            'Neun verzweigte Geschichten, darunter „Der Graf von Monte Christo“.',
        },
        {
          ...en.projects.more.items[12],
          summary:
            'Personalisierte Übersicht für Fußballergebnisse.',
        },
      ],
    },
    graph: {
      title: 'Auf GitHub',
      label: 'GitHub-Beitragsgrafik, öffnet das GitHub-Profil',
      alt: 'Krish Sonis GitHub-Beiträge im letzten Jahr',
    },
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
      { quote: quotes.professor, name: 'Prof. Ritesh D. Chimnani', role: 'Professor für Software Engineering, Fachbereich Computer Engineering, GMIT' },
    ],
  },
  education: {
    title: 'Ausbildung & Kenntnisse',
    items: [
      {
        id: 'tu-dortmund',
        period: 'seit 10/2026',
        degree: 'M.Sc. Data Science',
        school: 'TU Dortmund (voraussichtlich bis 09/2028)',
        notes: [],
      },
      {
        id: 'gtu',
        period: '2021 – 2025',
        degree: 'B.E. Computer Engineering',
        school: 'GMIT, Abschluss der Gujarat Technological University',
        notes: [
          'CGPA 7,73/10 (entspricht ca. der Note 2,1), obere 15 % des Jahrgangs, obere 5 % des Kurses in Software Engineering.',
        ],
      },
    ],
    skillsTitle: 'Kenntnisse',
    skills: [
      { group: 'Daten und Statistik', text: 'Python (pandas, NumPy, scikit-learn, XGBoost, Matplotlib, Seaborn), SQL, R' },
      { group: 'Software und Web', text: 'TypeScript, JavaScript, React, Next.js, Node.js, PHP, MySQL, PostgreSQL/Supabase, REST-APIs, Socket.IO' },
      { group: 'Werkzeuge', text: 'Git und GitHub, Excel' },
      { group: 'Lerne gerade', text: 'Scikit-HEP-Werkzeuge für die Teilchenphysik (uproot, hist)' },
      { group: 'Grundkenntnisse', text: 'TensorFlow' },
      { group: 'Sprachen', text: 'Englisch C1 · Deutsch A1 · Hindi und Gujarati (Muttersprachen)' },
    ],
  },
  bored: {
    title: 'Was ich mache, wenn mir langweilig ist',
    youtube: { title: 'YouTube-Kanal', text: 'Mein Kanal, @krishsoni1.' },
    blogs: {
      title: 'Medium-Blogs',
      items: [
        { title: 'Journaling-Leitfaden', type: 'Journaling', url: site.medium },
        { title: 'Kaffee-Leitfaden', type: 'Kaffee', url: site.medium },
        { title: 'Fleischlos, nicht makrolos: Nutrition-Maxing als Vegetarier', type: 'Ernährung', url: site.medium },
      ],
    },
  },
  contact: {
    title: 'Kontakt',
    pitch: 'Am schnellsten erreichen Sie mich per E-Mail.',
    email: 'E-Mail',
    cv: 'Lebenslauf',
    cvValue: 'PDF herunterladen (Englisch)',
    location: 'Wohnort',
    locationValue: 'Dortmund, Deutschland',
  },
  nav: { projects: 'Projekte', experience: 'Erfahrung', education: 'Ausbildung', contact: 'Kontakt' },
  ui: {
    skipLink: 'Zum Inhalt springen',
    mainNav: 'Hauptnavigation',
    menuOpen: 'Menü',
    menuClose: 'Schließen',
    toLight: 'Zum hellen Modus wechseln',
    toDark: 'Zum dunklen Modus wechseln',
    language: 'Sprache',
    source: 'Quellcode',
    impressum: 'Impressum',
    privacy: 'Datenschutz',
  },
}

export const content: Record<Lang, Content> = { en, de }
