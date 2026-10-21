/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Every colour comes from the CSS variables in globals.css, so light/dark
      // is handled in one place and components never need `dark:` variants.
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        plate: 'var(--cover)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      maxWidth: {
        page: '68rem',
      },
    },
  },
  plugins: [],
}
