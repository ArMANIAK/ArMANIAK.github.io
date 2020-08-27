let snake;

const GameIsOn = () => {
    snake = {
        size: 1,
        direction: 'right',
        position: [24],
    };
    console.log('game Is on');
    generateFood();
    renderSnake();
    gameInterval = setInterval(Move, gameSpeed);
 }

const ROW_SIZE = 7;
const SIZE = ROW_SIZE * ROW_SIZE;
let gameSpeed = 500;
let nextTile;
let foodPosition;
let gameInterval = null;
let moves = 0;
let points = document.querySelector('.points');


document.onkeypress = (event) => {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 97:
            snake.direction = snake.direction == 'right' ? 'right' : 'left';
            break;
        case 100:
            snake.direction = snake.direction == 'left' ? 'left' : 'right';
            break;
        case 115:
            snake.direction = snake.direction == 'up' ? 'up' : 'down';
            break;
        case 119:
            snake.direction = snake.direction == 'down' ? 'down' : 'up';
            break;
    }
}

let field = document.querySelector('.field');
for (let i = 0; i < SIZE; i++) {
    let node = document.createElement('div');
    field.appendChild(node);
}
let tiles = document.querySelectorAll('.field > *');


const renderSnake = () => {
    for (let i = 0; i < SIZE; i++) {
        if (snake.position.includes(i)) {
            tiles[i].style.visibility = 'visible';
            tiles[i].style.backgroundColor = 'black';
        }
        else if (i == foodPosition) {
            tiles[i].style.visibility = 'visible';
            tiles[i].style.backgroundColor = 'red';
        }
        else tiles[i].style.visibility = 'hidden';
    }
}

const gameOver = () => {
    clearInterval(gameInterval);
    let gameOverAnnouncement = document.createElement('h2');
    gameOverAnnouncement.innerText = 'Game over. You\'ve earned ' + moves + ' points';
    document.querySelector('body').appendChild(gameOverAnnouncement);
}

const generateFood = () => {
    while(true) {
        foodPosition = Math.floor(Math.random() * SIZE);
        if (!snake.position.includes(foodPosition)) break;
    }
}

const checkDirection = () => {
    if (snake.direction == 'up') {
        if (snake.position[0] < 7) gameOver();
        nextTile = snake.position[0] - ROW_SIZE;
    }
    else if (snake.direction == 'down') {
        if (snake.position[0] > 41) gameOver();
        nextTile = snake.position[0] + ROW_SIZE;
    }
    else if (snake.direction == 'right') {
        if ((snake.position[0] + 1) % ROW_SIZE == 0) gameOver();
        nextTile = snake.position[0] + 1;
    }
    else if (snake.direction == 'left') {
        if (snake.position[0] % ROW_SIZE == 0) gameOver();
        nextTile = snake.position[0] - 1;
    }
    if (snake.position.includes(nextTile) && nextTile != snake.position[snake.size - 1]) gameOver();
}

const checkFood = () => {
    return nextTile == foodPosition;
}

const changePosition = () => {
    if (checkFood()) {
        snake.size++;
        generateFood();
    }
    else {
        snake.position.pop(snake.position[snake.size - 1]);
    }
    snake.position.unshift(nextTile);
}

const Move = () => {
    console.log('move activated' + snake.direction);
    checkDirection();
    changePosition();
    points.innerText = "Очки: " + ++moves;
    renderSnake();

}


let button = document.querySelector('.button');
button.onclick = GameIsOn;