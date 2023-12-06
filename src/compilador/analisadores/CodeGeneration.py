class CodeGeneration:
    def __init__(self):
        self.tree = None
        self.saida = ""


    def run(self, tree):
        self.tree = tree
        statement_list = tree.get("block").get("statement_list")
        while statement_list != None:
            statement = statement_list.get("statement")
            self.statement(statement)
            statement_list = statement_list.get("next")
            break

    
    def statement(self, statement):
        if statement.op == "assign_statement":
            dir = self.assign_statement(statement)
            id = statement.get("id").valor
            self.saida += f"{id} = {dir}\n"
        # elif statement.op == "if_statement":
        #     self.if_statement(statement)
    

    def assign_statement(self, assign_statement):
         if assign_statement.get("expression") != None:
            return self.expression(assign_statement.get("expression"))
         else:
             return self.input_statement(assign_statement.get("input_statement"))
         
    def input_statement(self, input_statement):
        # allan.ler()
        pass
         
    
    def expression(self, expression):
        if expression.get("op") == "factor":
            self.factor(expression)
        else:
            print(expression)
            E = self.visitarSumExpression(expression.get("left"))
            if expression.get("oper") == None:
                return E
            else:
                D = self.visitarSumExpression(expression.get("right"))
                oper = expression.get("oper")
                if oper == "<>":
                    self.saida += "_TEMP_VAR_REL = " + E + "!=" + D + "\n"
                    return "_TEMP_VAR_REL"
                else:
                    self.saida += "_TEMP_VAR_REL = " + E + expression.get("oper") + D  + "\n"
                    return "_TEMP_VAR_REL"
                
    def sum_expression(self, expression):
        pass

            