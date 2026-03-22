from ..lexer.lexer import Lexer
from .ast_nodes import ASTNode


class ASTBuilder:

    def __init__(self, code):

        self.lexer = Lexer(code)
        self.currentToken = self.lexer.next_token()

    def match(self, expected):

        if (
            self.currentToken.type == "keyword"
            and self.currentToken.value == expected
        ):
            self.currentToken = self.lexer.next_token()

        elif (
            self.currentToken.type == "symbol"
            and self.currentToken.value == expected
        ):
            self.currentToken = self.lexer.next_token()

        elif self.currentToken.type == expected:
            self.currentToken = self.lexer.next_token()

        else:
            raise Exception(
                f"Syntax Error: expected {expected}, got {self.currentToken.value}"
            )

    def factor(self):

        if self.currentToken.type == "number":

            value = self.currentToken.value
            self.match("number")

            return ASTNode("Number", value)

        elif self.currentToken.type == "IDENTIFIER":

            value = self.currentToken.value
            self.match("IDENTIFIER")

            return ASTNode("Identifier", value)

        else:
            raise Exception("Invalid factor")

    def term(self):

        node = self.factor()

        while self.currentToken.value in ["*", "/"]:

            operator = self.currentToken.value
            self.match("arop")

            right = self.factor()

            node = ASTNode("BinaryOp", operator, [node, right])

        return node

    def expression(self):

        node = self.term()

        while self.currentToken.value in ["+", "-"]:

            operator = self.currentToken.value
            self.match("arop")

            right = self.term()

            node = ASTNode("BinaryOp", operator, [node, right])

        return node

    def condition(self):

        left = self.expression()

        operator = self.currentToken.value
        self.match("relop")

        right = self.expression()

        return ASTNode("Condition", operator, [left, right])

    def var_decl(self):

        self.match("let")

        name = self.currentToken.value
        self.match("IDENTIFIER")

        self.match("assig")

        expr = self.expression()

        return ASTNode("VarDecl", name, [expr])

    def if_condition(self):

        self.match("if")

        cond = self.condition()

        self.match("{")

        body = self.body()

        self.match("}")

        return ASTNode("IfStmt", None, [cond, body])

    def stmt(self):

        if (
            self.currentToken.type == "keyword"
            and self.currentToken.value == "let"
        ):
            return self.var_decl()

        elif (
            self.currentToken.type == "keyword"
            and self.currentToken.value == "if"
        ):
            return self.if_condition()

        else:
            raise Exception("Unknown statement")

    def body(self):

        statements = []

        while not (
            self.currentToken.type == "symbol"
            and self.currentToken.value == "}"
        ):
            statements.append(self.stmt())

        return ASTNode("Body", None, statements)

    def stmtList(self):

        statements = []

        while self.currentToken.type != "EOF":
            statements.append(self.stmt())

        return ASTNode("Program", None, statements)

    def start(self):

        ast = self.stmtList()

        print("✅ AST Generated Successfully\n")

        print(ast)

        return ast