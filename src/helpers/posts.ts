import fs from "fs";
import path from "path";
import { parse } from "date-fns";
import fm from "front-matter";

export interface Post {
    date: string;
    title: string;
    description: string | null;
    content: string;
}

const postsPath = "posts";

const posts: Record<string, Post> = {};
for (const filePath of fs.readdirSync(postsPath)) {
    if (filePath[0] === ".") continue;

    const slug = path.basename(filePath, ".md");

    const frontMatter = fm<any>(
        fs.readFileSync(path.join(postsPath, filePath), "utf8")
    );

    posts[slug] = {
        date: slug.slice(0, "yyyy-MM-dd".length),
        title: frontMatter.attributes.title,
        description: frontMatter.attributes.description ?? null,
        content: frontMatter.body,
    };
}

export default posts;
