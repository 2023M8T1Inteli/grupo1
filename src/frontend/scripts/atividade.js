var startPressionado = false; // Variável para rastrear se o botão Start foi pressionado

function adicionarCorAoCenario(cor) {
    if (!startPressionado) {
        return; // Se o botão Start não foi pressionado, não faz nada
    }

    if (cor === 'red') {
        alert('Resposta correta!');
    } else {
        alert('Resposta incorreta!');
    }
}

// Função para lidar com o clique no botão Start
function verificarStartPressionado() {
    startPressionado = true; // Atualiza a variável quando o botão Start é pressionado
    alert('Início da atividade!');
}

// Adiciona os event listeners aos elementos do tapete de cores após o carregamento da página.
document.addEventListener('DOMContentLoaded', function() {
    var cores = document.querySelectorAll('.tapete-cor');
    cores.forEach(function(cor) {
        cor.addEventListener('click', function() {
            adicionarCorAoCenario(this.getAttribute('data-cor'));
        });
    });

    // Vinculando o botão Start
    var botaoStart = document.getElementById('start-button');
    if (botaoStart) {
        botaoStart.addEventListener('click', verificarStartPressionado);
    }
});

function clicarCenario() {
    // Inicialização do cenário, se necessário.
}

// Outras funções necessárias para o script podem ser adicionadas aqui.
