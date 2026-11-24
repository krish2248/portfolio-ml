import { FC } from 'react'
import { notFound } from '@/content'
import { langPath } from '@/lib/lang'
import SimpleHeader from '../layout/SimpleHeader'

/** One page for every missing address, so it carries both languages. */
const NotFound: FC = () => (
  <>
    <SimpleHeader home={langPath.en} />
    <main id="main" tabIndex={-1} className="mx-auto min-h-[60vh] max-w-page px-5 py-14 outline-none sm:px-8 md:py-24">
      <p className="font-mono text-base text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-ink sm:text-5xl">{notFound.en.title}</h1>
      <p className="mt-4 max-w-measure text-ink-2">{notFound.en.text}</p>
      <p className="mt-2">
        <a href={langPath.en} className="link text-ink">
          {notFound.en.link}
        </a>
      </p>
      <div lang="de" className="mt-10 max-w-measure border-t border-line pt-6">
        <p className="text-ink-2">{notFound.de.text}</p>
        <p className="mt-2">
          <a href={langPath.de} className="link text-ink">
            {notFound.de.link}
          </a>
        </p>
      </div>
    </main>
  </>
)

export default NotFound
