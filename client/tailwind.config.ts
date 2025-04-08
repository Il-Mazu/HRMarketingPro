import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#2C2C2C',
        secondary: '#D4AF37',
        foreground: '#F5F5F5',
        background: '#1A1A1A',
      },
      fontFamily: {
        medieval: ['MedievalSharp', 'serif'],
        title: ['UnifrakturMaguntia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config 