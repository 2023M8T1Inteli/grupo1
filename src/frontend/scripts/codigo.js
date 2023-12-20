let descreverCores = false;
let active = 0

function altoContraste() {
  let descritoresList = document.getElementsByClassName("descritorCor");

  // Alterna entre ligar e desligar a descrição das cores
  descreverCores = !descreverCores;

  if (descreverCores) { // Ligar a descrição das cores
    document.getElementById("botaoAltoContraste").style.backgroundColor = 'lightgreen'
    document.getElementById("botaoAltoContraste").innerHTML = 'Descritivo Cores (Ligado)';
    for (var i = 0; i < descritoresList.length; i += 1) {
      descritoresList[i].style.display = 'block';
    }
  } else { // Desliga a descrição das cores
    document.getElementById("botaoAltoContraste").style.backgroundColor = 'lightgray'
    document.getElementById("botaoAltoContraste").innerHTML = 'Descritivo Cores';
    // document.getElementsByClassName('descritorCor').innerHTML = '';

    // Remover a exibição dos descritores de cor
    for (var i = 0; i < descritoresList.length; i += 1) {
      descritoresList[i].style.display = 'none';
    }
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

// Função para trocar a tab editor e cenário
function clicarCenario() {
  document.getElementById("botaoCanvas").click();
}

let offsetX, offsetY;

// Função que aplica uma imagem existente ao cenário 
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
    active = 1;
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

// Função que faz a imagem do upload ir para o campo no cenário
function adicionarImagemAoCenario(src) {
  var imagem = document.getElementById('bloco-imagem');
  if (imagem) {
    imagem.style.backgroundImage = 'url(' + src + ')';
    imagem.style.backgroundSize = 'cover';
    imagem.style.backgroundPosition = 'center';
    imagem.innerHTML = ''; // Limpar o texto padrão
  }
}

// Função que possibilita o arrasto de cores ao cenário 
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


// Comando que faz com que a imagem do upload apareça previamente
function previewImages() {
  var container = document.getElementById('container');
  var infoBox = document.querySelector('.info-box');
  var filesInput = document.getElementById('files');

  container.innerHTML = ''; // Limpa o conteúdo anterior

  var files = filesInput.files;

  if (files.length === 0) {
    infoBox.textContent = 'Empty';
    return;
  }

  infoBox.textContent = files.length + ' image(s) selected';

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var reader = new FileReader();

    reader.onload = function (e) {
      let img = document.createElement('img');
      img.src = e.target.result;
      img.draggable = true;
      img.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', 'dragging'); // Define dados de arrastar
      });
      container.appendChild(img);

      // Enviar a imagem para o servidor usando fetch
      sendImageToServer(file);
      container.appendChild(img);

    };
    reader.readAsDataURL(file);
  }

  // Criar uma cópia da entrada de arquivo
  var filesInputClone = filesInput.cloneNode(true);

  // Substituir a entrada original pela cópia
  filesInput.parentNode.replaceChild(filesInputClone, filesInput);

  // Resetar o valor da cópia
  filesInputClone.value = '';
}

function sendImageToServer(imageFile) {
  var formData = new FormData();
  formData.append('file', imageFile, imageFile.name); // Usar a chave 'file' aqui

  fetch('http://localhost:3000/up-image', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Resposta do servidor:', data);
    })
    .catch(error => {
      console.error('Erro ao enviar a foto:', error);
    });


function allowDrop(event) {
  event.preventDefault();
}

function dropImage(event) {}
  event.preventDefault();
  var data = event.dataTransfer.getData('text/plain');
  if (data === 'dragging') {
    var img = document.createElement('img');
    img.src = event.dataTransfer.getData('URL');
    img.draggable = true;
    img.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text/plain', 'dragging');
    });
    event.target.appendChild(img);
  }
}

function dropImage(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData('text/plain');
  if (data === 'dragging') {
    var img = document.createElement('img');
    img.src = event.dataTransfer.getData('URL');
    img.draggable = true;
    img.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text/plain', 'dragging');
    });
    event.target.appendChild(img);
  }
}

function redirecionarParaOutraPagina() {
  // Verificar se o campo de imagem está preenchido
  const blocoImagem = document.getElementById('bloco-imagem');
  const conteudoImagem = blocoImagem.textContent || blocoImagem.innerText;

  if (ativadoo > 0) {
    window.location.href = 'jogo.html';
  } else {
    // Se o campo de imagem não estiver preenchido, exibir mensagem ou realizar outra ação
    openFeedbackModal();
  }
}


// Lógica do modal de feedback
document.addEventListener('DOMContentLoaded', function () {
  const feedbackModal = document.getElementById('feedbackModal');
  const closeButton = document.querySelector('.close');

  closeButton.addEventListener('click', closeFeedbackModal);

  window.addEventListener('click', function (event) {
    if (event.target == feedbackModal) {
      closeFeedbackModal();
    }
  });
});

// Função que abre o modal de erro ao tentar acessar o jogo sem fazer os preenchimentos
function openFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'block';
}

// Função que faz com que o modal de erro seja fechado
function closeFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'none';
}

function displayImage(base64String) {
  var container = document.getElementById('container');
  
  // Limpa a div container
  container.innerHTML = '';

  // Exibe a imagem na div container
  var img = document.createElement('img');
  img.src = 'data:image/png;base64,' + base64String; // Assumindo que o formato da imagem é PNG
  container.appendChild(img);
}

// // Função para fazer a solicitação GET ao endpoint
// function fetchData() {
//   fetch('http://localhost:3000/up-image')
//     .then(response => response.json())
//     .then(data => {
//       if (data.status === 'Ok!' && data.result.length === 1) {
//         // Se houver exatamente 1 elemento no array 'result', exibe a imagem
//         displayImage(data.result[0].foto);
//       } else {
//         console.log('Nenhum dado encontrado ou mais de um elemento no array "result".');
//       }
//     })
//     .catch(error => {
//       console.error('Erro ao buscar dados:', error);
//     });
// }

// Chama a função fetchData ao carregar a página
// window.onload = fetchData();