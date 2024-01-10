// Seleciona todos os inputs dentro de elementos com a classe 'input-group'
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede a submissão do formulário ao pressionar 'Enter'
            const nextInput = this.closest('.input-group').nextElementSibling?.querySelector('input');
            if (nextInput) {
                nextInput.focus(); // Move o foco para o próximo input, se houver
            }
        }
    });
});

// Função para validar se todos os campos obrigatórios do formulário estão preenchidos
function validarCampos() {
    var nome = document.getElementById('nome').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var senha = document.getElementById('senha').value;

    return nome && dataNascimento && email && telefone && senha;
}

// Função para mostrar uma mensagem de sucesso após o cadastro
function mostrarMensagemSucesso() {
    const mensagemSucesso = document.createElement('div');
    mensagemSucesso.innerHTML = 'Cadastro realizado com sucesso!';
    mensagemSucesso.className = 'mensagem-sucesso';

    document.body.appendChild(mensagemSucesso);
    setTimeout(() => {
        mensagemSucesso.remove();
        window.location.href = '../pages/login.html'; // Altere para o caminho da sua página de login
    }, 2000); // Espera 3 segundos antes de redirecionar
}

// Função para lidar com a submissão do formulário
function handleSubmit(event) {
    event.preventDefault(); // Impede a submissão padrão do formulário

    if (validarCampos()) {
        // Local para implementar o código para lidar com a validação da imagem.

        mostrarMensagemSucesso(); // Mostra a mensagem de sucesso se todos os campos estiverem validados
    } else {
        alert("Por favor, preencha todos os campos obrigatórios."); // Alerta se algum campo estiver vazio
    }
}

// Adiciona um ouvinte de evento de submissão ao formulário de cadastro
document.getElementById('cadastroForm').addEventListener('submit', handleSubmit);
