/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FEFEFE",
        secondary: {
          100: "#FDC903",
          200: "#FECB00",
        },
        tertiary: "#0D0D0B",
      },
      fontFamily: {
        body: ["Montserrat"],
      },
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};
