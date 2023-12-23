/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#262E35",
        active: "#303841",
        message: "#7754B2",
        paragraph: "#EEEFF6",
        sidebar: "#36404A",
      },
      fontFamily: {
        archivo: ["Archivo"],
        cairo: ["Cairo"],
      },
      boxShadow: {
        "my-shadow":
          "0 3px 10px 1px rgba(0, 0, 0, 0.3), 0 -3px 10px 1px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
