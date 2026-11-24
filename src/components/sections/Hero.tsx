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
      // Fills the first screen. The top padding is the header, so the content is centred in what is left.
      className="mx-auto grid min-h-svh max-w-page content-center items-center gap-12 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-20 lg:pb-0 lg:pt-16 xl:gap-28"
    >
      <div>
        <p className="font-mono text-base text-muted">{hero.tagline}</p>
        <h1 className="mt-5 font-serif text-5xl font-medium tracking-tight text-ink sm:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-none">{site.name}</h1>
        <p className="mt-7 max-w-3xl font-serif text-2xl leading-snug text-ink-2 sm:text-[1.75rem] xl:text-[2rem]">{hero.statement}</p>
        <div className="mt-10 flex flex-wrap gap-2.5">
          <ButtonLink href={site.cv} variant="primary" external download={site.cv.split('/').pop()}>
            {hero.buttons.cv}
          </ButtonLink>
          <ButtonLink href={site.github} external>
            GitHub
          </ButtonLink>
          <ButtonLink href={site.linkedin} external>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={site.medium} external>
            Medium
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`}>{hero.buttons.email}</ButtonLink>
        </div>
      </div>
      <Now />
    </section>
  )
}

export default Hero
