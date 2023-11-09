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

// dropzone if

var dropzone2 = document.getElementById('drop2')

dropzone2.addEventListener('dragover', dragOver)

dropzone2.addEventListener('drop', dropEditor)

// deleting zone

var deletingZone = document.getElementById('deleting-area')

deletingZone.addEventListener('dragover', dragOver)

deletingZone.addEventListener('drop', dropDelete)

// drag functions

function dragStart(e) {
  draggingElement = e.target.cloneNode(true)

  e.dataTransfer.setData('text/plain', draggingElement.id)
}

function dragStartCode(e) {
  draggingElement = e.target
}

// drag over func

function dragOver(e) {
  e.preventDefault()
}

// drop func

function dropEditor(e) {
  e.target.appendChild(draggingElement)

  draggingElement.classList.add('code-element')

  draggingElement.addEventListener('dragstart', dragStartCode)

  draggingElement = null
}

function dropDelete(e) {
  if (draggingElement && draggingElement.classList.contains('code-element')) {
    draggingElement.parentNode.removeChild(draggingElement)
  }

  draggingElement = null
}
