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
            self.add(currentNode, newNode)

    def __repr__(self):
        return self.print_tree(self.root)

    def print_tree(self, node):
        if node != None:
            print(" " + str(node))
            if node.left != None and node.right != None:
                print("/" + " " + "\\")
                print(self.print_tree(node.left) + self.print_tree(node.right))
            elif node.left != None:
                print("/" + " ")
                print(self.print_tree(node.left))
            elif node.right != None:
                print("\\")
                print(self.print_tree(node.right))
        return ""
        # if node is not None:
        #     output = "  " * level + str(node) + "\n"
        #     output += self.printTree(node.left, level + 1)
        #     output += self.printTree(node.right, level + 1)
        #     return output
        # return ""


class Node:
    def __init__(self, Token) -> None:
        self.value = Token.tipo
        self.left = None
        self.right = None

    def __repr__(self) -> str:
        return self.value
