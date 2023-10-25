# Defina as regras de tokenização usando expressões regulares
token_patterns = [
    (r'(\d+)', 'NUMERO'),         # Números inteiros
    (r'[a-zA-Z_]\w*', 'IDENTIFICADOR'),  # Identificadores (variáveis)
    (r'\+', 'MAIS'),             # Operador de adição
    (r'\-', 'MENOS'),            # Operador de subtração
    (r'\*', 'VEZES'),            # Operador de multiplicação
    (r'/', 'DIVIDIDO'),           # Operador de divisão
    (r'\(', 'ABRE_PARENTESES'),  # Delimitador de abre parênteses
    (r'\)', 'FECHA_PARENTESES'),  # Delimitador de fecha parênteses
    (r'=', 'ATRIBUICAO')         # Operador de atribuição
]