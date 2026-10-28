import { FC } from 'react'
import { footerContent } from '@/lib/data'
import { useLanguage } from '@/context/LanguageContext'

const Footer: FC = () => {
  const { t, c } = useLanguage()
  const { siteConfig } = c

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {siteConfig.fullName} · {siteConfig.location}
        </p>
        <p>
          {t.footer.updated(siteConfig.updated)} ·{' '}
          <a href={footerContent.source} target="_blank" rel="noopener noreferrer" className="link">
            {t.footer.source}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
