module.exports = (eleventyConfig) => {
    eleventyConfig.addPassthroughCopy("src/robots.txt");

    return {
        dir: {
            input: "src",
        },
        htmlTemplateEngine: "njk",
    };
};
