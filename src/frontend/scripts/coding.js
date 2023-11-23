//import { ControlFlowBlock } from './ControlFlowBlock'

const showFuncCodeBlock =
  '<div id="mostrar()" class="code-block functions" draggable="true">MOSTRAR<div class="droppable-area dropzone">+</div></div>'

let draggingElement = null

// draggables

const draggables = document.getElementsByClassName('code-word')

for (var draggable of draggables) {
  draggable.addEventListener('dragstart', dragStart)
}

// editor

var dropzone = document.getElementById('editor')

dropzone.addEventListener('dragover', dragOver)

dropzone.addEventListener('drop', dropEditor)

// deleting zone

var deletingZone = document.getElementById('deleting-area')

deletingZone.addEventListener('dragover', dragOver)

deletingZone.addEventListener('drop', dropDelete)

// drag functions

function dragStart(e) {
  // função para elementos que estão fora do editor
  draggingElement = e.target.cloneNode(true)
  draggingElement.style.width = 'auto'
  draggingElement.style.height = 'auto'
}

function dragStartCode(e) {
  // função para elementos que estão dentro do editor
  draggingElement = e.target
}

// drag over func

function dragOver(e) {
  // função para quando o objeto estiver sendo arrastado em cima de uma droppable area
  e.preventDefault()
}

// drop func

function dropEditor(e) {
  // função para dropar elementos no editor

  if (draggingElement.classList.contains('argumentative')) {
    // caso o elemento dropado seja um statement
    var newElement = document.createElement('div')

    newElement.innerHTML = createControlFlowBlock(draggingElement.id)

    console.log(newElement.innerHTML)

    draggingElement = newElement.firstChild

    if (draggingElement.children.length > 0) {
      for (let i = 0; i < draggingElement.children.length; i++) {
        let child = draggingElement.children[i]
        if (child.classList.contains('droppable-area')) {
          console.log('drop area')
          child.addEventListener('dragover', dragOver)
          child.addEventListener('drop', dropCodeBlock)
        }
      }
    }
  }

  e.target.appendChild(draggingElement)

  draggingElement.classList.add('code-element')

  draggingElement.addEventListener('dragstart', dragStartCode)

  draggingElement = null
}

function dropCodeBlock(e) {
  // função para dropar elementos em blocos de código (if, else, while)
  e.target.appendChild(draggingElement)

  draggingElement.classList.add('code-element')

  draggingElement.addEventListener('dragstart', dragStartCode)

  draggingElement = null
}

function dropDelete(e) {
  // função para dropar elementos na área de delete

  if (
    draggingElement.classList.contains('code-element') ||
    draggingElement.classList.contains('code-block')
  ) {
    draggingElement.parentNode.removeChild(draggingElement)
  }

  draggingElement = null
}

function createControlFlowBlock(type) {
  // função que faz a formatação de estruturas de fluxo de controle no editor
  var id, classtype, conditionWord, bodyWord

  // checa de qual estrutura de controle se trata
  if (type == 'if-statement') {
    id = 'if-block'
    classtype = 'conditionals'
    conditionWord = 'SE'
    bodyWord = ['ENTÃO', 'SENÃO']
  } else if (type == 'while-loop') {
    id = 'while-block'
    classtype = 'loops'
    conditionWord = 'ENQUANTO'
    bodyWord = ['FAÇA']
  }

  // montagem do bloco html correspondente
  var block = `<div id="${id}" class="code-block ${classtype}" draggable="true" style="background-color: rgb(196, 127, 0);">${conditionWord}<div id="condition" class="droppable-area dropzone">+</div>`

  for (let i = 0; i < bodyWord.length; i++) {
    block += `${bodyWord[i]}<div id="body-${i}" class="droppable-area">+</div>`
  }

  block += '</div>'

  return block
}

function codeBlock() {}
