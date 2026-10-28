/**
 * Interface text (labels, buttons, section titles) in English and German.
 * CV content lives in data.ts (English) and data.de.ts (German).
 */

export type Lang = 'en' | 'de'

const uiEn = {
  skipLink: 'Skip to content',
  nav: {
    openTo: 'Open to',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    contact: 'Contact',
  },
  menu: { open: 'Menu', close: 'Close' },
  theme: { toLight: 'Switch to light mode', toDark: 'Switch to dark mode' },
  language: { label: 'Language', names: { en: 'English', de: 'Deutsch' } },
  hero: {
    availableFrom: (from: string) => `Available from ${from}`,
    email: 'Email me',
    cv: 'CV (PDF)',
  },
  openTo: {
    title: 'Open to',
    note: (from: string) => `From ${from}, alongside my M.Sc.`,
  },
  experience: {
    title: 'Experience',
    references: 'What people I’ve worked with say',
  },
  education: { title: 'Education & skills' },
  projects: {
    title: 'Projects',
    note: 'Data and ML work first, then the software I’ve shipped around it.',
    more: 'More projects',
    live: 'Live',
    liveSr: (title: string) => ` site for ${title}`,
    code: 'Code',
    codeSr: (title: string) => ` for ${title}`,
  },
  elsewhere: {
    title: 'Elsewhere',
    note: 'Learning in public, writing, and things I build for fun.',
    learning: 'Learning in public',
    learningBody:
      'Around 40 public repositories, including study notes and notebooks I keep while working through the fundamentals:',
    writing: 'Writing & video',
    // Split around the Medium and YouTube links.
    writingBody: [
      'I write about machine learning, data science and software engineering on ',
      ' and publish technical videos on ',
      '. Outside of work I tinker with ESP32 and Raspberry Pi, and run quantised open-weight LLMs locally.',
    ],
    graphLabel: 'GitHub contribution graph, opens GitHub profile',
    graphAlt: 'Krish Soni’s GitHub contributions over the past year',
    outside: 'Outside work',
    outsideBody: 'Football, coffee, indie games and classic literature, each with a small project attached.',
  },
  contact: {
    title: 'Contact',
    pitch: (from: string) =>
      `Hiring a Werkstudent, intern or HiWi from ${from}? Email is the quickest way to reach me.`,
    email: 'Email',
    cv: 'CV',
    cvValue: 'Download PDF',
    location: 'Location',
  },
  footer: { updated: (date: string) => `Updated ${date}`, source: 'Source' },
}

export type UI = typeof uiEn

const uiDe: UI = {
  skipLink: 'Zum Inhalt springen',
  nav: {
    openTo: 'Offen für',
    experience: 'Erfahrung',
    education: 'Ausbildung',
    projects: 'Projekte',
    contact: 'Kontakt',
  },
  menu: { open: 'Menü', close: 'Schließen' },
  theme: { toLight: 'Zum hellen Modus wechseln', toDark: 'Zum dunklen Modus wechseln' },
  language: { label: 'Sprache', names: { en: 'English', de: 'Deutsch' } },
  hero: {
    availableFrom: (from: string) => `Verfügbar ab ${from}`,
    email: 'E-Mail schreiben',
    cv: 'Lebenslauf (PDF, Englisch)',
  },
  openTo: {
    title: 'Offen für',
    note: (from: string) => `Ab ${from}, neben meinem Masterstudium.`,
  },
  experience: {
    title: 'Erfahrung',
    references: 'Aus Empfehlungsschreiben (Originalzitate)',
  },
  education: { title: 'Ausbildung & Kenntnisse' },
  projects: {
    title: 'Projekte',
    note: 'Zuerst Daten- und ML-Projekte, danach die Software, die ich drumherum gebaut habe.',
    more: 'Weitere Projekte',
    live: 'Live',
    liveSr: (title: string) => `-Version von ${title}`,
    code: 'Code',
    codeSr: (title: string) => ` von ${title}`,
  },
  elsewhere: {
    title: 'Darüber hinaus',
    note: 'Offenes Lernen, Texte und Projekte aus Spaß an der Sache.',
    learning: 'Offen gelernt',
    learningBody:
      'Rund 40 öffentliche Repositories, darunter Lernnotizen und Notebooks, die ich beim Durcharbeiten der Grundlagen führe:',
    writing: 'Texte & Videos',
    writingBody: [
      'Ich schreibe auf ',
      ' über Machine Learning, Data Science und Software Engineering und veröffentliche technische Videos auf ',
      '. Privat experimentiere ich mit ESP32 und Raspberry Pi und betreibe quantisierte Open-Weight-LLMs lokal.',
    ],
    graphLabel: 'GitHub-Beitragsgrafik, öffnet das GitHub-Profil',
    graphAlt: 'Krish Sonis GitHub-Beiträge im letzten Jahr',
    outside: 'Abseits der Arbeit',
    outsideBody: 'Fußball, Kaffee, Indie-Games und klassische Literatur, jeweils mit einem kleinen Projekt dazu.',
  },
  contact: {
    title: 'Kontakt',
    pitch: (from: string) =>
      `Sie suchen ab ${from} einen Werkstudenten, Praktikanten oder eine HiWi-Kraft? Am schnellsten erreichen Sie mich per E-Mail.`,
    email: 'E-Mail',
    cv: 'Lebenslauf',
    cvValue: 'PDF herunterladen (Englisch)',
    location: 'Wohnort',
  },
  footer: { updated: (date: string) => `Stand: ${date}`, source: 'Quellcode' },
}

export const ui: Record<Lang, UI> = { en: uiEn, de: uiDe }
