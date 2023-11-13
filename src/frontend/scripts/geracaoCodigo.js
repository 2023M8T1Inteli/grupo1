import { Conditional } from './Conditional.js'

const editor = document.getElementById('editor')

const generator = document.getElementById('gerador')

generator.addEventListener('click', generateCode)

function generateCode() {
  let codeText = 'programa "atividade": '

  codeText += 'inicio '

  let codeElements = editor.childNodes

  for (let i = 0; i < codeElements.length; i++) {
    console.log('elemento ' + i + ' : ' + codeElements[i].id)

    if (codeElements[i].id == 'if-statement') {
      let block = new Conditional(codeElements[i])
      codeText += block.getBlock() + ' '
    } else {
      codeText += codeElements[i].id + ' '
    }
  }

  codeText += ' fim.'

  console.log(codeText)

  sendCode('http://127.0.0.1:5000/', codeText)
}

function sendCode(backendURL, code) {
  const blob = new Blob([code], { type: 'text/plain' })

  const formData = new FormData()
  formData.append('file', blob, 'code.txt')

  fetch(backendURL + '/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      console.log('Arquivo enviado com sucesso.')
    })
    .catch(error => {
      // Lida com erros
      console.error('Ocorreu um erro ao enviar o arquivo:', error)
    })
}
