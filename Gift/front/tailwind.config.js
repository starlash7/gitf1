/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#3BCFB4",
        secondary: "#79AEFA",
        gray: {
          DEFAULT: "#929292",
          light: "#D5D5D5",
        },
        "mint-bg": "#E8FFF9",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};
