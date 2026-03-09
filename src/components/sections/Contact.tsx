/**
 * Contact Section Component
 */

import { FC, useState, memo, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { siteConfig, socialLinks } from '../../lib/data'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'
import { Button } from '../ui'

interface FormData { name: string; email: string; subject: string; message: string }
interface FormErrors { name?: string; email?: string; message?: string }

const Contact: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => { setFormData({ name: '', email: '', subject: '', message: '' }); setIsSubmitted(false) }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  return (
    <Section id="contact" terminalHeader="CONTACT" background="subtle">
      <motion.div ref={ref as React.RefObject<HTMLDivElement>} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <motion.div variants={fadeInLeft}>
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-4 text-slate-400 font-mono text-sm">mail --compose</span>
            </div>
            <div className="p-4 md:p-6">
              {isSubmitted ? <SuccessMessage /> : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormField label="To" value={siteConfig.email} readOnly prefix="📧" />
                  <FormField label="From" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" error={errors.email} prefix="@" />
                  <FormField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" error={errors.name} prefix="👤" />
                  <FormField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" prefix="📝" />
                  <div>
                    <label className="block font-mono text-sm dark:text-slate-400 text-slate-600 mb-2">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your message here..." rows={6}
                      className={cn('w-full px-4 py-3 rounded-lg font-mono text-sm', 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 resize-none', 'dark:text-white text-slate-900 placeholder:text-slate-400', 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500', 'transition-all duration-200', errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-700')} />
                    {errors.message && <p className="mt-1 font-mono text-xs text-red-500">{errors.message}</p>}
                  </div>
                  <div className="pt-4"><Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? 'Sending...' : 'Send Message'}</Button></div>
                </form>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInRight} className="space-y-6">
          <div className={cn('p-6 rounded-lg', 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50')}>
            <h3 className="font-semibold text-lg dark:text-white text-slate-900 mb-4"><span className="text-blue-500">{'// '}</span>Direct Contact</h3>
            <ul className="space-y-4">
              <ContactItem icon="📧" label="Email" value={siteConfig.email} href={socialLinks.email} />
              <ContactItem icon="📍" label="Location" value={siteConfig.location} />
              <ContactItem icon="💼" label="Status" value={siteConfig.availability} highlight />
            </ul>
          </div>

          <div className={cn('p-6 rounded-lg', 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50')}>
            <h3 className="font-semibold text-lg dark:text-white text-slate-900 mb-4"><span className="text-blue-500">{'// '}</span>Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              <SocialButton href={socialLinks.github} label="GitHub" icon="GH" />
              <SocialButton href={socialLinks.linkedin} label="LinkedIn" icon="IN" />
              <SocialButton href={socialLinks.twitter} label="Twitter" icon="TW" />
              <SocialButton href={socialLinks.email} label="Email" icon="@" />
            </div>
          </div>

          <motion.div variants={fadeInUp} className="text-center">
            <pre className="inline-block font-mono text-[10px] dark:text-slate-600 text-slate-400 leading-tight opacity-50">
{`╔════════════════════════════════════╗
║   Let's build something amazing!   ║
╚════════════════════════════════════╝`}
            </pre>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  )
})

Contact.displayName = 'Contact'

const FormField: FC<{ label: string; name?: string; type?: string; value: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; error?: string; prefix?: string; readOnly?: boolean }> = ({ label, name, type = 'text', value, onChange, placeholder, error, prefix, readOnly }) => (
  <div>
    <label className="block font-mono text-sm dark:text-slate-400 text-slate-600 mb-2">{label} {!readOnly && '*'}</label>
    <div className="relative">
      {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{prefix}</span>}
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly}
        className={cn('w-full py-3 rounded-lg font-mono text-sm', 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700', 'dark:text-white text-slate-900 placeholder:text-slate-400', 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500', 'transition-all duration-200', prefix ? 'pl-10 pr-4' : 'px-4', readOnly && 'opacity-75 cursor-not-allowed', error ? 'border-red-500' : 'border-slate-200 dark:border-slate-700')} />
    </div>
    {error && <p className="mt-1 font-mono text-xs text-red-500">{error}</p>}
  </div>
)

const ContactItem: FC<{ icon: string; label: string; value: string; href?: string; highlight?: boolean }> = ({ icon, label, value, href, highlight }) => {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-lg">{icon}</span>
      <div>
        <span className="block font-mono text-xs dark:text-slate-500 text-slate-500 uppercase">{label}</span>
        <span className={cn('font-mono text-sm', highlight ? 'text-blue-500' : 'dark:text-slate-300 text-slate-700')}>{value}</span>
      </div>
    </div>
  )
  return href ? <li><a href={href} className="block hover:text-blue-500 transition-all duration-200">{content}</a></li> : <li>{content}</li>
}

const SocialButton: FC<{ href: string; label: string; icon: string }> = ({ href, label, icon }) => (
  <motion.a href={href} target="_blank" rel="noopener noreferrer"
    className={cn('flex items-center justify-center gap-2 p-3 rounded-lg', 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900', 'font-mono text-sm dark:text-slate-300 text-slate-700', 'hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10', 'transition-all duration-200')}
    whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
    <span>[{icon}]</span><span>{label}</span>
  </motion.a>
)

const SuccessMessage: FC = () => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
    <div className="text-4xl mb-4 text-green-500">✓</div>
    <h3 className="font-semibold text-xl dark:text-white text-slate-900 mb-2">Message Sent!</h3>
    <p className="font-mono text-sm dark:text-slate-400 text-slate-600">Thanks for reaching out. I'll get back to you soon.</p>
  </motion.div>
)

export default Contact
