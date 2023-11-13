from flask import Flask, request
import subprocess
import sys
import os

path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

sys.path.append(path)

from compilador.analisador_lexico.Compiler import read_code, compile

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file'] 

    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)

        source_code = read_code('codigo.txt')

        compile(source_code)

    return 'Nenhum arquivo enviado.'

if __name__ == '__main__':
    app.run() 