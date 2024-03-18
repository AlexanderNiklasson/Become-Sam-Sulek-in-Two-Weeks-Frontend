/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#81689D",
        customDarkblue: "#1F2544",
        customLightblue: "#474F7A",
        customPink: "#FFD0EC",
      },
    },
  },
  plugins: [],
};
