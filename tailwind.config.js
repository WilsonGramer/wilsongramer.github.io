module.exports = {
    darkMode: "media",
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        pre: false,
                        code: false,
                        "pre code": false,
                        "code::before": false,
                        "code::after": false,
                        "blockquote p:first-of-type::before": false,
                        "blockquote p:last-of-type::after": false,
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
    variants: {
        typography: ["responsive", "dark"],
        extend: {
            typography: ["dark"],
        },
    },
};
