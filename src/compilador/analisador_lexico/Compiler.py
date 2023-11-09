from Lexer import Lexer
from Syntactic import Syntatic
from Tree import Tree
from token_patterns import token_patterns
from Token import Token


class Compiler:
    def read_code(file):  # Função que faz a leitura do código fonte do arquivo
        code = ""
        with open(file, "r", encoding="utf-8") as f:
            code = f.read()
        return code

    if __name__ == "__main__":
        source_code = read_code("codigo.txt")
        tokens = Lexer.lexer(source_code, token_patterns)
        for token in tokens:
            print(token)
        syntax = Syntatic(tokens)
        syntax.analyze()
