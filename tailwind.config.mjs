/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdaa8',
          300: '#ffbe71',
          400: '#ff9738',
          500: '#ff7710',
          600: '#f05c06',
          700: '#c74307',
          800: '#9e350e',
          900: '#7f2e0f',
        },
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d2d9',
          300: '#f4adb8',
          400: '#ec7f92',
          500: '#e0546c',
          600: '#c93153',
          700: '#a92444',
          800: '#8d203d',
          900: '#5c1027',
          950: '#3d0818',
        },
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        ivory: '#faf7f0',
        ebony: '#1a1008',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        devanagari: ['Tiro Devanagari Hindi', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'key-press': 'keyPress 0.15s ease-out',
        'bellows': 'bellows 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255,119,16,0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(255,119,16,0.7)' },
        },
        keyPress: {
          '0%': { transform: 'scaleY(1)', background: '' },
          '50%': { transform: 'scaleY(0.95)' },
          '100%': { transform: 'scaleY(1)' },
        },
        bellows: {
          '0%, 100%': { scaleX: 1 },
          '50%': { scaleX: 0.97 },
        },
      },
      backgroundImage: {
        'wood-grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
