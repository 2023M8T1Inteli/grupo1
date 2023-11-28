import { FunctionBlock } from './FunctionBlock.js'

export class ControlFlowBlock {
  constructor(block) {
    if (block.id == 'if-block') {
      console.log('entrou if')
      this.conditionWord = 'se'
      this.blockWords = ['entao', 'senao']
    } else if (block.id == 'while-block') {
      this.conditionWord = 'enquanto'
      this.blockWords = ['faca']
    }

    this.code = this.conditionWord + ' '

    var conditionDiv = block.querySelector('#condition')

    for (let i = 0; i < conditionDiv.childNodes.length; i++) {
      let codeWord = conditionDiv.childNodes[i]
      this.code += ' ' + codeWord.id + ' '
    }

    for (let i = 0; i < this.blockWords.length; i++) {
      let bodyDiv = block.querySelector(`#body-${i}`)

      if (bodyDiv.childNodes.length > 1) {
        this.code += ` ${this.blockWords[i]} inicio `

        for (let j = 1; j < bodyDiv.childNodes.length; j++) {
          let bodyChild = bodyDiv.childNodes[j]
          if (bodyChild.classList.contains('function-block')) {
            let element = new FunctionBlock(bodyChild)
            this.code += element.getBlock()
          } else {
            this.code += bodyChild.id
          }
        }

        this.code += ' fim '
      }
    }
  }

  getBlock() {
    return this.code
  }
}
