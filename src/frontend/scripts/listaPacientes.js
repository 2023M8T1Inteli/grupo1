// Adiciona um ouvinte de evento que é acionado quando o conteúdo do DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    // Array de objetos representando pacientes
    var pacientes = [
        // Cada objeto contém detalhes de um paciente
        { nome: 'Elena Fernandes', idade: '10', dificuldade: 'Dificuldade A', grau: '2', email: ' elenafernandes@gmail.com', telefone: '(11) 92566-6331' },
        { nome: 'Isabela Pereira', idade: '12', dificuldade: 'Dificuldade B', grau: '3', email: 'isabelapereira@gmail.com', telefone: '(11) 94621-5213' },
        { nome: 'João Neves', idade: '9', dificuldade: 'Dificuldade C', grau: '4', email: 'joãoneves@gmail.com', telefone: '(11) 99344-7780' },
        { nome: 'Maria Mota', idade: '14', dificuldade: 'Dificuldade D', grau: '5', email: 'mariamota@gmail.com', telefone: '(11) 92218-2009' },
        { nome: 'Felipe Castro', idade: '11', dificuldade: 'Dificuldade E', grau: '1', email: 'felipecastro@gmail.com', telefone: '(11) 94621-5215' }
    ];

    // Seleciona o corpo da tabela no DOM
    var tabela = document.querySelector('table tbody');
    
    // Itera sobre cada paciente e insere uma linha na tabela para cada um
    pacientes.forEach(function(paciente) {
        var linha = tabela.insertRow(); // Insere uma nova linha na tabela
        linha.addEventListener('click', function() { mostrarDetalhes(paciente); }); // Adiciona um ouvinte de evento para mostrar detalhes ao clicar
        // Insere cada detalhe do paciente como uma célula na linha da tabela
        linha.insertCell(0).textContent = paciente.nome;
        linha.insertCell(1).textContent = paciente.idade;
        linha.insertCell(2).textContent = paciente.dificuldade;
        linha.insertCell(3).textContent = paciente.grau;
        linha.insertCell(4).textContent = paciente.email;
        linha.insertCell(5).textContent = paciente.telefone;
    });
});

// Função para mostrar detalhes de um paciente em um modal
function mostrarDetalhes(paciente) {
    var modal = document.getElementById('modalDetalhes'); // Seleciona o modal no DOM
    var tabelaDetalhes = document.getElementById('tabelaDetalhes').querySelector('tbody');

    tabelaDetalhes.innerHTML = ''; // Limpa a tabela de detalhes no modal

    // Array de detalhes fictícios para exemplificar
    var detalhes = [
        { atividade: "Exemplo de Atividade 1", data: "2023-01-01" },
        { atividade: "Exemplo de Atividade 2", data: "2023-02-01" }
    ];

    // Insere cada detalhe na tabela de detalhes
    detalhes.forEach(function(det) {
        var linhaDetalhes = tabelaDetalhes.insertRow();
        linhaDetalhes.insertCell(0).textContent = det.atividade;
        linhaDetalhes.insertCell(1).textContent = det.data;
    });

    modal.style.display = 'block'; // Exibe o modal
}

// Configuração para fechar o modal
var span = document.getElementsByClassName("close")[0]; // Seleciona o botão de fechar
span.onclick = function() {
    var modal = document.getElementById('modalDetalhes');
    modal.style.display = 'none'; // Fecha o modal ao clicar no botão de fechar
}

// Configuração para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    var modal = document.getElementById('modalDetalhes');
    if (event.target == modal) {
        modal.style.display = 'none'; // Fecha o modal ao clicar fora dele
    }
}

// Adiciona ouvintes de eventos aos botões para navegação
document.getElementById('novoPaciente').addEventListener('click', function() {
    window.location.href = 'cadastroPaciente.html'; // Redireciona para a página de cadastro de novo paciente
});

document.getElementById('home').addEventListener('click', function() {
    window.location.href = 'home.html'; // Redireciona para a página inicial
});

document.getElementById('voltar').addEventListener('click', function() {
    window.history.back(); // Volta para a página anterior no histórico de navegação
});
