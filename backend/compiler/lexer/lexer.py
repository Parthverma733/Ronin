from .symbol_table import Symbol_Table
from .token import Token
from .token_types import TokenType

class Lexer:
    def __init__(self, code):
        print("Lexer initialized1")
        self.code = code + '~'  ## source code
        self.lexbeg = 0  ## beginning of lexeme
        self.fwdptr = 0  ## forward pointer for scanning
        self.state = 0  ## state of the lexer DFA
        self.line_no = 1  ## line number for error reporting
        self.symbol_table = Symbol_Table() ## symbol table for storing identifiers and literals
        self.pos = 0  ## position in the code for error reporting
        self.column = 1  ## column number for error reporting
        self.symbol_count =  0  ## count of symbols for generating unique IDs in the symbol table
        print("Lexer initialized2")
    

    def next_char(self):
        self.fwdptr += 1
        return self.code[self.fwdptr - 1]

    def retract(self):
        self.fwdptr -= 1

    def isSymbol(self,c):
        syms = [".", "<", ">", ",", "{", "}", "(", ")", "#", ";"]

        for i in range(10):
            if c == syms[i]:
                return i 

        return 0
    
    def getType(self, lexeme):
        keywords = {
            "if": TokenType.IF,
            "else": TokenType.ELSE,
            "while": TokenType.WHILE
        }
        if lexeme in keywords:
            return "keyword"
        else:
            return TokenType.IDENTIFIER
    def next_token(self):
        print("Next token called\n")
        self.state = 0
        c = ""

        while self.fwdptr < len(self.code) and self.state != -1:
            match self.state:
                case -1:
                    return Token("EOF", "EOF", self.line_no, self.column)
                case 0:
                    c = self.next_char()
                    if c == " " or c == "\t" or c == "\n":
                        self.state = 0
                        self.lexbeg += 1
                        if c == "\n":
                            self.line_no += 1
                            self.column = 1
                            print(f"Line :{self.line_no}")
                        if c == "~":
                            self.state = -1
                    elif c == "<":
                        self.state = 1
                    elif c == ">":
                        self.state = 5
                    elif c == "=":
                        self.state = 8
                    elif c.isalpha():
                        self.state = 10
                    elif c.isdigit():
                        self.state = 22
                    elif self.isSymbol(c):
                        self.state = 24
                    elif c == "+":
                        self.state = 12
                    elif c == "-":
                        self.state = 15
                    elif c == "*":
                        self.state = 18
                    elif c == "/":
                        self.state = 19
                    elif c == "%":
                        self.state = 20
                    else:
                        self.state = -1
                    continue
                case 1:
                    c = self.next_char()
                    if c == "=":
                        self.state = 2
                    elif c == ">":
                        self.state = 3
                    else:
                        self.state = 4
                    continue
                case 2:
                    self.lexbeg = self.fwdptr
                    return Token("relop", "<=", self.line_no, self.column)
                case 3:
                    self.lexbeg = self.fwdptr
                    return Token("relop", "<>", self.line_no, self.column)
                case 4:
                    self.retract()
                    self.lexbeg = self.fwdptr
                    return Token("relop", "<", self.line_no, self.column)
                case 5:
                    c = self.next_char()
                    if c == "=":
                        self.state = 6
                    else:
                        self.state = 7
                    continue
                case 6:
                    self.lexbeg = self.fwdptr
                    return Token("relop", ">=", self.line_no, self.column)
                case 7:
                    self.retract()
                    self.lexbeg = self.fwdptr
                    return Token("relop", ">", self.line_no, self.column)
                case 8:
                    c = self.next_char()
                    if c == "=":
                        self.state = 9
                    else:
                        self.state = 21
                    continue
                case 9:
                    self.lexbeg = self.fwdptr
                    return Token("relop", "==", self.line_no, self.column)
                case 10:
                    c = self.next_char()
                    if c.isalpha() or c.isdigit() :
                        self.state = 10
                    else:
                        self.state = 11
                    continue
                case 11:
                    self.retract()
                    lexeme = self.code[self.lexbeg : self.fwdptr]
                    self.lexbeg = self.fwdptr
                    return Token(self.getType(lexeme), lexeme, self.line_no, self.column)
                case 12:
                    c = self.next_char()
                    if c == "+":
                        self.state = 13
                    else:
                        self.state = 14
                    continue
                case 13:
                    self.lexbeg = self.fwdptr
                    return Token("arop", "++", self.line_no, self.column)
                case 14:
                    self.retract()
                    self.lexbeg = self.fwdptr
                    return Token("arop", "+", self.line_no, self.column)
                case 15:
                    c = self.next_char()
                    if c == "-":
                        self.state = 16
                    else:
                        self.state = 17
                    continue
                case 16:
                    self.lexbeg = self.fwdptr
                    return Token("arop", "--", self.line_no, self.column)
                case 17:
                    self.retract()
                    self.lexbeg = self.fwdptr
                    return Token("arop", "-", self.line_no, self.column)
                case 18:
                    self.lexbeg = self.fwdptr
                    return Token("arop", "*", self.line_no, self.column)
                case 19:
                    self.lexbeg = self.fwdptr
                    return Token("arop", "/", self.line_no, self.column)
                case 20:
                    self.lexbeg = self.fwdptr
                    return Token("arop", "%", self.line_no, self.column)
                case 21:
                    self.retract()
                    self.lexbeg = self.fwdptr
                    return Token("assig", "=", self.line_no, self.column)
                case 22:
                    c = self.next_char()
                    if c.isdigit():
                        self.state = 22
                    else:
                        self.state = 23
                    continue
                case 23:
                    self.retract()
                    lexeme = self.code[self.lexbeg : self.fwdptr]
                    self.lexbeg = self.fwdptr
                    return Token("number", lexeme, self.line_no, self.column)
                case 24:
                    self.lexbeg = self.fwdptr
                    return Token("symbol", c, self.line_no, self.column)
                

code = """
x = 10 + 20
while (x>0){
    x = x - 1
}
"""

lexer = Lexer(code)

while True:

    token = lexer.next_token()

    print(token)
    if token.type == "EOF":
        break