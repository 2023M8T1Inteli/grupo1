// Seleciona todos os inputs dentro de elementos com a classe 'input-group'
document.querySelectorAll('.input-group input').forEach(input => {
    // Adiciona um ouvinte de evento para cada input para lidar com a tecla 'Enter'
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede a submissão do formulário ao pressionar 'Enter'
            // Encontra o próximo input no formulário
            const nextInput = this.closest('.input-group').nextElementSibling?.querySelector('input');
            if (nextInput) {
                nextInput.focus(); // Move o foco para o próximo campo de entrada, se houver
            }
        }
    });
});

// Função para validar se os campos de email e senha estão preenchidos
function validarCampos() {
    var email = document.getElementById('username').value; // Obtém o valor do campo de email
    var password = document.getElementById('password').value; // Obtém o valor do campo de senha

    return email && password; // Retorna verdadeiro se ambos os campos estiverem preenchidos
}

// Adiciona um ouvinte de evento de submissão ao formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário

    var errorMessage = document.getElementById('errorMessage'); // Obtém o elemento de mensagem de erro

    if (validarCampos()) {
        window.location.href = 'home.html'; // Redireciona para a página inicial se os campos estiverem validados
    } else {
        errorMessage.style.display = 'block'; // Exibe a mensagem de erro se os campos não estiverem validados
    }
});
