# Resultados: Léxico

## Introdução

A análise léxica desempenha um papel fundamental no processo de compilação de programas. Esta fase consiste na identificação e categorização de elementos léxicos no código-fonte, como palavras-chave, identificadores e símbolos, por meio de um analisador léxico. O analisador percorre o código caractere por caractere, agrupando-os em tokens, unidades significativas para a linguagem de programação em questão. 

A precisão dessa etapa é crucial, pois fornece uma base estruturada para as fases subsequentes da compilação, como análise sintática e geração de código intermediário. 

Abaixo apresentamos alguns exemplos de entradas e os tokens correspondentes produzidos pelo analisador léxico.

## Testes 

Para verificar os resultados do analisador léxico, foram usados 5 arquivos '.txt', que estão na pasta ../src/compilador/analisador_lexico/examples do repositório. Os resultados dos testes podem ser vistos a seguir.

## Exemplo 1

### Input

```
> python Test.py example1
```

```
programa :
inicio
    programas = verdade
    verdades = 0
    se entao inicio
        ses = verdades
        programas = ler()
        x = ler_varios(11, 4, 1)
    fim
fim.
```
### Output

```
(PROGRAMA programa 1)
(COLON : 1)
(LBLOCK inicio 2)
(IDENTIFICADOR programas 3)
(ASSIGN = 3)
(BOOLEAN verdade 3)        
(IDENTIFICADOR verdades 4) 
(ASSIGN = 4)
(NUMERO 0 4)
(SE se 5)
(ENTAO entao 5)
(LBLOCK inicio 5)
(IDENTIFICADOR ses 6)
(ASSIGN = 6)
(IDENTIFICADOR verdades 6)
(IDENTIFICADOR programas 7)
(ASSIGN = 7)
(COMANDO ler 7)
(LPAR ( 7)
(RPAR ) 7)
(IDENTIFICADOR x 8)
(ASSIGN = 8)
(COMANDO ler_varios 8)
(LPAR ( 8)
(NUMERO 11 8)
(COMMA , 8)
(NUMERO 4 8)
(COMMA , 8)
(NUMERO 1 8)
(RPAR ) 8)
(RBLOCK fim 9)
(RBLOCK fim 10)
(DOT . 10)
(EOF EOF 11)
```

## Exemplo 2

### Input

```
> python Test.py example2
```

```
se abc <> xyz entao
inicio
    x=(verdade)
    y= ler ( )
fim
```
### Output

```
(SE se 1)
(IDENTIFICADOR abc 1)
(OPREL <> 1)
(IDENTIFICADOR xyz 1)
(ENTAO entao 1)
(LBLOCK inicio 2)
(IDENTIFICADOR x 3)
(ASSIGN = 3)
(LPAR ( 3)
(BOOLEAN verdade 3)
(RPAR ) 3)
(IDENTIFICADOR y 4)
(ASSIGN = 4)
(COMANDO ler 4)
(LPAR ( 4)
(RPAR ) 4)
(RBLOCK fim 5)
(EOF EOF 6)
```

## Exemplo 3

### Input

```
> python Test.py example3
```

```
teste = 1+2 -3 *
40/5 ^ 6 %

987
```
### Output

```
(IDENTIFICADOR teste 1)
(ASSIGN = 1)
(NUMERO 1 1)
(OPSUM + 1)
(NUMERO 2 1)
(OPSUM - 1)
(NUMERO 3 1)
(OPMUL * 1)
(NUMERO 40 2)
(NUMERO 987 4)
(EOF EOF 5)
```

## Exemplo 4

### Input

```
> python Test.py example4
```

```
inicio
    z = -1234
fim
```
### Output

```
(LBLOCK inicio 1)
(IDENTIFICADOR z 2)
(ASSIGN = 2)
(OPSUM - 2)
(NUMERO 1234 2)
(RBLOCK fim 3)
(EOF EOF 4)
```


## Exemplo 5

### Input

```
> python Test.py example5
```

```
a = 1
b = 12
c = (12+3)
```
### Output


```
(IDENTIFICADOR a 1)
(ASSIGN = 1)
(NUMERO 1 1)
(IDENTIFICADOR b 2)
(ASSIGN = 2)
(NUMERO 12 2)
(IDENTIFICADOR c 3)
(ASSIGN = 3)
(LPAR ( 3)
(NUMERO 12 3)
(OPSUM + 3)
(NUMERO 3 3)
(RPAR ) 3)
(EOF EOF 4)
```