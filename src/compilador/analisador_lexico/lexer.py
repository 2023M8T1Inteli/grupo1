import re
from Token import Token


class Lexer:
    def lexer(source_code, token_patterns):
        tokens = []
        position = 0
        line = 1
        comment_line = 0
        in_comment = False

        while position < len(source_code):
            match = None

            for pattern, type_ in token_patterns:
                regex = re.compile(pattern, re.DOTALL)
                match = regex.match(source_code, position)

                if match:
                    value = match.group(0)

                    if value == "/":
                        position = match.end()
                        # Verificando se existe algum comentário continuado no código
                        in_comment = any(p.startswith("/") for p, _ in token_patterns)

                    if type_ == "COMENTARIO":
                        for x in range(len(value)):
                            if value[x] == "\n":
                                comment_line += 1

                    # Ignorando espaços em branco e comentários
                    if not value.isspace() and type_ != "COMENTARIO" and not in_comment:
                        if type_ == "STRING":
                            # Fazendo a separação de aspas duplas em uma string
                            tokens.append(
                                Token("DQUOTE", value[0], line + comment_line)
                            )
                            tokens.append(
                                Token(type_, value[1:-1], line + comment_line)
                            )
                            tokens.append(
                                Token("DQUOTE", value[-1], line + comment_line)
                            )
                        else:
                            tokens.append(Token(type_, value, line + comment_line))

                    position = match.end()
                    break

            if not match:
                if source_code[position] == "\n":
                    # Atualizando o número da linha ao encontrar uma quebra de linha
                    line += 1
                    in_comment = False
                elif not source_code[position].isspace():
                    raise ValueError(
                        f"Erro léxico: Caractere inesperado em '{source_code[position]}' na linha {line} e na posição {position}"
                    )

                position += 1

        tokens.append(Token("EOF", "EOF", line + comment_line + 1))

        return tokens
