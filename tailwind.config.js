/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light, luxury-minimal: the white seamless sweep of their packshots,
        // ink type, and one lipstick red lifted from their cosmetics work.
        porcelain: '#F8F6F2',
        'porcelain-2': '#F0ECE5',
        ink: '#161412',
        'ink-2': '#24211E',
        rouge: '#A8382B',
        'rouge-lo': '#C9614F',
        champagne: '#B99A6B',
        muted: '#68615A',
        'muted-lo': '#8A827A',
        line: '#E4DED5',
        'line-dark': '#2E2A26',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { shell: '1280px' },
      transitionTimingFunction: { soft: 'cubic-bezier(.16,1,.3,1)' },
    },
  },
  plugins: [],
}
