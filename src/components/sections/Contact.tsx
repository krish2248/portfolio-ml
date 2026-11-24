import { FC } from 'react'
import { site } from '@/content'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const Contact: FC = () => {
  const { contact } = useLanguage().c
  const links = [
    { label: contact.email, value: site.email, href: `mailto:${site.email}` },
    { label: 'LinkedIn', value: 'krish-soni-460932228', href: site.linkedin },
    { label: 'GitHub', value: 'krish2248', href: site.github },
    { label: 'Medium', value: '@krish2248', href: site.medium },
    { label: contact.cv, value: contact.cvValue, href: site.cv },
  ]

  return (
    <Section id="contact" title={contact.title}>
      <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">{contact.pitch}</p>
      <dl className="mt-8 grid border-t border-line md:grid-cols-2 md:gap-x-10 xl:gap-x-16">
        {links.map((link) => (
          <div key={link.label} className="grid min-h-14 grid-cols-[6.5rem_1fr] items-center gap-3 border-b border-line py-2">
            <dt className="text-sm text-muted">{link.label}</dt>
            <dd className="min-w-0 break-words">
              <a
                href={link.href}
                {...(!link.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                className="link text-ink"
              >
                {link.value}
              </a>
            </dd>
          </div>
        ))}
        <div className="grid min-h-14 grid-cols-[6.5rem_1fr] items-center gap-3 border-b border-line py-2">
          <dt className="text-sm text-muted">{contact.location}</dt>
          <dd className="text-ink-2">{contact.locationValue}</dd>
        </div>
      </dl>
    </Section>
  )
}

export default Contact
