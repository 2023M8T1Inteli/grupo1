var descreverCores = false

// Função que mostra a descrição das cores
function altoContraste() {
  let descritoresList = document.getElementsByClassName("descritorCor");
  // Ligar a descrição das cores
  if(document.getElementById("botaoAltoContraste").style.backgroundColor != 'lightgreen'){
    document.getElementById("botaoAltoContraste").style.backgroundColor = 'lightgreen'
    document.getElementById("botaoAltoContraste").innerHTML = 'Descritivo Cores (Ligado)'
    for (var i=0;i<descritoresList.length;i+=1){
      descritoresList[i].style.display = 'block';
    }
    descreverCores = true
  } else { // Desliga a descrição das cores
    document.getElementById("botaoAltoContraste").style.backgroundColor = 'lightgray'
    document.getElementById("botaoAltoContraste").innerHTML = 'Descritivo Cores'
    document.getElementById('bloco-cor').innerHTML = ''
    for (var i=0;i<descritoresList.length;i+=1){
      descritoresList[i].style.display = 'none';
    }
    descreverCores = false
  }
}

// Função para trocar a tab editor e cenário
function trocarTab(evt, tab) {
  const tabcontents = document.getElementsByClassName("tabcontent");
  for (const content of tabcontents) {
    content.style.display = "none";
  }

  const tabbuttons = document.getElementsByClassName("tabbutton");
  for (const button of tabbuttons) {
    button.classList.remove("active");
  }

  const selectedTab = document.getElementById(tab);
  if (selectedTab) {
    selectedTab.style.display = "block";
    evt.currentTarget.classList.add("active");
  }
}

function clicarCenario() {
  document.getElementById("botaoCanvas").click();
}

let offsetX, offsetY;

function adicionarImagem(opcao) {
  var imagens = {
    alimentacao: 'x.jpg',
    maca: 'https://static.arasaac.org/pictograms/2462/2462_300.png',
    banana: 'https://static.arasaac.org/pictograms/2530/2530_300.png',
    cristianismo: 'https://static.arasaac.org/pictograms/38730/38730_300.png',
    judaismo: 'https://static.arasaac.org/pictograms/22795/22795_300.png',
    futebol: 'https://static.arasaac.org/pictograms/7137/7137_300.png',
    volei: 'https://static.arasaac.org/pictograms/10167/10167_300.png',
    peixe: 'https://static.arasaac.org/pictograms/2520/2520_300.png',
    rato: 'https://static.arasaac.org/pictograms/2546/2546_300.png',
    arvore: 'https://static.arasaac.org/pictograms/3057/3057_300.png',
    flor:'https://static.arasaac.org/pictograms/7104/7104_300.png',
    bicicleta: 'https://static.arasaac.org/pictograms/6935/6935_300.png',
    carro: 'https://static.arasaac.org/pictograms/2339/2339_300.png',
    natal: 'https://static.arasaac.org/pictograms/3092/3092_300.png',
    pascoa: 'https://static.arasaac.org/pictograms/37453/37453_300.png',
    verde: 'https://static.arasaac.org/pictograms/4887/4887_300.png',
    roxo: 'https://static.arasaac.org/pictograms/2907/2907_300.png',
    medico: 'https://static.arasaac.org/pictograms/2467/2467_300.png',
    professor: 'https://static.arasaac.org/pictograms/2457/2457_300.png',
    guitarra: 'https://static.arasaac.org/pictograms/8599/8599_300.png',
    violino: 'https://static.arasaac.org/pictograms/2615/2615_300.png'

    // Adicione todas as outras imagens aqui
  };
  
  // Se uma opção válida foi selecionada (não vazia), adicione a imagem
  if (opcao && imagens[opcao]) {
    var img = document.createElement('img');
    img.src = imagens[opcao];
    img.alt = opcao;
    img.style.width = '100px'; // Defina o tamanho conforme necessário
    img.style.height = 'auto';
    
    var container = document.getElementById('canvas'); // Adicionando ao elemento 'canvas'
    container.appendChild(img);
  }
}


onDragStart = function(ev) {
  const rect = ev.target.getBoundingClientRect();
  offsetX = ev.clientX - rect.x;
  offsetY = ev.clientY - rect.y;

  ev.dataTransfer.setData("text/plain", ev.target.id);
};

drop_handler = function(ev) {
  ev.preventDefault();

  const left = parseInt(canvas.style.left);
  const top = parseInt(canvas.style.top);

  const canvasStyle = window.getComputedStyle(canvas);
  const canvasLeft = parseInt(canvasStyle.left);
  const canvasTop = parseInt(canvasStyle.top);

  const draggedItemId = ev.dataTransfer.getData("text/plain");
  const draggedItem = document.getElementById(draggedItemId);

  if (draggedItem) {
    draggedItem.classList.add('comandoTapete');
    draggedItem.style.left = ev.clientX - canvasLeft - offsetX + 'px';
    draggedItem.style.top = ev.clientY - canvasTop - offsetY + 'px';
    canvas.appendChild(draggedItem);
  }
};

dragover_handler = function(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
};

/* O restante do JavaScript permanece o mesmo */

function adicionarImagemAoCenario(src) {
  var imagem = document.getElementById('bloco-imagem');
  if (imagem) {
    imagem.style.backgroundImage = 'url(' + src + ')';
    imagem.style.backgroundSize = 'cover';
    imagem.style.backgroundPosition = 'center';
    imagem.innerHTML = ''; // Limpar o texto padrão
  }
}

function adicionarCorAoCenario(cor) {
  var corBloco = document.getElementById('bloco-cor');
  if (corBloco) {
    if(cor == 'red'){
      corBloco.style.backgroundColor = '#ad0000';
    } else {
      corBloco.style.backgroundColor = cor;
    }
    if (descreverCores){
      if(cor == 'yellow'){
        document.getElementById("bloco-cor").style.color = 'black';
      } else {
        document.getElementById("bloco-cor").style.color = 'white'
      }
      document.getElementById('bloco-cor').innerHTML = cor;
    }

  }
}

// Atualize a função adicionarImagem para chamar adicionarImagemAoCenario
function adicionarImagem(opcao) {
  var imagens = {
    alimentacao: 'x.jpg',
    maca: 'https://static.arasaac.org/pictograms/2462/2462_300.png',
    banana: 'https://static.arasaac.org/pictograms/2530/2530_300.png',
    cristianismo: 'https://static.arasaac.org/pictograms/38730/38730_300.png',
    judaismo: 'https://static.arasaac.org/pictograms/22795/22795_300.png',
    futebol: 'https://static.arasaac.org/pictograms/7137/7137_300.png',
    volei: 'https://static.arasaac.org/pictograms/10167/10167_300.png',
    peixe: 'https://static.arasaac.org/pictograms/2520/2520_300.png',
    rato: 'https://static.arasaac.org/pictograms/2546/2546_300.png',
    arvore: 'https://static.arasaac.org/pictograms/3057/3057_300.png',
    flor:'https://static.arasaac.org/pictograms/7104/7104_300.png',
    bicicleta: 'https://static.arasaac.org/pictograms/6935/6935_300.png',
    carro: 'https://static.arasaac.org/pictograms/2339/2339_300.png',
    natal: 'https://static.arasaac.org/pictograms/3092/3092_300.png',
    pascoa: 'https://static.arasaac.org/pictograms/37453/37453_300.png',
    verde: 'https://static.arasaac.org/pictograms/4887/4887_300.png',
    roxo: 'https://static.arasaac.org/pictograms/2907/2907_300.png',
    medico: 'https://static.arasaac.org/pictograms/2467/2467_300.png',
    professor: 'https://static.arasaac.org/pictograms/2457/2457_300.png',
    guitarra: 'https://static.arasaac.org/pictograms/8599/8599_300.png',
    violino: 'https://static.arasaac.org/pictograms/2615/2615_300.png'
  };
  
  if (imagens[opcao]) {
    adicionarImagemAoCenario(imagens[opcao]);
  }
}

// Atualize os eventos de clique para passar a cor corretamente
document.querySelectorAll('.tapete-cor').forEach(function(corDiv) {
  corDiv.addEventListener('click', function() {
    var cor = corDiv.getAttribute('data-cor'); // Obtenha a cor a partir do atributo data-cor
    adicionarCorAoCenario(cor);
  });
});


document.querySelectorAll('[data-tooltip]').forEach(element => {
  let timeoutId;

  element.addEventListener('mouseover', () => {
      timeoutId = setTimeout(() => {
          element.removeAttribute('data-tooltip'); // Remove o atributo para esconder o tooltip
      }, 3000); // 3000 milissegundos = 3 segundos
  });

  element.addEventListener('mouseout', () => {
      clearTimeout(timeoutId); // Cancela o timeout se o mouse sair antes de 3 segundos
      element.setAttribute('data-tooltip', element.dataset.originalTooltip); // Restaura o tooltip
  });
});
