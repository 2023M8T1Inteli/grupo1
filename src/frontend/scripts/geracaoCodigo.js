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
}
