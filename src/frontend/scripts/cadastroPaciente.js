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
    var nome = document.getElementById('nome').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var dificuldade = document.getElementById('dificuldade').value;
    var grau = document.getElementById('grau').value;

    // Aqui você pode adicionar validações específicas para cada campo
    // Por exemplo, verificar se o nome não está vazio, se o email tem formato válido, etc.

    return nome && dataNascimento && email && telefone && dificuldade && grau; // Retorna true se todos os campos estiverem preenchidos
}

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var nome = document.getElementById('nome').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var dificuldade = document.getElementById('dificuldade').value;
    var grau = document.getElementById('grau').value;

    console.log('Cadastro de Paciente:', nome, dataNascimento, email, telefone, dificuldade, grau);

    // Verifica se os campos estão válidos antes de mudar a página
    if (validarCampos()) {
        window.location.href = 'listaPacientes.html'; // Substitua pelo caminho correto
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
});

// Se houver um botão separado para redirecionamento, você pode adicionar um evento de clique aqui
// document.getElementById('novoPaciente').addEventListener('click', function() {
//     window.location.href = 'cadastroPaciente.html'; // Substitua pelo caminho correto
// });
