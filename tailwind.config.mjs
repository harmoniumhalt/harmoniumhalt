/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT:'#c8360a', light:'#e8430c', dark:'#9e2808' },
        gold:      { DEFAULT:'#d4920a', light:'#f0aa0e', dark:'#a87208' },
        wood:      { DEFAULT:'#5c2a0e', light:'#7a3a14', dark:'#3d1a08' },
        ivory:     { DEFAULT:'#faf6ef', dark:'#f0e8d8' },
        charcoal:  { DEFAULT:'#1c1008' },
      },
      fontFamily: {
        display: ['"Playfair Display"','Georgia','serif'],
        body:    ['"Source Serif 4"','Georgia','serif'],
        sans:    ['"Plus Jakarta Sans"','system-ui','sans-serif'],
        mono:    ['"JetBrains Mono"','monospace'],
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
