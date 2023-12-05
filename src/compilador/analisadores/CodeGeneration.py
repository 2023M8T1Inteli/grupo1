class CodeGeneration:
    def __init__(self):
        self.tree = None
        self.saida = ""


    def run(self, tree):
        self.tree = tree
        statement_list = tree.get("block").get("statement_list").get("statements")
        if statement_list != None:
            for statement in statement_list:
                self.statement(statement)
            return self.saida

    
    def statement(self, statement):
        if statement.op == "assign_statement":
            dir = self.assign_statement(statement)
            id = statement.get("id").valor
            self.saida += f"{id} = {dir}\n"
        elif statement.op == "if_statement":
            self.if_statement(statement)
    

    def assign_statement(self, assign_statement):
         if assign_statement.get("expression") != None:
            return self.expression(assign_statement.get("expression"))
         else:
             return self.input_statement(assign_statement.get("input_statement"))
         
    
    def expression(self, expression):
        print(expression)
        # E = self.sum_expression(expression.get("esq"))
		# if noExpression.get("oper") == None:
		# 	return E


            