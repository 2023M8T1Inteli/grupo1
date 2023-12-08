import Funcoes as Funcoes
j = 10
_TEMP_VAR_REL = j>=1
while _TEMP_VAR_REL:
    _TEMP_VAR_MUL1 = j*2
    _TEMP_VAR_MUL2 = _TEMP_VAR_MUL1%5
    Funcoes.mostrar_tocar(_TEMP_VAR_MUL2, j)
    _TEMP_VAR_REL = j-1
    j = _TEMP_VAR_REL