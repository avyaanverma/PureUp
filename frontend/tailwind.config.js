/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust based on your project structure
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // ✅ Correct way to define it
      },
    },
  },
  plugins: [],
};
