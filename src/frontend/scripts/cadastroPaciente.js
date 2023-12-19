// Seleciona todos os inputs dentro de elementos com a classe 'input-group'
document.querySelectorAll('.input-group input').forEach(input => {
  // Adiciona um ouvinte de evento para cada input para lidar com a tecla 'Enter'
  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault() // Impede a submissão do formulário ao pressionar 'Enter'
      // Encontra o próximo input no formulário
      const nextInput =
        this.closest('.input-group').nextElementSibling?.querySelector('input')
      if (nextInput) {
        nextInput.focus() // Move o foco para o próximo input, se houver
      }
    }
  })
})

// Função para validar se todos os campos do formulário estão preenchidos
function validarCampos() {
  // Obtém os valores dos campos do formulário
  var nome = document.getElementById('nome').value

  // Retorna verdadeiro se todos os campos estiverem preenchidos
  return nome
}

// Função para mostrar uma mensagem de sucesso após o cadastro
function mostrarMensagemSucesso() {
  const mensagemSucesso = document.createElement('div') // Cria um elemento div
  mensagemSucesso.innerHTML = 'Cadastro realizado com sucesso!' // Define o conteúdo da mensagem
  mensagemSucesso.className = 'mensagem-sucesso' // Define a classe para estilização

  document.body.appendChild(mensagemSucesso) // Adiciona a mensagem ao corpo do documento
  // Remove a mensagem após 3 segundos e redireciona para outra página
  setTimeout(() => {
    mensagemSucesso.remove()
    window.location.href = 'listaPacientes.html' // Redireciona para a lista de pacientes
  }, 3000)
}

// Adiciona um ouvinte de evento de submissão ao formulário de cadastro
document
  .getElementById('cadastroForm')
  .addEventListener('submit', function (event) {
    event.preventDefault() // Impede a submissão padrão do formulário

    var novoPaciente = document.getElementById('nome').value

    if (validarCampos()) {
      axios
        .post('http://127.0.0.1:3000/paciente', { nome: novoPaciente })
        .then(function (response) {
          console.log('Response data:', response.data)
        })
        .catch(function (error) {
          // Handle errors here
          console.error('Error:', error)
        })
      mostrarMensagemSucesso() // Mostra a mensagem de sucesso se todos os campos estiverem validados
    } else {
      alert('Por favor, preencha todos os campos corretamente.') // Alerta se algum campo estiver vazio
    }
  })
