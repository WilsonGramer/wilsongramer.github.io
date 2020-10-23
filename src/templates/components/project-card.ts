import { htmlFragmentSync as html } from "lit-ntml";

export const projectCard = ({
    title,
    image,
    description,
    link,
}: {
    title: string;
    image: string;
    description: string;
    link: {
        name: string;
        url: string;
    };
}) => html`
    <div class="bg-gray-800 p-6 my-6 rounded-lg">
        <div class="flex items-center space-x-4">
            <img class="h-10" src="${image}" alt="${title}" />
            <span class="text-2xl text-gray-400 font-semibold">${title}</span>
        </div>

        <div class="pt-4 text-lg">
            <p class="text-gray-500">${description}</p>

            <p class="pt-2 text-lg font-semibold text-blue-400">
                <a href="${link.url}">${link.name} →</a>
            </p>
        </div>
    </div>
`;
