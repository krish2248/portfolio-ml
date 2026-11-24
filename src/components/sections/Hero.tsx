import { FC } from 'react'
import { site } from '@/content'
import { useLanguage } from '@/context/LanguageContext'
import { ButtonLink } from '../ui/ButtonLink'
import Now from './Now'

const Hero: FC = () => {
  const { hero } = useLanguage().c

  return (
    <section
      id="top"
      className="mx-auto grid max-w-page items-center gap-12 px-5 pb-16 pt-28 sm:px-8 md:pb-20 md:pt-32 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 xl:gap-24"
    >
      <div>
        <p className="font-mono text-base text-muted">{hero.tagline}</p>
        <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-ink sm:text-6xl xl:text-7xl">{site.name}</h1>
        <p className="mt-6 max-w-3xl font-serif text-2xl leading-snug text-ink-2 sm:text-[1.75rem]">{hero.statement}</p>
        <div className="mt-9 flex flex-wrap gap-2">
          <ButtonLink href={site.cv} variant="primary" external download={site.cv.split('/').pop()}>
            {hero.buttons.cv}
          </ButtonLink>
          <ButtonLink href={site.github} external>
            GitHub
          </ButtonLink>
          <ButtonLink href={site.linkedin} external>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`}>{hero.buttons.email}</ButtonLink>
        </div>
      </div>
      <Now />
    </section>
  )
}

export default Hero
