# Checks

Local test scripts (Windows, Chrome in the default place, Node 22). Build first, then from the repo root:

```bash
bun run build
node scripts/checks/serve.mjs dist 4199          # serves dist/ the way GitHub Pages does (404.html, redirects); leave running
node scripts/checks/links.mjs                    # every internal and external link, and the CV
node scripts/checks/a11y.mjs <output folder>     # contrast, text sizes, line length, tap targets, keyboard, at 375/768/1280
node scripts/checks/view.mjs <output folder>     # hero fit, menu highlight, More projects button, screenshots at real sizes
```

LinkedIn (999) and Medium (403) always block the link check; open them by hand.
