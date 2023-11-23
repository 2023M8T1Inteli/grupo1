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
        return self.program()

    def program(self):
        self.compare("PROGRAMA")
        program_name = self.tokenCurrent.valor
        self.compare("DQUOTE")
        self.compare("STRING")
        self.compare("DQUOTE")
        self.compare("COLON")
        block_node = self.block()
        self.compare("DOT")

        return NonLeafNode("Programa", nome=program_name, bloco=block_node)

    def block(self):
        self.compare("LBLOCK")
        statement_list_node = self.statement_list()
        self.compare("RBLOCK")
        return statement_list_node

    def statement_list(self):
        statements = []
        while self.tokenCurrent.tipo != "RBLOCK":
            statement_node = self.statement()
            statements.append(statement_node)
        return NonLeafNode("ListaDeInstrucoes", instrucoes=statements)

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
        identifier = self.tokenCurrent.valor
        self.compare("IDENTIFICADOR")
        self.compare("ASSIGN")
        if self.tokenCurrent.tipo == "COMANDO" and (
            self.tokenCurrent.valor == "ler" or self.tokenCurrent.valor == "ler_varios"
        ):
            return self.input_statement(identifier)
        else:
            expression_node = self.expression()
            return NonLeafNode("Atribuicao", identificador=identifier, expressao=expression_node)

    def if_statement(self):
        self.compare("SE")
        condition_node = self.expression()
        self.compare("ENTAO")
        if_block_node = self.block()
        else_block_node = None
        if self.tokenCurrent.tipo == "SENAO":
            self.compare("SENAO")
            else_block_node = self.block()

        return NonLeafNode("Se", condicao=condition_node, bloco_entao=if_block_node, bloco_senao=else_block_node)

    def while_statement(self):
        self.compare("ENQUANTO")
        condition_node = self.expression()
        self.compare("FACA")
        loop_block_node = self.block()

        return NonLeafNode("Enquanto", condicao=condition_node, bloco=loop_block_node)

    def command_statement(self):
        command = self.tokenCurrent.valor
        self.compare("COMANDO")
        if command == "mostrar" or command == "tocar" or command == "esperar":
            self.compare("LPAR")
            expression_node = self.sum_expression()
            self.compare("RPAR")
            return NonLeafNode("ComandoSimples", comando=command, expressao=expression_node)
        else:
            self.compare("LPAR")
            expression1_node = self.sum_expression()
            self.compare("COMMA")
            expression2_node = self.sum_expression()
            self.compare("RPAR")
            return NonLeafNode("ComandoComposto", comando=command, expressao1=expression1_node, expressao2=expression2_node)

    def input_statement(self, identifier):
        if self.tokenCurrent.tipo == "COMANDO" and self.tokenCurrent.valor == "ler":
            self.compare("COMANDO", "ler")
            self.compare("LPAR")
            self.compare("RPAR")
        else:
            self.compare("COMANDO", "ler_varios")
            self.compare("LPAR")
            expression1_node = self.sum_expression()
            self.compare("COMMA")
            expression2_node = self.sum_expression()
            self.compare("COMMA")
            expression3_node = self.sum_expression()
            self.compare("RPAR")

            return NonLeafNode("LeituraVarios", identificador=identifier, expressao1=expression1_node, expressao2=expression2_node, expressao3=expression3_node)

    def expression(self):
        expression1_node = self.sum_expression()
        if self.tokenCurrent.tipo == "OPREL":
            operator = self.tokenCurrent.valor
            self.relop()
            expression2_node = self.sum_expression()
            return NonLeafNode("ExpressaoRelacional", operador=operator, expressao1=expression1_node, expressao2=expression2_node)
        else:
            return expression1_node

    def sum_expression(self):
        term1_node = self.mult_term()
        return self.sum_expression2(term1_node)

    def sum_expression2(self, expression_node):
        if self.tokenCurrent.tipo == "OPSUM":
            operator = self.tokenCurrent.valor
            self.compare("OPSUM")
            term2_node = self.mult_term()
            return self.sum_expression2(NonLeafNode("ExpressaoAritmetica", operador=operator, termo1=expression_node, termo2=term2_node))
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
            return self.mult_term2(NonLeafNode("TermoAritmetico", operador=operator, fator1=term_node, fator2=factor2_node))
        else:
            return term_node

    def power_term(self):
        factor_node = self.factor()
        if self.tokenCurrent.tipo == "OPPOW":
            operator = self.tokenCurrent.valor
            self.compare("OPPOW")
            power_node = self.power_term()
            return NonLeafNode("Potencia", operador=operator, base=factor_node, expoente=power_node)
        else:
            return factor_node

    def factor(self):
        if self.tokenCurrent.tipo == "IDENTIFICADOR":
            identifier_node = LeafNode("IDENTIFICADOR", self.tokenCurrent.valor, self.tokenCurrent.linha)
            self.compare("IDENTIFICADOR")
            return identifier_node
        elif self.tokenCurrent.tipo == "NUMERO":
            number_node = LeafNode("NUMERO", self.tokenCurrent.valor, self.tokenCurrent.linha)
            self.compare("NUMERO")
            return number_node
        elif self.tokenCurrent.tipo == "BOOLEAN":
            boolean_node = LeafNode("BOOLEAN", self.tokenCurrent.valor, self.tokenCurrent.linha)
            self.compare("BOOLEAN")
            return boolean_node
        elif self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.valor == "+":
            operator_node = LeafNode("OPSUM", "+", self.tokenCurrent.linha)
            self.compare("OPSUM", "+")
            factor_node = self.factor()
            return NonLeafNode("ExpressaoUnaria", operador=operator_node, fator=factor_node)
        elif self.tokenCurrent.tipo == "OPSUM" and self.tokenCurrent.valor == "-":
            operator_node = LeafNode("OPSUM", "-", self.tokenCurrent.linha)
            self.compare("OPSUM", "-")
            factor_node = self.factor()
            return NonLeafNode("ExpressaoUnaria", operador=operator_node, fator=factor_node)
        elif self.tokenCurrent.tipo == "NAO":
            operator_node = LeafNode("NAO", "NAO", self.tokenCurrent.linha)
            self.compare("NAO")
            factor_node = self.factor()
            return NonLeafNode("ExpressaoLogica", operador=operator_node, fator=factor_node)
        else:
            self.compare("LPAR")
            expression_node = self.expression()
            self.compare("RPAR")
            return expression_node

    def boolean(self):
        boolean_node = LeafNode("BOOLEAN", self.tokenCurrent.valor, self.tokenCurrent.linha)
        if self.tokenCurrent.tipo == "BOOLEAN" and self.tokenCurrent.valor == "verdade":
            self.compare("BOOLEAN", "verdade")
        else:
            self.compare("BOOLEAN", "falso")
        return boolean_node
