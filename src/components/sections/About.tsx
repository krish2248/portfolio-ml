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
        {/* Left: GitHub Stats, Spotify */}
        <motion.div variants={fadeInUp} className="space-y-4">
          {/* GitHub Stats */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-400 font-mono text-sm">contributions</span>
            </div>
            <div className="p-5 space-y-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label="View GitHub profile"
              >
                <img
                  src="https://ghchart.rshah.org/22c55e/krish2248"
                  alt="Krish Soni's GitHub contribution graph"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </a>
              <img
                src="https://github-readme-stats.vercel.app/api?username=krish2248&show_icons=true&include_all_commits=true&count_private=true&hide=contribs&hide_border=true&bg_color=00000000&icon_color=22c55e&title_color=22c55e&text_color=64748b"
                alt="Krish Soni's GitHub stats"
                className="w-full h-auto"
                loading="lazy"
              />
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
