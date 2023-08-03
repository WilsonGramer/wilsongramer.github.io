/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/*.{html,md}", "./src/**/*.{html,md}"],
    darkMode: "media",
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
    corePlugins: {
        preflight: false,
    },
};
