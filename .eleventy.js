const { format } = require("date-fns");

module.exports = (config) => {
    config.setTemplateFormats(["html", "css", "md", "jpg", "png", "svg"]);

    config.setLibrary(
        "md",
        require("markdown-it")({
            html: true,
            typographer: true,
            linkify: true,
        })
    );

    config.addShortcode("year", () => format(new Date(), "yyyy"));
    config.addFilter("postDate", (date) => format(date, "MMMM d, yyyy"));

    config.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"), {
        init: ({ Prism }) => {
            Prism.languages.wipple = {
                comment: {
                    pattern: /--.*/,
                    greedy: true,
                },
                operator: {
                    pattern:
                        /[`~!@#$%^&*()\-_=+|;:,<.>/?]+(?=[ \t()\[\]{}']|$)/m,
                    greedy: true,
                },
                number: {
                    pattern: /-?[0-9]+(\.[0-9]+)?(?=[ \t()\[\]{}']|$)/m,
                    greedy: true,
                },
                name: {
                    pattern: /[^ \t\n()\[\]{}'\\"]+/,
                    greedy: true,
                },
                string: {
                    pattern: /"[^\n"]*"/,
                    greedy: true,
                },
                punctuation: /[()\[\]{}'\\]/,
            };
        },
    });

    return {
        htmlTemplateEngine: "njk",
    };
};
