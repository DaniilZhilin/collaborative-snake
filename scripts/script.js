var FIELD_SIZE_X = 10;
var FIELD_SIZE_Y = 10;
var SPEED = 500;

var score = 0;
var direction = 'right';

var snake = [];
var snakeX = 0;
var snakeY = 0;
var gameField;
function init() {
  console.log('start!');
  createField();
  keyHandler();
  createSnake();
}

function createField() {
  var field = document.querySelector('#field');

  var table = document.createElement('table');
  table.classList.add('table');
  table.id = 'table';

  for(var i = 0; i < FIELD_SIZE_Y; i++) {
    var row = document.createElement('tr');
    for(var j = 0; j < FIELD_SIZE_X; j++) {
      var cell = document.createElement('td');
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  field.appendChild(table);
  gameField = table;
}

function createSnake() {
  var head = gameField.children[snakeY].children[snakeX + 1];
  head.classList.add('snake-cell');
  var tail = gameField.children[snakeY].children[snakeX];
  tail.classList.add('snake-cell');

  snake = [{x: snakeX + 1, y: snakeY}, {x: snakeX, y: snakeY}];
  setInterval(move, SPEED);
}

function move() {
  // snake
  var newCoord;
  switch (direction) {
    case 'right':
      newCoord = snake.map(function (item, i, snake) {
        return i === 0 ?
          { x: item.x + 1, y: item.y} :
          { x: snake[i-1].x , y: snake[i-1].y }
      })
      break;
    case 'down':
      newCoord = snake.map(function (item, i, snake) {
        return i === 0 ?
          { x: item.x, y: item.y + 1} :
          { x: snake[i-1].x , y: snake[i-1].y }
      })
      break;
    case 'up':
      newCoord = snake.map(function (item, i, snake) {
        return i === 0 ?
        { x: item.x, y: item.y - 1} :
        { x: snake[i-1].x , y: snake[i-1].y }
      })
      break;
    case 'left':
      newCoord = snake.map(function (item, i, snake) {
        return i === 0 ?
          { x: item.x - 1, y: item.y} :
          { x: snake[i-1].x , y: snake[i-1].y }
      })
      break;
  }

  snake.forEach(function(item) {
    gameField.children[item.y].children[item.x].classList.remove('snake-cell');
  });
  newCoord.forEach(function(item) {
    gameField.children[item.y].children[item.x].classList.add('snake-cell')
  });
  snake = newCoord;
}

function keyHandler() {
  document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 40:
        direction = 'down';
        break;
      case 39:
        direction = 'right';
        break;
      case 38:
        direction = 'up';
        break;
      case 37:
        direction = 'left';
        break;
    }
  })
}

window.onload = init;

// TODO: 
// Recognise "walls"
// Generate first piece of food
// Generate food after eating
// Snake grows up after eating
// Snake death
// Start game
// Restart game
// Change moving algorithm (we need remove/add class only for head and tail's end)
// 
// Snake v2.0
// Make it "stylish"
// Display score
// Make it configurable
// Speeding time after eating
// Remember highscore
// Deploy somewhere
