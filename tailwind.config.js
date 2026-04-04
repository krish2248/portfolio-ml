/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════════
      // NORMAL COLOR PALETTE
      // Clean dark and light mode colors
      // ═══════════════════════════════════════════════════════════════════════
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        blue: {
          50: 'rgb(var(--accent-rgb) / 0.05)',
          100: 'rgb(var(--accent-rgb) / 0.1)',
          200: 'rgb(var(--accent-rgb) / 0.15)',
          300: 'rgb(var(--accent-rgb) / <alpha-value>)',
          400: 'rgb(var(--accent-rgb) / <alpha-value>)',
          500: 'rgb(var(--accent-rgb) / <alpha-value>)',
          600: 'rgb(var(--accent-rgb) / <alpha-value>)',
          700: 'rgb(var(--accent-rgb) / <alpha-value>)',
          800: 'rgb(var(--accent-rgb) / <alpha-value>)',
          900: 'rgb(var(--accent-rgb) / <alpha-value>)',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#1e3a35',
          700: '#162b27',
          800: '#0f1f1c',
          900: '#091413',
          950: '#060e0c',
        },
      },
      // ═══════════════════════════════════════════════════════════════════════
      // TYPOGRAPHY - Clean modern fonts
      // ═══════════════════════════════════════════════════════════════════════
      fontFamily: {
        mono: ['Arial', 'Helvetica', 'sans-serif'],
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        display: ['Arial', 'Helvetica', 'sans-serif'],
        body: ['Arial', 'Helvetica', 'sans-serif'],
      },
      // ═══════════════════════════════════════════════════════════════════════
      // ANIMATIONS - Clean modern animations
      // ═══════════════════════════════════════════════════════════════════════
      animation: {
        'blink': 'blink 1s step-end infinite',
        'blink-fast': 'blink 0.5s step-end infinite',
        'typing': 'typing 2s steps(30) forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'scale-in': {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
      },
      // ═══════════════════════════════════════════════════════════════════════
      // SPACING & SIZING
      // ═══════════════════════════════════════════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // ═══════════════════════════════════════════════════════════════════════
      // BOX SHADOWS - Clean modern shadows
      // ═══════════════════════════════════════════════════════════════════════
      boxShadow: {
        'glow': '0 0 10px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 20px rgba(59, 130, 246, 0.4)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      // ═══════════════════════════════════════════════════════════════════════
      // BACKDROP BLUR
      // ═══════════════════════════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
