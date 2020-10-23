import { htmlSync as html } from "lit-ntml";
import { head } from "../components";
import { pageContainerClass, pageContentClass } from "../styles";

export * from "./home";

export interface Page {
    title?: string;
    path: string;
    head?: () => string;
    body: () => string;
}

export const page = (page: Page) => html`
    <head>
        ${page.head?.() ?? head(page.title)}
    </head>

    <body class="${pageContainerClass()}">
        <div class="${pageContentClass()}">${page.body()}</div>
    </body>
`;
