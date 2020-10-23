import { htmlFragmentSync as html } from "lit-ntml";

export const footer = () => html`
    <div class="p-6 text-sm text-center text-gray-500">
        <p>© 2020 Wilson Gramer</p>
        <p class="underline">
            <a href="https://github.com/WilsonGramer/website">Source code</a>
        </p>
    </div>
`;
