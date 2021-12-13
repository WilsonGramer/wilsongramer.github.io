// @ts-nocheck

import refractor from "refractor/core";

const wipple = (Prism) => {
    Prism.languages.wipple = {
        keyword: {
            pattern:
                /\b(?:_|and|assert|data|end|enum|for|get|if|loop|mutable|not|or|set!|template|test|trait|type|unless!|until|use|when|when|when!|when\?|where|while)\b/,
            greedy: true,
        },
        builtin: {
            pattern:
                /\b(?:Block|Compare|Default|Equal|False|List|Name|None|Number|Quote|Some|Text|True|doc|format|increment!|show|Show)\b/,
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
