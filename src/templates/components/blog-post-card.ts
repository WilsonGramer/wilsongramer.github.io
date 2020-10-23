import { htmlFragmentSync as html } from "lit-ntml";
import { BlogPost } from "../pages/blog-post";

export const blogPostCard = (post: BlogPost) => html`
    <div class="bg-gray-800 p-6 my-6 rounded-lg">
        <p class="text-2xl text-gray-400 font-semibold">${post.title}</p>
        <p class="text-lg text-gray-600">${post.date}</p>

        <div class="pt-2 text-lg">
            <p class="text-gray-500">${post.description}</p>

            <p class="pt-2 text-lg font-semibold text-blue-400">
                <a href="/blog/${post.slug}">Read →</a>
            </p>
        </div>
    </div>
`;
