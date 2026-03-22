from .ast_builder import ASTBuilder


def main():

    code = """

    if 10 > 5 {

        let a = 10 + 20 * 3

    }

    """

    parser = ASTBuilder(code)

    parser.start()


if __name__ == "__main__":
    main()