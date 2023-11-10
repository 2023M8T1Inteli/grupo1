import re
import sys
from syntactic import syntatic
from token_class import Token
from token_patterns import token_patterns

def ler_codigo(arq):
    # Função que faz a leitura do código fonte do arquivo
    codigo = ""
    with open(arq, "r", encoding="utf-8") as f:
        codigo = f.read()
    return codigo

def lexer(codigo_fonte, token_patterns):
    tokens = []
    posicao = 0
    linha = 1
    linhaComentario = 0
    comentario = False

    while posicao < len(codigo_fonte):
        match = None

        for pattern, tipo in token_patterns:
            regex = re.compile(pattern, re.DOTALL)
            match = regex.match(codigo_fonte, posicao)

            if match:
                valor = match.group(0)

                if valor == '/':
                    posicao = match.end()
                    # Verificando se existe algum comentário continuado no código
                    comentario = any(p.startswith('/') for p, _ in token_patterns)
                
                if tipo == 'COMENTARIO':
                    for x in range(len(valor)):
                        if valor[x] == '\n':
                            linhaComentario += 1

                # Ignorando espaços em branco e comentários
                if not valor.isspace() and tipo != 'COMENTARIO' and not comentario:
                    if tipo == "STRING":
                        # Fazendo a separação de aspas duplas em uma string
                        tokens.append(Token("DQUOTE", valor[0], linha + linhaComentario))
                        tokens.append(Token(tipo, valor[1:-1], linha + linhaComentario))
                        tokens.append(Token("DQUOTE", valor[-1], linha + linhaComentario))
                    else:
                        tokens.append(Token(tipo, valor, linha + linhaComentario))

                posicao = match.end()
                break

        if not match:
            if codigo_fonte[posicao] == '\n':
                # Atualizando o número da linha ao encontrar uma quebra de linha
                linha += 1
                comentario = False
            elif not codigo_fonte[posicao].isspace():
                raise ValueError(f"Erro léxico: Caractere inesperado em '{codigo_fonte[posicao]}' na linha {linha} e na posição {posicao}")

            posicao += 1

    tokens.append(Token("EOF", "EOF", linha + linhaComentario + 1))

    return tokens

if __name__ == '__main__':
    # Lendo o código-fonte do arquivo "codigo.txt" e realizando a análise léxica

    valor = "codigo.txt"

    if len(sys.argv) > 1:
        valor = "./examples/" + sys.argv[1] + ".txt"

    codigo_fonte = ler_codigo(valor)
    tokens = lexer(codigo_fonte, token_patterns)
    for token in tokens:
        print(token)
    syntax = syntatic(tokens)
    syntax.analyze()
