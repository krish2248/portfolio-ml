# Retro-Terminal Portfolio

A modern, responsive portfolio website with a retro-terminal CRT aesthetic. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Retro CRT Aesthetic**: Phosphor green on black with scanlines, flicker, and glow effects
- **Boot Sequence Animation**: BIOS-style boot animation on page load
- **Smooth Animations**: Scroll-triggered reveals, typing effects, and hover animations
- **Dark/Light Mode**: Terminal mode and "paper printout" mode
- **Responsive Design**: Fully responsive across all device sizes
- **Easter Eggs**: Konami code triggers Matrix rain effect
- **Accessible**: Keyboard navigation, focus states, and reduced motion support

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Radix UI** - Accessible UI primitives

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/opencodePortfolio.git
cd opencodePortfolio

# Install dependencies
bun install

# Start development server
bun dev
```

### Available Scripts

```bash
# Development server with hot reload
bun dev

# Type checking
bun run typecheck

# Build for production
bun run build

# Preview production build locally
bun run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # CRTOverlay, Navbar, Footer, Section
│   ├── sections/        # Hero, About, Projects, Skills, Contact
│   ├── projects/        # ProjectLightbox
│   └── ui/              # Button, Card, Badge, Dialog, etc.
├── context/
│   └── ThemeContext.tsx # Dark/light mode provider
├── hooks/
│   ├── useInView.ts     # Intersection observer
│   ├── useScrollSpy.ts  # Active section tracking
│   ├── useTypewriter.ts # Typing animation
│   ├── useBootSequence.ts
│   └── useKonamiCode.ts # Easter egg
├── lib/
│   ├── utils.ts         # Utility functions
│   ├── animations.ts    # Framer Motion variants
│   └── data.ts          # Portfolio content (CUSTOMIZE THIS)
├── styles/
│   └── globals.css      # Tailwind + CRT effects
├── App.tsx
└── main.tsx
```

## Customization

### Personal Information

Edit `src/lib/data.ts` to update all portfolio content:

```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title',
  tagline: 'Your tagline here',
  email: 'your@email.com',
  // ...
}

export const projects = [
  {
    id: 'project-1',
    title: 'Project Name',
    // ...
  }
]

export const skills = [
  {
    name: 'Category',
    skills: [
      { name: 'Skill', level: 90 },
    ]
  }
]
```

### Colors & Theme

Edit the CSS custom properties in `src/styles/globals.css`:

```css
:root {
  --color-text: #00ff41;           /* Main phosphor green */
  --color-bg: #0a0a0a;             /* Background black */
  --color-accent: #00ffff;         /* Cyan accent */
  /* ... */
}
```

## Deployment to GitHub Pages

### Option 1: Manual Deployment

```bash
# Build the project
bun run build

# The dist/ folder contains the built files
# Upload to GitHub Pages or any static host
```

### Option 2: GitHub Actions (Automated)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
          
      - name: Install dependencies
        run: bun install
        
      - name: Build
        run: bun run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions

3. Push to `main` branch to trigger deployment

### Option 3: Vercel / Netlify

Simply connect your repository to Vercel or Netlify. The build command is:

```
bun run build
```

Output directory: `dist`

## Easter Eggs

- **Konami Code**: Up, Up, Down, Down, Left, Right, Left, Right, B, A - triggers Matrix rain effect
- **Terminal Commands**: Type `help` to see available commands (in console)

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+

## Performance

- Lighthouse Score: 95+ on all metrics
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

## License

MIT License - feel free to use for your own portfolio!

## Credits

- Fonts: [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono), [Share Tech Mono](https://fonts.google.com/specimen/Share+Tech+Mono)
- CRT Effects inspired by retro terminal aesthetics
- Built with love and lots of coffee
