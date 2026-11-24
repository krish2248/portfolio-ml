import { FC } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Lang } from './lib/lang'
import { Navbar, Footer } from './components/layout'
import type { Page } from './lib/pages'
import { Legal, Hero, Now, Projects, Experience, Education, Skills, Contact } from './components/sections'

const App: FC<{ lang: Lang; page: Page }> = ({ lang, page }) => (
  <ThemeProvider>
    {/* The legal pages are German only. */}
    <LanguageProvider initialLang={page === 'home' ? lang : 'de'}>
      <Layout page={page} />
    </LanguageProvider>
  </ThemeProvider>
)

const Layout: FC<{ page: Page }> = ({ page }) => {
  const { c } = useLanguage()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        {c.ui.skipLink}
      </a>
      {page === 'home' ? (
        <>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            <Hero />
            <Now />
            <Experience />
            <Projects />
            <Education />
            <Skills />
            <Contact />
          </main>
        </>
      ) : (
        <Legal page={page} />
      )}
      <Footer />
    </>
  )
}

export default App
