/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: 'rgb(var(--color-obsidian) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--color-surface-elevated) / <alpha-value>)',
        fg: 'rgb(var(--color-fg) / <alpha-value>)',
        'fg-muted': 'rgb(var(--color-fg-muted) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--color-fg-subtle) / <alpha-value>)',
        'indigo-glow': 'rgb(var(--color-indigo-glow) / <alpha-value>)',
        'indigo-deep': 'rgb(var(--color-indigo-deep) / <alpha-value>)',
        'emerald-glow': 'rgb(var(--color-emerald-glow) / <alpha-value>)',
        'emerald-deep': 'rgb(var(--color-emerald-deep) / <alpha-value>)',
        'danger-muted': 'rgb(var(--color-danger-muted) / <alpha-value>)',
        hairline: 'rgb(var(--color-border-hairline) / <alpha-value>)'
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        display: [
          '"Plus Jakarta Sans"',
          '"Geist"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif'
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace'
        ]
      },
      boxShadow: {
        'inner-glint': 'inset 0 1px 1px 0 rgb(var(--color-fg) / 0.12)',
        'emerald-aura': '0 0 40px -10px rgb(var(--color-emerald-glow) / 0.28)',
        'indigo-aura': '0 0 45px -10px rgb(var(--color-indigo-glow) / 0.30)',
        'elevated-card': '0 24px 48px -12px rgb(var(--color-obsidian) / 0.85)'
      },
      backgroundImage: {
        'radial-indigo':
          'radial-gradient(circle at 50% 0%, rgb(var(--color-indigo-glow) / 0.16), transparent 70%)',
        'radial-emerald':
          'radial-gradient(circle at 50% 0%, rgb(var(--color-emerald-glow) / 0.15), transparent 70%)',
        'kinetic-sweep':
          'linear-gradient(110deg, rgb(var(--color-fg)) 0%, rgb(var(--color-fg)) 35%, rgb(var(--color-indigo-glow)) 50%, rgb(var(--color-emerald-glow)) 65%, rgb(var(--color-fg)) 100%)'
      }
    }
  },
  plugins: []
};
