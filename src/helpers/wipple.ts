// @ts-nocheck

import refractor from "refractor/core";

const wipple = (Prism) => {
    Prism.languages.wipple = {
        keyword: {
            pattern: /\b_|use|when|type|trait|instance|where|external\b/,
            greedy: true,
        },
        "class-name": {
            pattern: /\b[A-Z][^\r\n\t \(\)\[\]\{\}'"/]*\b/,
            greedy: true,
        },
        comment: {
            pattern: /--.*/,
            greedy: true,
        },
        operator: {
            pattern: /[`~!@#$%^&*()\-_=+|;:,<.>/?]+(?=[ \t()\[\]{}']|$)/m,
            greedy: true,
        },
        number: {
            pattern: /-?[0-9]+(\.[0-9]+)?(?=[ \t()\[\]{}']|$)/m,
            greedy: true,
        },
        name: {
            pattern: /[^ \t\n()\[\]{}'\\"]+/,
            greedy: true,
        },
        string: {
            pattern: /"[^\n"]*"/,
            greedy: true,
        },
        punctuation: /[()\[\]{}'\\]/,
    };
};

wipple.displayName = "wipple";
wipple.aliases = [];

refractor.register(wipple);
