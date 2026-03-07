class TokenType:
    
    # literals
    NUMBER = "NUMBER"
    STRING = "STRING"
    IDENTIFIER = "IDENTIFIER"

    # operators
    PLUS = "PLUS"
    MINUS = "MINUS"
    MUL = "MUL"
    DIV = "DIV"
    ASSIGN = "ASSIGN"

    # parentheses
    LPAREN = "LPAREN"
    RPAREN = "RPAREN"
    #relational operators
    LT = "LT"
    GT = "GT"
    LE = "LE"
    GE = "GE"
    NE = "NE"
    EQ = "EQ"
    # control
    IF = "IF"
    ELSE = "ELSE"
    WHILE = "WHILE"

    # misc
    SEMICOLON = "SEMICOLON"
    EOF = "EOF"