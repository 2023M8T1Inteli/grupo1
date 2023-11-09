const ifCodeBlock =
  '<div class="code-block conditionals" draggable="true">SE<div class="droppable-area dropzone">+</div>ENTÃO<div class="droppable-area">+</div></div>'

let draggingElement = null

// draggables

const draggables = document.getElementsByClassName('code-word')

for (var draggable of draggables) {
  draggable.addEventListener('dragstart', dragStart)
}

// editor

var dropzone = document.getElementById('editor-teste')

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

  if (draggingElement.id == 'se') {
    // caso o elemento dropado seja um statement
    var newElement = document.createElement('div')

    newElement.innerHTML = ifCodeBlock

    draggingElement = newElement

    for (let i = 0; i < draggingElement.children.length; i++) {
      let child = draggingElement.children[i]
      if (child.classList.contains('droppable-area')) {
        child.addEventListener('dragover', dragOver)
        child.addEventListener('drop', dropCodeBlock)
      }
    }
  }

  e.target.appendChild(draggingElement)

  console.log('dragging el class list: ' + draggingElement.classList)

  draggingElement.classList.add('code-element')

  console.log('dragging el class list: ' + draggingElement.classList)

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
  console.log('dragging el: ' + draggingElement)

  if (draggingElement) console.log('dragging el true')

  console.log('dragging el class list: ' + draggingElement.classList)

  if (
    draggingElement.classList.contains('code-element') ||
    draggingElement.classList.contains('code-block')
  ) {
    draggingElement.parentNode.removeChild(draggingElement)
  }

  draggingElement = null
}
