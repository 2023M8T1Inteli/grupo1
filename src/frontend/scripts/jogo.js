var wrongAnswerModal = document.getElementById('wrong-answer-modal')
var rightAnswerModal = document.getElementById('right-answer-modal')

var options = document.getElementsByClassName('tapete-cor')

var playAgain = document.getElementsByClassName('play-again')

for (let i = 0; i < options.length; i++) {
  let option = options[i]

  if (option.getAttribute('data-cor') == 'red') {
    option.onclick()
  }
}

playAgain.forEach(btn => {
  btn.onclick = function () {
    modal.style.display = 'none'
  }
})

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}
