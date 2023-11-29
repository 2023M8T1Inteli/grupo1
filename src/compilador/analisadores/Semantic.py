class Semantic:
    def __init__(self, tree):
        self.tree = tree
        self.simbol_table = {}


    def analisar(self):
        self.visitarAlg()


    def visitarAlg(self):
        id_programa = self.tree.get("nome")

        if id_programa in self.simbol_table:
            raise ValueError(f"Erro semântico: programa '{id_programa}' na linha '{self.tree.get("linha")} já declarado.")

        self.simbol_table[id_programa] = 0 #alterar para o tipo do programa

        self.visitarDeclarations(self.tree.get("declarations"))
        self.visitarBlock(self.tree.get("block"))

        return self.simbol_table
    

    def visitarDeclarations(self, noDeclarations):
        var_declarations = noDeclarations.get("var_declarations")

        while var_declarations != None:
            self.visitarVarDeclaration(var_declarations.get("var_declaration"))

        
    

    def visitarVarDeclaration(self, noVarDeclaration):
        id_var = noVarDeclaration.get("ID")
        identifier_list = noVarDeclaration.get("identifier_list")
        identifier_type = noVarDeclaration.get("tipo")

        for identifier in identifier_list:
            if identifier in self.simbol_table:
                raise ValueError(f"Erro semântico: variável '{identifier}' na linha '{noVarDeclaration.get("linha")} já declarada.")

            self.simbol_table[identifier] = identifier_type


    def visitarBlock(self, noBlock):
        statement_list = noBlock.get("statements")
        
        for statement in statement_list:
            if statement.get("type") == "assignment_statement":
                id_assign = statement.get("ID")

                if id_assign not in self.simbol_table:
                    raise ValueError(f"Erro semântico: variável '{id_assign}' na linha '{statement.get("linha")} não declarada.")
                
                expression_node = statement.get("expression")
                if expression_node:
                    value_expression = self.visitarExpression(expression_node)

                    if self.simbol_table[id_assign] != value_expression.tipo:
                        raise ValueError(f"Erro semântico: variável '{id_assign}' na linha '{statement.get("linha")} não é do tipo '{value_expression.tipo}'.")
                    
                    self.simbol_table[id_assign] = value_expression.valor
                    
            elif statement.get("type") == "out_statement":
                self.visitarExpression(statement.get("expression"))

            elif statement.get("type") == "if_statement":
                self.visitarBlock(statement.get("block_if"))
            elif statement.get("type") == "else_statement":
                self.visitarBlock(statement.get("block_else"))
                

    def visitarExpression(self, noExpression):
        esq = noExpression.get("esq")
        operator = noExpression.get("oper")
        dir = noExpression.get("dir")

        if not operator:
            return self.visitarSumExpression()
        elif operator == "oper":
            return self.visitarSumExpression(dir)
        else:
            resultado_dir = self.visitarSumExpression(dir)
        
        
        return self.simbol_table(valor=resultado_dir.valor, tipo="log")


    def visitarSumExpression(self, no):
        parameter_node = no.get in ["sumExpression", "multiplicativeTerm", "powerTerm", "factor"]



        pass

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
            

class NoTabela:
    pass