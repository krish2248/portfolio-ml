/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PORTFOLIO DATA - CUSTOMIZE THIS FILE FOR YOUR OWN PORTFOLIO
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * All personal content is centralized here for easy customization.
 * Update the values below with your own information.
 */

// ═══════════════════════════════════════════════════════════════════════════
// SITE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const siteConfig = {
  name: 'Krish Soni',
  title: 'Aspiring ML Engineer & Full-Stack Developer',
  tagline: 'Building intelligent systems through code, data, and curiosity',
  description:
    'Developer transitioning into Machine Learning, combining full-stack development experience with a passion for data science and intelligent systems.',
  email: 'sonikrish2248@gmail.com',
  location: 'India',
  availability: "Pursuing Master's in ML",
  resumeUrl: '/resume.pdf',
  
  // Meta/SEO
  siteUrl: 'https://sonikrish.com/',
  ogImage: '/og-image.png',
}

// ═══════════════════════════════════════════════════════════════════════════
// SOCIAL LINKS
// ═══════════════════════════════════════════════════════════════════════════

export const socialLinks = {
  github: 'https://github.com/krish2248',
  linkedin: 'https://www.linkedin.com/in/krish-soni-460932228/',
  twitter: 'https://www.instagram.com/notkrish03/',  // Using Instagram instead
  email: 'mailto:sonikrish2248@gmail.com',
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION LINKS
// ═══════════════════════════════════════════════════════════════════════════

export const navLinks = [
  { name: 'home', href: '#home', command: 'cd ~/' },
  { name: 'about', href: '#about', command: 'cat about.txt' },
  { name: 'projects', href: '#projects', command: 'ls projects/' },
  { name: 'skills', href: '#skills', command: 'htop' },
  { name: 'contact', href: '#contact', command: 'mail --send' },
]

// ═══════════════════════════════════════════════════════════════════════════
// ABOUT SECTION CONTENT
// ═══════════════════════════════════════════════════════════════════════════

export const aboutContent = {
  paragraphs: [
    `I'm a developer transitioning into Machine Learning, combining 1-2 years of 
     full-stack development experience with a growing passion for data science 
     and intelligent systems.`,
    `My journey spans from interactive web applications to Python-based ML projects 
     including recommendation systems, predictive models, and diagnostic tools. 
     I believe strong engineering fundamentals are essential for building robust 
     ML systems.`,
    `Currently preparing for my Master's in Machine Learning, where I aim to 
     deepen my expertise in neural networks, computer vision, and NLP while 
     contributing to cutting-edge research.`,
  ],
  
  // ASCII art for the about section (optional)
  asciiArt: `
    ╔═══════════════════════════╗
    ║   ░░░▓▓▓▓▓▓▓░░░          ║
    ║   ░░▓████████▓░░         ║
    ║   ░▓██▀▀██▀▀██▓░         ║
    ║   ░▓██  ██  ██▓░         ║
    ║   ░░▓████████▓░░         ║
    ║   ░░░▓▓▓▓▓▓▓░░░          ║
    ╚═══════════════════════════╝
  `,
  
  // Neofetch-style system info
  systemInfo: {
    os: 'ML Engineer OS v2.0',
    shell: 'Python + Jupyter',
    languages: 'Python, JS, TypeScript, PHP, SQL',
    editor: 'VS Code + Jupyter Lab',
    theme: 'Phosphor Green',
    uptime: '1-2 years coding',
  },
  
  // Quick facts for display
  quickFacts: [
    { label: 'Experience', value: '1-2 Years' },
    { label: 'Projects', value: '30+' },
    { label: 'Focus', value: 'ML/AI' },
    { label: 'Status', value: 'LEARNING' },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// PROJECTS
// ═══════════════════════════════════════════════════════════════════════════

export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  status: 'deployed' | 'in-progress' | 'archived'
  year: string
  challenges?: string
}

export const projects: Project[] = [
  // ═══════════════════════════════════════════════════════════════
  // FEATURED PROJECTS (5) - ML Focus First
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'breast-cancer-predictor',
    title: 'Breast Cancer Diagnosis Predictor',
    shortDescription: 'ML-powered diagnostic tool with Streamlit UI and radar chart visualization',
    fullDescription: `A machine learning-powered tool designed to assist medical professionals in 
      diagnosing breast cancer. Using a set of measurements, the app predicts whether a breast 
      mass is benign or malignant. Features visual representation using radar charts and displays 
      predicted diagnosis with probability scores. Built with Streamlit for an interactive UI.`,
    image: '/images/projects/cancer-predictor.png',
    technologies: ['Python', 'Streamlit', 'Scikit-learn', 'Pandas', 'Plotly'],
    githubUrl: 'https://github.com/krish2248/streamlit-App-Cancer',
    featured: true,
    status: 'deployed',
    year: '2025',
    challenges: `Implemented custom radar chart visualization for multi-dimensional medical data. 
      Balanced model accuracy with interpretability for medical professionals.`,
  },
  {
    id: 'ecommerce-analysis',
    title: 'E-Commerce Customer Analysis',
    shortDescription: 'Linear Regression model predicting customer spending patterns',
    fullDescription: `Exploratory data analysis and predictive modeling project analyzing customer 
      behavior in e-commerce. Built a Linear Regression model to predict yearly customer spending 
      based on features like session length, time on app, and membership duration. Includes 
      comprehensive EDA with pairplots, correlation analysis, and business insights.`,
    image: '/images/projects/ecommerce-analysis.png',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    githubUrl: 'https://github.com/krish2248/Linear-Regression-Project',
    featured: true,
    status: 'deployed',
    year: '2025',
    challenges: `Performed feature engineering to identify key predictors. Interpreted regression 
      coefficients to provide actionable business recommendations.`,
  },
  {
    id: 'ad-click-prediction',
    title: 'Ad Click Prediction Model',
    shortDescription: 'Logistic Regression for predicting advertisement click-through rates',
    fullDescription: `Machine learning project applying Logistic Regression to predict whether 
      users will click on advertisements. Analyzes user behavior metrics including daily time 
      on site, age, area income, and internet usage. Features comprehensive EDA, data 
      preprocessing, and model evaluation with ROC curves and confusion matrices.`,
    image: '/images/projects/ad-prediction.png',
    technologies: ['Python', 'NumPy', 'Seaborn', 'Scikit-learn', 'Matplotlib'],
    githubUrl: 'https://github.com/krish2248/Logistic-Regression-Project',
    featured: true,
    status: 'deployed',
    year: '2025',
    challenges: `Handled categorical feature encoding and feature scaling. Optimized 
      hyperparameters for improved classification accuracy.`,
  },
  {
    id: 'movie-recommendation',
    title: 'Movie Recommendation System',
    shortDescription: 'Content-based and collaborative filtering recommendation engine',
    fullDescription: `A recommendation system that suggests movies based on user preferences 
      and viewing history. Implements both content-based filtering and collaborative filtering 
      approaches. Built with Python and leverages pandas for data manipulation and analysis.`,
    image: '/images/projects/movie-rec.png',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    githubUrl: 'https://github.com/krish2248/Python-Mini-Programs',
    featured: true,
    status: 'deployed',
    year: '2025',
    challenges: `Designed efficient similarity computation for large movie datasets. 
      Balanced between recommendation diversity and relevance.`,
  },
  {
    id: 'virtual-classroom',
    title: 'Virtual Classroom Platform',
    shortDescription: 'Full-featured educational platform with Zoom API integration',
    fullDescription: `A comprehensive virtual classroom system with assignment submission, 
      multi-role support (Admin, Faculty, HOD, Students), and Zoom API integration for 
      live video sessions. Features user authentication, profile management, and a 
      complete educational workflow management system.`,
    image: '/images/projects/virtual-classroom.png',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'Zoom API', 'CSS'],
    githubUrl: 'https://github.com/krish2248/Virtual-Classroom-Using-Zoom-API',
    featured: true,
    status: 'deployed',
    year: '2025',
    challenges: `Integrated Zoom API for seamless video conferencing. Designed role-based 
      access control for different user types with secure authentication.`,
  },

  // ═══════════════════════════════════════════════════════════════
  // OTHER PROJECTS (7) - Engineering Breadth
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'rpsls-game',
    title: 'Rock-Paper-Scissors-Lizard-Spock',
    shortDescription: 'Real-time multiplayer game with Socket.IO and React',
    fullDescription: `A modern implementation of the classic RPSLS game featuring both offline 
      and online multiplayer modes. Built with React, Redux, and TypeScript on the frontend 
      with a Node.js/Socket.IO backend for real-time gameplay. Includes animations, sound 
      effects, and a Klingon-themed loading screen.`,
    image: '/images/projects/rpsls.png',
    technologies: ['React', 'Redux', 'TypeScript', 'Socket.IO', 'Node.js', 'SCSS'],
    githubUrl: 'https://github.com/krish2248/Rock-Paper-Scissors-Lizard-Spock',
    featured: false,
    status: 'deployed',
    year: '2025',
    challenges: `Implemented real-time game state synchronization across clients. 
      Designed responsive UI with smooth animations for gameplay feedback.`,
  },
  {
    id: 'rems',
    title: 'Real Estate Management System',
    shortDescription: 'Property listing and management platform with admin panel',
    fullDescription: `A web-based Real Estate Management System for browsing, listing, and 
      managing properties. Features property search by state, user authentication, 
      property CRUD operations, contact functionality, and a comprehensive admin panel 
      for system management.`,
    image: '/images/projects/rems.png',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'HTML'],
    githubUrl: 'https://github.com/krish2248/REMS',
    featured: false,
    status: 'deployed',
    year: '2025',
  },
  {
    id: 'calculator',
    title: 'Multi-Purpose Calculator',
    shortDescription: '12+ calculators including BMI, EMI, SIP, and more',
    fullDescription: `A versatile web-based calculator application with multiple calculators 
      for various purposes: BMI, EMI, car loan, SIP, FD, fuel cost, and more. Features 
      a light/dark mode toggle, responsive design, and a clean user interface.`,
    image: '/images/projects/calculator.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://krish2248.github.io/Multi-Purpose-Calculator/',
    githubUrl: 'https://github.com/krish2248/Multi-Purpose-Calculator',
    featured: false,
    status: 'deployed',
    year: '2025',
  },
  {
    id: 'vellum-codex',
    title: 'Vellum Codex',
    shortDescription: 'Digital book library with search, sort, and theme toggle',
    fullDescription: `A beautifully crafted digital library showcasing a personal book 
      collection. Features search functionality, sorting by read status or author, 
      dark/light theme toggle, and LocalStorage persistence for read/unread states. 
      Inspired by vintage paper textures and the joy of reading.`,
    image: '/images/projects/vellum-codex.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    liveUrl: 'https://krish2248.github.io/Vellum-Codex/',
    githubUrl: 'https://github.com/krish2248/Vellum-Codex',
    featured: false,
    status: 'deployed',
    year: '2025',
  },
  {
    id: 'text-adventure',
    title: 'Text Adventure Game',
    shortDescription: '9 interactive storylines including The Count of Monte Cristo',
    fullDescription: `A browser-based interactive storytelling experience with 9 different 
      adventures including Medieval Fantasy, Dungeon Crawl, Prison Escape, Horror Mansion, 
      CIA Mission, and The Count of Monte Cristo. Features multiple choices, branching 
      paths, and various endings for high replayability.`,
    image: '/images/projects/text-adventure.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://krish2248.github.io/Text-Adventure-Game/',
    githubUrl: 'https://github.com/krish2248/Text-Adventure-Game',
    featured: false,
    status: 'deployed',
    year: '2025',
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic-Tac-Toe',
    shortDescription: 'Enhanced game with timer, score tracking, and dark mode',
    fullDescription: `An enhanced version of the classic Tic-Tac-Toe game featuring 
      responsive design, dark mode toggle, score tracking, and a 10-second timer 
      for each player's turn. Includes winning animations and reset functionality.`,
    image: '/images/projects/tic-tac-toe.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://krish2248.github.io/Tic-Tac-Toe/',
    githubUrl: 'https://github.com/krish2248/Tic-Tac-Toe',
    featured: false,
    status: 'deployed',
    year: '2025',
  },
  {
    id: 'dice',
    title: 'Dice Roller',
    shortDescription: 'D&D dice application with sound effects and animations',
    fullDescription: `A web application for rolling various types of dice (d4, d6, d8, d10, 
      d12, d20, d100) commonly used in tabletop games like Dungeons & Dragons. Features 
      clickable dice images, sound effects, pop animations, and responsive design.`,
    image: '/images/projects/dice.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://krish2248.github.io/Dice/',
    githubUrl: 'https://github.com/krish2248/Dice',
    featured: false,
    status: 'deployed',
    year: '2025',
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// SKILLS
// ═══════════════════════════════════════════════════════════════════════════

export interface Skill {
  name: string
  level: number // 0-100
  icon?: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export const skills: SkillCategory[] = [
  {
    name: 'Machine Learning & Data Science',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Pandas', level: 80 },
      { name: 'NumPy', level: 80 },
      { name: 'Matplotlib/Seaborn', level: 75 },
      { name: 'Scikit-learn', level: 70 },
      { name: 'Jupyter Notebooks', level: 85 },
    ],
  },
  {
    name: 'Web Development',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 75 },
      { name: 'TypeScript', level: 70 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'PHP', level: 70 },
    ],
  },
  {
    name: 'Databases & APIs',
    skills: [
      { name: 'MySQL', level: 75 },
      { name: 'Socket.IO', level: 65 },
      { name: 'REST APIs', level: 70 },
      { name: 'Streamlit', level: 65 },
    ],
  },
  {
    name: 'Tools & Infrastructure',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 60 },
      { name: 'LaTeX', level: 55 },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// BOOT SEQUENCE MESSAGES
// ═══════════════════════════════════════════════════════════════════════════

export const bootSequence = [
  'BIOS v2.0.25 - Portfolio OS',
  '════════════════════════════════════════',
  '',
  'Checking memory.............. 16GB OK',
  'Loading personality module... OK',
  'Initializing creativity...... OK',
  'Compiling experiences........ OK',
  'Mounting projects............ OK',
  'Starting dev server.......... OK',
  '',
  '> System ready.',
  '> Type "help" for available commands.',
  '',
]

// ═══════════════════════════════════════════════════════════════════════════
// TERMINAL COMMANDS (Easter egg)
// ═══════════════════════════════════════════════════════════════════════════

export const terminalCommands: Record<string, string> = {
  help: `
Available commands:
  about     - Display information about me
  projects  - List all projects
  skills    - Show my tech stack
  contact   - Get my contact info
  clear     - Clear the terminal
  sudo hire-me - ??? 
  `,
  about: `
Name: ${siteConfig.name}
Role: ${siteConfig.title}
Location: ${siteConfig.location}
Status: ${siteConfig.availability}

${aboutContent.paragraphs[0]}
  `,
  projects: `
Featured Projects:
${projects
  .filter((p) => p.featured)
  .map((p) => `  - ${p.title} (${p.year})`)
  .join('\n')}

Run 'projects --all' to see all projects.
  `,
  skills: `
Tech Stack:
${skills.map((cat) => `  ${cat.name}: ${cat.skills.map((s) => s.name).join(', ')}`).join('\n')}
  `,
  contact: `
Let's connect!
  Email:    ${siteConfig.email}
  GitHub:   ${socialLinks.github}
  LinkedIn: ${socialLinks.linkedin}
  Twitter:  ${socialLinks.twitter}
  `,
  'sudo hire-me': `
  
  ████████╗██╗  ██╗ █████╗ ███╗   ██╗██╗  ██╗███████╗██╗
  ╚══██╔══╝██║  ██║██╔══██╗████╗  ██║██║ ██╔╝██╔════╝██║
     ██║   ███████║███████║██╔██╗ ██║█████╔╝ ███████╗██║
     ██║   ██╔══██║██╔══██║██║╚██╗██║██╔═██╗ ╚════██║╚═╝
     ██║   ██║  ██║██║  ██║██║ ╚████║██║  ██╗███████║██╗
     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝
  
  I appreciate your interest! Let's chat:
  → ${siteConfig.email}
  
  `,
  clear: '__CLEAR__',
}

// ═══════════════════════════════════════════════════════════════════════════
// FOOTER CONTENT
// ═══════════════════════════════════════════════════════════════════════════

export const footerContent = {
  copyright: `© ${new Date().getFullYear()} Krish Soni`,
  builtWith: 'Built with React, TypeScript & Tailwind',
  source: 'https://github.com/krish2248/opencodePortfolio',
}
