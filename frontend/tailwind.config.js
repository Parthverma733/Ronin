/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dojo: {
          black: '#0a0a0c',
          charcoal: '#121218',
          panel: '#16161f',
          border: '#2a1f28',
          crimson: '#c41e3a',
          'crimson-dim': '#8b1538',
          neon: '#39ff14',
          cyan: '#00f5d4',
          mist: 'rgba(148, 163, 184, 0.08)',
        },
      },
      fontFamily: {
        display: ['"Noto Serif JP"', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brush-stroke':
          'linear-gradient(105deg, transparent 40%, rgba(196, 30, 58, 0.06) 50%, transparent 60%)',
        'smoke-radial':
          'radial-gradient(ellipse at 50% 0%, rgba(57, 255, 20, 0.04) 0%, transparent 55%)',
      },
      boxShadow: {
        strike: '0 0 20px rgba(196, 30, 58, 0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
        neon: '0 0 24px rgba(0, 245, 212, 0.25)',
      },
      animation: {
        'sakura-fall': 'sakura-fall 14s linear infinite',
        'mist-drift': 'mist-drift 22s ease-in-out infinite',
        'slash-glow': 'slash-glow 0.85s ease-out forwards',
        'slash-loop': 'slash-glow 0.85s ease-in-out infinite',
        'ninja-reveal': 'ninja-reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        'sakura-fall': {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.5' },
          '100%': { transform: 'translateY(110vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
        'mist-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-2%, 1%) scale(1.02)' },
        },
        'slash-glow': {
          '0%': { opacity: '0', transform: 'scaleX(0.2)' },
          '40%': { opacity: '1', transform: 'scaleX(1)' },
          '100%': { opacity: '0', transform: 'scaleX(1.05)' },
        },
        'ninja-reveal': {
          '0%': { opacity: '0', filter: 'blur(12px)', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.65' },
        },
      },
    },
  },
  plugins: [],
};
