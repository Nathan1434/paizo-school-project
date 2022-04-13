const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        container: {
            center: true,
            padding: "5rem",
        },

        extend: {
            fontFamily: {
                logo: ["'Saira'", ...defaultTheme.fontFamily.sans],
                body: ["'Inter'", ...defaultTheme.fontFamily.sans],
            },

            fontSize: {
                xs: "0.64rem",
                sm: "0.8rem",
                base: "16px",
                md: "1.25rem",
                lg: "1.563rem",
                xl: "1.953rem",
                "2xl": "2.441rem",
                "3xl": "3.052rem",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
