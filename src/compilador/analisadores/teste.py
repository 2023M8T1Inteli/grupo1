import Funcoes as Funcoes
a = Funcoes.ler()
b = Funcoes.ler_varios(4,3,1)
_TEMP_VAR_REL = a!=5
_TEMP_VAR_REL = b and _TEMP_VAR_REL
if _TEMP_VAR_REL:
        Funcoes.mostrar(2)
        j = 10
        _TEMP_VAR_REL = j>=1
        while _TEMP_VAR_REL:
                _TEMP_VAR_MUL1 = j*2
                _TEMP_VAR_MUL2 = _TEMP_VAR_MUL1%5
                Funcoes.mostrar_tocar(_TEMP_VAR_MUL2, j)
                _TEMP_VAR_REL = j-1
                j = _TEMP_VAR_REL
_TEMP_VAR_POW1 = 3**5
_TEMP_VAR_POW2 = 2**_TEMP_VAR_POW1
_TEMP_VAR_REL = 1+_TEMP_VAR_POW2
x = _TEMP_VAR_REL
_TEMP_VAR_MUL1 = x%20
Funcoes.esperar(int(_TEMP_VAR_MUL1))