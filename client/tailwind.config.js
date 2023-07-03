/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {
      colors: {
        primary: "#4FA095",
        teal: "#BAD1C2",
        egg: "#F6F6C9",
        db: "#153462"
      }
    },
  },
  plugins: [],
}
