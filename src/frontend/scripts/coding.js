import { Conditional } from './Conditional.js'

var editor = document.getElementById('editor-teste')

var code = []
var conditionals = []

code.push(conditionals)

var codeWords = document.getElementsByClassName('code-word')

// if

var conditionalIf = document.getElementById('conditional-if')

conditionalIf.addEventListener('click', function () {
  var newConditional = new Conditional()

  conditionals.push(newConditional)

  console.log(code)

  editor.innerHTML +=
    '<div>SE ( </div> <div> XXXXX </div> <div> ) ENTÃO (</div> <div> XXXX </div> )'
})

//
