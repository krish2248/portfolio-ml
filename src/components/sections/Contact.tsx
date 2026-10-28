import { FC } from 'react'
import { siteConfig, socialLinks, availability } from '@/lib/data'
import Section from '../layout/Section'

const links = [
  { label: 'Email', value: siteConfig.email, href: socialLinks.email },
  { label: 'LinkedIn', value: 'krish-soni-460932228', href: socialLinks.linkedin },
  { label: 'GitHub', value: 'krish2248', href: socialLinks.github },
  { label: 'Medium', value: '@krish2248', href: socialLinks.medium },
  ...(siteConfig.resumeUrl ? [{ label: 'CV', value: 'Download PDF', href: siteConfig.resumeUrl }] : []),
]

const Contact: FC = () => (
  <Section id="contact" title="Contact">
    <p className="max-w-2xl font-serif text-2xl leading-snug text-ink sm:text-3xl">
      Hiring a Werkstudent, intern or HiWi from {availability.from}? Email is the quickest way to reach me.
    </p>
    <a
      href={socialLinks.email}
      className="mt-6 inline-block text-lg text-accent underline decoration-1 underline-offset-4 hover:text-ink"
    >
      {siteConfig.email}
    </a>

    <dl className="mt-10 max-w-xl border-t border-line">
      {links.map((link) => (
        <div key={link.label} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-line py-3 text-sm">
          <dt className="text-muted">{link.label}</dt>
          <dd>
            <a
              href={link.href}
              {...(!link.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
              className="link text-ink-2"
            >
              {link.value}
            </a>
          </dd>
        </div>
      ))}
      <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-line py-3 text-sm">
        <dt className="text-muted">Location</dt>
        <dd className="text-ink-2">{siteConfig.location}</dd>
      </div>
    </dl>
  </Section>
)

export default Contact
