# Defina as regras de tokenização usando expressões regulares
token_patterns = [
    (r"/\*[\s\S]*?\*/", "COMENTARIO"),
    (r"\d+", "NUMERO"),  # Números inteiros
    (r"EOF", "EOF"),
    (r"\bprograma\b", "PROGRAMA"),
    (r"\bse\b", "SE"),
    (r"<>|<=|>=|>|<|==", "OPREL"),  # Operadores relacionais
    (r"\bentao\b", "ENTAO"),
    (r"\bsenao\b", "SENAO"),
    (r"\benquanto\b", "ENQUANTO"),
    (r"\bfaca\b", "FACA"),
    (r"\bnao\b", "NAO"),
    (r"\+|-|ou", "OPSUM"),
    (
        r"\bler\b|\bler_varios\b|\bmostrar\b|\btocar\b|\bmostrar_tocar\b|\besperar\b",
        "COMANDO",
    ),  # Comandos
    (r"\*|/|%|e", "OPMUL"),
    (r"\^", "OPPOW"),  # Operadores matemáticos
    (r"\binicio\b", "LBLOCK"),
    (r"\bfim\b", "RBLOCK"),
    (r"\bverdade\b|\bfalso\b", "BOOLEAN"),
    (r"[a-zA-Z_]\w*", "IDENTIFICADOR"),  # Identificadores
    (r":", "COLON"),
    (r",", "COMMA"),
    (r"\.", "DOT"),
    (r'"[^"]*"', "STRING"),  # Conteúdo entre aspas duplas
    (r'"', "DQUOTE"),  # Operadores lógicos
    (r"=", "ASSIGN"),
    (r"\(", "LPAR"),  # LPAR
    (r"\)", "RPAR"),  # RPAR
    (r"\binteiro\b|\bbooleano\b", "IDENTIFICADOR_DECL"),
]
