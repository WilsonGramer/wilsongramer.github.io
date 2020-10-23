import { htmlFragmentSync as html } from "lit-ntml";
import { header } from "../components";
import { Page } from "./";

export interface BlogPost {
    title: string;
    date: string;
    content: string;
    description: string;
    slug: string;
}

export const blogPostPage = (post: BlogPost): Page => ({
    path: `/blog/${post.slug}/index.html`,
    title: post.title,
    body: () => html`
        ${header()}

        <div class="px-6">
            <div class="pb-6">
                <h1 class="text-4xl font-bold">${post.title}</h1>
                <p class="text-2xl font-semibold text-gray-500">${post.date}</p>
            </div>

            <div class="markdown-content text-xl text-gray-400 leading-relaxed">
                ${post.content}
            </div>
        </div>
    `,
});
