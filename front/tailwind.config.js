/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInSlow: "fadeIn 3s ease-in-out forwards",
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        slideFadeIn: "slideFadeIn 0.5s ease-out forwards",
        "spin-slow": "spin 5s linear infinite", // 🔧 fixed here with quotes
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideFadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
