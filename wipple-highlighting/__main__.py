import sys
from pygments import highlight
from pygments.lexer import RegexLexer
from pygments.formatters.html import HtmlFormatter
from pygments.token import Token
from style import TomorrownightStyle

class WippleLexer(RegexLexer):
    tokens = {
        'root': [
            (r'(\r|\n)+', Token.Text),
            (r'\s+', Token.Text),
            (r'--(( |\t).*)?', Token.Comment),
            (r'"(\\["\\]|[^\n\"\\])*"', Token.String),
            (r'-?\d+', Token.Number),
            (r'-?\d+\.\d+', Token.Number),
            (r'\(|\)|\[|\]|\{|\}|\'|\.|;', Token.Punctuation),
            (r'[^\s\(\)\[\]\{\}\"\'\.;]+', Token.Name),
        ]
    }

    builtin_names = [
        'use', 'import', 'Package', 'write-line!', 'Fn', 'Macro',
    ]

    def get_tokens(self, text: str, unfiltered: bool = False):
        tokens = super().get_tokens(text, unfiltered=unfiltered)

        def transform_name(token):
            (type, text) = token

            if type == Token.Name:
                if text in self.builtin_names:
                    type = Token.Keyword
                elif not any(c.isalnum() for c in text):
                    type = Token.Operator

            return (type, text)

        tokens = map(transform_name, tokens)

        return tokens

code = sys.stdin.read()
lexer = WippleLexer()
formatter = HtmlFormatter(style=TomorrownightStyle)

highlight(code, lexer, formatter, sys.stdout)
