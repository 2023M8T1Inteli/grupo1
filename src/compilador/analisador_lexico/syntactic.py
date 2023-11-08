class syntatic:

    def __init__(self, tokenList):
        self.tokenList = tokenList
        self.tokenCurrent = None
        self.position = -1
        self.nextToken()
        pass

    def analyze(self):
        self.program()
        self.compare("EOF")
        print("Funcionou!")
        pass

    def compare(self, type, value=None):
        if (self.tokenCurrent.tipo == type and ((value is None) or (self.tokenCurrent.valor == value))):
            self.nextToken()
        else:
            raise ValueError("ERRO: Sintaxe Inválida - Token '{self.tokenCurrent.tipo}: {self.tokenCurrent.valor}' encontrado ao invés de {type} na linha {self.tokenCurrent.linha}.")
        pass

    def nextToken(self):
        if (self.position < len(self.tokenList) - 1):
            self.position += 1
            self.tokenCurrent = self.tokenList[self.position]
        pass

    def program(self):
        self.compare("PROGRAMA")
        self.compare("DQUOTE")
        self.compare("STRING")
        self.compare("DQUOTE")
        self.compare("COLON")
        self.block()
        self.compare("DOT")
        pass

    def block(self):
        self.compare("LBLOCK")
        self.statement_list()
        self.compare("RBLOCK")
        pass

    def statement_list(self):
        if (self.tokenCurrent.tipo != "RBLOCK"):
            self.statement()
            self.statement_list()
        pass

    def statement(self):
        if (self.tokenCurrent.tipo == "IDENTIFICADOR"):
            self.assign_statement()
        elif (self.tokenCurrent.tipo == "SE"):
            self.if_statement()
        elif (self.tokenCurrent.tipo == "ENQUANTO"):
            self.while_statement()
        else:
            self.command_statement()
        pass

    def assign_statement(self):
        self.compare("IDENTIFICADOR")
        self.compare("ASSIGN")
        if (self.tokenCurrent.tipo == "COMANDO" and (self.tokenCurrent.valor == "ler" or self.tokenCurrent.valor == "ler_varios")):
            self.input_statement()
        else:
            self.expression()
        pass

    def if_statement(self):
        self.compare("SE")
        self.expression()
        self.compare("ENTAO")
        self.block()
        if (self.tokenCurrent.tipo == "SENAO"):
            self.compare("SENAO")
            self.block()
        pass

    def while_statement(self):
        self.compare("ENQUANTO")
        self.expression()
        self.compare("FACA")
        self.block()
        pass

    def command_statement(self):
        if (self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "mostrar"):
            self.compare("COMANDO", "mostrar")
            self.compare("LPAR")
            self.sum_expression()
            self.compare("RPAR")
        elif (self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "tocar"):
            self.compare("COMANDO", "tocar")
            self.compare("LPAR")
            self.sum_expression()
            self.compare("RPAR")
        elif (self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "esperar"):
            self.compare("COMANDO", "esperar")
            self.compare("LPAR")
            self.sum_expression()
            self.compare("RPAR")
        else:
            self.compare("COMANDO", "mostrar_tocar")
            self.compare("LPAR")
            self.sum_expression()
            self.compare("COMMA")
            self.sum_expression()
            self.compare("RPAR")
        pass

    def input_statement(self):
        if (self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "ler"): 
            self.compare("COMANDO", "ler")
            self.compare("LPAR")
            self.compare("RPAR")
        else:
            self.compare("COMANDO", "ler_varios")
            self.compare("LPAR")
            self.sum_expression()
            self.compare("COMMA")
            self.sum_expression()
            self.compare("COMMA")
            self.sum_expression()
            self.compare("RPAR")
        pass

    def expression(self):
        self.sum_expression()
        if (self.tokenCurrent.tipo == "OPREL"):
            self.relop()
            self.sum_expression()
        pass

    def relop(self):
        self.compare("OPREL")
        pass

    def sum_expression(self):
        self.mult_term()
        self.sum_expression2()
        pass

    def sum_expression2(self):
        if (self.tokenCurrent.tipo == "OPSUM"):
            self.compare("OPSUM")
            self.mult_term()
            self.sum_expression2
        pass

    def mult_term(self):
        self.power_term()
        self.mult_term2()
        pass

    def mult_term2(self):
        if (self.tokenCurrent.tipo == "OPMUL"):
            self.compare("OPMUL")
            self.power_term()
            self.mult_term2()
        pass

    def power_term(self):
        self.factor()
        if (self.tokenCurrent.tipo == "OPPOW"):
            self.compare("OPPOW")
            self.power_term()
        pass

    def factor(self):
        if (self.tokenCurrent.tipo == "IDENTIFICADOR"):
            self.compare("IDENTIFICADOR")
        elif (self.tokenCurrent.tipo == "NUMERO"):
            self.compare("NUMERO")
        elif (self.tokenCurrent.tipo == "BOOLEAN"):
            self.boolean()
        elif (self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.value == "+"):
            self.compare("OPSUM", "+")
            self.factor()
        elif (self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.value == "-"):
            self.compare("OPSUM", "-")
            self.factor()
        elif (self.tokenCurrent.tipo == "NAO"):
            self.compare("NAO")
            self.factor()
        else:
            self.compare("LPAR")
            self.expression()
            self.compare("RPAR")
        pass

    def boolean(self):
        if (self.tokenCurrent.tipo == "BOOLEAN" and self.tokenCurrent.value == "verdade"):
            self.compare("BOOLEAN", "verdade")
        else:
            self.compare("BOOLEAN", "falso")
        pass