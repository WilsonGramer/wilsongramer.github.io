import getFrontMatter from "front-matter";
import fse from "fs-extra";
// @ts-ignore
import markdownDescription from "markdown-description";
import MarkdownIt from "markdown-it";
// @ts-ignore
import hljs from "markdown-it-highlightjs";
import path from "path";
import { BlogPost } from "./templates/pages/blog-post";

export const loadPosts = (folder: string) =>
    fse
        .readdirSync(folder)
        .map((name) => ({
            name: name,
            file: fse.readFileSync(path.resolve(folder, name), "utf8"),
        }))
        .map(loadPost);

const loadPost = ({ name, file }: { name: string; file: string }): BlogPost => {
    const content = getFrontMatter<any>(file);

    return {
        title: content.attributes.title,
        date: content.attributes.date,
        slug: path.parse(name).name,
        description: markdownDescription(content.body) + "&hellip;",
        content: markdownParser.render(content.body),
    };
};

const markdownParser = new MarkdownIt({}).use(hljs, {
    auto: false,
    inline: true,
});
