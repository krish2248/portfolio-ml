/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════
      // OSAKA JADE COLOR PALETTE
      // Dark jade green aesthetic with soft jade accents
      // ═══════════════════════════════════════════════════════════════
      colors: {
        terminal: {
          black: '#1a2421',      // Dark jade background
          dark: '#232f2b',       // Slightly lighter jade
          darker: '#141c19',     // Even deeper for contrast
        },
        phosphor: {
          DEFAULT: '#7ec699',    // Osaka jade green
          bright: '#98d4b1',     // Brighter jade
          dim: '#5a9a78',        // Dimmed state
          muted: '#3d6b54',      // Very dim for tertiary text
          glow: 'rgba(126, 198, 153, 0.15)', // Ambient glow
        },
        amber: {
          DEFAULT: '#c4a35a',    // Muted gold/amber
          dim: '#a68a45',
        },
        cyan: {
          DEFAULT: '#98d4b1',    // Bright jade for links/highlights
          dim: '#7ec699',
        },
        // Light mode colors (paper printout aesthetic)
        paper: {
          DEFAULT: '#f6f5dd',    // Cream white
          dark: '#dfe0c0',       // Darker cream for cards
          darker: '#b8b99f',     // Border color
          ink: '#1c1917',        // Rich warm charcoal
          muted: '#78716c',      // Muted stone gray
          accent: '#166534',     // Deep forest green
          orange: '#ea580c',     // Vibrant orange accent
        },
      },
      // ═══════════════════════════════════════════════════════════════
      // TYPOGRAPHY - Monospace fonts for terminal aesthetic
      // NO Inter, NO generic fonts - distinctive choices only
      // ═══════════════════════════════════════════════════════════════
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Share Tech Mono', 'VT323', 'monospace'],
        body: ['JetBrains Mono', 'Source Code Pro', 'monospace'],
      },
      // ═══════════════════════════════════════════════════════════════
      // ANIMATIONS - CRT effects, typing, glows
      // ═══════════════════════════════════════════════════════════════
      animation: {
        'blink': 'blink 1s step-end infinite',
        'blink-fast': 'blink 0.5s step-end infinite',
        'flicker': 'flicker 8s infinite',
        'flicker-fast': 'flicker 4s infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'typing': 'typing 2s steps(30) forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'glitch': 'glitch 0.3s ease-in-out',
        'boot-line': 'boot-line 0.05s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.85' },
          '94%': { opacity: '1' },
          '97%': { opacity: '0.9' },
          '98%': { opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 5px rgba(126, 198, 153, 0.5), 0 0 10px rgba(126, 198, 153, 0.3)',
          },
          '50%': { 
            textShadow: '0 0 10px rgba(126, 198, 153, 0.8), 0 0 20px rgba(126, 198, 153, 0.5), 0 0 30px rgba(126, 198, 153, 0.3)',
          },
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
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'boot-line': {
          'from': { opacity: '0', transform: 'translateX(-10px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      // ═══════════════════════════════════════════════════════════════
      // SPACING & SIZING
      // ═══════════════════════════════════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // ═══════════════════════════════════════════════════════════════
      // BOX SHADOWS - Glow effects (Osaka Jade)
      // ═══════════════════════════════════════════════════════════════
      boxShadow: {
        'glow': '0 0 10px rgba(126, 198, 153, 0.3), 0 0 20px rgba(126, 198, 153, 0.2)',
        'glow-lg': '0 0 20px rgba(126, 198, 153, 0.4), 0 0 40px rgba(126, 198, 153, 0.2)',
        'glow-cyan': '0 0 10px rgba(152, 212, 177, 0.3), 0 0 20px rgba(152, 212, 177, 0.2)',
        'glow-amber': '0 0 10px rgba(196, 163, 90, 0.3), 0 0 20px rgba(196, 163, 90, 0.2)',
        'terminal': 'inset 0 0 50px rgba(126, 198, 153, 0.03)',
      },
      // ═══════════════════════════════════════════════════════════════
      // BACKDROP BLUR
      // ═══════════════════════════════════════════════════════════════
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
