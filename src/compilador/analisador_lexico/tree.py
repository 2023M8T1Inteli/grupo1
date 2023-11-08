class Tree:
    def __init__(self):
        self.root = None
        self.depth = 0

    def addNode(self, node):
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
        return self.printTree(self.root)

    def printTree(self, node):
        if node != None:
            print(" " + str(node))
            if node.left != None and node.right != None:
                print("/" + " " + "\\")
                print(self.printTree(node.left) + " " + self.printTree(node.right))
            elif node.left != None:
                print("/" + " ")
                print(self.printTree(node.left))
            elif node.right != None:
                print("\\")
                print(self.printTree(node.right))
        return ""
        # if node is not None:
        #     output = "  " * level + str(node) + "\n"
        #     output += self.printTree(node.left, level + 1)
        #     output += self.printTree(node.right, level + 1)
        #     return output
        # return ""


class Node:
    def __init__(self, value) -> None:
        self.value = value
        self.left = None
        self.right = None

    def __repr__(self) -> str:
        return self.value


tree = Tree()

node1 = Node("A")
node2 = Node("B")
node3 = Node("C")

tree.addNode(node1)
tree.addNode(node2)
tree.addNode(node3)

print(tree)
