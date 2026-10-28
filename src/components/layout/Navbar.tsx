import { FC, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { navLinks, siteConfig } from '@/lib/data'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useLanguage } from '@/context/LanguageContext'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageToggle from '../ui/LanguageToggle'

const sectionIds = navLinks.map((link) => link.href.slice(1))

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy({ sectionIds, offset: 120 })
  const { t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        scrolled || menuOpen ? 'border-line bg-bg' : 'border-transparent bg-bg'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#top" className="font-serif text-lg font-medium tracking-tight text-ink" onClick={() => setMenuOpen(false)}>
          {siteConfig.name}
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href.slice(1) ? 'location' : undefined}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-colors',
                    active === link.href.slice(1) ? 'bg-accent-soft text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  {t.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="ml-1 rounded-full px-3 py-1.5 text-sm text-ink-2 hover:bg-accent-soft md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? t.menu.close : t.menu.open}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul id="mobile-menu" className="border-t border-line px-5 pb-4 pt-2 sm:px-8 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-line py-3 text-base text-ink-2 last:border-0"
              >
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar
