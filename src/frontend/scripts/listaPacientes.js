document.addEventListener('DOMContentLoaded', function() {
    var pacientes = [
        { nome: 'Elena Fernandes', idade: '10', dificuldade: 'Dificuldade A', grau: '2', email: ' elenafernandes@gmail.com', telefone: '(11) 92566-6331' },
        { nome: 'Isabela Pereira', idade: '12', dificuldade: 'Dificuldade B', grau: '3', email: 'isabelapereira@gmail.com', telefone: '(11) 94621-5213' },
        { nome: 'João Neves', idade: '9', dificuldade: 'Dificuldade C', grau: '4', email: 'joãoneves@gmail.com', telefone: '(11) 99344-7780' },
        { nome: 'Maria Mota', idade: '14', dificuldade: 'Dificuldade D', grau: '5', email: 'mariamota@gmail.com', telefone: '(11) 92218-2009' },
        { nome: 'Felipe Castro', idade: '11', dificuldade: 'Dificuldade E', grau: '1', email: 'felipecastro@gmail.com', telefone: '(11) 94621-5215' }
    ];

    var tabela = document.querySelector('table tbody');
    
    pacientes.forEach(function(paciente) {
        var linha = tabela.insertRow();
        linha.addEventListener('click', function() { mostrarDetalhes(paciente); });
        linha.insertCell(0).textContent = paciente.nome;
        linha.insertCell(1).textContent = paciente.idade;
        linha.insertCell(2).textContent = paciente.dificuldade;
        linha.insertCell(3).textContent = paciente.grau;
        linha.insertCell(4).textContent = paciente.email;
        linha.insertCell(5).textContent = paciente.telefone;
    });
});

// Função para mostrar detalhes no modal
function mostrarDetalhes(paciente) {
    var modal = document.getElementById('modalDetalhes');
    var tabelaDetalhes = document.getElementById('tabelaDetalhes').querySelector('tbody');

    // Limpa a tabela de detalhes
    tabelaDetalhes.innerHTML = '';

    // Adiciona detalhes fictícios para o exemplo
    // ...código para adicionar detalhes...
    var detalhes = [
        { atividade: "Exemplo de Atividade 1", data: "2023-01-01" },
        { atividade: "Exemplo de Atividade 2", data: "2023-02-01" }
    ];

    detalhes.forEach(function(det) {
        var linhaDetalhes = tabelaDetalhes.insertRow();
        linhaDetalhes.insertCell(0).textContent = det.atividade;
        linhaDetalhes.insertCell(1).textContent = det.data;
    });

    // Exibe o modal
    modal.style.display = 'block';
}

// Fechar o modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    var modal = document.getElementById('modalDetalhes');
    modal.style.display = 'none';
}

// Fechar o modal ao clicar fora dele
window.onclick = function(event) {
    var modal = document.getElementById('modalDetalhes');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('novoPaciente').addEventListener('click', function() {
    // Adicionar a lógica para ir para a tela de cadastro de novo paciente
});


document.getElementById('novoPaciente').addEventListener('click', function() {
    window.location.href = 'cadastroPaciente.html'; // Substitua pelo caminho correto
});

document.getElementById('home').addEventListener('click', function() {
    window.location.href = 'home.html'; // Substitua 'index.html' pelo caminho correto para a sua página inicial
});

document.getElementById('voltar').addEventListener('click', function() {
    window.history.back(); // Isso fará o navegador voltar para a página anterior
    // Ou use window.location.href para direcionar a uma página específica
});

