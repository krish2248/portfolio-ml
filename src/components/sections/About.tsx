/**
 * About Section Component
 * Neofetch-style system profile display
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { siteConfig, aboutContent, socialLinks } from '../../lib/data'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'
import { TerminalWindow } from '../ui'

/**
 * About section with neofetch-inspired layout
 * Shows ASCII art alongside system info and bio
 */
const About: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <Section id="about" terminalHeader="ABOUT">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Left: Neofetch-style terminal */}
        <motion.div variants={fadeInLeft}>
          <TerminalWindow title="neofetch" className="h-full">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* ASCII Art */}
              <div className="flex-shrink-0">
                <pre className="text-phosphor text-[10px] sm:text-xs leading-tight font-mono whitespace-pre">
{`    ╔═══════════════════════╗
    ║   ░░░▓▓▓▓▓▓▓░░░      ║
    ║   ░░▓████████▓░░     ║
    ║   ░▓██▀▀██▀▀██▓░     ║
    ║   ░▓██  ██  ██▓░     ║
    ║   ░░▓████████▓░░     ║
    ║   ░░░▓▓▓▓▓▓▓░░░      ║
    ╚═══════════════════════╝`}
                </pre>
              </div>

              {/* System Info */}
              <div className="flex-1 font-mono text-sm space-y-1">
                <SystemInfoLine label="user" value={siteConfig.name.toLowerCase().replace(' ', '_')} />
                <div className="border-t border-phosphor-muted my-2" />
                <SystemInfoLine label="OS" value={aboutContent.systemInfo.os} />
                <SystemInfoLine label="Shell" value={aboutContent.systemInfo.shell} />
                <SystemInfoLine label="Languages" value={aboutContent.systemInfo.languages} />
                <SystemInfoLine label="Editor" value={aboutContent.systemInfo.editor} />
                <SystemInfoLine label="Theme" value={aboutContent.systemInfo.theme} />
                <SystemInfoLine label="Uptime" value={aboutContent.systemInfo.uptime} />
                <div className="border-t border-phosphor-muted my-2" />
                {/* Color palette display */}
                <div className="flex gap-1 mt-3">
                  {['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-cyan-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'].map((color, i) => (
                    <span key={i} className={cn('w-4 h-4 rounded-sm', color)} />
                  ))}
                </div>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Right: Bio content */}
        <motion.div variants={fadeInRight} className="space-y-6">
          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aboutContent.quickFacts.map((fact) => (
              <QuickFactCard key={fact.label} label={fact.label} value={fact.value} />
            ))}
          </div>

          {/* Bio paragraphs */}
          <div className="space-y-4">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeInUp}
                custom={index}
                className="text-phosphor-dim leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Links */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            <InfoLink
              href={siteConfig.resumeUrl}
              label="Download Resume"
              icon="↓"
            />
            <InfoLink
              href={socialLinks.github}
              label="View GitHub"
              icon="→"
              external
            />
            <InfoLink
              href={socialLinks.linkedin}
              label="LinkedIn"
              icon="→"
              external
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  )
})

About.displayName = 'About'

/**
 * System info line (neofetch style)
 */
interface SystemInfoLineProps {
  label: string
  value: string
}

const SystemInfoLine: FC<SystemInfoLineProps> = ({ label, value }) => (
  <div className="flex">
    <span className="text-cyan w-24 flex-shrink-0">{label}</span>
    <span className="text-phosphor-dim">{value}</span>
  </div>
)

/**
 * Quick fact card component
 */
interface QuickFactCardProps {
  label: string
  value: string
}

const QuickFactCard: FC<QuickFactCardProps> = ({ label, value }) => (
  <motion.div
    className={cn(
      'p-4 rounded-lg text-center',
      'border border-phosphor-muted bg-terminal-dark/50',
      'hover:border-phosphor transition-all duration-300'
    )}
    whileHover={{ y: -2, scale: 1.02 }}
  >
    <div className="font-display text-xl md:text-2xl text-phosphor text-glow mb-1">
      {value}
    </div>
    <div className="font-mono text-xs text-phosphor-muted uppercase tracking-wider">
      {label}
    </div>
  </motion.div>
)

/**
 * Info link component
 */
interface InfoLinkProps {
  href: string
  label: string
  icon: string
  external?: boolean
}

const InfoLink: FC<InfoLinkProps> = ({ href, label, icon, external }) => (
  <motion.a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className={cn(
      'inline-flex items-center gap-2',
      'font-mono text-sm text-cyan hover:text-glow',
      'transition-all duration-200'
    )}
    whileHover={{ x: 3 }}
  >
    <span className="text-phosphor-muted">{icon}</span>
    {label}
    {external && <span className="text-phosphor-muted text-xs">↗</span>}
  </motion.a>
)

export default About
