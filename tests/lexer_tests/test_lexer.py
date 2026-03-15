from ...backend.compiler.lexer.lexer import Lexer


code = """
x = 10 + 20
"""

lexer = Lexer(code)

while True:

    token = lexer.get_next_token()

    print(token)

    if token.type == "EOF":
        break