import { FunctionBlock } from './FunctionBlock.js'
import { ControlFlowBlock } from './ControlFlowBlock.js'

const editor = document.getElementById('editor') // editor de código

const generator = document.getElementById('gerador') // botão para gerar código

generator.addEventListener('click', generateCode) // função de gerar código adicionada ao botão

function sendCode(codeText) {
  var xhr = new XMLHttpRequest()

  xhr.open('POST', 'http://localhost:3000/atividade')

  xhr.setRequestHeader('Content-Type', 'application/json')

  const sendData = {
    codigo: codeText,
    cenario: 'descricao',
    data: '28/11/23',
    terapeutaId: 2
  }

  console.log('send data type: ' + typeof sendData)

  xhr.onload = function () {
    alert('Código enviado para análise com sucesso!')
    const data = JSON.parse(xhr.response)
    console.log(data)
  }

  xhr.send(JSON.stringify(sendData))
}

function generateCode() {
  // início do programa
  let codeText = 'programa "atividade": '

  codeText += ' inicio quadrante = ler()'

  let codeElements = editor.childNodes // cada elemento do código é um elemento filho (dentro do editor)

  // passa por cada elemento e adiciona seu conteúdo a string que salva o código
  for (let i = 0; i < codeElements.length; i++) {
    let currentElement = codeElements[i]
    if (currentElement.classList.contains('function-block')) {
      console.log('entrou function block')
      let block = new FunctionBlock(currentElement)
      codeText += block.getBlock() + ' '
    } else if (currentElement.classList.contains('code-block')) {
      // verifica se o elemento é um bloco condicional
      let block = new ControlFlowBlock(currentElement)
      codeText += block.getBlock() + ' '
    } else {
      codeText += currentElement.id + ' ' // o id do elemento guarda seu símbolo correspondente na linguagem QAL
    }
  }

  codeText += ' fim.' // adicioona o fim do programa

  console.log(codeText)

  sendCode(codeText)
}
