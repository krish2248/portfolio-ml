import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  title: string
  /** Optional one-line note under the title in the left column. */
  note?: string
  children: ReactNode
  className?: string
}

/**
 * Page section: a label column on the left (desktop) and content on the right.
 */
const Section: FC<SectionProps> = ({ id, title, note, children, className }) => (
  <section id={id} className={cn('border-t border-line', className)}>
    <div className="mx-auto grid max-w-page gap-6 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[13rem_1fr] lg:gap-12">
      <header>
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink lg:sticky lg:top-24">{title}</h2>
        {note && <p className="mt-2 max-w-xs text-sm text-muted">{note}</p>}
      </header>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
)

export default Section
