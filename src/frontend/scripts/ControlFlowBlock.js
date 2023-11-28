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

    console.log('conditionDiv: ' + conditionDiv.innerHTML)

    for (let i = 0; i < conditionDiv.childNodes.length; i++) {
      let codeWord = conditionDiv.childNodes[i].id
      this.code += ' ' + codeWord + ' '
    }

    for (let i = 0; i < this.blockWords.length; i++) {
      let bodyDiv = block.querySelector(`#body-${i}`)

      if (bodyDiv.childNodes.length > 1) {
        this.code += ` ${this.blockWords[i]} inicio `

        for (let j = 1; j < bodyDiv.childNodes.length; j++) {
          let bodyChild = bodyDiv.childNodes[j]
          this.code += bodyChild.id
        }

        this.code += ' fim '
      }
    }
  }

  getBlock() {
    return this.code
  }
}
