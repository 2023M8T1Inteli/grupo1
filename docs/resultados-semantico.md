# Resultados: Semântico

## Introdução

O Analisador Semântico consiste na terceira etapa do compilador de código produzido no projeto. Sua funcionalidade consiste em analisar a Árvore Sintática gerada no Analisador Sintático e averiguar se algum possível erro específico da linguagem ainda esteja no código, como variáveis não declaradas ou tentativa de atribuir um valor a uma variável que ela não pode receber.

### Exemplo

```
programa "exemplo_semantico1":
inicio
    x = x * 2
fim.
```

O código acima demostra um possível erro que somente o semântico pode detectar: uma variável não inicializada. Na linha 3 podemos encontrar a expressão `x = x * 2`, mesmo ela estando lexicamente e sintaticamente correta (refira-se aos resultados de analisadores anteriores para mais informações), a variável `x` ainda não recebeu nenhum valor até aquele momento, fazendo que a tentativa de multiplicar `x` por `2` seja ambíguo, retornando um erro semântico.

## Resultados

Alguns códigos fontes de exemplo foram testados para verificar não só a funcionalidade do código na capacidade de detectar erros semânticos, mas também verificar a quantidade de funcionalidades que estão implementadas.

### Exemplo Semântico 1

```
programa "exemplo_semantico1":
inicio
    valor = ler()
    se valor >= 10 entao
    inicio
        x = x + 1
        mostrar(x)
    fim
fim.

```

```
ValueError: Variável x na linha 6 não foi declarada.
```

O teste acima é parecido com o exemplo apresentado no começo desde documento: uma variável ainda não declara está recebendo como valor ela mesma em somatória com `1`. Como dito antes, isto esta semânticamente incorreto, pois como `x` ainda não possui valor declarado, é impossível saber o resultado de tal soma.

### Exemplo Semântico 2

```
programa "exemplo_semantico2":
inicio
    x = 1
    y = x * 2 + (z / 5)
    z = 2
fim.
```
```
ValueError: Variável z na linha 4 não foi declarada.
```

A primeira vista, o exemplo parece ser mais complexo aos anteriores, pois há uma expressão de 4 fatores na linha 4, porém é evidente que a variável `z` não foi declarada uma única vez antes de chegar nesta linha. Mesmo que uma declaração seja feita na linha 5, isto é, logo depois, o código não é capaz de deduzir o valor de `z` naquele determinado momento, lançando um erro semântico em tal cenário.

### Exemplo Semântico 3

```
programa "exemplo_semantico3":
inicio
    i = 0
    enquanto i <= 10 faca
    inicio

    fim
fim.
```
```
ValueError: O bloco que inicia na linha 5 está vazio.
```

Um caso peculiar é demonstrado no Exemplo 3: um bloco de código vazio. Conforme as regras de funcionalidade e execução da linguagem QAL, a que o compilador utilizada como input para gerar código Python, um bloco de código não pode estar vazio, pois seu estado jamais será alterado, causando uma redundância.