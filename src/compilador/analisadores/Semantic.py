from Syntactic import LeafNode, NonLeafNode
from Token import Token

class Semantic:
    def __init__(self):
        self.simbol_table = {}


    def check_variable_declaration(self, variable_name):
        if variable_name not in self.simbol_table:
            raise ValueError(f"Erro semântico: variável '{variable_name}' não declarada.")
        
        
    def check_variable_usage(self, variable_name):
        if variable_name not in self.simbol_table:
            raise ValueError(f"Erro semântico: variável '{variable_name}' não declarada")
        
        
    def assign_type(self, esq, dir, operator):
        if operator in ("+", "-", "*", "/"):
            type1 = self.get_node_type(esq)
            type2 = self.get_node_type(dir)
            
            if type1 != "Inteiro" or type2 != "Inteiro":
                raise ValueError(f"Erro semântico: operação só é permitida com valores inteiros")