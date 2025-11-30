/** @type {import('tailwindcss').Config} */
    module.exports = {
      // Tentukan di mana kelas Tailwind digunakan (di folder src dan public)
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
