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
      let codeWord = conditionDiv.childNodes[i].id
      this.code += ' ' + codeWord + ' '
    }

    for (let i = 0; i < this.blockWords.length; i++) {
      let bodyDiv = block.querySelector(`#body-${i}`)

      console.log(bodyDiv.id + ' child nodes: ' + bodyDiv.childNodes.length)

      for (let j = 0; j < bodyDiv.childNodes.length; j++) {
        if (bodyDiv.childNodes[j].tagName == 'div')
          console.log('child ' + j + ': ' + bodyDiv.childNodes[j])
        console.log(
          'child ' + j + ' tag name: ' + bodyDiv.childNodes[j].tagName
        )
      }

      // if (bodyDiv.hasChildNodes) {
      //   console.log(bodyDiv.id + ' childNodes: ')
      //   this.code += ' ' + this.blockWords[i] + ' inicio '
      //   for (let j = 0; j < bodyDiv.childNodes.length; j++) {
      //     console.log('body div: ' + bodyDiv.childNodes[i].innerHTML)
      //     let codeWord = bodyDiv.childNodes[i].id
      //     console.log('code word: ' + codeWord)
      //     this.code += ' ' + codeWord + ' '
      //   }
      // }
    }
  }

  getBlock() {
    return this.code
  }
}
