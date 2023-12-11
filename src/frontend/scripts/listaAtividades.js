// Adiciona um ouvinte de evento que é acionado quando o conteúdo do DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    // Array de objetos representando atividades
    var atividades = [
        { atividade: 'Jogo da Vaquinha' },
        { atividade: 'Jogo de Arrastar'},
        { atividade: 'Jogo do Pato'},
        { atividade: 'Jogo das Cores' }
    ];

    // Seleciona o corpo da tabela no DOM
    var tabela = document.querySelector('table tbody');
    
    // Itera sobre cada atividade e insere uma linha na tabela para cada uma
    atividades.forEach(function(atividade) {
        var linha = tabela.insertRow(); // Insere uma nova linha na tabela
        linha.addEventListener('click', function() { mostrarDetalhes(atividade); }); // Adiciona um ouvinte de evento para mostrar detalhes ao clicar
        linha.insertCell(0).textContent = atividade.atividade; // Insere o nome da atividade na linha da tabela
    });
});

// Função para mostrar detalhes de uma atividade em um modal
function mostrarDetalhes(atividade) {
    var modal = document.getElementById('modalDetalhes'); // Seleciona o modal no DOM
    var tabelaDetalhes = document.getElementById('tabelaDetalhes').querySelector('tbody');

    tabelaDetalhes.innerHTML = ''; // Limpa a tabela de detalhes no modal

    // Aqui você pode inserir os detalhes específicos da atividade
    // Exemplo de detalhes fictícios:
    var detalhes = [
        { detalhe: "Elena Castro", data: "2023-01-01" },
        { detalhe: "Lucas Matos", data: "2023-02-01" }
    ];

    detalhes.forEach(function(det) {
        var linhaDetalhes = tabelaDetalhes.insertRow();
        linhaDetalhes.insertCell(0).textContent = det.detalhe; // Insere o detalhe na linha da tabela de detalhes
        linhaDetalhes.insertCell(1).textContent = det.data; // Insere a data na linha da tabela de detalhes
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
document.getElementById('novaAtividade').addEventListener('click', function() {
    window.location.href = 'codigo.html'; // Redireciona para a página de cadastro de novo Atividade
});

document.getElementById('home').addEventListener('click', function() {
    window.location.href = 'home.html'; // Redireciona para a página inicial
});

document.getElementById('voltar').addEventListener('click', function() {
    window.history.back(); // Volta para a página anterior no histórico de navegação
});
