import { Conditional } from './Conditional.js'

var editor = document.getElementById('editor-teste')

var code = []
var conditionals = []

code.push(conditionals)

var codeWords = document.getElementsByClassName('code-word')

// if

// var conditionalIf = document.getElementById('conditional-if')

// conditionalIf.addEventListener('click', function () {
//   var newConditional = new Conditional()

//   conditionals.push(newConditional)

//   console.log(code)

//   editor.innerHTML +=
//     '<div>SE ( </div> <div> XXXXX </div> <div> ) ENTÃO (</div> <div> XXXX </div> )'
// })

//

const draggables = document.getElementsByClassName('code-word')
const dropzones = document.getElementsByClassName('dropzone')

// Prevent the default behavior of dragstart to enable custom dragging

// for (var draggable of draggables) {
//   draggable.addEventListener('dragstart', e => {
//     let selected = e.target.cloneNode(true)
//     console.log('draggable: ' + draggable)
//     console.log('e: ' + e)

//     for (var dropzone of dropzones) {
//       console.log(selected.id)

//       dropzone.addEventListener('dragover', e => {
//         e.preventDefault()
//       })

//       console.log(selected.id)

//       //if (selected.id == )

//       dropzone.addEventListener('drop', e => {
//         dropzone.appendChild(selected)
//         selected = null
//       })
//     }
//   })
// }

document.addEventListener('DOMContentLoaded', function () {
  const draggables = document.getElementsByClassName('code-word')
  const dropzones = document.getElementsByClassName('dropzone')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })

  dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', dragOver)
    dropzone.addEventListener('drop', drop)
  })

  function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id)
  }

  function dragOver(event) {
    event.preventDefault()
  }

  function drop(event) {
    event.preventDefault()
    const draggedElementId = event.dataTransfer.getData('text/plain')
    const draggedElement = document.getElementById(draggedElementId)

    // Check if the dropzone allows the drop (optional)
    if (event.target.classList.contains('dropzone')) {
      // Append the dragged element to the dropzone
      event.target.appendChild(draggedElement)
    }
  }
})
