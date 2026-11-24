import { FC } from 'react'
import { site } from '@/content'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'
import ProjectCover from '../ui/ProjectCover'

const Bored: FC = () => {
  const { bored } = useLanguage().c

  return (
    <Section id="bored" title={bored.title}>
      <div className="grid gap-10 md:grid-cols-[20rem_1fr] md:gap-12 xl:gap-16">
        <div>
          <div className="overflow-hidden rounded-lg border border-line">
            <ProjectCover motif="video" className="aspect-[2/1]" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-ink">
            <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="link">
              {bored.youtube.title} ↗
            </a>
          </h3>
          <p className="text-ink-2">{bored.youtube.text}</p>
        </div>

        <div>
          <h3 className="eyebrow">{bored.blogs.title}</h3>
          <ul className="mt-3 border-t border-line">
            {bored.blogs.items.map((blog) => (
              <li key={blog.title} className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-line py-2.5">
                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="link text-ink">
                  {blog.title} ↗
                </a>
                <span className="font-mono text-sm text-muted">{blog.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default Bored
