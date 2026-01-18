/**
 * Footer Component
 * Terminal-styled footer with system info and social links
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { siteConfig, socialLinks, footerContent } from '../../lib/data'
import { fadeInUp, staggerContainer } from '../../lib/animations'

interface FooterProps {
  /** Additional CSS classes */
  className?: string
}

/**
 * Terminal-styled footer displaying system info, social links, and credits
 * Designed to look like a terminal status bar
 */
const Footer: FC<FooterProps> = memo(({ className }) => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className={cn(
        'border-t border-phosphor-muted/30',
        'bg-terminal-dark/50 backdrop-blur-sm',
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Terminal-style status bar */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 font-mono text-xs text-phosphor-muted"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusItem label="STATUS" value="ONLINE" color="phosphor" />
            <StatusItem label="LOCATION" value={siteConfig.location} />
            <StatusItem label="AVAILABILITY" value={siteConfig.availability} />
            <StatusItem label="UPTIME" value={`${currentYear - 2024}+ years`} />
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About column */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-display text-sm uppercase tracking-widest text-phosphor mb-4">
              <span className="text-phosphor-muted">{'// '}</span>
              System
            </h3>
            <p className="font-mono text-sm text-phosphor-dim leading-relaxed">
              {siteConfig.description}
            </p>
          </motion.div>

          {/* Quick links column */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-display text-sm uppercase tracking-widest text-phosphor mb-4">
              <span className="text-phosphor-muted">{'// '}</span>
              Quick Access
            </h3>
            <ul className="space-y-2 font-mono text-sm">
              <QuickLink href="#home" command="cd ~/" />
              <QuickLink href="#about" command="cat about.txt" />
              <QuickLink href="#projects" command="ls projects/" />
              <QuickLink href="#skills" command="htop" />
              <QuickLink href="#contact" command="mail --send" />
            </ul>
          </motion.div>

          {/* Connect column */}
          <motion.div variants={fadeInUp}>
            <h3 className="font-display text-sm uppercase tracking-widest text-phosphor mb-4">
              <span className="text-phosphor-muted">{'// '}</span>
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              <SocialLink href={socialLinks.github} label="GitHub" icon="gh" />
              <SocialLink href={socialLinks.linkedin} label="LinkedIn" icon="in" />
              <SocialLink href={socialLinks.twitter} label="Twitter" icon="tw" />
              <SocialLink href={socialLinks.email} label="Email" icon="@" />
            </div>
            
            {/* Resume link */}
            <motion.a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 mt-4',
                'font-mono text-sm text-cyan hover:text-glow',
                'transition-all duration-200'
              )}
              whileHover={{ x: 3 }}
            >
              <span className="text-phosphor-muted">&gt;</span>
              download resume.pdf
              <span className="text-phosphor-muted">↗</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          variants={fadeInUp}
          className="h-px bg-gradient-to-r from-transparent via-phosphor-muted to-transparent mb-6"
        />

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-phosphor-muted"
        >
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <span className="text-phosphor">$</span>
            <span>{footerContent.copyright}</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{footerContent.builtWith}</span>
          </div>

          {/* Source link */}
          <div className="flex items-center gap-4">
            <span className="text-phosphor-dim">v1.0.0</span>
            <a
              href={footerContent.source}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-phosphor transition-colors"
            >
              view source
            </a>
          </div>
        </motion.div>

        {/* ASCII art signature */}
        <motion.div
          variants={fadeInUp}
          className="mt-8 text-center font-mono text-xs text-phosphor-muted opacity-50"
        >
          <pre className="inline-block text-[8px] md:text-[10px] leading-tight">
{`
    ╔════════════════════════════════╗
    ║  Made with <3 and lots of ☕  ║
    ╚════════════════════════════════╝
`}
          </pre>
        </motion.div>
      </div>
    </motion.footer>
  )
})

Footer.displayName = 'Footer'

/**
 * Status bar item component
 */
interface StatusItemProps {
  label: string
  value: string
  color?: 'phosphor' | 'cyan' | 'amber'
}

const StatusItem: FC<StatusItemProps> = ({ label, value, color }) => {
  const colorClasses = {
    phosphor: 'text-phosphor',
    cyan: 'text-cyan',
    amber: 'text-amber',
  }

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-phosphor-muted">[</span>
      <span>{label}:</span>
      <span className={color ? colorClasses[color] : 'text-phosphor-dim'}>{value}</span>
      <span className="text-phosphor-muted">]</span>
    </span>
  )
}

/**
 * Quick access link component
 */
interface QuickLinkProps {
  href: string
  command: string
}

const QuickLink: FC<QuickLinkProps> = ({ href, command }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <li>
      <a
        href={href}
        onClick={handleClick}
        className={cn(
          'inline-flex items-center gap-2',
          'text-phosphor-dim hover:text-phosphor',
          'transition-colors duration-200'
        )}
      >
        <span className="text-phosphor-muted">$</span>
        <span>{command}</span>
      </a>
    </li>
  )
}

/**
 * Social media link with terminal-style icon
 */
interface SocialLinkProps {
  href: string
  label: string
  icon: string
}

const SocialLink: FC<SocialLinkProps> = ({ href, label, icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center',
        'w-10 h-10 rounded',
        'border border-phosphor-muted',
        'font-mono text-sm text-phosphor-dim',
        'hover:border-phosphor hover:text-phosphor hover:bg-phosphor/10',
        'transition-all duration-200'
      )}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      [{icon}]
    </motion.a>
  )
}

export default Footer
