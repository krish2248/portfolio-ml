# sonikrish.com

Personal site of Krish Soni, M.Sc. Data Science student at TU Dortmund.

Built with React, TypeScript, Vite and Tailwind CSS. Deployed to GitHub Pages from `master`
by `.github/workflows/deploy.yml`; the custom domain is set in `public/CNAME`.

## Working on it

```bash
bun install
bun dev          # local dev server
bun run build    # type-check + production build into dist/
```

## Where things live

- `src/content.ts`: all text, English and German.
- `src/components/sections/`: one component per page section.
- `src/components/ui/ProjectCover.tsx`: the drawn project thumbnails. Pick one with a project's `motif`.
- `src/styles/globals.css`: colour tokens for light and dark mode.

The CV is `public/cv/Krish_Soni_CV.pdf`; its path is `site.cv` in `src/content.ts`.
