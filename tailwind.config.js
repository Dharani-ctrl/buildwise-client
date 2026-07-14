/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#F8FAFC',
        accent: '#3B82F6',
        textMain: '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '20px': '20px',
        '14px': '14px',
      },
      spacing: {
        // We'll rely on default Tailwind 8px system (e.g. 1=4px, 2=8px, etc.)
      }
    },
  },
  plugins: [],
}
