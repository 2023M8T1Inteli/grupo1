from flask import Flask, request

from Compiler import Compiler

app = Flask(__name__)


@app.route('/upload', methods=['POST']) # define uma rota para fazer upload do arquivo .txt com o código gerado
def upload_file():
    uploaded_file = request.files['file'] 

    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename) # salva o arquivo de código gerado

        source_code = Compiler.read_code('code.txt') # leitura do arquivo

        Compiler.compile(source_code) # compila o código gerado, passando pelos analisadores léxico e sintárico



    return 'Nenhum arquivo enviado.'

if __name__ == '__main__':
    app.run() # inicialização do servidor