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

          {/* Know Me */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <span className="text-slate-400 font-mono text-sm">know-me</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="font-mono text-sm dark:text-slate-300 text-slate-700">
                I'm a mix of <span className="text-blue-500">football</span>,{' '}
                <span className="text-blue-500">coffee</span>,{' '}
                <span className="text-blue-500">indie games</span> and{' '}
                <span className="text-blue-500">classic literature books</span>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <KnowMeCard
                  title="Futology"
                  tag="football"
                  thumbnail="https://opengraph.githubassets.com/1/krish2248/Futology"
                  websiteUrl="https://krish2248.github.io/Futology/"
                  githubUrl="https://github.com/krish2248/Futology"
                />
                <KnowMeCard
                  title="Coffee Journal"
                  tag="coffee"
                  thumbnail="https://opengraph.githubassets.com/1/krish2248/Coffee-Journal---v1.-Type-3-Vol9"
                  websiteUrl="https://krish2248.github.io/Coffee-Journal---v1.-Type-3-Vol9/"
                  githubUrl="https://github.com/krish2248/Coffee-Journal---v1.-Type-3-Vol9"
                />
                <KnowMeCard
                  title="Text Adventure"
                  tag="indie games"
                  thumbnail="https://opengraph.githubassets.com/1/krish2248/Text-Adventure-Game"
                  websiteUrl="https://krish2248.github.io/Text-Adventure-Game/"
                  githubUrl="https://github.com/krish2248/Text-Adventure-Game"
                />
                <KnowMeCard
                  title="Vellum Codex"
                  tag="literature"
                  thumbnail="https://opengraph.githubassets.com/1/krish2248/Vellum-Codex"
                  websiteUrl="https://krish2248.github.io/Vellum-Codex/"
                  githubUrl="https://github.com/krish2248/Vellum-Codex"
                />
              </div>
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

const KnowMeCard: FC<{ title: string; tag: string; thumbnail: string; websiteUrl?: string; githubUrl?: string }> = ({ title, tag, thumbnail, websiteUrl, githubUrl }) => (
  <motion.div
    className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
    whileHover={{ y: -4 }}
  >
    <div className="aspect-[2/1] overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img
        src={thumbnail}
        alt={`${title} preview`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-1 flex-col gap-2 p-3">
      <div>
        <div className="font-mono text-sm font-semibold dark:text-slate-100 text-slate-900 group-hover:text-blue-500 transition-colors">
          {title}
        </div>
        <div className="font-mono text-xs dark:text-slate-500 text-slate-500">{tag}</div>
      </div>
      <div className="mt-auto flex gap-2">
        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-2 py-1 text-center text-xs font-mono rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:hover:text-slate-900 transition-all"
          >
            Website
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-2 py-1 text-center text-xs font-mono rounded border border-slate-300 dark:border-slate-600 dark:text-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-500 transition-all"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  </motion.div>
)

export default About
