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
        return self.tokenList[self.position - 1]

    def next_token(self):
        if self.position < len(self.tokenList) - 1:
            self.position += 1
            self.tokenCurrent = self.tokenList[self.position]
        pass

    def analyze(self):
        return self.program()

    def program(self):
        self.compare("PROGRAMA")
        self.compare("DQUOTE")
        program_id = self.compare("STRING")
        self.compare("DQUOTE")
        self.compare("COLON")
        block_node = self.block()
        self.compare("DOT")

        return NonLeafNode("program", id=LeafNode("id", program_id.valor, program_id.linha), block=block_node)

    def block(self):
        noBlock = self.compare("LBLOCK")
        statement_list_node = self.statement_list()
        self.compare("RBLOCK")
        return NonLeafNode("block", statement_list = statement_list_node, line = noBlock.linha)

    def statement_list(self):
        statement_node = None
        next_node = None
        while self.tokenCurrent.tipo != "RBLOCK":
            statement_node = self.statement()
            next_node = self.statement_list()
        if statement_node: # Checa se já verificou todos os statements
            return NonLeafNode("statement_list", statement=statement_node, next = next_node)
        else:
            return statement_node # Retorna None caso não exista mais nó proximo

    def statement(self):
        if self.tokenCurrent.tipo == "IDENTIFICADOR":
            return self.assign_statement()
        elif self.tokenCurrent.tipo == "SE":
            return self.if_statement()
        elif self.tokenCurrent.tipo == "ENQUANTO":
            return self.while_statement()
        else:
            return self.command_statement()

    def assign_statement(self):
        assign_id = self.compare("IDENTIFICADOR")
        self.compare("ASSIGN")
        if self.tokenCurrent.tipo == "COMANDO" and (
            self.tokenCurrent.valor == "ler" or self.tokenCurrent.valor == "ler_varios"
        ):
            expression_node = self.input_statement()
        else:
            expression_node = self.expression()
        return NonLeafNode("assign_statement", id = LeafNode("id", assign_id.valor, assign_id.linha), expression=expression_node)

    def if_statement(self):
        self.compare("SE")
        expression_node = self.expression()
        self.compare("ENTAO")
        if_block_node = self.block()
        else_block_node = None
        if self.tokenCurrent.tipo == "SENAO":
            self.compare("SENAO")
            else_block_node = self.block()
        return NonLeafNode("if_statement", expression=expression_node, if_block=if_block_node, else_block=else_block_node)

    def while_statement(self):
        self.compare("ENQUANTO")
        expression_node = self.expression()
        self.compare("FACA")
        loop_block_node = self.block()

        return NonLeafNode("while_statement", expression=expression_node, block=loop_block_node)

    def command_statement(self):
        command = self.tokenCurrent.valor
        self.compare("COMANDO")
        if command == "mostrar" or command == "tocar" or command == "esperar":
            self.compare("LPAR")
            expression_node = self.sum_expression()
            self.compare("RPAR")
            return NonLeafNode("command_statement", function=command, expression=expression_node)
        else:
            self.compare("LPAR")
            left_node = self.sum_expression()
            self.compare("COMMA")
            right_node = self.sum_expression()
            self.compare("RPAR")
            return NonLeafNode("command_statement", function=command, left_exp=left_node, right_exp=right_node)

    def input_statement(self):
        if self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "ler":
            self.compare("COMANDO", "ler")
            self.compare("LPAR")
            self.compare("RPAR")
            return NonLeafNode("read", parameters=None) # Checar depois
        else:
            self.compare("COMANDO", "ler_varios")
            self.compare("LPAR")
            first_exp_node = self.sum_expression()
            self.compare("COMMA")
            second_exp_node = self.sum_expression()
            self.compare("COMMA")
            third_exp_node = self.sum_expression()
            self.compare("RPAR")

            return NonLeafNode("read_multiple", first_param=first_exp_node, second_param=second_exp_node, third_param=third_exp_node)

    def expression(self):
        left_node = self.sum_expression()
        if self.tokenCurrent.tipo == "OPREL":
            operator = self.relop()
            right_node = self.sum_expression()
            return NonLeafNode("expression", operator = operator.valor, left = left_node, right = right_node)
        else:
            return left_node
        
    def relop(self):
        return self.compare("OPREL")

    def sum_expression(self):
        term1_node = self.mult_term()
        return self.sum_expression2(term1_node)

    def sum_expression2(self, expression_node):
        if self.tokenCurrent.tipo == "OPSUM":
            operator = self.tokenCurrent.valor
            self.compare("OPSUM")
            term2_node = self.mult_term()
            return self.sum_expression2(NonLeafNode("sum_expression", operator=operator, left=expression_node, right=term2_node))
        else:
            return expression_node

    def mult_term(self):
        factor1_node = self.power_term()
        return self.mult_term2(factor1_node)

    def mult_term2(self, term_node):
        if self.tokenCurrent.tipo == "OPMUL":
            operator = self.tokenCurrent.valor
            self.compare("OPMUL")
            factor2_node = self.power_term()
            return self.mult_term2(NonLeafNode("multi_term2", operator=operator, left=term_node, right=factor2_node))
        else:
            return term_node

    def power_term(self):
        factor_node = self.factor()
        if self.tokenCurrent.tipo == "OPPOW":
            operator = self.tokenCurrent.valor
            self.compare("OPPOW")
            power_node = self.power_term()
            return NonLeafNode("power_term", operator=operator, base=factor_node, exponent=power_node)
        else:
            return factor_node

    def factor(self):
        if self.tokenCurrent.tipo == "IDENTIFICADOR":
            identifier_node = LeafNode("id", self.tokenCurrent.valor, self.tokenCurrent.linha)
            self.compare("IDENTIFICADOR")
            return NonLeafNode("factor", operator = None, factor = identifier_node, left = None, right = None)
        elif self.tokenCurrent.tipo == "NUMERO":
            number_node = LeafNode("int", self.tokenCurrent.valor, self.tokenCurrent.linha)
            self.compare("NUMERO")
            return NonLeafNode("factor", operator = None, factor = number_node, left = None, right = None)
        elif self.tokenCurrent.tipo == "BOOLEAN":
            boolean_node = LeafNode("bool", self.tokenCurrent.valor, self.tokenCurrent.linha)
            self.compare("BOOLEAN")
            return NonLeafNode("factor", operator = None, factor = boolean_node, left = None, right = None)
        elif self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.valor == "+":
            operator_node = LeafNode("opsum", "+", self.tokenCurrent.linha)
            self.compare("OPSUM", "+")
            factor_node = self.factor()
            return NonLeafNode("factor", operator=operator_node, fator=factor_node, left = None, right = None)
        elif self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.valor == "-":
            operator_node = LeafNode("opsum", "-", self.tokenCurrent.linha)
            self.compare("OPSUM", "-")
            factor_node = self.factor()
            return NonLeafNode("factor", operator=operator_node, fator=factor_node, left = None, right = None)
        elif self.tokenCurrent.tipo == "NAO":
            operator_node = LeafNode("not", None, self.tokenCurrent.linha)
            self.compare("NAO")
            factor_node = self.factor()
            return NonLeafNode("factor", operator=operator_node, fator=factor_node, left = None, right = None)
        else:
            self.compare("LPAR")
            expression_node = self.expression()
            self.compare("RPAR")
            return expression_node

    def boolean(self):
        if self.tokenCurrent.tipo == "BOOLEAN" and self.tokenCurrent.valor == "verdade":
            self.compare("BOOLEAN", "verdade")
        else:
            self.compare("BOOLEAN", "falso")
        return LeafNode("BOOLEAN", self.tokenCurrent.valor, self.tokenCurrent.linha)
