/**
 * Navbar Component
 */

import { FC, useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { navLinks, siteConfig } from '../../lib/data'
import { navbarSlide, mobileMenuSlide, fadeIn } from '../../lib/animations'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { ThemeToggle } from '../ui'

interface NavbarProps { showAfterBoot?: boolean; bootComplete?: boolean }

const filteredNavLinks = navLinks.filter(link => link.name !== 'education')

const Navbar: FC<NavbarProps> = memo(({ showAfterBoot = true, bootComplete = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const activeSection = useScrollSpy({ sectionIds: filteredNavLinks.map((link) => link.href.replace('#', '')), offset: 100 })

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  if (showAfterBoot && !bootComplete) return null

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header initial="hidden" animate="visible" variants={navbarSlide}
        className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700' : 'bg-transparent')}>
        <nav className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home') }} className="flex items-center gap-2 group" whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
              <span className="dark:text-slate-500 text-slate-400 group-hover:text-blue-500 transition-colors">~/</span>
              <span className="font-semibold text-lg dark:text-white text-slate-900 group-hover:text-blue-500 transition-all">{siteConfig.name.toLowerCase().replace(' ', '_')}</span>
              <span className="animate-blink text-blue-500">_</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {filteredNavLinks.map((link) => (
                <NavLink key={link.name} href={link.href} command={link.command} isActive={activeSection === link.href.replace('#', '')} onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }} />
              ))}
              <div className="w-px h-6 dark:bg-slate-700 bg-slate-300 mx-1" />
              <ThemeToggle />
            </div>

            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle size="sm" />
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn('p-2 dark:text-slate-300 text-slate-700 hover:text-blue-500 transition-all', 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 rounded')}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen}>
                <motion.div animate={isMobileMenuOpen ? 'open' : 'closed'} className="w-6 h-5 flex flex-col justify-between">
                  <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 8 } }} className="block h-0.5 w-full bg-current origin-center" />
                  <motion.span variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} className="block h-0.5 w-full bg-current" />
                  <motion.span variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -8 } }} className="block h-0.5 w-full bg-current origin-center" />
                </motion.div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-40 md:hidden" />
            <motion.div initial="hidden" animate="visible" exit="exit" variants={mobileMenuSlide}
              className={cn('fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden', 'bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700', 'flex flex-col')}>
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <span className="font-mono text-sm dark:text-slate-400 text-slate-600">{'>'} navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 dark:text-slate-400 text-slate-600 hover:text-blue-500 transition-colors" aria-label="Close menu">
                  <span className="font-mono">[x]</span>
                </button>
              </div>
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {filteredNavLinks.map((link, index) => (
                    <motion.li key={link.name} variants={fadeIn} custom={index} initial="hidden" animate="visible" transition={{ delay: index * 0.05 }}>
                      <a href={link.href} onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                        className={cn('block py-3 px-4 rounded', 'font-mono text-sm', 'transition-all duration-200',
                          activeSection === link.href.replace('#', '') ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-500 border-l-2 border-blue-500' : 'dark:text-slate-400 text-slate-600 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/5')}>
                        <span className="dark:text-slate-500 text-slate-400">$ </span>{link.command}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <p className="font-mono text-xs dark:text-slate-500 text-slate-500 text-center">{siteConfig.email}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
})

Navbar.displayName = 'Navbar'

const NavLink: FC<{ href: string; command: string; isActive: boolean; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = memo(({ href, command, isActive, onClick }) => (
  <motion.a href={href} onClick={onClick}
    className={cn('relative px-2 py-1.5 rounded', 'font-mono text-xs lg:text-sm', 'transition-all duration-200 whitespace-nowrap',
      isActive ? 'text-blue-500' : 'dark:text-slate-400 text-slate-600 hover:text-blue-500')}
    whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
    <span className="relative z-10"><span className="dark:text-slate-500 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">${' '}</span>{command}</span>
    {isActive && <motion.div layoutId="activeSection" className="absolute inset-0 rounded bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />}
  </motion.a>
))

NavLink.displayName = 'NavLink'

export default Navbar
