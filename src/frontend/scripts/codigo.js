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
