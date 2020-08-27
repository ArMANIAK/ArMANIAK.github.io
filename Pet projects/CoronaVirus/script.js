'use strict'

const menu = document.querySelector('.menu');
menu.onclick = function (event) {
    let element = event.target;
    let siblings = element.parentNode.childNodes;
    for (let i = 0, n = siblings.length; i < n; i++) {
        if (siblings[i].className == 'active') {
            siblings[i].className = '';
        }
        element.classList.add('active');
    }
}

const mainScreen = document.querySelector('main > div.field');
const topScreen = document.querySelector('.top');
const aside = document.querySelector('.aside');
const moveControl = document.querySelector('.controls');
const debugChat = document.querySelector('content');

let gameStarted;
var map;
var MAP_SIZE;
var MAP_DENSITY;
var INFECTING_CHANCE = 0.5;
var INFECTION_DEADLINESS = 0.02;
var MEDICAL_STAFF;
var MEDICINE_EFFECTIVNESS;
var TILE_SIZE = 75;
var height;
var width;
var x_tiles;
var y_tiles;
var hero;

const start = document.querySelector('.start');
start.onclick = function (event) {
    gameStarted = true;
    moveControl.style.visibility = 'visible';
    const size = document.querySelector('.size > .active').getAttribute('data-size');
    const density = document.querySelector('.density > .active').getAttribute('data-density');
    const medicine = document.querySelector('.medicine > .active').getAttribute('data-medicine');
    const role = document.querySelector('.role > .active').getAttribute('data-role');
    
    if (size == 'large') MAP_SIZE = 50;
    else if (size == 'medium') MAP_SIZE = 35;
    else MAP_SIZE = 25;
    
    if (density == 'large') MAP_DENSITY = 0.08;
    else if (density == 'medium') MAP_DENSITY = 0.05;
    else MAP_DENSITY = 0.01;

    if (medicine == 'developed') {
        MEDICINE_EFFECTIVNESS = 0.7;
        MEDICAL_STAFF = 0.4;
    }
    else if (medicine == 'developing') {
        MEDICINE_EFFECTIVNESS = 0.4;
        MEDICAL_STAFF = 0.2;
    }
    else {
        MEDICINE_EFFECTIVNESS = 0.1;
        MEDICAL_STAFF = 0;
    }

    map = buildMap(MAP_SIZE);
    hero = new Character (5, 7, role);
    generateChar();
    CalculateScreenSize();
    renderScreen(5, 7);
}

const CalculateScreenSize = () => {
    let main = document.querySelector('main');
    x_tiles = Math.floor(main.offsetWidth / TILE_SIZE);
    y_tiles = Math.floor(main.offsetHeight / TILE_SIZE);
    mainScreen.style.width = x_tiles * TILE_SIZE + 'px';
    mainScreen.style.height = y_tiles * TILE_SIZE + 'px';
    width = x_tiles * TILE_SIZE;
    height = y_tiles * TILE_SIZE;
}


const LANDSCAPE_TYPES = [
    'forest',
    'sand',
    'rock',
    'field',
    'mountain',
    'water',
    'deep_water',
];

const DIRECTIONS = [
    'left',
    'right',
    'up',
    'down',
];

class Tile {
    constructor(type = 'deep_water') { 
        this.filled = null;
        this.landscape = type;
        this.populatinDensity = MAP_DENSITY;
    }
}

const buildMap = (MAP_SIZE) => {
    let worldMap = new Array;
    for (let y = 0; y < MAP_SIZE; y++) {
        let row = new Array;
        if (y < 2 || y > MAP_SIZE - 3) {
            row = new Array(MAP_SIZE).fill(new Tile);
            worldMap.push(row);
            continue;
        }
        else {
            for (let x = 0; x < MAP_SIZE; x++) {
                let tile;
                if (x < 2 || x > MAP_SIZE - 3) {
                    row.push(new Tile);
                }
                else {
                    row.push(new Tile(LANDSCAPE_TYPES[Math.floor(Math.random() * 4)]));
                }
            }
        }
        worldMap.push(row);
    }
    return worldMap;
}

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
    cleaner: 0,
    deaths: 0,
}

class Character {
    constructor(x, y, type = 'clean') {
        this.x_coord = x;
        this.y_coord = y; 
        this.type = 'characters';
        this.view = type;
        this.immunity = 0.6;
        STATISTICS[type]++;
        STATISTICS.total++;
        map[y][x].filled = this;
    }
}

const printStatistics = () => {
    aside.innerHTML = '';
    for (let prop in STATISTICS) {
        if (typeof STATISTICS[prop] != 'function') {
            let element = document.createElement('p');
            element.innerText = prop + ': ' + STATISTICS[prop];
            aside.appendChild(element);
        }
    }
}

const isSuccess = (chance) => {
    return Math.random() > chance ? true : false;
}

const gameOver = (reason) => {
    gameStarted = false;
    mainScreen.innerText = '';
    let element = document.createElement('h2');
    if (reason == 1) {
        element.innerText = 'Эпидемия побеждена ценой ' + STATISTICS.deaths + ' жизней';
    }
    else {
        element.innerHTML = 'Игра окончена! Вы умерли из-за ' + reason + '<br/>Вы стали ' + STATISTICS.deaths + ' жертвой эпидемии';
    }
    mainScreen.appendChild(element);
    printStatistics();
}

const checkNearby = (object, x, y) => {    
    if (map[y][x].filled) {
        let neighbour = map[y][x].filled;

// ПАНИЧЕСКАЯ АТАКА
        if (object.view == 'panic' && neighbour.view == 'infectious') {
            if (isSuccess(1 - (object.immunity - neighbour.immunity))) {
                STATISTICS.total--;
                STATISTICS.infectious--;
                STATISTICS.deaths++;
                map[y][x].filled = null;
                debugChat.innerHTML += ('<p>Еще один человек пал жертвой паники!</p>');
                if (x == hero.x_coord && y == hero.y_coord) gameOver('паники');
                return;
            }
        }
        if (object.view == 'infectious' && neighbour.view == 'panic') {
            if (isSuccess(1 - (neighbour.immunity - object.immunity))) {
                STATISTICS.total--;
                STATISTICS.infectious--;
                STATISTICS.deaths++;
                map[parseInt(object.y_coord)][parseInt(object.x_coord)].filled = null;
                debugChat.innerHTML += ('<p>Еще один человек пал жертвой паники!</p>');
                if (object.x_coord == hero.x_coord && object.y_coord == hero.y_coord) gameOver('паники');
                return;
            }
        }

// ЗАРАЖЕНИЕ
        if ((object.view == 'clean' || object.view == 'panic') && neighbour.view == 'infectious') {
            if (isSuccess(1 - INFECTING_CHANCE * object.immunity)) {
                if (object.view == 'panic') STATISTICS.clean--;
                STATISTICS[object.view]--;
                STATISTICS.infectious++;
                object.view = 'infectious';
                object.immunity = object.immunity < 0.3 ? 0 : object.immunity - 0.3;
                debugChat.innerHTML += ('<p>Зарегистрирован еще один случай заражения коронавирусом</p>');
            }
        }
        if (object.view == 'infectious' && (neighbour.view == 'clean' || neighbour.view == 'panic')) {
            if (isSuccess(1 - INFECTING_CHANCE * neighbour.immunity)) {
                STATISTICS[neighbour.view]--;
                if (neighbour.view == 'panic') STATISTICS.clean--;
                STATISTICS.infectious++;
                neighbour.view = 'infectious';
                neighbour.immunity = neighbour.immunity < 0.3 ? 0 : neighbour.immunity - 0.3;
                debugChat.innerHTML += ('<p>Зарегистрирован еще один случай заражения коронавирусом</p>');
            }
        }

// ПОВЫШЕНИЕ ИММУНИТЕТА ЦКЗ/ВОЗ
        if (object.view == 'cleaner') {
            if (isSuccess(1 - MEDICINE_EFFECTIVNESS)) {
                neighbour.immunity += 0.1;
            }
        }
        if (object.view == 'infectious' && neighbour.view == 'cleaner') {
            if (isSuccess(1 - MEDICINE_EFFECTIVNESS)) {
                object.immunity += 0.1;
            }
        }

// ИЗЛЕЧЕНИЕ ЧЕРЕЗ ЦКЗ/ВОЗ
        if (object.view == 'cleaner' && neighbour.view == 'infectious') {
            if (isSuccess(1 - MEDICINE_EFFECTIVNESS)) {
                STATISTICS.clean++;
                STATISTICS.infectious--;
                neighbour.view = 'clean';
                debugChat.innerHTML += ('<p>Излечение возможно. Новый случай излечения зарегистрирован</p>');
            }
        }
        if (object.view == 'infectious' && neighbour.view == 'cleaner') {
            if (isSuccess(1 - MEDICINE_EFFECTIVNESS)) {
                STATISTICS.clean++;
                STATISTICS.infectious--;
                object.view = 'clean';
                debugChat.innerHTML += ('<p>Излечение возможно. Новый случай излечения зарегистрирован</p>');
            }
        }
        map[y][x].filled = neighbour;
    }
}

const testPerson = (person) => {

// ИЗЛЕЧЕНИЕ
    if (person.view == 'infectious' && isSuccess(1 - person.immunity)) {
        STATISTICS.clean++;
        STATISTICS.infectious--;
        person.view = 'clean';
        debugChat.innerHTML += ('<p>Излечение возможно. Новый случай излечения зарегистрирован</p>');
    }

// СМЕРТЬ ОТ ВИРУСА
    if (person.view == 'infectious' && isSuccess(1 - INFECTION_DEADLINESS)) {
        STATISTICS.deaths++;
        STATISTICS.total--;
        STATISTICS.infectious--;
        map[person.y_coord][person.x_coord].filled = null;
        debugChat.innerHTML += ('<p>Коронавирус продолжает кровавую жатву! Зарегистрирован случай смерти от болезни</p>');
        if (person.x_coord == hero.x_coord && person.y_coord == hero.y_coord) gameOver('коронавируса');
        return;
    }

// ПАНИКА
    if (person.view == 'clean' && isSuccess((STATISTICS.infectious + STATISTICS.deaths) / STATISTICS.total)) {
        STATISTICS.panic++;
        person.view = 'panic';
    }

// ПРОВЕРКА СОСЕДЕЙ
    checkNearby(person, parseInt(person.x_coord) + 1, parseInt(person.y_coord));
    checkNearby(person, parseInt(person.x_coord), parseInt(person.y_coord) + 1);
    map[person.y_coord][person.x_coord].filled = person;
    if (STATISTICS.infectious == 0) gameOver(1);
}

const changeImmunity = (person) => {
    person.immunity = Math.random() > 0.5 ? person.immunity > 0.7 ? 0.7 : person.immunity + 0.05 : person.immunity < 0.2 ? 0 : person.immunity - 0.2;
} 

const moveOn = () => {
    let alreadyMoved = [];
    for (let row in map) {
        for (let column in map[row]) {
            let tile = map[row][column];
            if (tile.filled) {
                let person = tile.filled;
                changeImmunity(person);
                testPerson(person);
                if (hero.x_coord != column && hero.y_coord != row) {
                    if (alreadyMoved.indexOf(person == -1)) {
                        let direction = DIRECTIONS[Math.floor(Math.random() * 4)];
                        person.move(direction);
                        alreadyMoved.push(person);
                    }
                }
            }
        }
    }
}

const  generateChar = () => {
    for (let row in map) {
        for (let column in map[row]) {
            let tile = map[row][column];
            if (tile.landscape != "deep_water") {
                if (isSuccess(1 - MAP_DENSITY)) {
                    let view;
                    if (isSuccess(1 - INFECTING_CHANCE)) {
                        view = 'infectious';
                    }
                    else if (isSuccess(1 - MEDICAL_STAFF)) {
                        view = 'cleaner';
                    }
                    else {
                        view = 'clean';
                    }
                    let char = new Character(column, row, view);
                    tile.filled = char;
                }
            }
        }
    }
};

const checkIndex = (x, y) => {
    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) return new Tile();
    return map[y][x];
}

let renderScreen = (x, y) => {
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
                let object = tile.filled;
                let object_image = document.createElement('img');
                object_image.src = 'resources/img/' + object.type + '/' + object.view + '.svg';
                object_image.alt = object.type;
                object_image.height = object_image.width = TILE_SIZE;
                element.appendChild(object_image);
            }
            mainScreen.appendChild(element);
        }
    }
    printStatistics();
}

const isTileFilled = (x, y) => {
    return map[y][x].filled;
}

Character.prototype.move = function (direction) {
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
            map[this.y_coord][this.x_coord].filled = this;
        }
    }
}

document.body.addEventListener('keypress', event => {
    let player = map[hero.y_coord][hero.x_coord].filled;
    if (gameStarted && player) {
        switch (event.keyCode) {
            case 100:
            case 1074:
                player.move('right');
                break;
            case 97:
            case 1092:
                player.move('left');
                break;
            case 115:
            case 1099:
                player.move('down');
                break;
            case 119:
            case 1094:
                player.move('up');
                break;
        }
        hero.x_coord = player.x_coord;
        hero.y_coord = player.y_coord;
        moveOn();
        if (gameStarted) renderScreen(hero.x_coord, hero.y_coord);
    }
});

moveControl.addEventListener('click', function (e) {
    if (gameStarted) {
        e.stopPropagation();
        let player = map[hero.y_coord][hero.x_coord].filled;
        player.move(e.target.getAttribute('data-direction'));
        hero.x_coord = player.x_coord;
        hero.y_coord = player.y_coord;
        moveOn();
        if (gameStarted) renderScreen(hero.x_coord, hero.y_coord);
    }    
});

window.onresize = () => {
    if (gameStarted) {
        CalculateScreenSize();
        renderScreen(hero.x_coord, hero.y_coord);
    }
}