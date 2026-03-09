/**
 * App Component
 * Main application component that assembles all sections
 */

import { FC, useState, useCallback } from 'react'

// Context
import { ThemeProvider } from './context/ThemeContext'

// Layout Components
import { Navbar, Footer } from './components/layout'

// Section Components
import { Hero, About, Experience, Projects, Skills, Contact } from './components/sections'

// Project Components
import { ProjectLightbox } from './components/projects'

// Types
import { Project } from './lib/data'

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects onProjectSelect={handleProjectSelect} />

        {/* Experience & Education Section */}
        <Experience />

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

export default App
