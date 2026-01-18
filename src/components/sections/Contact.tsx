/**
 * Contact Section Component
 * Mail client style contact form
 */

import { FC, useState, memo, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { siteConfig, socialLinks } from '../../lib/data'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'
import { TerminalWindow, Button } from '../ui'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

/**
 * Contact section styled like a terminal mail client
 * Includes form and direct contact info
 */
const Contact: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In production, send to your API/email service
    console.log('Form submitted:', formData)

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitted(false)
    }, 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <Section id="contact" terminalHeader="CONTACT" background="subtle">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Left: Contact form */}
        <motion.div variants={fadeInLeft}>
          <TerminalWindow title="mail --compose">
            {isSubmitted ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* To field (read-only) */}
                <FormField
                  label="To"
                  value={siteConfig.email}
                  readOnly
                  prefix="📧"
                />

                {/* From field */}
                <FormField
                  label="From"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  error={errors.email}
                  prefix="@"
                />

                {/* Name field */}
                <FormField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  error={errors.name}
                  prefix="👤"
                />

                {/* Subject field */}
                <FormField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  prefix="📝"
                />

                {/* Message field */}
                <div>
                  <label className="block font-mono text-sm text-phosphor-dim mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={6}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg font-mono text-sm',
                      'bg-terminal-black border resize-none',
                      'text-phosphor placeholder:text-phosphor-muted/50',
                      'focus:outline-none focus:ring-2 focus:ring-phosphor focus:border-phosphor',
                      'transition-all duration-200',
                      errors.message
                        ? 'border-red-500'
                        : 'border-phosphor-muted/50 hover:border-phosphor-muted'
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </TerminalWindow>
        </motion.div>

        {/* Right: Direct contact info */}
        <motion.div variants={fadeInRight} className="space-y-6">
          {/* Contact info card */}
          <div className={cn(
            'p-6 rounded-lg',
            'border border-phosphor-muted/50 bg-terminal-dark/50'
          )}>
            <h3 className="font-display text-lg text-phosphor mb-4">
              <span className="text-phosphor-muted">{'// '}</span>
              Direct Contact
            </h3>

            <ul className="space-y-4">
              <ContactItem
                icon="📧"
                label="Email"
                value={siteConfig.email}
                href={socialLinks.email}
              />
              <ContactItem
                icon="📍"
                label="Location"
                value={siteConfig.location}
              />
              <ContactItem
                icon="💼"
                label="Status"
                value={siteConfig.availability}
                highlight
              />
            </ul>
          </div>

          {/* Social links card */}
          <div className={cn(
            'p-6 rounded-lg',
            'border border-phosphor-muted/50 bg-terminal-dark/50'
          )}>
            <h3 className="font-display text-lg text-phosphor mb-4">
              <span className="text-phosphor-muted">{'// '}</span>
              Connect
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton href={socialLinks.github} label="GitHub" icon="GH" />
              <SocialButton href={socialLinks.linkedin} label="LinkedIn" icon="IN" />
              <SocialButton href={socialLinks.twitter} label="Twitter" icon="TW" />
              <SocialButton href={socialLinks.email} label="Email" icon="@" />
            </div>
          </div>

          {/* ASCII art */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <pre className="inline-block font-mono text-[10px] text-phosphor-muted leading-tight opacity-50">
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

/**
 * Form field component
 */
interface FormFieldProps {
  label: string
  name?: string
  type?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  prefix?: string
  readOnly?: boolean
}

const FormField: FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  prefix,
  readOnly,
}) => (
  <div>
    <label className="block font-mono text-sm text-phosphor-dim mb-2">
      {label} {!readOnly && '*'}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-phosphor-muted">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={cn(
          'w-full py-3 rounded-lg font-mono text-sm',
          'bg-terminal-black border',
          'text-phosphor placeholder:text-phosphor-muted/50',
          'focus:outline-none focus:ring-2 focus:ring-phosphor focus:border-phosphor',
          'transition-all duration-200',
          prefix ? 'pl-10 pr-4' : 'px-4',
          readOnly && 'opacity-75 cursor-not-allowed',
          error
            ? 'border-red-500'
            : 'border-phosphor-muted/50 hover:border-phosphor-muted'
        )}
      />
    </div>
    {error && (
      <p className="mt-1 font-mono text-xs text-red-500">{error}</p>
    )}
  </div>
)

/**
 * Contact info item
 */
interface ContactItemProps {
  icon: string
  label: string
  value: string
  href?: string
  highlight?: boolean
}

const ContactItem: FC<ContactItemProps> = ({ icon, label, value, href, highlight }) => {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-lg">{icon}</span>
      <div>
        <span className="block font-mono text-xs text-phosphor-muted uppercase">
          {label}
        </span>
        <span className={cn(
          'font-mono text-sm',
          highlight ? 'text-phosphor' : 'text-phosphor-dim'
        )}>
          {value}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <li>
        <a
          href={href}
          className="block hover:text-glow transition-all duration-200"
        >
          {content}
        </a>
      </li>
    )
  }

  return <li>{content}</li>
}

/**
 * Social media button
 */
interface SocialButtonProps {
  href: string
  label: string
  icon: string
}

const SocialButton: FC<SocialButtonProps> = ({ href, label, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      'flex items-center justify-center gap-2 p-3 rounded-lg',
      'border border-phosphor-muted/50 bg-terminal-black',
      'font-mono text-sm text-phosphor-dim',
      'hover:border-phosphor hover:text-phosphor hover:bg-phosphor/5',
      'transition-all duration-200'
    )}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
  >
    <span>[{icon}]</span>
    <span>{label}</span>
  </motion.a>
)

/**
 * Success message after form submission
 */
const SuccessMessage: FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-8"
  >
    <div className="text-4xl mb-4">✓</div>
    <h3 className="font-display text-xl text-phosphor mb-2">Message Sent!</h3>
    <p className="font-mono text-sm text-phosphor-dim">
      Thanks for reaching out. I'll get back to you soon.
    </p>
    <pre className="mt-4 font-mono text-xs text-phosphor-muted">
{`$ mail --status
Message queued for delivery...
[OK] Sent successfully`}
    </pre>
  </motion.div>
)

export default Contact
