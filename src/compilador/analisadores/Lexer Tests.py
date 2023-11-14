import re
import sys
from Syntactic import Syntatic
from Token import Token
from token_patterns import token_patterns
from Lexer import Lexer
from Compiler import Compiler


if __name__ == '__main__':
    # Lendo o código-fonte do arquivo "codigo.txt" e realizando a análise léxica

    valor = "codigo.txt"

    if len(sys.argv) > 1:
        valor = "./examples/" + sys.argv[1] + ".txt"

    codigo_fonte = Compiler.read_code(valor)
    tokens = Lexer.lexer(codigo_fonte, token_patterns)
    
    for token in tokens:
        print(token)


