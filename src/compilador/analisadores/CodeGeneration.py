class CodeGeneration:
    def __init__(self):
        self.tree = None

    def run(self, tree):
        self.tree = tree
        self.visitarDeclarations()
        self.visitarBlock()
            