/**
 * Portfolio content. Everything the site renders lives here.
 */

// ─── Site ────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Krish Soni',
  fullName: 'Krish Hemang Soni',
  role: 'M.Sc. Data Science student, TU Dortmund',
  statement:
    'I turn messy business data into decisions, and build the software that puts those decisions in front of people.',
  intro:
    'Until October 2026 I was the data scientist at PRM & Company, a pharmaceutical company in India, where I ran sales and marketing analytics and built the company’s online shop and KPI dashboard. I’ve now started the M.Sc. in Data Science at TU Dortmund.',
  description:
    'Krish Soni, M.Sc. Data Science student at TU Dortmund. Open to Werkstudent, internship and HiWi / research assistant roles in data science, analytics and ML engineering.',
  email: 'sonikrish2248@gmail.com',
  location: 'Dortmund, Germany',
  // Public CV (no address or date of birth). Set to '' to hide the CV links.
  resumeUrl: '/Krish_Soni_Resume.pdf',
  photoUrl: '/krish-soni.jpg',
  siteUrl: 'https://sonikrish.com/',
  updated: 'October 2026',
}

export const availability = {
  from: 'November 2026',
  roles: ['Werkstudent', 'Internship', 'HiWi / research assistant'],
  terms: 'Dortmund or remote · up to 20 h/week during the semester, full-time in semester breaks',
}

export const socialLinks = {
  github: 'https://github.com/krish2248',
  linkedin: 'https://www.linkedin.com/in/krish-soni-460932228/',
  medium: 'https://medium.com/@krish2248',
  youtube: 'https://www.youtube.com/@krishsoni1',
  email: 'mailto:sonikrish2248@gmail.com',
}

export const navLinks = [
  { name: 'Open to', href: '#open-to' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export const quickFacts = [
  { label: 'Now', value: 'M.Sc. Data Science, TU Dortmund' },
  { label: 'Before', value: 'Data Scientist, PRM & Company' },
  { label: 'Degree', value: 'B.E. Computer Engineering, top 15%' },
  { label: 'Based in', value: 'Dortmund, Germany' },
  { label: 'Languages', value: 'English C1 (IELTS 7.5), German A1, Hindi, Gujarati' },
]

// ─── What I'm looking for ────────────────────────────────────────────────────

export const openTo = [
  {
    title: 'Werkstudent',
    body: 'Data science, analytics or ML engineering in a product or business team: reporting and dashboards, data pipelines, statistical analysis, forecasting, and the internal tools around them.',
  },
  {
    title: 'Internship',
    body: 'A data science or ML engineering internship during the semester breaks, ideally where models actually reach users or decisions rather than staying in a notebook.',
  },
  {
    title: 'HiWi / research assistant',
    body: 'Supporting a chair or research group at TU Dortmund with data preparation, statistical analysis, experiment tooling, visualisation, or web front ends for research software.',
  },
]

// ─── Projects ────────────────────────────────────────────────────────────────

export type CoverMotif =
  | 'pitch'
  | 'pulse'
  | 'scatter'
  | 'bars'
  | 'listings'
  | 'classroom'
  | 'board'
  | 'nodes'
  | 'tiles'
  | 'battery'
  | 'books'
  | 'cup'
  | 'branches'
  | 'scores'

export interface Project {
  id: string
  title: string
  summary: string
  kind: string
  technologies: string[]
  motif: CoverMotif
  liveUrl?: string
  githubUrl?: string
  year: string
}

export const featuredProjects: Project[] = [
  {
    id: 'futology',
    title: 'FUTOLOGY',
    kind: 'Web · Analytics',
    summary:
      'Football analytics web app with live scores, OTP login and a prediction game with leaderboards; 530+ commits across two iterations. Next milestone: a FastAPI ML service with an XGBoost match predictor, k-means player clustering and SHAP-based transfer valuation.',
    technologies: ['Next.js', 'TypeScript', 'Supabase'],
    motif: 'pitch',
    liveUrl: 'https://krish2248.github.io/futology/',
    githubUrl: 'https://github.com/krish2248/futology',
    year: '2026',
  },
  {
    id: 'prm-commerce',
    title: 'PRM Herbovilla',
    kind: 'Work · Data product',
    summary:
      'Direct-to-consumer shop I designed and built for PRM & Company: catalogue, cart, checkout, payments and order management, with a live dashboard for revenue trends, regional orders and top products.',
    technologies: ['Shopify', 'Liquid', 'Analytics'],
    motif: 'bars',
    liveUrl: 'https://prmherbovilla.com',
    githubUrl: 'https://github.com/krish2248/PRM-SHOPIFY',
    year: '2025',
  },
  {
    id: 'medxai',
    title: 'MedXAI',
    kind: 'ML · Explainable AI',
    summary:
      'Multi-modal medical explainable-AI system with a Wellness Atlas, for research and teaching. Predictions come with interpretability output so they can be examined rather than trusted blindly.',
    technologies: ['Python', 'Explainable AI'],
    motif: 'pulse',
    githubUrl: 'https://github.com/krish2248/medxai',
    year: '2026',
  },
  {
    id: 'auto-valuator',
    title: 'Auto-Valuator',
    kind: 'ML · Regression',
    summary:
      'Predicts the resale value of a used car from age, mileage, make and condition. Five regression models compared; the best reaches R² above 0.85.',
    technologies: ['Python', 'scikit-learn', 'XGBoost'],
    motif: 'scatter',
    githubUrl: 'https://github.com/krish2248/Auto-Valuator',
    year: '2025',
  },
  {
    id: 'rems',
    title: 'Real Estate Management System',
    kind: 'Full stack · Internship',
    summary:
      'Production system I built solo at IT Hub: role-based access for buyers, sellers, agents and admins, multi-criteria search, lead management, payment gateways and document verification.',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    motif: 'listings',
    githubUrl: 'https://github.com/krish2248/REMS',
    year: '2025',
  },
  {
    id: 'connect4-nemotron',
    title: 'Connect 4 vs Nemotron',
    kind: 'LLM · Game',
    summary:
      'Connect 4 against an LLM opponent. The board state is serialised into the prompt and every move the model returns is validated against the legal moves.',
    technologies: ['JavaScript', 'NVIDIA Nemotron'],
    motif: 'board',
    githubUrl: 'https://github.com/krish2248/Connect4-nemotron-ultra-',
    year: '2026',
  },
]

export const moreProjects: Project[] = [
  {
    id: 'ai-agent',
    title: 'AI Agent v14',
    kind: 'LLM',
    summary: 'My first LLM agent: Llama-4 through the Groq API, exploring tool use and multi-step tasks.',
    technologies: ['Python', 'Groq API'],
    motif: 'nodes',
    githubUrl: 'https://github.com/krish2248/AI-Agent-V.14',
    year: '2025',
  },
  {
    id: 'virtual-classroom',
    title: 'Virtual Classroom',
    kind: 'Full stack',
    summary: 'Live classes through the Zoom API plus assignment submission, built under faculty supervision at GMIT.',
    technologies: ['JavaScript', 'PHP', 'Zoom API'],
    motif: 'classroom',
    githubUrl: 'https://github.com/krish2248/Virtual-Classroom-Using-Zoom-API',
    year: '2024',
  },
  {
    id: 'ampere',
    title: 'Ampere',
    kind: 'Android',
    summary: 'Offline battery, charging and thermal diagnostics for Android.',
    technologies: ['Kotlin', 'Jetpack Compose'],
    motif: 'battery',
    githubUrl: 'https://github.com/krish2248/ampere',
    year: '2026',
  },
  {
    id: '2048-dark',
    title: '2048 Dark',
    kind: 'Web · Android',
    summary: 'Shipped twice: a zero-dependency single-file web game with undo, hints and 13 achievements, and a native Android build.',
    technologies: ['JavaScript', 'Kotlin'],
    motif: 'tiles',
    liveUrl: 'https://krish2248.github.io/2048-Dark/',
    githubUrl: 'https://github.com/krish2248/2048-Dark',
    year: '2026',
  },
  {
    id: 'rpsls',
    title: 'Rock-Paper-Scissors-Lizard-Spock',
    kind: 'Real-time web',
    summary: 'Online multiplayer game with a separate Socket.IO game server, an offline mode, and installable as a PWA.',
    technologies: ['React', 'Redux Toolkit', 'Socket.IO'],
    motif: 'nodes',
    githubUrl: 'https://github.com/krish2248/Rock-Paper-Scissors-Lizard-Spock',
    year: '2025',
  },
]

/** Small things built around what I like. Shown with covers in "Outside work". */
export const personalProjects: Project[] = [
  {
    id: 'fut-score',
    title: 'Fut-Score',
    kind: 'football',
    summary: 'Personalised football scores hub.',
    technologies: ['TypeScript'],
    motif: 'scores',
    liveUrl: 'https://futology.vercel.app',
    githubUrl: 'https://github.com/krish2248/Fut-Score',
    year: '2026',
  },
  {
    id: 'coffee-journal',
    title: 'Coffee Journal',
    kind: 'coffee',
    summary: '60+ specialty coffees from 25+ Indian roasters, with flavour radar charts and nine brewing guides.',
    technologies: ['Astro', 'React', 'Three.js'],
    motif: 'cup',
    liveUrl: 'https://krish2248.github.io/Coffee-Journal/',
    githubUrl: 'https://github.com/krish2248/Coffee-Journal',
    year: '2026',
  },
  {
    id: 'text-adventure',
    title: 'Text Adventure',
    kind: 'indie games',
    summary: 'Nine branching stories, including The Count of Monte Cristo.',
    technologies: ['JavaScript'],
    motif: 'branches',
    liveUrl: 'https://krish2248.github.io/Text-Adventure-Game/',
    githubUrl: 'https://github.com/krish2248/Text-Adventure-Game',
    year: '2025',
  },
  {
    id: 'vellum-codex',
    title: 'Vellum Codex',
    kind: 'literature',
    summary: 'Archive of my 74 books, with a statistics dashboard, genre filters, search and reading status.',
    technologies: ['JavaScript'],
    motif: 'books',
    liveUrl: 'https://krish2248.github.io/Vellum-Codex/',
    githubUrl: 'https://github.com/krish2248/Vellum-Codex',
    year: '2025',
  },
]

// ─── Experience ──────────────────────────────────────────────────────────────

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  type: string
  points: string[]
  stack?: string
}

export const experiences: Experience[] = [
  {
    id: 'prm',
    title: 'Data Scientist',
    company: 'PRM & Company (PRM Pharmaceuticals)',
    location: 'Bhavnagar, India',
    period: 'Jun 2025 – Oct 2026',
    type: 'Full-time',
    points: [
      'Analysed and visualised data across the commercial pipeline (sales, online orders, customer reviews and purchase orders) in Python, producing the charts and statistics behind sales and marketing decisions.',
      'Evaluated promotional schemes and isolated underperforming regions and products. The findings changed distribution strategy: 8% sales recovery in those regions and 17% growth in the targeted product segments.',
      'Modelled demand by season and geography to decide which products to push where and when; the same analysis targeted the social-media ad campaigns.',
      'Consolidated inconsistent multi-source sales and operations data into audit-ready datasets for Annual General Meeting reporting, and built Excel reporting for management, such as a dispatch analysis of 1,427 shipments.',
      'Designed and built prmherbovilla.com, the company’s direct-to-consumer shop, with a live KPI dashboard for the business team.',
    ],
    stack: 'Python, pandas, Matplotlib, Seaborn, Excel, statistical analysis, Shopify',
  },
  {
    id: 'ithub',
    title: 'Full-Stack Developer Intern',
    company: 'IT Hub Software Solutions',
    location: 'Bhavnagar, India',
    period: 'Jan 2025 – Apr 2025',
    type: 'Internship',
    points: [
      'Sole developer of a production Real Estate Management System, delivered against a 12-week milestone plan.',
      'Designed the relational schema from ER models and sped up property search over large datasets with indexing, query optimisation and caching.',
      'Built role-based access control and Razorpay / PayPal integration, and ran unit, integration, load and security testing.',
    ],
    stack: 'PHP, MySQL, JavaScript, Apache',
  },
  {
    id: 'infolabz',
    title: 'Flutter Developer Intern',
    company: 'InfoLabz IT Services',
    location: 'Ahmedabad, India',
    period: 'Jun 2024 – Jul 2024',
    type: 'Internship',
    points: [
      'Built a cross-platform news app on the Inshorts News API with Material UI, list and grid builders, and JSON parsing.',
    ],
    stack: 'Flutter, Dart, REST APIs',
  },
  {
    id: 'ssip-hackathon',
    title: 'SSIP 24-hour Hackathon',
    company: 'GEC Bhavnagar',
    location: 'Bhavnagar, India',
    period: 'Jul 2022',
    type: 'Hackathon',
    points: [
      'Built a Student Life Cycle Management System in a team of two: role-based portal for admins, faculty and students with lectures, assignments and notices.',
    ],
    stack: 'PHP, MySQL, JavaScript, AJAX',
  },
]

// ─── Education ───────────────────────────────────────────────────────────────

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  details: string[]
}

export const education: Education[] = [
  {
    id: 'tu-dortmund',
    degree: 'M.Sc. Data Science',
    institution: 'TU Dortmund University, Faculty of Statistics',
    location: 'Dortmund, Germany',
    period: 'Oct 2026 – Sep 2028 (expected)',
    details: [
      'Current modules: Statistical Theory (measure-theoretic probability, decision theory), Advanced R, Data Science in Context.',
    ],
  },
  {
    id: 'gtu',
    degree: 'B.E. Computer Engineering',
    institution: 'Gyanmanjari Institute of Technology, Gujarat Technological University',
    location: 'Bhavnagar, India',
    period: 'Jun 2021 – May 2025',
    details: [
      'CGPA 7.73 / 10, top 15% of the cohort. About German grade 2.1 (modified Bavarian formula) and 240 ECTS.',
      'Relevant courses: Probability and Statistics, Discrete Mathematics, Data Structures, Algorithms, Database Systems, Artificial Intelligence, Big Data Analytics.',
    ],
  },
]

// ─── Skills ──────────────────────────────────────────────────────────────────

export const skills: { group: string; items: string[] }[] = [
  { group: 'Data & ML', items: ['pandas', 'NumPy', 'scikit-learn', 'XGBoost', 'TensorFlow', 'Matplotlib', 'Seaborn', 'Jupyter', 'Excel'] },
  { group: 'Statistics', items: ['Hypothesis testing', 'Regression', 'Clustering', 'Forecasting', 'Sentiment analysis'] },
  { group: 'Languages', items: ['Python', 'SQL', 'R', 'TypeScript', 'JavaScript', 'Java', 'PHP', 'Kotlin', 'Dart'] },
  { group: 'Web & apps', items: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Socket.IO', 'Flutter', 'Jetpack Compose'] },
  { group: 'Data stores', items: ['MySQL', 'PostgreSQL / Supabase', 'ER modelling', 'Indexing & query optimisation'] },
  { group: 'LLM tooling', items: ['Groq API', 'NVIDIA Nemotron', 'Local quantised models'] },
  { group: 'Tools', items: ['Git', 'Shopify (Liquid)', 'LaTeX', 'Apache', 'VS Code'] },
]

// ─── References ──────────────────────────────────────────────────────────────

export const references = [
  {
    quote:
      'Through his efforts, the company achieved notable improvements, including an 8% sales increase in previously underperforming areas and a 17% overall growth in targeted product segments.',
    name: 'Sagar Makwana',
    role: 'Head of HR, PRM & Company',
  },
  {
    quote:
      'One of the most dependable and inventive students in his cohort, eager to apply concepts beyond the textbook.',
    name: 'Prof. Prashant J. Viradiya',
    role: 'Head of Department, Computer Engineering, GMIT',
  },
  {
    quote:
      'A curious, disciplined, and methodical learner. He was always receptive to feedback, improving his code structure and documentation after every review.',
    name: 'Prof. Ritesh D. Chimnani',
    role: 'Assistant Professor, Computer Engineering, GMIT',
  },
]

// ─── Learning in public ──────────────────────────────────────────────────────

export const studyRepos = [
  { name: 'Mathematics for Programming', url: 'https://github.com/krish2248/Mathematics-For-Programming' },
  { name: 'Machine Learning', url: 'https://github.com/krish2248/Machine-Learning-Lecture-Files' },
  { name: 'Deep Learning', url: 'https://github.com/krish2248/Deep-Learning' },
  { name: 'pandas', url: 'https://github.com/krish2248/Pandas' },
  { name: 'NumPy', url: 'https://github.com/krish2248/Numpy' },
  { name: 'Matplotlib', url: 'https://github.com/krish2248/Matplotlib' },
  { name: 'Core Python', url: 'https://github.com/krish2248/Core-Python-Files' },
]

export const footerContent = {
  source: 'https://github.com/krish2248/portfolio-ml',
}
