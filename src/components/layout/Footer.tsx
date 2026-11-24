import { FC } from 'react'
import { site } from '@/content'
import { useLanguage } from '@/context/LanguageContext'

const Footer: FC = () => {
  const { c } = useLanguage()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.fullName} · {c.contact.locationValue}
        </p>
        <p>
          <a href={site.source} target="_blank" rel="noopener noreferrer" className="link">
            {c.ui.source}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
