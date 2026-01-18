# Portfolio Implementation Plan

## Context & Purpose

**Goal:** Transform this portfolio to impress German university admissions for an ML Master's program

**Owner:** Krish Soni  
**Target Audience:** Academic admissions reviewers for ML Master's program in Germany  
**Primary Message:** Strong ML/Python foundation + technical versatility + self-directed learning

---

## Files to Modify (7 files)

| # | File Path | Priority | Changes |
|---|-----------|----------|---------|
| 1 | `src/lib/data.ts` | HIGH | All personal info, projects, skills, social links |
| 2 | `src/styles/globals.css` | HIGH | New light theme CSS variables |
| 3 | `tailwind.config.js` | MEDIUM | Updated paper color palette |
| 4 | `src/context/ThemeContext.tsx` | MEDIUM | Default theme: dark → light |
| 5 | `index.html` | MEDIUM | Meta tags, theme defaults, inline CSS |
| 6 | `src/components/layout/Footer.tsx` | LOW | Update uptime base year (2019 → 2024) |

---

## 1. data.ts - Complete Replacement Content

### 1.1 siteConfig (lines 14-28)

```typescript
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
```

### 1.2 socialLinks (lines 34-39)

```typescript
export const socialLinks = {
  github: 'https://github.com/krish2248',
  linkedin: 'https://www.linkedin.com/in/krish-soni-460932228/',
  twitter: 'https://www.instagram.com/notkrish03/',  // Using Instagram instead
  email: 'mailto:sonikrish2248@gmail.com',
}
```

### 1.3 aboutContent (lines 57-98)

```typescript
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
  
  systemInfo: {
    os: 'ML Engineer OS v2.0',
    shell: 'Python + Jupyter',
    languages: 'Python, JS, TypeScript, PHP, SQL',
    editor: 'VS Code + Jupyter Lab',
    theme: 'Phosphor Green',
    uptime: '1-2 years coding',
  },
  
  quickFacts: [
    { label: 'Experience', value: '1-2 Years' },
    { label: 'Projects', value: '30+' },
    { label: 'Focus', value: 'ML/AI' },
    { label: 'Status', value: 'LEARNING' },
  ],
}
```

### 1.4 projects (lines 119-215) - REPLACE ENTIRELY

```typescript
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
```

### 1.5 skills (lines 232-272) - REPLACE ENTIRELY

```typescript
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
```

### 1.6 footerContent (lines 357-361)

```typescript
export const footerContent = {
  copyright: `© ${new Date().getFullYear()} Krish Soni`,
  builtWith: 'Built with React, TypeScript & Tailwind',
  source: 'https://github.com/krish2248/opencodePortfolio',
}
```

---

## 2. globals.css - Light Theme Update

### Location: `.light` class (lines 44-56)

**REPLACE the entire `.light` block with:**

```css
/* Light mode (Clean Modern Paper aesthetic) */
.light {
  --color-bg: #fefdfb;
  --color-bg-secondary: #f7f5f2;
  --color-text: #1c1917;
  --color-text-dim: #44403c;
  --color-text-muted: #78716c;
  --color-accent: #166534;
  --color-accent-secondary: #ea580c;
  --color-border: #292524;
  --color-border-dim: #e7e5e4;
  --color-glow: rgba(22, 101, 52, 0.08);
  --color-glow-subtle: rgba(22, 101, 52, 0.04);
}
```

---

## 3. tailwind.config.js - Paper Colors Update

### Location: colors.paper (lines 36-41)

**REPLACE with:**

```javascript
paper: {
  DEFAULT: '#fefdfb',    // Clean warm white
  dark: '#f7f5f2',       // Subtle cream for cards
  darker: '#e7e5e4',     // Border color
  ink: '#1c1917',        // Rich warm charcoal
  muted: '#78716c',      // Muted stone gray
  accent: '#166534',     // Deep forest green
  orange: '#ea580c',     // Vibrant orange accent
},
```

---

## 4. ThemeContext.tsx - Default Theme Change

### Location: line 26

**CHANGE:**
```typescript
// FROM:
export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {

// TO:
export function ThemeProvider({ children, defaultTheme = 'light' }: ThemeProviderProps) {
```

### Location: line 55

**CHANGE:**
```typescript
// FROM:
metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#f5f5dc')

// TO:
metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fefdfb')
```

---

## 5. index.html - Meta Tags & Theme Defaults

### Line 2 - HTML class

```html
<!-- FROM: -->
<html lang="en" class="dark">

<!-- TO: -->
<html lang="en" class="light">
```

### Lines 11-27 - Meta tags

```html
<!-- Primary Meta Tags -->
<title>Krish Soni | Aspiring ML Engineer</title>
<meta name="title" content="Krish Soni | Aspiring ML Engineer" />
<meta name="description" content="Developer transitioning into Machine Learning. Explore my ML projects, data science work, and full-stack applications." />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://sonikrish.com/" />
<meta property="og:title" content="Krish Soni | Aspiring ML Engineer" />
<meta property="og:description" content="Developer transitioning into Machine Learning. Explore my ML projects, data science work, and full-stack applications." />
<meta property="og:image" content="/og-image.png" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://sonikrish.com/" />
<meta property="twitter:title" content="Krish Soni | Aspiring ML Engineer" />
<meta property="twitter:description" content="Developer transitioning into Machine Learning. Explore my ML projects, data science work, and full-stack applications." />
<meta property="twitter:image" content="/og-image.png" />
```

### Line 43 - Theme color

```html
<!-- FROM: -->
<meta name="theme-color" content="#0a0a0a" />

<!-- TO: -->
<meta name="theme-color" content="#fefdfb" />
```

### Lines 46-53 - Critical CSS

```css
html {
  background-color: #fefdfb;
}
html.dark {
  background-color: #0a0a0a;
}
```

### Lines 66-78 - Theme detection script

```javascript
(function() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to light, only use dark if explicitly saved or system prefers dark
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
})();
```

---

## 6. Footer.tsx - Uptime Base Year

### Location: line 46

```typescript
// FROM:
<StatusItem label="UPTIME" value={`${currentYear - 2019}+ years`} />

// TO:
<StatusItem label="UPTIME" value={`${currentYear - 2024}+ years`} />
```

---

## Summary Checklist

- [ ] Update `src/lib/data.ts` - siteConfig
- [ ] Update `src/lib/data.ts` - socialLinks  
- [ ] Update `src/lib/data.ts` - aboutContent
- [ ] Update `src/lib/data.ts` - projects (12 projects)
- [ ] Update `src/lib/data.ts` - skills (4 categories)
- [ ] Update `src/lib/data.ts` - footerContent
- [ ] Update `src/styles/globals.css` - .light CSS variables
- [ ] Update `tailwind.config.js` - paper colors
- [ ] Update `src/context/ThemeContext.tsx` - defaultTheme
- [ ] Update `src/context/ThemeContext.tsx` - theme-color meta
- [ ] Update `index.html` - class="light"
- [ ] Update `index.html` - all meta tags
- [ ] Update `index.html` - theme-color meta
- [ ] Update `index.html` - critical CSS
- [ ] Update `index.html` - theme detection script
- [ ] Update `src/components/layout/Footer.tsx` - uptime year

---

## Additional Notes

1. **Project Images:** The image paths like `/images/projects/cancer-predictor.png` are placeholders. The implementing agent should either:
   - Create placeholder images
   - Remove the image field if not needed
   - Use external URLs if available

2. **Testing:** After implementation, run `npm run dev` to test the changes locally.

3. **GitHub URLs:** All GitHub URLs are verified and correct for the `krish2248` account.

4. **Live URLs:** Only projects with confirmed GitHub Pages deployments have `liveUrl` fields.
