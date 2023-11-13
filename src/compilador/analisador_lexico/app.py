from flask import Flask, request

from Compiler import compile, read_code

app = Flask(__name__)


@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file'] 

    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)

        source_code = read_code('code.txt')

        compile(source_code)



    return 'Nenhum arquivo enviado.'

if __name__ == '__main__':
    app.run() 