# Project context: sonikrish.com

Personal portfolio of Krish Hemang Soni. Read this first in any new session.

## Who / why

- Krish is doing an **M.Sc. Data Science at TU Dortmund**, winter intake 2026/27, 2026–2028. He lives in Dortmund.
- He was a **Data Scientist at PRM & Company (PRM Pharmaceuticals)** in Bhavnagar, India, from 2 Jun 2025 to **31 Oct 2026**. Describe PRM as "a pharmaceutical **marketing** company" (Krish, 24 Nov 2026): it does not manufacture, so never "manufacturer" and don't mention manufacturing. His PRM work: data analysis, data visualisation (Python libraries only), website development. Do **not** add SEO or app development to the PRM entry.
- The site's goal is to land **Werkstudent, HiWi and internship** roles in data science. Wording (Krish, 24 Nov 2026, final): "Open to Werkstudent, HiWi and internship roles" in the Now section and meta description. This replaced the short-lived "open to work / research" wording of the same day.
- **Content source: the text Krish supplied on 24 Nov 2026**, which is `src/content.ts`. Do not invent facts, numbers, dates or projects beyond it. Never mention training colleagues, MedXAI, bootcamps, quiz judging or YouTube. Describe the shop exactly as "on Shopify with custom JavaScript and CSS". The published CV stays as it is unless Krish asks.
- **Public CV:** `public/cv/Krish_Soni_CV.pdf` (since 24 Nov 2026), a privacy-safe build of his Nov 2026 CV: Personal Details block and phone/address removed, PRM reworded as a marketing company. Never publish his phone number, street address, date of birth, residence-permit details or photo, including inside a PDF. His private CV (`Krish_Soni_CV.pdf`) and its HTML source (`Krish_Soni_CV_source.zip`) are in Downloads and are **not** safe to publish as they are. Older CVs: `Desktop/Everything/Docs all/Resume work`.
- Note: the CVs themselves call PRM a "manufacturer" and mention manufacturing orders; the site rule below still applies to the site.

## Stack and deploy

- React 18, TypeScript, Vite and Tailwind 3. No animation library.
- **Pushing to `master` deploys to GitHub Pages** at sonikrish.com through `.github/workflows/deploy.yml`. Remote: `github.com/krish2248/portfolio-ml`.
- `bun run build` type-checks, builds and **pre-renders** `/`, `/de/` and `404.html` (`src/entry-server.tsx` + `scripts/prerender.mjs`, no extra packages). The build fails if content is missing from the HTML. Run it before every push. Components must not read `window`/`document`/`localStorage` while rendering, only in effects, or hydration breaks.

## Where things live

- `src/content.ts`: **all text, English and German**, in one file (links and quotes shared at the top, then `en`, then `de`). **When you change English, change German too.** Components read it with `useLanguage()` (`src/context/LanguageContext.tsx`), where `c` is the content. Language helpers: `src/lib/lang.ts`. The EN | DE switch sits next to the theme toggle and the choice is saved. English is at `/`, German at `/de/`; `?lang=de` redirects to `/de/`. Reference quotes stay in the original English (Krish: keep them).
- `src/components/sections/`, in page order (set in `src/App.tsx`; nav in `Navbar.tsx`): Hero, Now, Experience (with quotes; Krish wants it before Projects), Projects, Education, Skills, Contact.
- `src/components/ui/ProjectCover.tsx`: drawn SVG project covers, picked with `motif` in content.ts. Add new ones to `CoverMotif` and `motifs`. Ten unused covers were deleted on 24 Nov 2026 (in git: `git show pre-rewrite-2026-11:src/components/ui/ProjectCover.tsx`).
- `src/styles/globals.css`: colour tokens for light (warm paper `#f6f5f0`) and dark (forest green `#091413`, his choice). Components use the token colours (`bg`, `surface`, `plate`, `ink`, `ink-2`, `muted`, `line`, `line-strong`, `accent`) rather than `dark:` variants.
  - The cover colour is named `plate` because `bg-cover` clashes with a built-in Tailwind utility.
  - Opacity modifiers like `bg-bg/95` don't work on these `var()` colours.
- `public/`: `cv/Krish_Soni_CV.pdf` (Download CV button; path in `site.cv`), `og-image.jpg` (1200×630 social preview with the "ks" logo, **no photo**). Source is `scripts/og-card.html`; to regenerate after a name/role/availability change, edit it and run Chrome headless: `chrome --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=8000 --screenshot=og.png file:///<abs path>/scripts/og-card.html`, then save as JPEG to `public/og-image.jpg`.
- Head/SEO: title and description are in `content.ts` (`meta`); the English ones are repeated in `index.html` and the build fails if they differ. `public/` also has `robots.txt`, `sitemap.xml` (add new routes), `favicon.svg`/`.ico` and `apple-touch-icon.png`.
- Fonts: IBM Plex Sans (body), IBM Plex Mono (metadata), Source Serif 4 (headings). **Self-hosted** in `src/assets/fonts` via `src/styles/fonts.css`; Latin plus Greek for Plex Sans, only the weights used. Never add Google Fonts, analytics, embeds or other third-party requests: the site makes none (24 Nov 2026).
- Legal pages: `/impressum` and `/datenschutz` are templates in `src/legal.ts` (preview with `bun dev`). Not built, linked or in the sitemap while `site.legalPublished` is false; the build fails if it's true while a `[[placeholder]]` is left. Krish decides whether to publish; never fill in their personal data unasked.
- Medium handle is `@krish2248` (confirmed by Krish, 28 Oct 2026).

## Design rules Krish asked for

- It should look deliberate, **not "vibe-coded"**. Avoid fake terminal commands, emoji icons, ASCII boxes, macOS window dots, typewriter effects, inflated stats, generic GitHub OG thumbnails and hover wobble everywhere.
- The site is **not** retro-terminal any more. Prompts Krish pastes may still say so; keep the editorial design unless he says otherwise himself.
- Keep the editorial layout: a label column on the left and content on the right, with one green accent colour.
- Only claim things in `src/content.ts` / his CV.

- Readability floor (24 Nov 2026): running text at least 16px and capped with `max-w-measure` (35rem, 60-80 characters); labels at least 14px, badges and cover captions 12px; text contrast at least 4.5:1 in both themes; links and controls at least 24px tall; everything keyboard-usable. Reduced motion is handled in globals.css.

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
| `326fd92` | Final CV sync: resume PDF, hero photo (since removed), OG image, German A1, content matched to final CVs |
| `ed16713` | Medium handle changed to `@krish2248` |
| `4e0646e` | Green-lit portrait in dark mode (later removed) |
| tag `pre-i18n-2026-10` (= `4e0646e`) | Backup before the German version |
| `91178c3` | EN/DE language switch, full German translation |
| tag `pre-nophoto-2026-10` (= `67646c3`) | Backup before removing the hero photo |
| tag `pre-opento-2026-11` (= `4fa21b3`) | Backup before the 24 Nov 2026 changes (roles wording, resume PDF removed, PRM as marketing company) |
| `8529879` | Hero photo removed in both themes (Krish's request). `943ea76` also accidentally committed `.claude/settings.local.json` (only a permission allowlist line, harmless) |

History was rewritten and force-pushed twice on 24 Nov 2026 to drop private files and photos, so hashes from 28 Oct 2026 on differ from older notes. Don't push from an old clone.

**Undo:**
- Everything: `git revert 944f13f 3f18dd9 a1a92f9`.
- One file: `git checkout pre-redesign-2026-10 -- <path>`.
- View the old version: `git show pre-redesign-2026-10:<path>`.
- German version only: `git revert 91178c3`.
- Content rewrite only: tag `pre-rewrite-2026-11` is the state just before it (old `data.ts` content, Open to, Elsewhere).
- Final-CV sync only: `git revert 326fd92`.
- Section order only: `git revert 69a4029`, or `git checkout pre-reorder-2026-10 -- src/App.tsx src/lib/data.ts`.

## Session log: 24 Nov 2026 (branch `portfolio-refresh-2026-11`)

Live on `master` the same day: PRM wording, old resume PDF removed, clean public CV; history cleaned twice. On the branch, in order:
1. Pre-rendered `/` and `/de/` to static HTML.
2. Head tags, JSON-LD, sitemap, robots, icons, new preview image.
3. Site synced to the Nov 2026 CV, then all copy replaced by Krish's text and moved to `src/content.ts`.
4. CV at `/cv/Krish_Soni_CV.pdf` with a Download CV button; FUTOLOGY demo link; Experience before Projects.
5. Readability and accessibility pass.
6. Self-hosted fonts, no third-party requests; unpublished Impressum/Datenschutz templates.
7. Bilingual 404 page, preview image and touch icon compressed, links and stale text checked.

Krish plans to fix the old projects in the coming days. Test with a server that behaves like GitHub Pages (404.html, directory redirects): `vite preview` serves the start page for unknown addresses.

## Session log: 28 Oct 2026

What Krish asked for, in order, and what was done (all pushed and deployed):
1. **Section order** changed to Open to → Experience → Education & skills → Projects → Elsewhere → Contact (nav too).
2. **Recommendations** given; he said "do it" and supplied his three final CVs (`CV_`, `Lebenslauf_`, `Resume_Krish_Soni.pdf` in Downloads).
   - He chose to publish **only the Resume** (privacy: the others show home address + DOB).
   - Site content synced to the final CVs: German A1, TU Dortmund Faculty of Statistics + modules + Sep 2028, B.E. relevant courses (dropped "top 5% in Software Engineering", not in final CV), FUTOLOGY ML parts reworded as *next milestone*, project details, skills (R, XGBoost, Excel, Next.js, PostgreSQL/Supabase).
   - OG/social preview image made (`public/og-image.jpg`, includes his light-mode car selfie).
3. **Photo**: first the formal CV photo, then he swapped to a car selfie (light mode) + green-lit car selfie (dark mode). **Then he asked to remove the photo from both modes**: done. Source images are still in his Downloads (`Natural Car Selfie with Earphones.png`, `Neon Green Car Selfie.png`).
4. **Medium** handle confirmed as `@krish2248`.
5. **Link preview**: photo replaced by the "ks" site logo (Krish's request). No photo anywhere on the site now.
6. **EN/DE language switch** added next to the theme toggle. German text is Claude's translation; not yet reviewed by a native speaker.
7. Deleted the stale `plan/IMPLEMENTATION_PLAN.md`.

Krish said he is **"just getting started"** and that **there's a lot to change in the resume**. Expect more edits next session.

## Next up (pending)

1. The `krish2248/lhcb-tau-3mu` repo doesn't exist yet on GitHub, public or private (checked 24 Nov 2026), but the CV and site link to it. Krish wants it public and the link kept.
2. Have a German speaker review the German text (hero statement and "Offen für" first).
3. Reference quotes stay; don't list spoken languages on the site (Krish, 24 Nov 2026).
