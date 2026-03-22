# AST node classes for the parser



class ASTNode:

    def __init__(self, node_type, value=None, children=None):

        self.node_type = node_type
        self.value = value
        self.children = children if children else []

    def __repr__(self, level=0):

        indent = "  " * level

        result = f"{indent}{self.node_type}"

        if self.value is not None:
            result += f": {self.value}"

        result += "\n"

        for child in self.children:
            result += child.__repr__(level + 1)

        return result