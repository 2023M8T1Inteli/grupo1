import re
from Token import Token


class Lexer:
    def lexer(source_code, token_patterns):
        """Realiza a análise léxica do código-fonte."""
        tokens = []
        position = 0
        line = 1
        in_comment = False

        while position < len(source_code):
            match = None

            # Verifica se o próximo token é um comentário de linha única
            if source_code.startswith('//', position):
                end_comment = source_code.find('\n', position)
                position = end_comment if end_comment != -1 else len(source_code)
                continue

            for pattern, tipo in token_patterns:
                regex = re.compile(pattern, re.DOTALL)
                match = regex.match(source_code, position)

                if match:
                    value = match.group(0)

                    if tipo == 'COMENTARIO':
                        # Atualiza o número de linhas para comentários de múltiplas linhas
                        line += value.count('\n')
                        position = match.end()
                        break

                    # Ignorando espaços em branco e comentários
                    if not value.isspace() and tipo != 'COMENTARIO' and not in_comment:
                        if tipo == "STRING":
                            # Fazendo a separação de aspas duplas em uma string
                            tokens.append(Token("DQUOTE", value[0], line))
                            tokens.append(Token(tipo, value[1:-1], line))
                            tokens.append(Token("DQUOTE", value[-1], line))
                        else:
                            tokens.append(Token(tipo, value, line))

                    position = match.end()
                    break

            if not match:
                if source_code[position] == '\n':
                    # Atualizando o número da linha ao encontrar uma quebra de linha
                    line += 1
                    in_comment = False
                elif not source_code[position].isspace():
                    raise ValueError(f"Erro léxico: Caractere inesperado em '{source_code[position]}' na linha {line} e na posição {position}")

                position += 1

        tokens.append(Token("EOF", "EOF", line + 1))
        return tokens
