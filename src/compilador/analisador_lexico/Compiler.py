from Lexer import Lexer
from Syntactic import Syntatic
from Tree import Tree, Node
from token_patterns import token_patterns


class Compiler:
    def read_code(file):  # Função que faz a leitura do código fonte do arquivo
        code = ""
        with open(file, "r", encoding="utf-8") as f:
            code = f.read()
        return code

    if __name__ == "__main__":
        # Lê o código fonte fornecido
        source_code = read_code("codigo.txt")

        # Cria uma instância do analisador léxico e gera os tokens do código
        tokens = Lexer.lexer(source_code, token_patterns)
        for token in tokens:
            print(token)

        # Cria uma instância do analisador sintático e faz a análise com base nos tokens
        syntax = Syntatic(tokens)
        syntax.analyze()

        # Cria uma árvore sintática com os tokens
        tree = Tree()
        for token in tokens:
            node = Node(token)
            tree.add_node(node)
            tree.print_tree(tree.root)