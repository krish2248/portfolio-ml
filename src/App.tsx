/**
 * App Component
 * Main application component that assembles all sections
 */

import { FC } from 'react'

// Context
import { ThemeProvider } from './context/ThemeContext'

// Layout Components
import { Navbar, Footer } from './components/layout'

// Section Components
import { Hero, About, Experience, Projects, Skills, Contact } from './components/sections'

/**
 * Main App component
 * Wraps everything in providers and assembles the portfolio
 */
const App: FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  )
}

/**
 * Portfolio content with all sections
 */
const PortfolioContent: FC = () => {
  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
