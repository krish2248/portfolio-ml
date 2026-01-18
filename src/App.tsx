/**
 * App Component
 * Main application component that assembles all sections
 */

import { FC, useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'

// Context
import { ThemeProvider } from './context/ThemeContext'

// Layout Components
import { CRTOverlay, Navbar, Footer } from './components/layout'

// Section Components
import { Hero, About, Projects, Skills, Contact } from './components/sections'

// Project Components
import { ProjectLightbox } from './components/projects'

// Types
import { Project } from './lib/data'

// Hooks
import { useKonamiCode } from './hooks/useKonamiCode'

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
 * Portfolio content with all sections and effects
 */
const PortfolioContent: FC = () => {
  const [bootComplete, setBootComplete] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showMatrixRain, setShowMatrixRain] = useState(false)

  // Konami code easter egg
  const konamiActivated = useKonamiCode()

  // Handle Konami code activation
  useEffect(() => {
    if (konamiActivated.isActivated) {
      setShowMatrixRain(true)
      // Hide after 5 seconds
      const timer = setTimeout(() => setShowMatrixRain(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [konamiActivated])

  // Handle boot sequence completion
  const handleBootComplete = useCallback(() => {
    setBootComplete(true)
  }, [])

  // Handle project selection for lightbox
  const handleProjectSelect = useCallback((project: Project) => {
    setSelectedProject(project)
  }, [])

  // Handle lightbox close
  const handleLightboxClose = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* CRT Effects Overlay */}
      <CRTOverlay
        scanlines
        flicker
        noise
        curve
      />

      {/* Matrix Rain Easter Egg */}
      <AnimatePresence>
        {showMatrixRain && <MatrixRain />}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar bootComplete={bootComplete} />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero / Boot Sequence */}
        <Hero onBootComplete={handleBootComplete} />

        {/* About Section */}
        <About />

        {/* Projects Section */}
        <Projects onProjectSelect={handleProjectSelect} />

        {/* Skills Section */}
        <Skills />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Lightbox Modal */}
      <ProjectLightbox
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleLightboxClose}
      />
    </div>
  )
}

/**
 * Matrix Rain Easter Egg Component
 * Triggered by Konami code
 */
const MatrixRain: FC = () => {
  useEffect(() => {
    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.id = 'matrix-canvas'
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      pointer-events: none;
    `
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = Array(columns).fill(1)

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF'

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff41'
      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      const canvasEl = document.getElementById('matrix-canvas')
      if (canvasEl) {
        canvasEl.remove()
      }
    }
  }, [])

  return null
}

export default App
