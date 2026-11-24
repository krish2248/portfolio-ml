import { FC } from 'react'
import { site } from '@/content'
import { hasPlaceholders, legal } from '@/legal'
import { langPath } from '@/lib/lang'
import type { LegalPage } from '@/lib/pages'
import ThemeToggle from '../ui/ThemeToggle'

/** Highlights [[placeholders]] so none can be missed. */
const Text: FC<{ children: string }> = ({ children }) => (
  <>
    {children.split(/(\[\[.*?\]\])/).map((part, i) =>
      part.startsWith('[[') ? (
        <mark key={i} className="rounded border border-dashed border-accent bg-accent-soft px-1 text-ink">
          {part.slice(1, -1)}
        </mark>
      ) : (
        part
      )
    )}
  </>
)

/** /impressum and /datenschutz. German only. */
const Legal: FC<{ page: LegalPage }> = ({ page }) => {
  const text = legal[page]

  return (
    <>
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
          <a href={langPath.de} className="font-serif text-lg font-medium tracking-tight text-ink">
            {site.name}
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto max-w-page px-5 py-14 outline-none sm:px-8 md:py-20">
        <div className="max-w-measure">
          {hasPlaceholders(text) && (
            <p className="mb-8 rounded-lg border border-accent p-4 text-ink">
              Vorlage, nicht veröffentlicht. Alle markierten Stellen müssen ausgefüllt oder gelöscht werden.
            </p>
          )}
          <h1 className="font-serif text-4xl font-medium tracking-tight text-ink [overflow-wrap:anywhere]">{text.title}</h1>
          {text.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-ink-2">
                  <Text>{paragraph}</Text>
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
    </>
  )
}

export default Legal
