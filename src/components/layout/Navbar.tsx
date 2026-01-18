/**
 * Navbar Component
 * Command-line styled navigation with terminal aesthetics
 */

import { FC, useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { navLinks, siteConfig } from '../../lib/data'
import { navbarSlide, mobileMenuSlide, fadeIn } from '../../lib/animations'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { ThemeToggle } from '../ui'

interface NavbarProps {
  /** Show boot sequence before revealing nav */
  showAfterBoot?: boolean
  /** Boot sequence completed */
  bootComplete?: boolean
}

/**
 * Fixed navigation bar with terminal command styling
 * Features smooth scroll, active section highlighting, and mobile menu
 */
const Navbar: FC<NavbarProps> = memo(({ showAfterBoot = true, bootComplete = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Track active section for highlighting
  const activeSection = useScrollSpy({
    sectionIds: navLinks.map((link) => link.href.replace('#', '')),
    offset: 100,
  })

  // Handle scroll state for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Don't show until boot is complete
  if (showAfterBoot && !bootComplete) {
    return null
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navbarSlide}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'bg-terminal-black/90 backdrop-blur-md border-b border-phosphor-muted/30'
            : 'bg-transparent'
        )}
      >
        <nav className="w-full px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Home */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#home')
              }}
              className="flex items-center gap-2 group"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-phosphor-muted group-hover:text-phosphor transition-colors">
                ~/
              </span>
              <span className="font-display text-lg text-phosphor group-hover:text-glow transition-all">
                {siteConfig.name.toLowerCase().replace(' ', '_')}
              </span>
              <span className="animate-blink text-phosphor">_</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  command={link.command}
                  isActive={activeSection === link.href.replace('#', '')}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                />
              ))}

              {/* Separator */}
              <div className="w-px h-6 bg-phosphor-muted/50 mx-1" />

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle size="sm" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'p-2 text-phosphor hover:text-glow transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-phosphor focus:ring-offset-2 focus:ring-offset-terminal-black rounded'
                )}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                <motion.div
                  animate={isMobileMenuOpen ? 'open' : 'closed'}
                  className="w-6 h-5 flex flex-col justify-between"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 },
                    }}
                    className="block h-0.5 w-full bg-current origin-center"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className="block h-0.5 w-full bg-current"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 },
                    }}
                    className="block h-0.5 w-full bg-current origin-center"
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-terminal-black/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuSlide}
              className={cn(
                'fixed top-0 right-0 bottom-0 w-72 z-50 md:hidden',
                'bg-terminal-dark border-l border-phosphor-muted',
                'flex flex-col'
              )}
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-phosphor-muted">
                <span className="font-mono text-sm text-phosphor-dim">
                  {'>'} navigation
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-phosphor hover:text-glow transition-colors"
                  aria-label="Close menu"
                >
                  <span className="font-mono">[x]</span>
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      variants={fadeIn}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(link.href)
                        }}
                        className={cn(
                          'block py-3 px-4 rounded',
                          'font-mono text-sm',
                          'transition-all duration-200',
                          activeSection === link.href.replace('#', '')
                            ? 'bg-phosphor/10 text-phosphor border-l-2 border-phosphor'
                            : 'text-phosphor-dim hover:text-phosphor hover:bg-phosphor/5'
                        )}
                      >
                        <span className="text-phosphor-muted">$ </span>
                        {link.command}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-phosphor-muted">
                <p className="font-mono text-xs text-phosphor-muted text-center">
                  {siteConfig.email}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
})

Navbar.displayName = 'Navbar'

/**
 * Individual navigation link with command-line styling
 */
interface NavLinkProps {
  href: string
  command: string
  isActive: boolean
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const NavLink: FC<NavLinkProps> = memo(({ href, command, isActive, onClick }) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={cn(
        'relative px-2 py-1.5 rounded',
        'font-mono text-xs lg:text-sm',
        'transition-all duration-200 whitespace-nowrap',
        isActive
          ? 'text-phosphor'
          : 'text-phosphor-dim hover:text-phosphor'
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Command text */}
      <span className="relative z-10">
        <span className="text-phosphor-muted opacity-0 group-hover:opacity-100 transition-opacity">
          ${' '}
        </span>
        {command}
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeSection"
          className="absolute inset-0 rounded bg-phosphor/10 border border-phosphor/30"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.a>
  )
})

NavLink.displayName = 'NavLink'

export default Navbar
