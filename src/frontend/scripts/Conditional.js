export class Conditional {
  constructor(codeblock) {
    let block = 'se '

    for (let i = 1; i < codeblock.childNodes.length; i += 2) {
      if (i == 3) block += ' entao\ninicio\n'

      let section = codeblock.childNodes[i]

      console.log(section.id)

      for (let j = 1; j < section.childNodes.length; j++) {
        let element = section.childNodes[j]

        if (element.classList.contains('tapete-cor'))
          block += element.innerText + ' '
        else block += element.id + ' '
      }

      if (i == 3) block += '\nfim '
    }

    this.block = block
  }

  getBlock() {
    console.log('if block: ' + this.block)

    return this.block
  }
}
