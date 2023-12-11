var dropzone = document.getElementById('editor')

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
