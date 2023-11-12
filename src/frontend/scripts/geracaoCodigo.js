import { Conditional } from './Conditional.js'

const editor = document.getElementById('editor')

const generator = document.getElementById('gerador')

generator.addEventListener('click', gerarCodigo)

function gerarCodigo(e) {
  let codeElements = editor.childNodes

  for (let i = 0; i < codeElements.length; i++) {
    console.log('elemento ' + i + ' : ' + codeElements[i].id)

    if (codeElements[i].id == 'if-statement') {
      console.log('entrou if')

      let block = new Conditional(codeElements[i])
    }
  }
}

function generateConditional(block) {}
