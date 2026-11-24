import { FC } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { Lang } from './lib/lang'
import { Navbar, Footer } from './components/layout'
import { Hero, Now, Projects, Experience, Education, Skills, Contact } from './components/sections'

const App: FC<{ lang: Lang }> = ({ lang }) => (
  <ThemeProvider>
    <LanguageProvider initialLang={lang}>
      <Page />
    </LanguageProvider>
  </ThemeProvider>
)

const Page: FC = () => {
  const { c } = useLanguage()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
      >
        {c.ui.skipLink}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Now />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
