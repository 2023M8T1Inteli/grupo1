import { FunctionBlock } from './FunctionBlock.js'
import { ControlFlowBlock } from './ControlFlowBlock.js'

const editor = document.getElementById('editor') // editor de código

const generator = document.getElementById('gerador') // botão para gerar código

generator.addEventListener('click', generateCode) // função de gerar código adicionada ao botão

function sendCode(backendURL, code) {
  // cria um arquivo .txt com o argumento 'code' como conteúdo
  const blob = new Blob([code], { type: 'text/plain' })

  const formData = new FormData()
  formData.append('file', blob, 'code.txt')

  // realiza o upload do arquivo gerado para o servidor
  fetch(backendURL + '/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      console.log('Arquivo enviado com sucesso.')
    })
    .catch(error => {
      console.error('Ocorreu um erro ao enviar o arquivo:', error)
    })
}

function generateCode() {
  // início do programa
  let codeText = 'programa "atividade": '

  codeText += 'inicio '

  let codeElements = editor.childNodes // cda elemento do código é um elemento filho (dentro do editor)

  // passa por cada elemento e adiciona seu conteúdo a string que salva o código
  for (let i = 0; i < codeElements.length; i++) {
    let currentElement = codeElements[i]
    if (currentElement.classList.contains('code-block')) {
      // verifica se o elemento é um bloco condicional
      let block = new ControlFlowBlock(currentElement)
      codeText += block.getBlock() + ' '
    } else if (currentElement.classList.contains('function-block')) {
      let block = new FunctionBlock(currentElement)
      codeText += block.getBlock() + ' '
    } else {
      codeText += currentElement.id + ' ' // o id do elemento guarda seu símbolo correspondente na linguagem QAL
    }
  }

  codeText += ' fim.' // adicioona o fim do programa

  console.log(codeText)

  //sendCode('http://127.0.0.1:5000/', codeText) // envio do arquivo para o servidor
}
