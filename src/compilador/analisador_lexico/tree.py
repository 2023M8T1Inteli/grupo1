class Tree:
    def __init__(self):
        self.nodeList = []

    def addNode(self, node):
        self.nodeList.append(node)

    def __repr__(self):
        return "\n".join(map(str, self.nodeList))


class Node:
    def __init__(self, value) -> None:
        self.value = value
        self.left = None
        self.right = None

    def __repr__(self) -> str:
        return f"Node(value={self.value}, left={self.left}, right={self.right})"


tree = Tree()

node1 = Node("A")
node2 = Node("B")
node3 = Node("C")

tree.addNode(node1)
tree.addNode(node2)
tree.addNode(node3)

print(tree)
