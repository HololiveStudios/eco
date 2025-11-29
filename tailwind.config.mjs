export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
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
        secondary: {
          DEFAULT: '#1e293b',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },

      /** AQUI ESTÁ A PARTE QUE FALTAVA **/
      ringColor: theme => ({
        primary: theme('colors.primary.DEFAULT'),
        'primary-50': theme('colors.primary.50'),
        'primary-100': theme('colors.primary.100'),
        'primary-200': theme('colors.primary.200'),
        'primary-300': theme('colors.primary.300'),
        'primary-400': theme('colors.primary.400'),
        'primary-500': theme('colors.primary.500'),
        'primary-600': theme('colors.primary.600'),
      }),
    }
  },
  plugins: []
};
