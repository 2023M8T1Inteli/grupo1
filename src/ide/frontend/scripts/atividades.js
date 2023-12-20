// Adiciona um ouvinte de evento que é acionado quando o conteúdo do DOM está carregado
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o corpo da tabela no DOM
  var tabela = document.querySelector('table tbody')

  axios
    .get('http://127.0.0.1:3000/atividade')
    .then(function (response) {
      var atividades = []
      atividades = response.data
      atividades.forEach(function (atividade) {
        var linha = tabela.insertRow() // Insere uma nova linha na tabela
        linha.addEventListener('click', function () {
          mostrarDetalhes(atividade)
        }) // Adiciona um ouvinte de evento para mostrar detalhes ao clicar
        // Insere cada detalhe da atividade como uma célula na linha da tabela
        linha.insertCell(0).textContent = atividade.cenario
      })
    })
    .catch(function (error) {
      // Handle errors here
      console.error('Error:', error)
    })
})

// Adiciona ouvintes de eventos aos botões para navegação
document.getElementById('novaAtividade').addEventListener('click', function () {
  window.location.href = './cadastroAtividade.html'
})

document.getElementById('home').addEventListener('click', function () {
  window.location.href = './home.html' // Redireciona para a página inicial
})

document.getElementById('voltar').addEventListener('click', function () {
  window.history.back() // Volta para a página anterior no histórico de navegação
})

const dataToStore = { key: 'value' }

localStorage.setItem('myData', JSON.stringify(dataToStore))
