from ..lexer.lexer import Lexer

class Grammer:

    def __init__(self, code):
        self.lexer = Lexer(code)
        self.currentToken = self.lexer.next_token()
        
    #function to check expected token 
    def match(self, expected):
        print(self.currentToken)

        # if keyword we need check value of keyword
        if self.currentToken.type == "keyword" and self.currentToken.value == expected: 
            self.currentToken = self.lexer.next_token()

        elif self.currentToken.type == "symbol" and self.currentToken.value == expected: 
            self.currentToken = self.lexer.next_token()

        # else check the type like identifer ,number,etc
        elif self.currentToken.type == expected:
            self.currentToken = self.lexer.next_token()

        else:
            print("Syntax Error: expected", expected," at line:",self.currentToken.line)


    ##          functions below defines the context free grammer of this language       ##
    #function to check syntax of an expression
    def expression(self):
        if self.currentToken.type == "number":
            self.match("number")
        else:
            print("Error in expression")


    #function to check syntax of variable declaration
    def var_decl(self):
        self.match("let")
        self.match("IDENTIFIER")
        self.match("assig")
        self.expression()

    def body(self):
        while self.currentToken.value != "}" and self.currentToken.type != "EOF":
            self.stmt()

    def condition(self):
        self.expression()
        self.match("relop")
        self.expression()


    def if_condition(self):
        self.match("if")
        self.condition();
        self.match("{")
        self.body()
        self.match("}")

    def while_loop(self):
        self.match("while")
        self.condition();
        self.match("{")
        self.body()
        self.match("}")


    #function to check valid statment start like : let, for, while, if
    def stmt(self):
        if self.currentToken.value == "let":
            self.var_decl()
        elif self.currentToken.value == "if":
            self.if_condition()
        elif self.currentToken.value == "while":
            self.while_loop()
        else:
            print("Unknown statement at line:",self.currentToken.line)
            self.currentToken = self.lexer.next_token()
            
    #function to loop over each statement of source code until EOF token is recived
    def stmtList(self):
        while self.currentToken.type != "EOF":
            self.stmt()
    #function that represent start symbol of the grammer
    def start(self):
        self.stmtList()
        print("parsing completed")



code = """if 10 > 5 { let a = 10"""

if __name__ == "__main__":
    grammer = Grammer(code)
    grammer.start()  
