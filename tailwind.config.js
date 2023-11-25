/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        festive: ["'Open-Sans', cursive"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
}
