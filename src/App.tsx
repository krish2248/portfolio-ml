import { FC } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Navbar, Footer } from './components/layout'
import { Hero, OpenTo, Projects, Experience, Education, Elsewhere, Contact } from './components/sections'

const App: FC = () => (
  <ThemeProvider>
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  </ThemeProvider>
)

const Page: FC = () => {
  const { t } = useLanguage()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        {t.skipLink}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <OpenTo />
        <Experience />
        <Education />
        <Projects />
        <Elsewhere />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
