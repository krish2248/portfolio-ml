# Project context: sonikrish.com

Personal portfolio of Krish Hemang Soni. Read this first in any new session.

## Who / why

- Krish is doing an **M.Sc. Data Science at TU Dortmund**, winter intake 2026/27, 2026–2028. He lives in Dortmund.
- He was a **Data Scientist at PRM & Company (PRM Pharmaceuticals)** in Bhavnagar, India, from 2 Jun 2025 to **31 Oct 2026**. Describe PRM as "a pharmaceutical company": never "manufacturer", and don't mention manufacturing. His PRM work: data analysis, data visualisation (Python libraries only), website development. Do **not** add SEO or app development to the PRM entry.
- The site's goal is to land **Werkstudent, internship and HiWi / research assistant** roles in data science, analytics and ML engineering, available from **November 2026**.
- Content source: his **final CVs (Oct 2026)** in Downloads: `CV_Krish_Soni.pdf` (English, photo, address, DOB), `Lebenslauf_Krish_Soni.pdf` (German version of it) and `Resume_Krish_Soni.pdf` (no photo, address or DOB; has the full project list). Older drafts like `Krish_Hemang_Soni_CV_Academic.pdf`, the PRM recommendation letter and a LinkedIn post are background only. The site must not claim more than the final CVs (e.g. FUTOLOGY's ML features are a *next milestone*, not shipped).
- Only `Resume_Krish_Soni.pdf` is public (`public/Krish_Soni_Resume.pdf`). Krish chose not to publish the CV/Lebenslauf because they show his home address and date of birth. Never put those on the site.
- Note: the CVs themselves call PRM a "manufacturer" and mention manufacturing orders; the site rule below still applies to the site.

## Stack and deploy

- React 18, TypeScript, Vite and Tailwind 3. No animation library.
- **Pushing to `master` deploys to GitHub Pages** at sonikrish.com through `.github/workflows/deploy.yml`. Remote: `github.com/krish2248/portfolio-ml`.
- `bun run build` type-checks and builds. Run it before every push.

## Where things live

- `src/lib/data.ts`: **all content**: site config, availability, open-to roles, projects (featured, more, personal), experience, education, skills, references, study repos.
- **Two languages (EN/DE).** `src/lib/data.ts` is the English content; `src/lib/data.de.ts` overrides the text by id (projects, jobs, education) for German. Interface text (nav, titles, buttons) is in `src/lib/i18n.ts`. Components read both through `useLanguage()` (`src/context/LanguageContext.tsx`): `t` = interface text, `c` = content. The EN | DE switch sits next to the theme toggle; default is English, the choice is saved, and `?lang=de` links straight to German. **When you change English content, update data.de.ts too.** Reference quotes stay in the original English.
- `src/components/sections/`: Hero, OpenTo, Experience (includes the references quotes), Education (includes skills), Projects, Elsewhere, Contact. That is also the page order (set in `src/App.tsx`; nav order in `navLinks` in data.ts).
- `src/components/ui/ProjectCover.tsx`: drawn SVG project thumbnails. Each project picks one with `motif` in data.ts. To add a motif, add it to the `CoverMotif` type and the `motifs` map.
- `src/styles/globals.css`: colour tokens for light (warm paper `#f6f5f0`) and dark (forest green `#091413`, his choice). Components use the token colours (`bg`, `surface`, `plate`, `ink`, `ink-2`, `muted`, `line`, `line-strong`, `accent`) rather than `dark:` variants.
  - The cover colour is named `plate` because `bg-cover` clashes with a built-in Tailwind utility.
  - Opacity modifiers like `bg-bg/95` don't work on these `var()` colours.
- `public/`: `Krish_Soni_Resume.pdf` (CV button in Hero + Contact via `siteConfig.resumeUrl`), `krish-soni.jpg` (light-mode hero portrait, 480×600 crop of his car selfie, `siteConfig.photoUrl`), `krish-soni-dark.jpg` (dark-mode portrait, green-lit version of the same selfie, `siteConfig.photoUrlDark`; Hero swaps them with `dark:hidden` / `hidden dark:block`), `og-image.jpg` (1200×630 social preview; rendered from an HTML card with headless Chrome, regenerate it if name/role/availability change).
- Fonts: IBM Plex Sans (body), IBM Plex Mono (metadata), Source Serif 4 (headings), loaded in `index.html`.

- Medium handle is `@krish2248` (confirmed by Krish, 28 Oct 2026).

## Design rules Krish asked for

- It should look deliberate, **not "vibe-coded"**. Avoid fake terminal commands, emoji icons, ASCII boxes, macOS window dots, typewriter effects, inflated stats, generic GitHub OG thumbnails and hover wobble everywhere.
- Keep the editorial layout: a label column on the left and content on the right, with one green accent colour.
- Only claim things his CV supports.

## History (Oct 2026)

| Commit | What |
|---|---|
| tag `pre-redesign-2026-10` (= `19904bb`) | Old retro-terminal site, kept so it can be restored |
| `944f13f` | Full redesign: TU Dortmund content, new sections, drawn covers, new design. Deleted dead code, unused deps and 3 dead project repos (cancer predictor, linear and logistic regression all 404). Fixed the Fut-Score link. Replaced the fake contact form with direct links |
| `3f18dd9` | Reference quote names aligned (figcaption `mt-auto min-h-[4.5rem]`) |
| `a1a92f9` | PRM described as "a pharmaceutical company"; removed "manufacturing orders" from the first PRM bullet |
| `94af85d` | First PRM bullet now says "analysed and visualised data … in Python"; stack line lists Matplotlib, Seaborn |
| tag `pre-reorder-2026-10` (= `5ebf85d`) | Backup before the section reorder (old order: Open to, Projects, Experience, Education, Elsewhere, Contact) |
| `69a4029` | Sections and nav reordered: Open to, Experience, Education & skills, Projects, Elsewhere, Contact |
| tag `pre-cv-2026-10` (= `fbe0d16`) | Backup before the final-CV sync |
| `73b652c` | Final CV sync: resume PDF, hero photo, OG image, German A1, content matched to final CVs |
| tag `pre-i18n-2026-10` (= `9769df9`) | Backup before the German version |
| `efb3832` | EN/DE language switch, full German translation |

**Undo:**
- Everything: `git revert 944f13f 3f18dd9 a1a92f9`.
- One file: `git checkout pre-redesign-2026-10 -- <path>`.
- View the old version: `git show pre-redesign-2026-10:<path>`.
- Final-CV sync only: `git revert 73b652c`.
- Section order only: `git revert 69a4029`, or `git checkout pre-reorder-2026-10 -- src/App.tsx src/lib/data.ts`.

## Next up (pending)

1. Optional: drop the reference quotes if he'd rather keep them CV-only.
2. After 31 Oct 2026, re-read the hero/intro so PRM reads as a past job.
