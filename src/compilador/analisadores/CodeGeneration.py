class CodeGeneration:
    def __init__(self):
        self.tree = None
        self.saida = ""
        self.varNumSum = 0
        self.varNumMul = 0
        self.varNumPow = 0
        self.varNumMinus = 0
        self.tabs = ''


    def run(self, tree):
        self.tree = tree
        statement_list = tree.get("block").get("statement_list")
        while statement_list != None:
            statement = statement_list.get("statement")
            self.statement(statement)
            statement_list = statement_list.get("next")
        print(self.saida)

    
    def statement(self, statement):
        if statement.op == "assign_statement":
            dir = self.assign_statement(statement)
            id = statement.get("id").valor
            self.saida += f"{id} = {dir}\n"
            self.varNumSum = 0
            self.varNumMul = 0
            self.varNumPow = 0
            self.varNumMinus = 0
        elif statement.op == "if_statement":
            self.if_statement(statement)
    
    def if_statement(self, statement):
        print(statement.d.keys())
        self.saida += "if " + self.expression(statement.expression) + "\n"
        
    def assign_statement(self, assign_statement):
         if assign_statement.get("expression") != None:
            return self.expression(assign_statement.get("expression"))
         else:
             return self.input_statement(assign_statement.get("input_statement"))
         
    def input_statement(self, input_statement):
        # allan.ler()
        pass
         
    
    def expression(self, expression):
        # print(expression)
        if expression.op == "factor":
            return self.sum_expression(expression)
        elif expression.op == "expression":
            E = self.sum_expression(expression.get("left"))
            if expression.get("operator") == None:
                return E
            else:
                D = self.sum_expression(expression.get("right"))
                oper = expression.get("operator")
                if oper == "<>":
                    self.saida += "_TEMP_VAR_REL = " + E + "!=" + D + "\n"
                    return "_TEMP_VAR_REL"
                else:
                    self.saida += "_TEMP_VAR_REL = " + E + expression.get("operator") + D  + "\n"
                    return "_TEMP_VAR_REL"
        else:
            return self.sum_expression(expression)
                
    def sum_expression(self, expression):
        if expression != None:
            val1 = self.sum_expression(expression.get("left"))  # visita a subárvore esquerda
            val2 = self.sum_expression(expression.get("right"))  # visita a subárvore direita

            # print(expression)               
            if expression.op == "sum_expression":
                """
                Cria o código Python que processa um OPSUM.
                Ideia principal: crie uma variável temporária (sugestão: _TEMP_VAR_SUM@, onde @ é um número inteiro) que
                recebe o resultado de: val1 OPSUM val2.

                Em seguida, retorne uma string com nome da variável temporária.
                """
                self.varNumSum += 1
                self.saida += "_TEMP_VAR_SUM" + str(self.varNumSum) + " = " + val1 + expression.d.get("operator") + val2 + "\n"
                return "_TEMP_VAR_SUM" + str(self.varNumSum)
            
            elif expression.op == "multi_term2":
                """
                Cria o código Python que processa um OPMUL.
                Ideia principal: crie uma variável temporária (sugestão: _TEMP_VAR_MUL@, onde @ é um número inteiro) que
                recebe o resultado de: val1 OPMUL val2.

                Dica: se o OPMUL for a operação de MDC, a variável temporária recebe o resultado de: math.gcd(val1, val2)

                Em seguida, retorne uma string com nome da variável temporária.
                """
                mul = expression.d.get("operator")
                self.varNumMul += 1
                if mul == "*":
                    self.saida += "_TEMP_VAR_MUL" + str(self.varNumMul) + " = " + val1 + "*" + val2 + "\n"
                    return "_TEMP_VAR_MUL" + str(self.varNumMul)
                elif mul == "/":
                    self.saida += "_TEMP_VAR_MUL" + str(self.varNumMul) + " = " + val1 + "//" + val2 + "\n"
                    return "_TEMP_VAR_MUL" + str(self.varNumMul)
                elif mul == "%":
                    self.saida += "_TEMP_VAR_MUL" + str(self.varNumMul) + " = " + val1 + "%" + val2 + "\n"
                    return "_TEMP_VAR_MUL" + str(self.varNumMul)
                
            elif expression.op == "powerTerm":
                """
                Cria o código Python que processa um OPPOW.
                Ideia principal: crie uma variável temporária (sugestão: _TEMP_VAR_POW@, onde @ é um número inteiro) que
                recebe o resultado de: val1 OPPOW val2.

                Em seguida, retorne uma string com nome da variável temporária.
                """
                self.varNumPow += 1
                self.saida += "_TEMP_VAR_POW" + str(self.varNumPow) + " = " + val1 + "**" + val2 + "\n"
                return "_TEMP_VAR_POW" + str(self.varNumPow)

            elif expression.op == "factor" and not expression.get("expression"):
                """
                Cria o código Python que processa um factor.

                Se o factor for um id ou num, e o sinal for "-", crie uma variável temporária (sugestão: _TEMP_VAR_MINUS@,
                onde @ é um número inteiro) que recebe o resultado de: - X, onde X é o valor do factor.
                Em seguida, retorne uma string com nome da variável temporária.

                Caso contrário, se o factor é um log e seu valor é true, retorne a string "True";
                Caso contrário, se o factor é um log e seu valor é false, retorne a string "False";
                Caso contrário, o factor é um inteiro, então retorne o seu valor.
                """
                if expression.get("factor").op in ("id", "num") and expression.get("sinal") == "-":
                    self.varNumMinus += 1
                    self.saida += "_TEMP_VAR_MINUS" + str(self.varNumMinus) + " = " + "-" + expression.get("factor").valor + "\n"
                    return "_TEMP_VAR_MINUS" + str(self.varNumMinus)
                elif expression.get("factor").op == "log" and expression.get("factor").valor == "true":
                    return "True"
                elif expression.get("factor").op == "log" and expression.get("factor").valor == "false":
                    return "False"
                else:
                    return expression.get("factor").valor
                
            elif expression.op == "factor" and expression.get("expression"):
                sinal = expression.get("sinal")
                if sinal == "-":
                    temp = self.visitarExpression(expression.get("expression"))
                    """
                    Cria o código Python que processa um factor entre parênteses.

                    Neste caso, o factor é negativo. Crie uma variável temporária (sugestão: _TEMP_VAR_MINUS@, onde @ é um número inteiro) que
                    recebe o resultado de: - temp.
                    Em seguida, retorne uma string com nome da variável temporária.
                    """
                    self.varNumMinus += 1
                    self.saida += "_TEMP_VAR_MINUS" + str(self.varNumMinus) + " = -" + temp + "\n"
                    return "_TEMP_VAR_MINUS" + str(self.varNumMinus)

                else:
                    # Neste caso, não precisa fazer mais nada
                    return self.visitarExpression(expression.get("expression"))

            