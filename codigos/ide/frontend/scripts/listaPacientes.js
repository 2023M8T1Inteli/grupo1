// Adiciona um ouvinte de evento que é acionado quando o conteúdo do DOM está carregado
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o corpo da tabela no DOM
  var tabela = document.querySelector('table tbody')

  axios
    .get('http://127.0.0.1:3000/paciente')
    .then(function (response) {
      var pacientes = []
      pacientes = response.data
      pacientes.forEach(function (paciente) {
        var linha = tabela.insertRow() // Insere uma nova linha na tabela
        linha.addEventListener('click', function () {
          mostrarDetalhes(paciente)
        }) // Adiciona um ouvinte de evento para mostrar detalhes ao clicar
        // Insere cada detalhe do paciente como uma célula na linha da tabela
        //linha.insertCell(0).textContent = paciente.nome

        var celula = linha.insertCell(0)
        celula.classList.add('celula')

        var nomePaciente = document.createElement('div')
        nomePaciente.textContent = paciente.nome
        nomePaciente.classList.add('nome-elemento')

        var opcoes = document.createElement('div')

        var editar = document.createElement('button')
        editar.classList.add('botao-celula')
        editar.textContent = 'Editar'
        editar.classList.add('opcoes')

        var deletar = document.createElement('button')
        deletar.classList.add('botao-celula')
        deletar.textContent = 'Deletar'
        deletar.classList.add('opcoes')

        opcoes.appendChild(editar)
        opcoes.appendChild(deletar)

        celula.appendChild(nomePaciente)
        celula.appendChild(opcoes)
      })
    })
    .catch(function (error) {
      // Handle errors here
      console.error('Error:', error)
    })
})

// Função para mostrar detalhes de um paciente em um modal
function mostrarDetalhes(paciente) {
  var modal = document.getElementById('modalDetalhes') // Seleciona o modal no DOM
  var tabelaDetalhes = document
    .getElementById('tabelaDetalhes')
    .querySelector('tbody')

  tabelaDetalhes.innerHTML = '' // Limpa a tabela de detalhes no modal

  // Array de detalhes fictícios para exemplificar
  var detalhes = [
    { atividade: 'Exemplo de Atividade 1', data: '2023-01-01' },
    { atividade: 'Exemplo de Atividade 2', data: '2023-02-01' }
  ]

  // Insere cada detalhe na tabela de detalhes
  detalhes.forEach(function (det) {
    var linhaDetalhes = tabelaDetalhes.insertRow()
    linhaDetalhes.insertCell(0).textContent = det.atividade
    linhaDetalhes.insertCell(1).textContent = det.data
  })

  modal.style.display = 'block' // Exibe o modal
}

// Configuração para fechar o modal
var span = document.getElementsByClassName('close')[0] // Seleciona o botão de fechar
span.onclick = function () {
  var modal = document.getElementById('modalDetalhes')
  modal.style.display = 'none' // Fecha o modal ao clicar no botão de fechar
}

// Configuração para fechar o modal ao clicar fora dele
window.onclick = function (event) {
  var modal = document.getElementById('modalDetalhes')
  if (event.target == modal) {
    modal.style.display = 'none' // Fecha o modal ao clicar fora dele
  }
}

// Adiciona ouvintes de eventos aos botões para navegação
document.getElementById('novoPaciente').addEventListener('click', function () {
  window.location.href = 'cadastroPaciente.html' // Redireciona para a página de cadastro de novo paciente
})

document.getElementById('home').addEventListener('click', function () {
  window.location.href = 'home.html' // Redireciona para a página inicial
})

document.getElementById('voltar').addEventListener('click', function () {
  window.history.back() // Volta para a página anterior no histórico de navegação
})

function editarPaciente(idPaciente) {}
