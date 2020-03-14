//
//                          Prototyping process
//
//          To-Do
//    1. Rendering map
//       1.1. Building an array of tiles
//       1.2. Checking whether within borders
//       1.3. Calculating and rendering from the center of the map
//    2. Placement and movement of the character
//    3. Interaction with objects and characters
//    4. Skills
//    5. Stats and Level-upping
//    6. Generating objects
//    7. Generating characters
//    8. Day-night cycle
//    9. Global and local Maps
//   10. Inventory
//   11. Using items
//
//

'use strict'

const TILE_SIZE = 75;

const INFECTING_CHANCE = 0.5;

const INFECTION_DEADLINESS = 0.3;

const MEDICINE_EFFECTIVNESS = 0.7;

const LANDSCAPE_TYPES = [
    'forest',
    'sand',
    'rock',
    'mountain',
    'water',
    'field',
    'deep_water',
];
const MAP = [
    ['deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'rock', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'forest', 'forest', 'sand', 'forest', 'forest', 'forest', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'rock', 'rock', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'rock', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'rock', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'rock', 'sand', 'rock', 'sand', 'forest', 'forest', 'forest', 'sand', 'forest', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'rock', 'sand', 'sand', 'sand', 'forest', 'forest', 'forest', 'forest', 'forest', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'sand', 'sand', 'sand', 'rock', 'rock', 'sand', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water'],
    ['deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water', 'deep_water'],
];

const DIRECTIONS = [
    'left',
    'right',
    'up',
    'down',
]

class Tile {
    constructor(type = 'deep_water') { 
        this.filled = null;
        this.landscape = type;
        this.hazardous = 0.5;
        this.populatinDensity = 0.05;
    }
}

const buildMap = () => {
    let worldMap = new Array;
    for (let y in MAP) {
        let row = new Array;
        for (let x in MAP[y]) {
            let tile = new Tile(MAP[y][x]);
            row.push(tile);
        }
        worldMap.push(row);
    }
    return worldMap;
}

const map = buildMap();

const CHARACTER_TYPE = [
    'hero',
    'infectious',
    'cleaner',
    'clear',
    'panic',
];

const STATISTICS = {
    total: 0,
    infectious: 0,
    clean: 0,
    panic: 0,
    cleaners: 0,
    deaths: 0,
}

class Character {
    constructor(x, y, type = 'clean') {
        this.x_coord = x;
        this.y_coord = y; 
        this.type = 'characters';
        this.view = type;
        this.immunity = 0;
        STATISTICS[type]++;
        STATISTICS.total++;
        map[y][x].filled = JSON.stringify(this);
    }
}

const isSuccess = (chance) => {
    return Math.random() > chance ? true : false;
}

const gameOver = (reason) => {
    aside = '';
    let element = document.createElement('h2');
    element.innerText = 'Игра окончена! Вы умерли из-за ' + reason + '<br/> Вы стали ' + STATISTICS.deaths + ' жертвой эпидемии';
    aside.appendChild(element);
    renderScreen = null;
}

const checkNearby = (object, x, y) => {    
    console.log('check nearby ' + x + ': ' + y);
    if (map[y][x].filled) {
        let neighbour = JSON.parse(map[y][x].filled);
        if (object.view == 'panic' && neighbour.view == 'infectious') {
            if (isSuccess(1 - object.immunity)) {
                STATISTICS.total--;
                STATISTICS.infectious--;
                STATISTICS.deaths++;
                map[y][x].filled = null;
                if (x == hero.x_coord && y == hero.y_coord) gameOver('паники');
                return;
            }
        }
        if ((object.view == 'clean' || object.view == 'panic') && neighbour.view == 'infectious') {
            if (isSuccess(INFECTING_CHANCE * (1 - object.immunity))) {
                STATISTICS.clean--;
                STATISTICS.infectious++;
                object.view = 'infectious';
            }
        }
        if (object.view == 'cleaner' && neighbour.view == 'infectious') {
            if (isSuccess(1 - MEDICINE_EFFECTIVNESS)) {
                STATISTICS.clean++;
                STATISTICS.infectious--;
                neighbour.view = 'infectious';
            }
        }
        map[y][x].filled = JSON.stringify(neighbour);
    }
}

const testPerson = (x, y) => {
    console.log('test person ' + x + ': ' + y);
    let object = JSON.parse(map[y][x].filled);
    if (object.view == 'infectious' && isSuccess(1 - object.immunity)) {
        STATISTICS.clean++;
        STATISTICS.infectious--;
        object.view = 'clean';
    }
    if (object.view == 'infectious' && isSuccess(INFECTION_DEADLINESS)) {
        STATISTICS.deaths++;
        STATISTICS.total--;
        STATISTICS.infectious--;
        map[y][x].filled = null;
        if (x == hero.x_coord && y == hero.y_coord) gameOver('коронавируса');
        return;
    }
    if (object.view == 'clean' && isSuccess((STATISTICS.infectious + STATISTICS.deaths) / STATISTICS.total)) {
        STATISTICS.panic++;
        object.view = 'panic';
    }
    checkNearby(object, parseInt(x) + 1, parseInt(y));
    checkNearby(object, parseInt(x), parseInt(y) + 1);
    map[y][x].filled = JSON.stringify(object);
}

const moveOn = () => {
    for (let row in map) {
        for (let column in map[row]) {
            let tile = map[row][column];
            if (tile.filled) testPerson(column, row);
            if (tile.filled) {
                if (hero.x_coord != column && hero.y_coord != row) {
                    let person = JSON.parse(tile.filled);
                    let direction = DIRECTIONS[Math.floor(Math.random() * 4)];
                    person.move(direction);
                }
            }
        }
    }
}

(function generateChar() {
    for (let row in map) {
        for (let column in map[row]) {
            let tile = map[row][column];
            if (tile.landscape != "deep_water") {
                if (isSuccess(1 - tile.populatinDensity)) {
                    let view;
                    if (isSuccess(1 - tile.hazardous)) {
                        view = 'infectious';
                    }
                    else {
                        view = 'clean';
                    }
                    let char = new Character(column, row, view);
                    tile.filled = JSON.stringify(char);
                }
            }
        }
    }
})();

const checkIndex = (x, y) => {
    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) return new Tile();
    return map[y][x];
}

const mainScreen = document.querySelector('main > div.field');
const aside = document.querySelector('.aside');
const moveControl = document.querySelector('.controls');
const debugChat = document.querySelector('content');
var height = mainScreen.scrollHeight;
var width = mainScreen.scrollWidth;
var x_tiles = Math.floor(width / TILE_SIZE);
var y_tiles = Math.floor(height / TILE_SIZE);  //  defining the quantity of tiles on each axis
debugChat.innerHTML += ('<p>' + x_tiles + 'x' + y_tiles + '</p>');

const renderScreen = (x, y) => {
    mainScreen.innerHTML = '';
    let x_start = x - Math.floor(x_tiles / 2); 
    let x_finish = x_start + x_tiles;
    let y_start = y - Math.floor(y_tiles / 2); 
    let y_finish = y_start + y_tiles;
    for (let i = y_start; i < y_finish; i++) {
        for (let j = x_start; j < x_finish; j++) {
            let tile = checkIndex(j, i);  
            let element = document.createElement('div');
            element.className = 'tile';
            element.style.backgroundSize = 'cover';
            element.style.width = element.style.height = TILE_SIZE + 'px';
            element.style.backgroundImage = 'url(resources/img/bg/' + tile.landscape + '.svg)';
            if (tile.filled) {
                let object = JSON.parse(tile.filled);
                let object_image = document.createElement('img');
                object_image.src = 'resources/img/' + object.type + '/' + object.view + '.svg';
                object_image.alt = object.type;
                object_image.height = object_image.width = TILE_SIZE;
                element.appendChild(object_image);
            }
            mainScreen.appendChild(element);
        }
    }
    aside.innerHTML = '';
    for (let prop in STATISTICS) {
        if (typeof prop != 'function') {
            let element = document.createElement('p');
            element.innerText = prop + ': ' + STATISTICS[prop];
            aside.appendChild(element);
        }
    }
}

let viewport_x_center = 3;
let viewport_y_center = 2;  // defining coordinates of the center of the screen
let hero = new Character(3, 2, 'clean');
renderScreen(hero.x_coord, hero.y_coord);

const isTileFilled = (x, y) => {
    return map[y][x].filled;
}

Object.prototype.move = function (direction) {
    let nextTile = {
        x: this.x_coord, 
        y: this.y_coord,
    }
    switch (direction) {
        case 'right':
            nextTile.x++;
            break;
        case 'left':
            nextTile.x--;
            break;
        case 'down':
            nextTile.y++;
            break;
        case 'up':
            nextTile.y--;
            break;
    }
    if (map[nextTile.y][nextTile.x].landscape != 'deep_water') {
        if (!isTileFilled(nextTile.x, nextTile.y)) {
            map[this.y_coord][this.x_coord].filled = null;
            this.x_coord = nextTile.x;
            this.y_coord = nextTile.y;
            map[this.y_coord][this.x_coord].filled = JSON.stringify(this);
        }
    }
}

document.body.addEventListener('keypress', event => {
    moveOn();
    switch (event.keyCode) {
        case 100:
        case 1074:
            hero.move('right');
            break;
        case 97:
        case 1092:
            hero.move('left');
            break;
        case 115:
        case 1099:
            hero.move('down');
            break;
        case 119:
        case 1094:
            hero.move('up');
            break;
    }
    renderScreen(hero.x_coord, hero.y_coord);
});

moveControl.addEventListener('click', function (e) {
    e.stopPropagation();
    moveOn();
    hero.move(e.target.getAttribute('data-direction'));
    renderScreen(hero.x_coord, hero.y_coord);
});

window.onresize = () => {
    height = mainScreen.scrollHeight;
    width = mainScreen.scrollWidth;
    x_tiles = Math.floor(width / TILE_SIZE);
    y_tiles = Math.floor(height / TILE_SIZE);
    renderScreen(hero.x_coord, hero.y_coord);
}