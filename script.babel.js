let turn = 0; // Keeps track if X or O player's turn
let winner = false;
let scoreX=0
let scoreY=0

window.addEventListener('load', app);
const player = (name) => {
  name = name;
  return {name};
 };

 let playerX = player("");
 let playerY = player("");
function app() {
  let inputField = document.querySelector('.input-field').focus();

  const addPlayerForm = document.getElementById('player-form');
  addPlayerForm.addEventListener('submit', addPlayers);

  let replayButton = document.querySelector('.replay-btn');
  replayButton.addEventListener('click', resetBoard);
}
function resetBoard(){}

// Add PLAYERS
function addPlayers(event) {
  event.preventDefault();

  if ( this.player1.value === '' || this.player2.value === '') {
    alert('You Must Enter a Name for Each Field');
    return;
  }

  const playerFormContainer = document.querySelector('.enter-players');
  const boardMain = document.querySelector('.juego');
  playerFormContainer.classList.add('hidden');
  boardMain.classList.remove('hidden');
  

  playerX.name = this.player1.value; 
  playerY.name = this.player2.value;
  changeBoardHeaderNames()
  

}


var cardsArray = [{
  'name': 'shell',
  'img': 'img/blueshell.png'
}, {
  'name': 'star',
  'img': 'img/star.png'
}, {
  'name': 'bobomb',
  'img': 'img/bobomb.png'
}, {
  'name': 'mario',
  'img': 'img/mario.png'
}, {
  'name': 'luigi',
  'img': 'img/luigi.png'
}, {
  'name': 'peach',
  'img': 'img/peach.png'
}, {
  'name': '1up',
  'img': 'img/1up.png'
}, {
  'name': 'mushroom',
  'img': 'img/mushroom.png'
}, {
  'name': 'thwomp',
  'img': 'img/thwomp.png'
}, {
  'name': 'bulletbill',
  'img': 'img/bulletbill.png'
}, {
  'name': 'coin',
  'img': 'img/coin.png'
}, {
  'name': 'goomba',
  'img': 'img/goomba.png'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function (a,b) {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
 if (turn%2===0){scoreX++}else{scoreY++}
  turn ++;
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });

  changeBoardHeaderNames()
};

var resetGuesses = function resetGuesses() {
  turn ++;
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
    
    changeBoardHeaderNames()
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
function currentPlayer() {
  return turn % 2 === 0 ? playerX.name  : playerY.name;
}
function changeBoardHeaderNames() {
  console.log(scoreX+scoreY)
  if (scoreX+scoreY<12) {
    let currentPlayerScore = document.querySelector('.board___player-score');  
    currentPlayerScore.innerHTML = `<span class="name--style">${playerX.name}:${scoreX}---${playerY.name}:${scoreY}</span>`
  let currentPlayerText = document.querySelector('.board___player-turn');
    if (currentPlayer() === playerX.name) {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerX.name}</span>, you are up!`
    }  else {
      currentPlayerText.innerHTML = `
        <span class="name--style">${playerY.name}</span>, you are up.`
    }
  }
  else 
  { let currentPlayerScore = document.querySelector('.board___player-score');  
  currentPlayerScore.innerHTML = `<span class="name--style">${playerX.name}:${scoreX}---${playerY.name}:${scoreY}</span>`
  let currentPlayerText = document.querySelector('.board___player-turn')
  if(scoreX>scoreY){
  currentPlayerText.innerHTML = `
  <span class="name--style">${playerX.name}</span>, eres el ganador!`}

  else if(scoreX<scoreY){
    currentPlayerText.innerHTML = `
    <span class="name--style">${playerY.name}</span>, eres el ganador! `}
    else {
      currentPlayerText.innerHTML = `
      <span class="name--style">${playerY.name}-- ${playerY.name}</span>, han empatado! `}
    
    }}

