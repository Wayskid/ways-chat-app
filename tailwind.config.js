/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    colors: {
      "color-primary": "#1d3354",
      "color-secondary": "#467599",
      "color-msg": "#9ed8db",
      "txt-color": "#e9fff9",
    },
    width: {
      "home-width": "min(950px, 95%)",
      "signup-width": "min(450px, 95%)",
    },
    height: {
      "home-height": "min(620px, 95%)",
      "signup-height": "min(450px, 95%)",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
};
