const correspondingHtml = {
  quadrante:
    '<div class="code-word input-functions code-element" id="ler()" draggable="true" style="width: auto; height: auto;">TECLA PRESS</div>',
  '==': '<div id="==" class="code-word relationals code-element" draggable="true" style="width: auto; height: auto;"> IGUAL A </div>',
  1: '<div class="tapete-cor code-word code-element" data-cor="green" style="background-color: green; width: auto; height: auto; draggable="true" id="1">1</div>',
  2: '<div class="tapete-cor code-word code-element" data-cor="blue" style="background-color: blue; width: auto; height: auto; draggable="true" id="2">2</div>',
  3: '<div class="tapete-cor code-word code-element" data-cor="yellow" style="background-color: yellow; width: auto; height: auto; draggable="true" id="3">3</div>',
  4: '<div class="tapete-cor code-word code-element" data-cor="purple" style="background-color: purple; width: auto; height: auto; draggable="true" id="4">4</div>',
  5: '<div class="tapete-cor code-word code-element" data-cor="black" style="background-color: black; width: auto; height: auto; draggable="true" id="5">5</div>',
  6: '<div class="tapete-cor code-word code-element" data-cor="red" style="background-color: red; width: auto; height: auto; draggable="true" id="6">6</div>'
}

const code =
  'programa "atividade": inicio quadrante = ler() se quadrante == 1 entao inicio mostrar(4) fim senao inicio mostrar_tocar(8, 1) fim fim.'

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

function turnDraggable(element, pos) {
  if (element.childNodes.length > 0)
    for (let i = 0; i < element.childNodes.length; i++)
      if (element.childNodes[i].tagName === 'div')
        turnDraggable(element.childNodes[i])

  if (element.classList.contains('droppable-area')) {
    element.addEventListener('dragover', dragOver)
    element.addEventListener('drop', dropCodeBlock)
  }

  if (element.classList.contains('code-element')) {
    console.log('element ' + pos + ' draggable')
    element.addEventListener('dragstart', dragStartCode)
  }
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

if (code.length > 0) {
  const words = code.split(' ')

  var htmlBlocks = ''

  for (let i = 0; i < words.length; i++) {
    let element = words[i]

    console.log('element: ' + element)

    if (element != undefined) {
      if (element == 'se') {
        let endIf = words.indexOf('fim', i)

        if (words[endIf + 1] == 'senao') {
          let elseIndex = words.indexOf('senao', i)

          endIf = words.indexOf('fim', elseIndex)
        }

        let ifCodeBlock = words.slice(i, endIf + 1)

        console.log('if code block: ' + ifCodeBlock)

        let ifBlock = buildIfBlock(ifCodeBlock)

        htmlBlocks += ifBlock

        i = endIf
      } else if (
        element.includes('mostrar') ||
        element.includes('tocar') ||
        element.includes('mostrar_tocar') ||
        element.includes('esperar')
      ) {
        let argsEnd =
          i + words.slice(i).findIndex(element => element.includes(')'))

        let funcElements = elements.slice(thenStart + 2, argsEnd + 1)

        i = argsEnd

        let funcBlock = buildFuncBlock(funcElements)

        htmlBlocks += funcBlock
      } else if (element in correspondingHtml) {
        htmlBlocks += correspondingHtml[element]
      }
    }
  }

  console.log('html blocks: ' + htmlBlocks)

  dropzone.innerHTML = htmlBlocks
}

function buildIfBlock(elements) {
  let conditionElements = []
  let thenElements = []
  let elseElements = []

  let htmlBlock =
    '<div id="if-block" class="code-block conditionals code-element" draggable="true" style="background-color: rgb(196, 127, 0);"> SE <div id="condition" class="droppable-area dropzone"><div class="add-code-word">+</div>'

  let thenStart = elements.indexOf('entao')

  conditionElements = elements.slice(1, thenStart)

  console.log('condition elements: ' + conditionElements)

  // html condicao

  for (let i = 0; i < conditionElements.length; i++) {
    let currentElement = conditionElements[i]
    let correspHtml = correspondingHtml[currentElement]
    htmlBlock += correspHtml
  }

  let thenEnd = elements.indexOf('fim', thenStart)

  thenElements = elements.slice(thenStart + 2, thenEnd)

  htmlBlock +=
    '</div> ENTÃO <div id="body-0" class="droppable-area"><div class="add-code-word">+</div>' // fecha o droppable de condicoes

  // html entao

  for (let i = 0; i < thenElements.length; i++) {
    let currentElement = thenElements[i]

    if (
      currentElement.includes('mostrar') ||
      currentElement.includes('tocar') ||
      currentElement.includes('mostrar_tocar') ||
      currentElement.includes('esperar')
    ) {
      let argsEnd =
        thenStart +
        elements.slice(thenStart).findIndex(element => element.includes(')'))

      let funcElements = elements.slice(thenStart + 2, argsEnd + 1)

      i = argsEnd

      let funcBlock = buildFuncBlock(funcElements)

      htmlBlock += funcBlock
    } else if (currentElement in correspondingHtml) {
      htmlBlock += correspondingHtml[currentElement]
    }
  }

  htmlBlock += '</div>' // fecha entao

  if (elements[thenEnd + 1] == 'senao') {
    // html senao

    htmlBlock +=
      'SENÃO <div id="body-1" class="droppable-area"><div class="add-code-word">+</div>'

    let elseStart = elements.indexOf('senao', thenEnd)

    let elseEnd = elements.indexOf('fim', elseStart)

    elseElements = elements.slice(elseStart + 2, elseEnd)

    for (let i = 0; i < elseElements.length; i++) {
      let currentElement = elseElements[i]

      if (
        currentElement.includes('mostrar') ||
        currentElement.includes('tocar') ||
        currentElement.includes('mostrar_tocar') ||
        currentElement.includes('esperar')
      ) {
        let argsEnd =
          elseStart +
          elements.slice(elseStart).findIndex(element => element.includes(')'))

        let funcElements = elements.slice(elseStart + 2, argsEnd + 1)

        i = argsEnd

        let funcBlock = buildFuncBlock(funcElements)

        htmlBlock += funcBlock
      } else if (currentElement in correspondingHtml) {
        htmlBlock += correspondingHtml[currentElement]
      }
    }

    htmlBlock += '</div>' // fecha div senao
  }

  htmlBlock += '</div>' // fecha div maior

  return htmlBlock
}

function buildFuncBlock(elements) {
  let funcWord
  let arg = []

  if (elements.length > 0) {
    let inicioArgs = elements[0].indexOf('(')
    funcWord = elements[0].substring(0, inicioArgs)
    arg[0] = elements[0].substring(inicioArgs + 1, elements[0].length - 1)

    for (let i = 1; i < elements.length; i++) {
      let currentArg = elements[i][0]

      arg.push(currentArg)
    }
  } else {
    let inicioArgs = elements.indexOf('(')
    funcWord = elements.substring(0, inicioArgs)
    arg = elements.substring(inicioArgs + 1, elements.length - 1)
  }

  var functionId

  var functionWord = []

  if (funcWord == 'mostrar') {
    functionId = 'show-function'
    functionWord = ['MOSTRAR']
  } else if (funcWord == 'tocar') {
    functionId = 'play-function'
    functionWord = ['TOCAR']
  } else if (funcWord == 'mostrar_tocar') {
    functionId = 'show-play-function'
    functionWord = ['MOSTRAR', 'TOCAR']
  } else {
    functionId = 'wait-function'
    functionWord = ['ESPERAR']
  }

  var addCodeArg = '<div class="add-code-argument">+</div>'

  var block = `<div id="${functionId}-code" class="function-block code-block" draggable="true" style="background-color: #AD0000;">`

  for (let i = 0; i < functionWord.length; i++) {
    block += ` ${functionWord[i]} <div id="body-${i}" class="droppable-area"><div class="tapete-cor code-word code-element" width: auto; height: auto; draggable="true" id="${arg[i]}">${arg[i]}</div>${addCodeArg}</div>`
  }

  if (functionId == 'wait-function') block += ' MS '

  block += '</div>'

  return block
}
