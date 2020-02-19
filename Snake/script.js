const snake = {
    size: 1,
    direction: 'right',
    position: [25],
}

const ROW_SIZE = 7;
const FIELD = new Array(ROW_SIZE * ROW_SIZE);
let gameSpeed = 500;
let nextTile;
let gameInterval = null;
let moves = 0;


document.onkeypress = (event) => {
    switch (event.keyCode) {
        case '97':
            snake.direction = snake.direction == 'right' ? 'right' : 'left';
            break;
        case '100':
            snake.direction = snake.direction == 'left' ? 'left' : 'right';
            break;
        case '115':
            snake.direction = snake.direction == 'up' ? 'up' : 'down';
            break;
        case '119':
            snake.direction = snake.direction == 'down' ? 'down' : 'up';
            break;
    }
}

let field = document.querySelector('.field');
for (let i = 0, n = FIELD.length; i < n; i++) {
    let node = document.createElement('div');
    field.appendChild(node);
}
//console.dir(field);


const renderSnake = () => {

}

const gameOver = () => {
    clearInterval(gameInterval);
    // OUTPUT GAME OVER
}

const generateFood = () => {
    while(true) {
        let position = Math.floor(Math.random() * ROW_SIZE * ROW_SIZE);
        if (!snake.position[position]) break;
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
    if (nextTile == snake.position[snake.size - 1]) gameOver();
}

const checkFood = () => {
    return nextTile == food
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
    checkDirection();
    changePosition();
    moves++;
    renderSnake();

}

const GameIsOn = () => {
    generateFood();
    renderSnake();
    gameInterval = setInterval(Move, gameSpeed);
 }

