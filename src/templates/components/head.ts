import { htmlFragmentSync as html } from "lit-ntml";
import { blogPostContentStylesheet } from "../styles";
import { analyticsHead } from "./analytics";

export const head = (title?: string) => html`
    <!-- Analytics -->
    ${analyticsHead()}

    <title>${title ? `${title} — Wilson Gramer` : "Wilson Gramer"}</title>

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <style>
        ${blogPostContentStylesheet}
    </style>

    <!-- Tailwind CSS -->
    <link
        rel="stylesheet"
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
    />

    <!-- Font Awesome -->
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/fontawesome.min.css"
    />
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/brands.min.css"
    />

    <!-- Hybrid Code Theme -->
    <link
        rel="stylesheet"
        href="https://gitcdn.xyz/repo/highlightjs/highlight.js/master/src/styles/hybrid.css"
    />

    <!-- JetBrains Mono Font -->
    <style>
        @font-face {
            font-family: "JetBrains Mono";
            src: url("https://gitcdn.xyz/repo/JetBrains/JetBrainsMono/master/fonts/webfonts/JetBrainsMono-Regular.woff2");
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: "JetBrains Mono";
            src: url("https://gitcdn.xyz/repo/JetBrains/JetBrainsMono/master/fonts/webfonts/JetBrainsMono-Italic.woff2");
            font-weight: normal;
            font-style: italic;
        }
    </style>
`;
