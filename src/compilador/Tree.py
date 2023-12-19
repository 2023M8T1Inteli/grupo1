from Token import Token


# class Tree:
#     def __init__(self):
#         self.root = None
#         self.depth = 0

#     def add_node(self, node):
#         if self.root == None:
#             self.root = node
#             self.depth += 1
#         else:
#             self.add(self.root, node)

#     def add(self, currentNode, newNode):
#         if currentNode.left == None:
#             currentNode.left = newNode
#             self.depth += 1
#         elif currentNode.right == None:
#             currentNode.right = newNode
#         else:
#             self.add(currentNode.left, newNode)

#     def __repr__(self):
#         return self.print_tree(self.root)

#     def print_tree(self, node):
#         if node != None:
#             print(" " + str(node))
#             if node.left != None:
#                 print("/" + " ")
#                 self.print_tree(node.left)
#             elif node.right != None:
#                 print("\\")
#                 self.print_tree(node.right)
#         return ""

class NonLeafNode:

	def __init__(self, op, **kwargs):
		self.op = op
		self.d = {}
		for k, v in kwargs.items():
			self.d[k] = v


	def get(self, k):
		return self.d.get(k)


	def __repr__(self):
		listaParametros = []
		
		for k in self.d.keys():
			valor = self.d[k]
			if type(valor) == str:
				valor = f'"{valor}"'
			listaParametros.append(f"{k}={valor}")
		parametrosStr = ", ".join(listaParametros)
		if len(parametrosStr) > 0:
			parametrosStr = ", " + parametrosStr
		return f'NoInterno(op="{self.op}"{parametrosStr})'


class LeafNode:
	
    def __init__(self, op, valor, linha):
        self.op = op
        self.valor = valor
        self.linha = linha

    def __repr__(self):
        return f'NoFolha(op="{self.op}", valor="{self.valor}", linha={self.linha})'
