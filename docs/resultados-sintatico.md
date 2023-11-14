# Resultados: Sintático

&emsp;O Analisador Sintático consiste na segunda etapa da criação do compilador. Sua funcionalidade consiste em verificar se o código feito pelo programador está sintaticamente correto, isto é, se há algum sentido gramatical da linguagem.

&emsp;Iremos utilizar este exemplo para melhor explicação:

### Exemplo:

```
x = 2
```

&emsp;Na linguagem do projeto, esta sentença está de acordo com a gramática estabelecida. Aqui, há a criação da variável `x`, o símbolo de atribuição `=` e, por fim, o número `2`. Nesta sentença, a variável `x` está recendo o valor `2`.

```
2 = x
```

&emsp;Esta sentença, porém, não está de acordo com a gramática estabelecida. A sequência de um número `2`, um símbolo de atribuição `=` e uma variável `x` não possui sentido e gerará um erro durante o processo de compilação do código, mesmo que Números, Símbolos de Atribuição e Variáveis existam dentro da linguagem.

## Resultados

&emsp;Alguns testes foram realizados sobre o Analisador Sintático do projeto e estes são os resultados obtidos:

### Exemplo Sintático 1

```
programa "teste simples":
inicio

fim.
```
```
SUCESSO
```

&emsp;No exemplo acima, há a declaração básica de um programa que realiza um teste simples: inicia e termina sem a execução de algum código lógico. Após ser processado no Analisador Léxico, uma lista de Tokens com "Tipo", "Valor" e "Linha" é retornada e levada ao Analisador Sintático.

&emsp;O Analisador Sintático pega, sequencialmente, um Token por vez, comparando se o seu tipo atual é igual ao tipo que se é esperado naquele momento. Por exemplo, quando o programa inicia, se espera um Token tipo "PROGRAMA", logo em seguida um Token tipo "ASPAS", um tipo "IDENTIFICADOR", um tipo "ASPAS" e, por fim, um tipo "COLON". Esta linha inicial seria a declaração que há um programa naquele código e que a STRING representa seu nome. Nenhum problema é identificado conforme o esperado e a execução do programa é rápida. Por fim, é criado o bloco principal do código, cada bloco possui no começo o Token "INICIO" e no final o Token "FIM", e para sinalizar o fim do programa, é acrescentado n última linha o Token "DOT".

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

&emsp;Um código mais complexo é executando onde há funções como ler() e ler_varios(1, 2, 3) e também comentáros. O Analisador Léxico retorna somente os Tokens relevantes, isto é, não retorna os comentários.

&emsp;Seguindo a mesma lógica do código anterior, há a inicialização do programa na primeira linha, a abertura de um bloco de código e um "IDENTIFICADOR", um "ASSIGN" e um "COMANDO", assim como logo abaixo (ignorando os comentários). Esta sequência é correta na gramática na linguagem, assim como também a execução da função `mostrar()` (que seria um "COMANDO") de maneira isolada com o "NUMBER" 4. Por fim, o bloco é fechado e o programa finalizado.

&emsp;O Analisador Sintático não encontra problemas na sintaxe do código, pois funções podem ser atribuídas a variáveis sem problema algum, além dos fatores citados acima.