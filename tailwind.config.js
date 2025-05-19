/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css,ts}"],
  safelist: [
    {
      pattern: /bg-(red|blue|green|yellow|orange)-(200|300|400|500|600|700|800)/,
    },
  ],
  theme: {
    extend: {
      borderRadius: {
        "5xl": "6rem"
      },
    },
  },
  plugins: [],
};
