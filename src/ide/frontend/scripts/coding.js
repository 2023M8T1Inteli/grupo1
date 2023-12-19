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
    // caso o elemento dropado seja uma estrutura de controle ou um função
    var newElement = document.createElement('div')

    if (draggingElement.classList.contains('code-block'))
      // cria a estrutura html correspondente à estrutura de controle
      newElement.innerHTML = createControlFlowBlock(draggingElement.id)
    else if (draggingElement.classList.contains('functions'))
      // cria a estrutura html correspondente à função
      newElement.innerHTML = createFunctionBlock(draggingElement.id)

    draggingElement = newElement.firstChild

    if (draggingElement.children.length > 0) {
      for (let i = 0; i < draggingElement.children.length; i++) {
        let child = draggingElement.children[i]
        if (child.classList.contains('droppable-area')) {
          child.addEventListener('dragover', dragOver)
          child.addEventListener('drop', dropCodeBlock)
        }
      }
    }
  }

  if (draggingElement.classList.contains('tapete-cor'))
    draggingElement.id = draggingElement.innerText

  e.target.appendChild(draggingElement)

  draggingElement.classList.add('code-element')

  draggingElement.addEventListener('dragstart', dragStartCode)

  draggingElement = null
}

function dropCodeBlock(e) {
  // função para dropar elementos em blocos de código (if, else, while)
  if (draggingElement.classList.contains('functions')) {
    // caso o elemento seja uma função (mostrar, tocar, etc), esse bloco faz a formatação necessária
    var newElement = document.createElement('div')
    newElement.innerHTML = createFunctionBlock(draggingElement.id)
    draggingElement = newElement.firstChild
  }

  if (
    e.target.classList.contains('add-code-word') ||
    e.target.classList.contains('add-code-argument') ||
    e.target.classList.contains('code-word')
  )
    e.target.parentNode.appendChild(draggingElement)
  // caso o usuário tente dropar um elemento em um espaço que não seja uma dropzone, o elemento é dropado no node pai
  else e.target.appendChild(draggingElement)

  if (draggingElement.classList.contains('tapete-cor'))
    draggingElement.id = draggingElement.innerText

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

  var addCodeWords = '<div class="add-code-word">+</div>'

  // montagem do bloco html correspondente
  var block = `<div id="${id}" class="code-block ${classtype}" draggable="true" style="background-color: rgb(196, 127, 0);"> ${conditionWord} <div id="condition" class="droppable-area dropzone">${addCodeWords}</div>`

  for (let i = 0; i < bodyWord.length; i++) {
    block += ` ${bodyWord[i]} <div id="body-${i}" class="droppable-area">${addCodeWords}</div>`
  }

  block += '</div>'

  return block
}

function createFunctionBlock(functionId) {
  // função que faz a formatação de funções de saída de dados no editor

  var functionWord

  // verifica qual a função em questão
  if (functionId == 'show-function') functionWord = ['MOSTRAR']
  else if (functionId == 'play-function') functionWord = ['TOCAR']
  else if (functionId == 'show-play-function')
    functionWord = ['MOSTRAR', 'TOCAR']
  else if (functionId == 'ler_varios()')
    functionWord = ['CLICAR', 'VEZES:', 'TOLERAR:']
  else functionWord = ['ESPERAR']

  // bloco html que recebe o argumento das funções (representado pelo símbolo "+")
  var addCodeArg = '<div class="add-code-argument">+</div>'

  var blockColor

  if (functionId == 'ler_varios()') {
    blockColor = 'rgb(144, 0, 255)'
  } else {
    blockColor = '#AD0000'
  }

  // monta o bloco html correspondente
  var block = `<div id="${functionId}-code" class="function-block code-block" draggable="true" style="background-color: ${blockColor};">`

  for (let i = 0; i < functionWord.length; i++) {
    block += ` ${functionWord[i]} <div id="body-${i}" class="droppable-area">${addCodeArg}</div>`
  }

  if (functionWord[0] == 'ESPERAR') block += ' MS '

  block += '</div>'

  return block
}
