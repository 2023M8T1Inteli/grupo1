from Tree import NonLeafNode, LeafNode

class Syntatic:
    def __init__(self, tokenList):
        self.tokenList = tokenList
        self.tokenCurrent = None
        self.position = -1
        self.next_token()
        pass
    
    def compare(self, type, value=None):
        if self.tokenCurrent.tipo == type and (
            (value is None) or (self.tokenCurrent.valor == value)
        ):
            self.next_token()
        else:
            raise ValueError(
                f"ERRO: Sintaxe Inválida - Token '{self.tokenCurrent.tipo}: {self.tokenCurrent.valor}' encontrado ao invés de {type} na linha {self.tokenCurrent.linha}."
            )
        pass

    def next_token(self):
        if self.position < len(self.tokenList) - 1:
            self.position += 1
            self.tokenCurrent = self.tokenList[self.position]
        pass

    def analyze(self):
        a = self.program()
        self.compare("EOF")
        print("Funcionou!")
        return a

    def program(self):
        #print("program")
        self.compare("PROGRAMA")
        self.compare("DQUOTE")
        self.compare("STRING")
        self.compare("DQUOTE")
        self.compare("COLON")
        B = self.block()
        self.compare("DOT")
        return NonLeafNode("program", block = B) #AAA

    def block(self):
        #print("block")
        self.compare("LBLOCK")
        L = self.statement_list()
        self.compare("RBLOCK")
        return NonLeafNode("block", statement_list = L) #AAA

    def statement_list(self):
        #print("statement_list")
        node = NonLeafNode(None)
        if self.tokenCurrent.tipo != "RBLOCK":
            A = self.statement()
            B = self.statement_list()
            node = NonLeafNode("statement_list", statementNode=A, next = B)
        return node

    def statement(self):
        #print("statement")
        if self.tokenCurrent.tipo == "IDENTIFICADOR":
            self.assign_statement()
        elif self.tokenCurrent.tipo == "SE":
            self.if_statement()
        elif self.tokenCurrent.tipo == "ENQUANTO":
            self.while_statement()
        else:
            self.command_statement()
        pass

    def assign_statement(self):
        #print("assign_statement")

        leftToken = self.compare("IDENTIFICADOR")
        leftLeaf = LeafNode("assign_statement", leftToken.valor, leftToken.linha)

        self.compare("ASSIGN")
        node = NonLeafNode(None)
        if self.tokenCurrent.tipo == "COMANDO" and (
            self.tokenCurrent.valor == "ler" or self.tokenCurrent.valor == "ler_varios"
        ):
            I = self.input_statement()
            node = NonLeafNode("assign_statement", _input = I)
        else:
            E = self.expression()
            node = NonLeafNode("assign_statement", expression = E)
        return NonLeafNode("assign_statement", leftNode = leftLeaf, rightNode = node)

    def if_statement(self):
        #print("if_statement")
        self.compare("SE")
        self.expression()
        self.compare("ENTAO")
        self.block()
        if self.tokenCurrent.tipo == "SENAO":
            self.compare("SENAO")
            self.block()
        pass

    def while_statement(self):
        #print("while_statement")
        self.compare("ENQUANTO")
        self.expression()
        self.compare("FACA")
        self.block()
        pass

    def command_statement(self):
        #print("command_statement")
        if self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "mostrar":
            self.compare("COMANDO", "mostrar")
            self.compare("LPAR")
            self.sum_expression()
            self.compare("RPAR")
        elif self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "tocar":
            self.compare("COMANDO", "tocar")
            self.compare("LPAR")
            self.sum_expression()
            self.compare("RPAR")
        elif (
            self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "esperar"
        ):
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
        #print("input_statement")
        if self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "ler":
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
        #print("expression")
        self.sum_expression()
        if self.tokenCurrent.tipo == "OPREL":
            self.relop()
            self.sum_expression()
        pass

    def relop(self):
        #print("relop")
        self.compare("OPREL")
        pass

    def sum_expression(self):
        #print("sum_expression")
        self.mult_term()
        self.sum_expression2()
        pass

    def sum_expression2(self):
        #print("sum_expression2")
        if self.tokenCurrent.tipo == "OPSUM":
            self.compare("OPSUM")
            self.mult_term()
            self.sum_expression2
        pass

    def mult_term(self):
        #print("mult_term")
        self.power_term()
        self.mult_term2()
        pass

    def mult_term2(self):
        #print("mult_term2")
        if self.tokenCurrent.tipo == "OPMUL":
            self.compare("OPMUL")
            self.power_term()
            self.mult_term2()
        pass

    def power_term(self):
        #print("power_term")
        self.factor()
        if self.tokenCurrent.tipo == "OPPOW":
            self.compare("OPPOW")
            self.power_term()
        pass

    def factor(self):
        #print("factor")
        if self.tokenCurrent.tipo == "IDENTIFICADOR":
            self.compare("IDENTIFICADOR")
        elif self.tokenCurrent.tipo == "NUMERO":
            self.compare("NUMERO")
        elif self.tokenCurrent.tipo == "BOOLEAN":
            self.boolean()
        elif self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.value == "+":
            self.compare("OPSUM", "+")
            self.factor()
        elif self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.value == "-":
            self.compare("OPSUM", "-")
            self.factor()
        elif self.tokenCurrent.tipo == "NAO":
            self.compare("NAO")
            self.factor()
        else:
            self.compare("LPAR")
            self.expression()
            self.compare("RPAR")
        pass

    def boolean(self):
        if self.tokenCurrent.tipo == "BOOLEAN" and self.tokenCurrent.value == "verdade":
            self.compare("BOOLEAN", "verdade")
        else:
            self.compare("BOOLEAN", "falso")
        pass
