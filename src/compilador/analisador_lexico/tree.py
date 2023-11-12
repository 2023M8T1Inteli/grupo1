from Token import Token


class Tree:
    def __init__(self):
        self.root = None
        self.depth = 0

    def add_node(self, node):
        if self.root == None:
            self.root = node
            self.depth += 1
        else:
            self.add(self.root, node)

    def add(self, currentNode, newNode):
        if currentNode.left == None:
            currentNode.left = newNode
            self.depth += 1
        elif currentNode.right == None:
            currentNode.right = newNode
        else:
            self.add(currentNode.left, newNode)

    def __repr__(self):
        return self.print_tree(self.root)

    def print_tree(self, node):
        if node != None:
            print(" " + str(node))
            if node.left != None:
                print("/" + " ")
                self.print_tree(node.left)
            elif node.right != None:
                print("\\")
                self.print_tree(node.right)
        return ""


class Node:
    def __init__(self, Token) -> None:
        self.value = Token.tipo
        self.left = None
        self.right = None

    def __repr__(self) -> str:
        return self.value
