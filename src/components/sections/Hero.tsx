import { FC } from 'react'
import { siteConfig, availability, socialLinks, quickFacts } from '@/lib/data'
import { ButtonLink } from '../ui/ButtonLink'

const Hero: FC = () => (
  <section id="top" className="mx-auto max-w-page px-5 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-36">
    <div className="grid gap-12 lg:grid-cols-[1fr_19rem] lg:gap-16">
      <div>
        <p className="eyebrow">{siteConfig.role}</p>
        <h1 className="mt-4 font-serif text-5xl font-medium tracking-tight text-ink sm:text-6xl">{siteConfig.name}</h1>
        <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug text-ink-2 sm:text-[1.7rem]">{siteConfig.statement}</p>
        <p className="mt-5 max-w-2xl text-ink-2">{siteConfig.intro}</p>

        <div className="mt-10 max-w-2xl rounded-lg border border-line bg-surface p-5 sm:p-6">
          <p className="flex items-center gap-2 text-sm font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Available from {availability.from}
          </p>
          <p className="mt-2 text-lg text-ink">{availability.roles.join(' · ')}</p>
          <p className="mt-1 text-sm text-muted">{availability.terms}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href={socialLinks.email} variant="primary">
              Email me
            </ButtonLink>
            <ButtonLink href={socialLinks.linkedin} external>
              LinkedIn
            </ButtonLink>
            <ButtonLink href={socialLinks.github} external>
              GitHub
            </ButtonLink>
            {siteConfig.resumeUrl && (
              <ButtonLink href={siteConfig.resumeUrl} external>
                CV (PDF)
              </ButtonLink>
            )}
          </div>
        </div>
      </div>

      <div className="self-end lg:mb-1">
        <img
          src={siteConfig.photoUrl}
          alt={`Portrait of ${siteConfig.fullName}`}
          width={480}
          height={600}
          className="mb-6 w-32 rounded-md border border-line sm:w-36"
        />
        <dl className="border-t border-line">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[6rem_1fr] gap-3 border-b border-line py-3 text-sm">
              <dt className="text-muted">{fact.label}</dt>
              <dd className="text-ink-2">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
)

export default Hero
