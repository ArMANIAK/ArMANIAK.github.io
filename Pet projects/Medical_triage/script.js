

class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tilesSizeX = width / this.TILES_ON_X - 0.05;
        this.tilesSizeY = height / this.TILES_ON_Y - 0.05;
        this.gameBoard = new Array(this.TILES_ON_X * this.TILES_ON_Y);
    }

    TILES_ON_X = 8;
    TILES_ON_Y = 7;
    MAX_VICTIM_COUNT = 20;
    MAX_PLAYERS_CHARACTERS_COUNT = 5;
    tiles = [];
    victims = [];
    players = [];
}

Board.prototype.fillBoardWithTiles = function (field) {
    console.log('filling');
    for (let i = 0; i < this.TILES_ON_X * this.TILES_ON_Y; i++) {
        let displayedTile = document.createElement('div');
        displayedTile.className = 'tile';
        displayedTile.style.width = this.tilesSizeX + 'px';
        displayedTile.style.height = this.tilesSizeY + 'px';
        field.appendChild(displayedTile);
        let logicTile = new Tile();
        if (this.victims.length < this.MAX_VICTIM_COUNT && Math.random() < this.MAX_VICTIM_COUNT / (this.TILES_ON_X * this.TILES_ON_Y)) {
            this.victims.push(new NPC());
            displayedTile.classList.add('victimized');
        }
    }
}

class Tile {
    constructor(isService = false, isVisible = false) {
        this.isVisible = isVisible;
        this.isService = this.isService;
    }
    playersOnTile = [];
    NPCOnTile = [];
}

class Person {}

Person.prototype.move = function (direction) {}

class NPC extends Person {
    constructor() {super()}
    diagnosis;
    isAbleToMove;
}

const boardBlock = document.querySelector('#board');

const board = new Board(boardBlock.scrollWidth, boardBlock.scrollHeight)
board.fillBoardWithTiles(boardBlock);