class Semantic:
    def __init__(self, tree):
        self.tree = tree
        self.simbol_table = {}

    def analyze(self):
        self.visitAlg()
        print("Analise concluída com sucesso, nenhum erro encontrado.")

    def visitAlg(self):
        id_program = self.tree.get("id")
        self.simbol_table[id_program] = NoTabela("program", id_program.valor, id_program.linha)
        self.visitBlock(self.tree.get("block"))

        return self.simbol_table

    def visitBlock(self, block):
        self.visitStatementList(block.get("statement_list"))

    def visitStatementList(self, statement_list):
        statementArray = statement_list.get("statements")
        for item in statementArray:
            self.visitStatement(item)
        pass
    
    def visitStatement(self, statement):
        if statement.op == "assign_statement":
            assign_id = statement.get("id")
            if assign_id.valor in self.simbol_table:
                raise ValueError(f"Variável " + assign_id.valor + " na linha " + str(assign_id.linha) + " já declarado") # Falta botar linha
            self.simbol_table[assign_id.valor] = NoTabela("id", None, assign_id.linha)
            self.visitExpression(statement.get("expression"))

        elif statement.op == "command_statement":
            self.visitExpression(statement.get("expression"))
            pass
        pass

    def visitExpression(self, expression):
        if expression:
            left_expression = self.visitExpression(expression.get("left"))
            right_expression = self.visitExpression(expression.get("right"))
            if expression.op == "factor":
                factor  = expression.get("factor")
                if factor.op == "id":
                    if factor.valor not in self.simbol_table:
                        raise ValueError(f"Variável " + factor.valor + " na linha " + str(factor.linha) + " não foi declarada.")
                pass
        pass


    """ def visitarDeclarations(self, noDeclarations):
        var_declarations = noDeclarations.get("var_declarations")

        while var_declarations != None:
            self.visitarVarDeclaration(var_declarations.get("var_declaration")) """

        
    

    """ def visitarVarDeclaration(self, noVarDeclaration):
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
                raise ValueError(f"Erro semântico: operação só é permitida com valores inteiros") """
            

class NoTabela:
    def __init__(self, type, value, line, **kwargs ):
        self.type = type
        self.value = value
        self.line = line
        self.dictionary = {}
        for k, i in kwargs.items():
            self.dictionary[k] = i
        pass

    def get(self, i):
        return self.dictionary.get(i)