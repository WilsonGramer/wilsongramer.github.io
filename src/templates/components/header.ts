import { htmlFragmentSync as html } from "lit-ntml";

export const header = () => html`
    <div class="flex items-center justify-between p-6 text-2xl font-semibold">
        <a href="/">Wilson Gramer</a>

        <div class="flex space-x-5 font-regular text-gray-500">
            <a href="https://twitter.com/WilsonGramer">
                <i class="fab fa-twitter"></i>
            </a>

            <a href="https://github.com/WilsonGramer">
                <i class="fab fa-github"></i>
            </a>

            <a href="https://dev.to/WilsonGramer">
                <i class="fab fa-dev"></i>
            </a>
        </div>
    </div>
`;
