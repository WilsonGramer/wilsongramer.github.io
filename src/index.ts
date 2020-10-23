import fse from "fs-extra";
import { minify } from "html-minifier-terser";
import path from "path";
import { loadPosts } from "./load-posts";
import { homePage, page } from "./templates";
import { blogPostPage } from "./templates/pages/blog-post";

const dir = process.env.DIR;
if (!dir) {
    throw new Error("Must set $DIR to input directory");
}

console.log("Building...");

fse.removeSync(path.join(dir, "build"));

const posts = loadPosts(path.resolve(dir, "posts")).reverse();

const pages = [homePage(posts), ...posts.map(blogPostPage)];

for (const p of pages) {
    const html = minify(page(p));
    fse.outputFileSync(path.join(dir, "build", p.path), html);
}

fse.copySync(path.join(dir, "public"), path.join(dir, "build"));

console.log("Build finished");
