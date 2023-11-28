export class FunctionBlock {
  constructor(block) {
    var functionId = block.id

    console.log('entrou aqui')

    this.argsQty = 1

    if (functionId == 'show-function-code') {
      this.funcCode = 'mostrar'
    } else if (functionId == 'play-function-code') {
      this.funcCode = 'tocar'
    } else if (functionId == 'show-play-function-code') {
      this.funcCode = 'mostrar_tocar'
      this.argsQty = 2
    } else this.funcCode = 'esperar'

    this.funcCode += '('

    for (let i = 0; i < this.argsQty; i++) {
      let bodyDiv = block.querySelector(`#body-${i}`)

      if (i > 0) this.funcCode += ', '

      for (let j = 0; j < bodyDiv.childNodes.length; j++) {
        let codeWord = bodyDiv.childNodes[j]

        if (codeWord.classList.contains('code-word')) {
          this.funcCode += codeWord.id
        }
      }
    }

    this.funcCode += ')'
  }

  getBlock() {
    return this.funcCode
  }
}
