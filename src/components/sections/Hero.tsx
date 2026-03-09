/**
 * Hero Section Component
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { siteConfig, socialLinks } from '../../lib/data'
import { useTypewriter } from '../../hooks/useTypewriter'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { Button } from '../ui'

const Hero: FC = memo(() => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Solid background */}
      <div className="absolute inset-0 dark:bg-slate-950 bg-white" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Intro text */}
          <div className="text-center lg:text-left">
            <IntroContent />
          </div>
          
          {/* Right side - Code Block */}
          <motion.div variants={fadeInUp} className="hidden lg:block">
            <CodeBlock />
            <StatsGrid />
          </motion.div>
        </div>
      </motion.div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 -z-10">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-16 dark:fill-slate-950 fill-white">
          <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"/>
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  )
})

Hero.displayName = 'Hero'

const CodeBlock: FC = () => {
  return (
    <div className="relative">
      <div className="relative dark:bg-[#0f1419] bg-[#f5f3ff] rounded-xl overflow-hidden dark:border-slate-700 border border-indigo-200">
        {/* Window header */}
        <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#161b22] bg-[#eef2ff] border-b dark:border-slate-700 border-indigo-200">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-4 text-xs dark:text-slate-400 text-indigo-500 font-mono">developer.ts</span>
        </div>
        
        {/* Code content */}
        <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto dark:text-slate-300 text-indigo-900">
          <pre><code>
            <span className="dark:text-slate-500 text-indigo-400">// TypeScript · ML Engineer 🔒</span>
            <br />
            <span className="dark:text-blue-400 text-purple-600">interface</span> <span className="dark:text-indigo-400 text-indigo-600">Developer</span> {'{'}
            <br />
            {'  '}name:    <span className="dark:text-yellow-300 text-pink-500">string</span>;
            <br />
            {'  '}stack:   <span className="dark:text-yellow-300 text-pink-500">string</span>[];
            <br />
            {'  '}deploy:  (model: <span className="dark:text-yellow-300 text-pink-500">string</span>) <span className="dark:text-blue-400 text-purple-600">=&gt;</span> <span className="dark:text-indigo-400 text-indigo-600">Promise</span>&lt;<span className="dark:text-yellow-300 text-pink-500">void</span>&gt;;
            <br />
            {'}'}
            <br />
            <span className="dark:text-blue-400 text-purple-600">const</span> <span className="dark:text-blue-300 text-blue-600">me</span>: <span className="dark:text-indigo-400 text-indigo-600">Developer</span> = {'{'}
            <br />
            {'  '}name:  <span className="dark:text-green-300 text-green-600">"Krish Soni"</span>,
            <br />
            {'  '}stack: [<span className="dark:text-green-300 text-green-600">"PyTorch"</span>, <span className="dark:text-green-300 text-green-600">"HuggingFace"</span>, <span className="dark:text-green-300 text-green-600">"React"</span>,
            <br />
            {'    '}<span className="dark:text-green-300 text-green-600">"TensorFlow"</span>, <span className="dark:text-green-300 text-green-600">"TypeScript"</span>, <span className="dark:text-green-300 text-green-600">"AWS"</span>],
            <br />
            <br />
            {'  '}deploy: <span className="dark:text-blue-400 text-purple-600">async</span> (model) <span className="dark:text-blue-400 text-purple-600">=&gt;</span> {'{'}
            <br />
            {'    '}<span className="dark:text-blue-400 text-purple-600">const</span> <span className="dark:text-blue-300 text-blue-600">pipeline</span> = <span className="dark:text-yellow-300 text-pink-500">buildMLPipeline</span>(model);
            <br />
            {'    '}<span className="dark:text-blue-400 text-purple-600">await</span> <span className="dark:text-yellow-300 text-pink-500">pushToAWS</span>(pipeline);
            <br />
            {'    '}console.<span className="dark:text-yellow-300 text-pink-500">log</span>(<span className="dark:text-green-300 text-green-600">"🚀 Deployed to production!"</span>);
            <br />
            {'  }'}
            <br />
            {'}'};
            <br />
            <br />
            <span className="dark:text-slate-500 text-indigo-400">// Building intelligent systems...</span>
          </code></pre>
        </div>
      </div>
    </div>
  )
}

const StatsGrid: FC = () => {
  const stats = [
    { value: '10+', label: 'Projects' },
    { value: '3+', label: 'Internships' },
    { value: '5+', label: 'Hackathons' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          className="dark:bg-slate-800/50 bg-white border dark:border-slate-700 border-slate-200 rounded-xl p-3 text-center"
        >
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            {stat.value}
          </p>
          <p className="text-xs dark:text-slate-400 text-slate-500 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

const IntroContent: FC = () => {
  const { displayedText: tagline } = useTypewriter({
    text: siteConfig.tagline,
    speed: 50,
    delay: 500,
  })

  return (
    <>
      <motion.div variants={fadeInUp} className="mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-slate-800/50 bg-blue-50 border dark:border-slate-700 border-blue-100 text-xs font-mono dark:text-blue-400 text-blue-600">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Open to AI & Software Roles
        </span>
      </motion.div>

      <motion.div variants={fadeInUp} className="mb-4">
        <span className="font-mono text-sm md:text-base dark:text-slate-400 text-slate-600">
          <span className="text-blue-500">{'<'}</span> Hello, I'm<span className="text-blue-500">{'/>'}</span>
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
      >
        <span className="dark:text-white text-slate-900">{siteConfig.name}</span>
      </motion.h1>

      <motion.div variants={fadeInUp} className="mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl dark:text-slate-300 text-slate-700">
          {siteConfig.title}
        </h2>
      </motion.div>

      <motion.div variants={fadeInUp} className="mb-8 h-8">
        <p className="font-mono text-base md:text-lg dark:text-slate-400 text-slate-600">
          {tagline}
          <span className="animate-blink">_</span>
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
      >
        <SocialButton href={siteConfig.resumeUrl} label="Resume" icon="📄" />
        <SocialButton href={socialLinks.github} label="GitHub" icon="GH" />
        <SocialButton href={socialLinks.linkedin} label="LinkedIn" icon="IN" />
        <SocialButton href={socialLinks.medium} label="Medium" icon="M" />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
      >
        <Button onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
          View My Work
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Button>
        <Button variant="ghost" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Contact Me
        </Button>
      </motion.div>
    </>
  )
}

const SocialButton: FC<{ href: string; label: string; icon: string }> = ({ href, label, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 font-mono text-sm"
    whileHover={{ y: -2 }}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </motion.a>
)

const ScrollIndicator: FC = () => (
  <motion.div
    className="flex flex-col items-center gap-2 dark:text-slate-500 text-slate-400"
    animate={{ y: [0, 5, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <span className="font-mono text-xs">scroll</span>
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </motion.div>
)

export default Hero
