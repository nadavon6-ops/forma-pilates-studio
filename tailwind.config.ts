import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#4A5D52',
          light: '#E8EDEA',
          dark: '#3A4A42',
        },
        cream: {
          DEFAULT: '#F7F4EF',
          dark: '#EDE8E0',
        },
        terracotta: {
          DEFAULT: '#C4907A',
          dark: '#A67563',
          light: '#D4A898',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#4A4A4A',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      fontSize: {
        'hero': ['80px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-mobile': ['42px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['56px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section-mobile': ['32px', { lineHeight: '1.2' }],
        'card-title': ['26px', { lineHeight: '1.3' }],
      },
      spacing: {
        'section': '160px',
        'section-tablet': '100px',
        'section-mobile': '80px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'elegant': '0 24px 48px rgba(0,0,0,0.12)',
        'soft': '0 4px 24px rgba(0,0,0,0.08)',
        'button': '0 12px 24px rgba(196, 144, 122, 0.4)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '700': '700ms',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
