import { FC } from 'react'
import { site } from '@/content'
import ThemeToggle from '../ui/ThemeToggle'

/** Header for pages outside the main one: name (back to the start) and theme toggle. */
const SimpleHeader: FC<{ home: string }> = ({ home }) => (
  <header className="border-b border-line">
    <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:px-8">
      <a href={home} className="font-serif text-lg font-medium tracking-tight text-ink">
        {site.name}
      </a>
      <ThemeToggle />
    </div>
  </header>
)

export default SimpleHeader
