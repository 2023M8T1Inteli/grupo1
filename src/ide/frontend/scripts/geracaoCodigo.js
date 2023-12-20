import { FunctionBlock } from './FunctionBlock.js'
import { ControlFlowBlock } from './ControlFlowBlock.js'

const editor = document.getElementById('editor') // editor de código

const generator = document.getElementById('gerador') // botão para gerar código

generator.addEventListener('click', generateCode) // função de gerar código adicionada ao botão

function sendCode(codeText) {
  const today = new Date()

  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const formattedDate = `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year}`

  //const titulo = localStorage.getItem('titulo').titulo

  const titulo = 'atividade'

  var novaAtiv = {
    codigo: codeText,
    cenario: titulo,
    terapeutaId: 1,
    data: formattedDate,
    pacientes: [
      {
        id: 1,
        nome: 'paciente1'
      }
    ]
  }

  axios
    .post('http://127.0.0.1:3000/atividade', novaAtiv)
    .then(function (response) {
      console.log('Response data:', response.data)
    })
    .catch(function (error) {
      // Handle errors here
      console.error('Error:', error)
    })
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
