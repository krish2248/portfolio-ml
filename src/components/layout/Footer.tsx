import { FC } from 'react'
import { site } from '@/content'
import { useLanguage } from '@/context/LanguageContext'

const Footer: FC = () => {
  const { c } = useLanguage()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name} · {c.contact.locationValue}
        </p>
        <p className="flex flex-wrap gap-x-5">
          {site.legalPublished && (
            <>
              <a href="/impressum/" className="link">
                {c.ui.impressum}
              </a>
              <a href="/datenschutz/" className="link">
                {c.ui.privacy}
              </a>
            </>
          )}
          <a href={site.source} target="_blank" rel="noopener noreferrer" className="link">
            {c.ui.source}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
