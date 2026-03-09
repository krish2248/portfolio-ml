/**
 * Footer Component
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { siteConfig, socialLinks, footerContent } from '../../lib/data'
import { fadeInUp, staggerContainer } from '../../lib/animations'

const Footer: FC = memo(() => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
      className={cn('border-t border-slate-200 dark:border-slate-700', 'bg-slate-50 dark:bg-slate-900/50')}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div variants={fadeInUp} className="mb-8 font-mono text-xs dark:text-slate-500 text-slate-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <StatusItem label="STATUS" value="ONLINE" color="green" />
            <StatusItem label="LOCATION" value={siteConfig.location} />
            <StatusItem label="AVAILABILITY" value={siteConfig.availability} />
            <StatusItem label="UPTIME" value={`${currentYear - 2024}+ years`} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-sm uppercase tracking-widest dark:text-white text-slate-900 mb-4"><span className="text-blue-500">{'// '}</span>About</h3>
            <p className="font-mono text-sm dark:text-slate-400 text-slate-600 leading-relaxed">{siteConfig.description}</p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-sm uppercase tracking-widest dark:text-white text-slate-900 mb-4"><span className="text-blue-500">{'// '}</span>Quick Access</h3>
            <ul className="space-y-2 font-mono text-sm">
              <QuickLink href="#home" command="cd ~/" />
              <QuickLink href="#about" command="cat about.txt" />
              <QuickLink href="#experience" command="cat journey.log" />
              <QuickLink href="#projects" command="ls projects/" />
              <QuickLink href="#skills" command="htop" />
              <QuickLink href="#contact" command="mail --send" />
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="font-semibold text-sm uppercase tracking-widest dark:text-white text-slate-900 mb-4"><span className="text-blue-500">{'// '}</span>Connect</h3>
            <div className="flex flex-wrap gap-3">
              <SocialLink href={socialLinks.github} label="GitHub" icon="gh" />
              <SocialLink href={socialLinks.linkedin} label="LinkedIn" icon="in" />
              <SocialLink href={socialLinks.twitter} label="Twitter" icon="tw" />
              <SocialLink href={socialLinks.email} label="Email" icon="@" />
            </div>
            <motion.a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer"
              className={cn('inline-flex items-center gap-2 mt-4', 'font-mono text-sm text-blue-500 hover:text-blue-600', 'transition-all duration-200')} whileHover={{ x: 3 }}>
              <span className="dark:text-slate-500 text-slate-400">&gt;</span>download resume<span className="dark:text-slate-500 text-slate-400">↗</span>
            </motion.a>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-6" />

        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs dark:text-slate-500 text-slate-600">
          <div className="flex items-center gap-2"><span className="text-blue-500">$</span><span>{footerContent.copyright}</span></div>
          <div className="flex items-center gap-4"><span className="dark:text-slate-600 text-slate-400">v1.0.0</span><a href={footerContent.source} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">view source</a></div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8 text-center font-mono text-xs dark:text-slate-600 text-slate-400">
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

const StatusItem: FC<{ label: string; value: string; color?: 'blue' | 'green' | 'amber' }> = ({ label, value, color }) => {
  const colorClasses = { blue: 'text-blue-500', green: 'text-green-500', amber: 'text-amber-500' }
  return (<span className="inline-flex items-center gap-1"><span className="dark:text-slate-400 text-slate-500">[</span><span>{label}:</span><span className={color ? colorClasses[color] : 'dark:text-slate-400 text-slate-500'}>{value}</span><span className="dark:text-slate-400 text-slate-500">]</span></span>)
}

const QuickLink: FC<{ href: string; command: string }> = ({ href, command }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); const element = document.querySelector(href); if (element) element.scrollIntoView({ behavior: 'smooth' }) }
  return (<li><a href={href} onClick={handleClick} className={cn('inline-flex items-center gap-2', 'dark:text-slate-400 text-slate-600 hover:text-blue-500', 'transition-colors duration-200')}><span className="dark:text-slate-500 text-slate-400">$</span><span>{command}</span></a></li>)
}

const SocialLink: FC<{ href: string; label: string; icon: string }> = ({ href, label, icon }) => (
  <motion.a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className={cn('inline-flex items-center justify-center', 'w-10 h-10 rounded', 'border border-slate-200 dark:border-slate-700', 'font-mono text-sm dark:text-slate-400 text-slate-600', 'hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10', 'transition-all duration-200')}
    whileHover={{ y: -2, scale: 1.05 }} whileTap={{ scale: 0.95 }}>[{icon}]</motion.a>
)

export default Footer
