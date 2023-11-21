class ControlFlowBlock {
  constructor(block) {
    if (block.id == 'if-statement') {
      this.conditionWord = 'se'
      this.blockWords = ['entao', 'senao']
    } else if (block.id == 'while-loop') {
      this.conditionWord = 'enquanto'
      this.blockWords = ['faca']
    }

    this.code = this.conditionWord + ' '

    var conditionDiv = block.getElementById('condition')

    for (let i = 0; i < conditionDiv.childNodes.length; i++) {
      let codeWord = conditionDiv.childNodes[i].id
      this.code += ' ' + codeWord + ' '
    }

    for (let i = 0; i < this.blockWords.length; i++) {
      let bodyDiv = block.getElementById(`body-${i}`)

      if (bodyDiv.hasChildNodes) {
        this.code += ' ' + this.blockWords[i] + ' inicio '
        for (let j = 0; j < bodyDiv.childNodes.length; j++) {
          let codeWord = conditionDiv.childNodes[i].id
          this.code += ' ' + codeWord + ' '
        }
      }
    }
  }

  getBlock() {
    return this.block
  }
}
