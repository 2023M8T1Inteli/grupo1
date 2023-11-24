var wrongAnswerModal = document.getElementById('wrong-answer-modal')
var rightAnswerModal = document.getElementById('right-answer-modal')

var options = document.getElementsByClassName('tapete-cor')

var playAgain = document.getElementsByClassName('play-again')

const overlay = document.getElementById('overlay')

const exitBtn = document.getElementById('sair')

for (let i = 0; i < options.length; i++) {
  let option = options[i]

  if (option.getAttribute('data-cor') == 'red') {
    option.addEventListener('click', function () {
      rightAnswerModal.style.display = 'block'
      overlay.style.display = 'block'
    })
  } else {
    option.addEventListener('click', function () {
      wrongAnswerModal.style.display = 'block'
      overlay.style.display = 'block'
    })
  }
}

for (let i = 0; i < playAgain.length; i++) {
  let btn = playAgain[i]

  btn.addEventListener('click', function () {
    rightAnswerModal.style.display = 'none'
    wrongAnswerModal.style.display = 'none'
    overlay.style.display = 'none'
  })
}

exitBtn.addEventListener('click', function () {
  window.location.href = './codigo.html'
})
