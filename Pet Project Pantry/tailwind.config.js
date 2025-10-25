/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  // In v4, theme extensions are minimal
  theme: {
    extend: {
      // You can add customizations here if needed
      primary: "#1E40AF", // custom blue
      secondary: "#F59E0B", // custom amber
      accent: {
        light: "#93C5FD", // custom light blue
        DEFAULT: "#3B82F6", // custom default blue
        dark: "#1D4ED8", // custom dark blue
      },
    },
  },
  plugins: [],
};
