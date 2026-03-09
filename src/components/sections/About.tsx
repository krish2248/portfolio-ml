/**
 * About Section Component
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { siteConfig, aboutContent, socialLinks } from '../../lib/data'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'

const About: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <Section id="about" terminalHeader="ABOUT">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
      >
        {/* Left: GitHub Stats, Interests, Spotify */}
        <motion.div variants={fadeInUp} className="space-y-4">
          {/* GitHub Contribution Graph */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-400 font-mono text-sm">github contributions</span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-500">1,234</div>
                  <div className="text-xs dark:text-slate-500 text-slate-500">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-500">89</div>
                  <div className="text-xs dark:text-slate-500 text-slate-500">Commits</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-500">45</div>
                  <div className="text-xs dark:text-slate-500 text-slate-500">PRs</div>
                </div>
              </div>
              {/* GitHub-style contribution grid */}
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 justify-center">
                  {[0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.4, 0.6, 0.8, 1, 1, 0.8, 0.6, 0.4, 0.2, 0.4, 0.6, 0.8].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[1, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 0.8].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0, 0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, 0.2].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[1, 0.8, 0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 0.8].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
                <div className="flex gap-1 justify-center">
                  {[0.6, 0.4, 0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4].map((val, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-green-500" style={{ opacity: val }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-400 font-mono text-sm">interests</span>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚽</span>
                <span className="font-mono text-sm dark:text-slate-300 text-slate-700">FC Barcelona</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🔴</span>
                <span className="font-mono text-sm dark:text-slate-300 text-slate-700">Liverpool FC</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📚</span>
                <span className="font-mono text-sm dark:text-slate-300 text-slate-700">Reading Books</span>
              </div>
            </div>
          </div>

          {/* Spotify Playlist */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-400 font-mono text-sm">spotify</span>
            </div>
            <div className="p-2">
              <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/playlist/44C6WWaRGjk1exEyloQKbz?utm_source=generator&theme=0" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Right: About Text */}
        <motion.div variants={fadeInUp} className="space-y-6">
          <div className="space-y-6">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeInUp}
                custom={index}
                className="dark:text-slate-400 text-slate-600 leading-relaxed text-sm md:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
            <InfoLink href={siteConfig.resumeUrl} label="Resume" icon="📄" />
            <InfoLink href={socialLinks.github} label="GitHub" icon="GH" external />
            <InfoLink href={socialLinks.linkedin} label="LinkedIn" icon="IN" external />
            <InfoLink href={socialLinks.medium} label="Medium" icon="M" external />
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  )
})

About.displayName = 'About'

const InfoLink: FC<{ href: string; label: string; icon: string; external?: boolean }> = ({ href, label, icon, external }) => (
  <motion.a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 font-mono text-sm"
    whileHover={{ y: -2 }}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </motion.a>
)

export default About
