/**
 * Hero Section Component
 * BIOS-style boot sequence with typing animation intro
 */

import { FC, useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { siteConfig, socialLinks } from '../../lib/data'
import { useBootSequence } from '../../hooks/useBootSequence'
import { useTypewriter } from '../../hooks/useTypewriter'
import { screenOn, fadeInUp, staggerContainer } from '../../lib/animations'
import { Button } from '../ui'

interface HeroProps {
  /** Callback when boot sequence completes */
  onBootComplete?: () => void
  /** Skip boot sequence (for returning visitors) */
  skipBoot?: boolean
}

/**
 * Hero section with animated BIOS-style boot sequence
 * Shows terminal boot messages, then reveals the main intro
 */
const Hero: FC<HeroProps> = memo(({ onBootComplete, skipBoot = false }) => {
  const [showIntro, setShowIntro] = useState(skipBoot)
  
  const { isComplete: bootComplete, lines } = useBootSequence({
    enabled: !skipBoot,
    onComplete: () => {
      setTimeout(() => {
        setShowIntro(true)
        onBootComplete?.()
      }, 500)
    },
  })

  // Skip boot on subsequent visits (optional - check sessionStorage)
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('portfolio-booted')
    if (hasBooted && !skipBoot) {
      setShowIntro(true)
      onBootComplete?.()
    }
  }, [skipBoot, onBootComplete])

  // Mark as booted
  useEffect(() => {
    if (bootComplete) {
      sessionStorage.setItem('portfolio-booted', 'true')
    }
  }, [bootComplete])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-terminal-dark via-terminal-black to-terminal-black opacity-80" />

      {/* Boot Sequence */}
      <AnimatePresence mode="wait">
        {!showIntro && (
          <motion.div
            key="boot"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenOn}
            className="relative z-10 w-full max-w-3xl mx-auto px-4"
          >
            <BootScreen lines={lines} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Intro Content */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <IntroContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ScrollIndicator />
        </motion.div>
      )}
    </section>
  )
})

Hero.displayName = 'Hero'

/**
 * Boot screen with BIOS-style messages
 */
interface BootScreenProps {
  lines: string[]
}

const BootScreen: FC<BootScreenProps> = ({ lines }) => {
  return (
    <div className="terminal-window font-mono text-sm">
      <div className="terminal-window-header">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="terminal-window-title ml-4">system_boot.sh</span>
      </div>
      <div className="terminal-window-content min-h-[300px]">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.05 }}
            className={cn(
              'whitespace-pre-wrap',
              line.includes('OK') && 'text-phosphor',
              line.includes('═') && 'text-phosphor-dim',
              line.startsWith('>') && 'text-cyan'
            )}
          >
            {line || '\u00A0'}
          </motion.div>
        ))}
        <span className="animate-blink">█</span>
      </div>
    </div>
  )
}

/**
 * Main intro content after boot completes
 */
const IntroContent: FC = () => {
  const { displayedText: tagline } = useTypewriter({
    text: siteConfig.tagline,
    speed: 50,
    delay: 500,
  })

  return (
    <>
      {/* Greeting */}
      <motion.div variants={fadeInUp} className="mb-4">
        <span className="inline-block font-mono text-sm md:text-base text-phosphor-dim">
          <span className="text-phosphor-muted">{'>'}</span> Hello, World! I'm
        </span>
      </motion.div>

      {/* Name */}
      <motion.h1
        variants={fadeInUp}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4"
      >
        <span className="text-phosphor text-glow-strong">{siteConfig.name}</span>
      </motion.h1>

      {/* Title */}
      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display text-phosphor-dim">
          {siteConfig.title}
        </h2>
      </motion.div>

      {/* Tagline with typing effect */}
      <motion.div variants={fadeInUp} className="mb-8 h-8">
        <p className="font-mono text-base md:text-lg text-cyan">
          <span className="text-phosphor-muted">{'// '}</span>
          {tagline}
          <span className="animate-blink">_</span>
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Button
          onClick={() => {
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          View Projects
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Get In Touch
        </Button>
      </motion.div>

      {/* Social Links */}
      <motion.div
        variants={fadeInUp}
        className="mt-12 flex items-center justify-center gap-6"
      >
        <SocialLink href={socialLinks.github} label="GitHub" />
        <SocialLink href={socialLinks.linkedin} label="LinkedIn" />
        <SocialLink href={socialLinks.twitter} label="Twitter" />
      </motion.div>
    </>
  )
}

/**
 * Social link component
 */
interface SocialLinkProps {
  href: string
  label: string
}

const SocialLink: FC<SocialLinkProps> = ({ href, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="font-mono text-sm text-phosphor-dim hover:text-phosphor transition-colors"
    whileHover={{ y: -2 }}
  >
    [{label.toLowerCase()}]
  </motion.a>
)

/**
 * Scroll down indicator
 */
const ScrollIndicator: FC = () => (
  <motion.div
    className="flex flex-col items-center gap-2 text-phosphor-muted"
    animate={{ y: [0, 5, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <span className="font-mono text-xs">scroll</span>
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </motion.div>
)

export default Hero
