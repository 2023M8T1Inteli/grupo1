# Resultados: Sintático

O Analisador Sintático consiste na segunda etapa da criação do compilador. Sua funcionalidade consiste em verificar se o código feito pelo programador está sintaticamente correto, isto é, se há algum sentido gramatical da linguagem.

Iremos utilizar este exemplo para melhor explicação:

### Exemplo:

```
x = 2
```

Na linguagem do projeto, esta sentença está de acordo com a gramática estabelecida. Aqui, há a criação da variável `x`, o símbolo de atribuição `=` e, por fim, o número `2`. Nesta sentença, a variável `x` está recendo o valor `2`.

```
2 = x
```

Esta sentença, porém, não está de acordo com a gramática estabelecida. A sequência de um número `2`, um símbolo de atribuição `=` e uma variável `x` não possui sentido e gerará um erro durante o processo de compilação do código, mesmo que Números, Símbolos de Atribuição e Variáveis existam dentro da linguagem.

## Resultados

Alguns testes foram realizados sobre o Analisador Sintático do projeto e estes são os resultados obtidos:

### Exemplo Sintático 1

```
programa "teste simples":
inicio

fim.
```
```
SUCESSO
```

No exemplo acima, há a declaração básica de um programa que realiza um teste simples: inicia e termina sem a execução de algum código lógico. Após ser processado no Analisador Sintático, uma lista de Tokens é retornada que é executada no Analisador Sintático e nenhum problema é identificado conforme o esperado. Os testes são rápidos, sem demora.

### Exemplo Sintático 2

```
programa "teste2":
inicio
_variavel1 = ler()
    /* Nesta primeira versão recomendamos que vocês
     não tratem as regras <expression> nem <sum_expression>.
     Para os comandos abaixo, ao invés de "casar" com um
     <sum_expression>, case os valores com tokens INTEGER */
    xyz = ler_varios(1, 2, 3)
mostrar(4)
fim.
```

```
SUCESSO
```

Aqui há um código mais complexo onde há a execução de funções como ler() e ler_varios(1, 2, 3) e também comentáros. O Analisador Léxico retorna somente os Tokens relevantes, isto é, não retorna os comentários, e o Analisadoe Sintático não encontra problemas na sintaxe do código, pois funções podem ser atribuídas a variáveis sem problema algum.