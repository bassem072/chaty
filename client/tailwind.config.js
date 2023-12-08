/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D1B2E",
        active: "#343142",
        message: "#7754B2",
        paragraph: "#EEEFF6",
        sidebar: "#283142",
      },
      fontFamily: {
        archivo: ["Archivo"],
      },
      boxShadow: {
        "my-shadow":
          "0 3px 10px 1px rgba(0, 0, 0, 0.3), 0 -3px 10px 1px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
