import { FC } from 'react'
import { site } from '@/content'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const Contact: FC = () => {
  const { contact } = useLanguage().c

  return (
    <Section id="contact" title={contact.title}>
      <dl className="max-w-xl border-t border-line">
        <div className="grid min-h-14 grid-cols-[7rem_1fr] items-center gap-3 border-b border-line py-2">
          <dt className="text-sm leading-6 text-muted">{contact.email}</dt>
          <dd className="min-w-0 break-words">
            <a href={`mailto:${site.email}`} className="link text-ink">
              {site.email}
            </a>
          </dd>
        </div>
        <div className="grid min-h-14 grid-cols-[7rem_1fr] items-center gap-3 border-b border-line py-2">
          <dt className="text-sm leading-6 text-muted">{contact.location}</dt>
          <dd className="text-ink-2">{contact.locationValue}</dd>
        </div>
      </dl>
    </Section>
  )
}

export default Contact
