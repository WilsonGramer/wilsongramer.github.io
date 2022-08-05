const { format } = require("date-fns");

module.exports = (eleventy) => {
    eleventy.setTemplateFormats(["html", "md", "jpg", "png", "svg"]);

    eleventy.addShortcode("year", () => format(new Date(), "yyyy"));
    eleventy.addFilter("postDate", (date) => format(date, "MMMM d, yyyy"));

    eleventy.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"), {
        init: ({ Prism }) => {
            Prism.languages.wipple = require("./src/prism/wipple");
        },
    });

    eleventy.setLibrary(
        "md",
        require("markdown-it")({
            html: true,
            typographer: true,
            linkify: true,
        })
    );

    eleventy.addPassthroughCopy("src/styles/prism.css");

    return {
        dir: {
            input: "src",
            includes: "includes",
            layouts: "layouts",
        },
        htmlTemplateEngine: "njk",
    };
};
