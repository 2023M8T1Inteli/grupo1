document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o envio do formulário
            const nextInput = this.closest('.input-group').nextElementSibling?.querySelector('input');
            if (nextInput) {
                nextInput.focus(); // Move o foco para o próximo campo de entrada
            }
        }
    });
});

function validarCampos() {
    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Verifica se ambos os campos estão preenchidos
    return email && password;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var errorMessage = document.getElementById('errorMessage');

    if (validarCampos()) {
        window.location.href = 'home.html'; // Substitua pelo caminho correto
    } else {
        // Exibe a mensagem de erro
        errorMessage.style.display = 'block';
    }
});
