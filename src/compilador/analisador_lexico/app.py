from flask import Flask, request
import subprocess
import sys
import os

path = os.path.abspath(os.path.join(os.path.dirname(__file__),  '..'))

sys.path.append(path)

from Lexer import Lexer
from Syntactic import Syntatic
from token_patterns import token_patterns

app = Flask(__name__)

def read_code(file): 
    code = ""
    with open(file, "r", encoding="utf-8") as f:
        code = f.read()
    return code


@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file'] 

    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)

        source_code = read_code('code.txt')

        tokens = Lexer.lexer(source_code, token_patterns)
        for token in tokens:
            print(token)

        syntax = Syntatic(tokens)
        syntax.analyze()

        print('ok')



    return 'Nenhum arquivo enviado.'

if __name__ == '__main__':
    app.run() 