import os
import sys
from Lexer import Lexer
from Syntactic import Syntatic
from token_patterns import token_patterns
from pprint import pprint
from Semantic import Semantic
from CodeGeneration import CodeGeneration

class Compiler:
    def read_code(file_path):
        code = ""
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                code = file.read()
        except FileNotFoundError:
            print(f"O arquivo '{file_path}' não foi encontrado.")
            sys.exit(1)
        return code
    
    def compile(source_code):
        # Cria uma instância do analisador léxico e gera os tokens do código
        tokens = Lexer.lexer(source_code, token_patterns)
        #for token in tokens:
            #print(token)

        # Cria uma instância do analisador sintático e faz a análise com base nos tokens
        syntax = Syntatic(tokens)
        tree = syntax.analyze()

        semantic = Semantic(tree)
        semantic.analyze()

        codeGeneration = CodeGeneration()
        codigoPython = codeGeneration.run(tree)

        caminho = "./exitCode.py"

        if os.getcwd()[-12:] != "compilador":
            caminho = os.path.abspath(os.path.join(os.path.dirname(__file__), '../compilador/exitCode.py'))
        
        #open text file
        text_file = open(caminho, "w")

        #write string to file
        text_file.write(codigoPython)
        
        #close file
        text_file.close()

        os.system('python3 ' + caminho)


if __name__ == "__main__":
    # Verifica se o caminho do arquivo foi fornecido como argumento
    if len(sys.argv) != 2:
        print("Por favor, forneça o caminho do arquivo como argumento.")
        sys.exit(1)

    # Lê o código fonte do arquivo fornecido
    file_path = sys.argv[1]
    source_code = Compiler.read_code(file_path)

    # Compila o código fonte
    Compiler.compile(source_code)
