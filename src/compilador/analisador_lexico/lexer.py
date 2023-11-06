import re
from token_class import Token
from token_patterns import token_patterns

def ler_codigo(arq):
	codigo = ""
	with open(arq, "r", encoding="utf-8") as f:
		codigo = f.read()
	return codigo


def lexer(codigo_fonte, token_patterns):
    tokens = []
    posicao = 0
    linha = 1
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
                    comentario = any(p.startswith('/') for p, _ in token_patterns)

                if not valor.isspace() and tipo != 'COMENTARIO' and not comentario:
                    if tipo == "STRING":
                        tokens.append(Token("DQUOTE", valor[0], linha))
                        tokens.append(Token(tipo, valor[1:-1], linha))
                        tokens.append(Token("DQUOTE", valor[-1], linha))
                    else:
                        tokens.append(Token(tipo, valor, linha))

                posicao = match.end()
                break

        if not match:
            if codigo_fonte[posicao] == '\n':
                linha += 1
                comentario = False
            elif not codigo_fonte[posicao].isspace():
                raise ValueError(f"Erro léxico: Caractere inesperado em '{codigo_fonte[posicao]}' na linha {linha} e na posição {posicao}")

            posicao += 1

    tokens.append(Token("EOF", "EOF", linha + 1))

    return tokens


if __name__ == '__main__':
    codigo_fonte = ler_codigo("codigo.txt")
    tokens = lexer(codigo_fonte, token_patterns)
    for token in tokens:
        print(token)
