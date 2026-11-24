import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const Skills: FC = () => {
  const { skills } = useLanguage().c

  return (
    <Section id="skills" title={skills.title}>
      <ul className="border-t border-line">
        {skills.rows.map((row) => (
          <li key={row} className="border-b border-line py-3 text-sm text-ink-2">
            {row}
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Skills
