export class Conditional {
  constructor(codeblock) {
    let block = 'se ' // começo da estrutura condicional

    for (let i = 1; i < codeblock.childNodes.length; i += 2) {
      if (i == 3) block += ' entao inicio ' // começo da estrutura do bloco de execução

      let section = codeblock.childNodes[i] // divide a código em seções (condição, bloco de execução)

      for (let j = 1; j < section.childNodes.length; j++) {
        // adiciona os elementos de código a string
        let element = section.childNodes[j]

        if (element.classList.contains('tapete-cor'))
          // checa se o elemento se trata de um dos quadrantes do tapete
          block += element.innerText + ' '
        else block += element.id + ' '
      }

      if (i == 3) block += ' fim ' // final da estrutura de bloco de execução
    }

    this.block = block // salva o código no atributo 'block'
  }

  getBlock() {
    // devolve a string gerada, correspondente ao bloco de código
    return this.block
  }
}
