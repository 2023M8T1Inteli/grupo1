const editor = document.getElementById('editor')

const generator = document.getElementById('gerador')

generator.addEventListener('click', gerarCodigo)

function gerarCodigo(e) {
  let codeElements = editor.childNodes

  for (let i = 0; i < codeElements.length; i++) {
    if (codeElements[i].classList.length == 1) {
      let subElements = codeElements[i].childNodes

      for (let j = 0; j < subElements.length; j++) {
        element = subElements[j]

        console.log('element ' + j + ': ' + element.classList)
      }
    }
  }
}

function generateConditional() {
  document.get
}
