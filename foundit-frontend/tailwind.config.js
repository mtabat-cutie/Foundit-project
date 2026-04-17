/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#18181b", // Zinc 900
        secondary: "#71717a", // Zinc 500
        accent: "#800000", // Maroon (matching GradReady)
      }
    },
  },
  plugins: [],
}
