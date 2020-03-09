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

const LANDSCAPE_TYPES = [
    'forest',
    'sand',
    'rock',
    'mountain',
    'water',
    'field',
    'deep_water',
];

const ITEM_TYPES = {
    'container': ['barrel', 'chect', 'pot', 'armored chest', 'shelves', 'box'],
    'resourses': ['coal', 'iron', 'copper', 'tree'],

}

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

const INVENTORY = {
    clothes: [],
    armor: [],
    weapon: [],
    tools: [],

};

const RACES = [
    'human',
    'elf',
    'draco',
    'orc',
];

const FRACTION = [
    'none',
    'knights',
    'assassins',
    'peasants',
];

const CHARACTER_TYPE = [
    'player',
    'enemy',
    'trader',
    'worker',
    'soldier',
    'beast',
];

class Character {
    constructor(x, y, type = 'enemy') {
        this.x_coord = x;
        this.y_coord = y; 
        this.type = type;
        this.view = 'right';
        this.stats = {
            strength: 1,
            agility: 1,
            endurance: 1,
            intellect: 1,
            charm: 1,
        }
        this.aggroSkills = {
            magic: 0,
            knife: 0,
            sword: 0,
        }
        this.peaceSkills = {
            repair: 0,
            healing: 0,
        }
        this.stamina = 100;
        this.exp = 0;
        this.level = 1;
        this.maxHP = this.level * this.stats.strength;
        this.hitPoints = 10;
        this.race = 'human';
        this.attackSpeed = 0;
        this.inventory = [];
        this.equipped = [];
        map[y][x].filled = JSON.stringify(this);
    }
}

const USAGE_TYPES = [
    'head',
    'body',
    'legs',
    'arms',
    'neck',
    'main_hand',
    'off_hand',
];

class Item {
    constructor(view, itemClass, type = 'object') {
        this.type = type;
        this.class = itemClass;
        this.view = view;
        this.usage = 'head';
        this.solidity = 1;
        this.weight = 1;
        this.damage = 0; // allow wear pots on heads or use things as a weapon;
        this.aggroSkills = {
            blunt: 1.5,
        }
        this.peaceSkills = {
            repair: 1,
        }
    }
};

class Tile {
    constructor(type = 'deep_water') { 
        this.filled = null;
        this.landscape = type;
        this.discovered = false;
        this.exhaustion = 2;
        this.prosperity = 0.1;
        //  switch(type) {
        //      case 'forest':
        //      this.exhaustion = 1.5;
        //      this.prosperity = 0.15;
        //      break;
        //  }
    }
}

const isSuccess = (chance) => {
    console.log('isSuccess');
    return Math.random() > chance ? true : false;


    //
    //
    //   skillUp(); // remove to 'action' code
    //
    //
}

const generateItem = (tile) => {
    if (isSuccess(1 - tile.prosperity)) {
        let itemClass = 'container';
        let view = 'barrel';
        let object = new Item(view, itemClass);
        console.log('Generating ', object);
        tile.filled = JSON.stringify(object);
    }
}

const checkIndex = (x, y) => {
    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) return new Tile();
    return map[y][x];
}

const buildMap = () => {
    let worldMap = new Array;
    for (let y in MAP) {
        let row = new Array;
        for (let x in MAP[y]) {
            let tile = new Tile(MAP[y][x]);
            if (tile.landscape != 'deep_water') generateItem(tile);
            row.push(tile);
        }
        worldMap.push(row);
    }
    return worldMap;
}

const mainScreen = document.querySelector('main');
const aside = document.querySelector('aside');
const debugChat = document.querySelector('content');
const map = buildMap();
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
            if (tile.discovered) {
                element.style.backgroundImage = 'url(resources/img/bg/' + tile.landscape + '.svg)';
                if (tile.filled) {
                    let object = JSON.parse(tile.filled);
                    let object_image = document.createElement('img');
                    // console.log(object);
                    object_image.src = 'resources/img/' + object.type + '/' + object.view + '.svg';
                    object_image.alt = object.type;
                    object_image.height = object_image.width = TILE_SIZE;
                    element.appendChild(object_image);
                }
            }
            else element.style.backgroundImage = 'url(resources/img/bg/fog.svg)';
            mainScreen.appendChild(element);
        }
    }
}

const removeFog = (x, y) => {
    let x_start = x - 2;
    let x_finish = x + 2;
    let y_start = y - 2;
    let y_finish = y + 2;
    for (let i = y_start; i <= y_finish; i++) {
        for (let j = x_start; j <= x_finish; j++) {
            let distance = Math.abs(i - y) + Math.abs(j - x);
            if (distance < 3) {
                let tile = checkIndex(j, i);
                if (!tile.discovered) tile.discovered = 'true';
            }
        }
    }
    renderScreen(x, y);
}

let viewport_x_center = 3;
let viewport_y_center = 2;  // defining coordinates of the center of the screen
let hero = new Character(3, 2, 'hero');
map[5][5].filled =JSON.stringify(new Item('barrel', 'container', 'object'));
removeFog(hero.x_coord, hero.y_coord);

const isTileFilled = (x, y) => {
    return map[y][x].filled;
}

const levelUp = (character) => {}

const skillUp = () => {}

const createButton = (message, subject) => {
    console.log('Create button menu');
    let button = document.createElement('div');
    button.style.margin = '10px 20px';
    button.style.border = 'solid 2px blue';
    button.style.padding = '10px';
    button.innerText = message;
    button.style.textAlign = 'center';
    button.setAttribute('data-target', JSON.stringify(subject));
    console.log(button);
    return button;
}

const showInteractionMenu = (options, subject) => {
    console.log('Interaction menu', options);
    aside.innerHTML = '';
    for (let item in options) {
        let button = createButton(options[item], subject);
        aside.appendChild(button);
    }
    console.log(aside);
}

const checkOptions = (subject) => {
    let options = [];
    switch (subject.class) {
        case 'container':
        case 'barrel':
        case 'chest':
            console.log('It is container');
            options.push('open', 'destroy', 'lock');
            break;
        case 'beast':
            console.log("It's beast");
            options.push('tame', 'feed', 'attack');
            break;
        case 'worker':
        case 'trader':
            console.log ('It is ' + subject.class);
            options.push('trade', 'talk', 'steal', 'attack');
            break;
        case 'enemy':
            console.log('It is enemy');
            options.push('steal', 'attack', 'talk');
            break;
        default:
            console.log('Can\'t define the class of the obstacle. It is: ' + subject);
            break;
    }
    return options;
}

Character.prototype.chanceCalc = function() {
    console.log(this);
    //calculate chance according to skills
}

Character.prototype.attack = function() {
    chanceCalc();
    isSuccess(); // add raising skill after successes
    //relationChange();
    //showResult();
}

Character.prototype.defence = function() {
    chanceCalc();
    isSuccess();
}

Character.prototype.interact = function(subject) {
    // check
    console.log('interaction ', subject, this);
    let options = checkOptions(subject);
    // if container show 'unlock', 'open', 'break'
    // if resourses show 'collect', 'break'
    // if character show 'attack', 'steal', 'talk'
    // if beast show 'feed', 'tame', 'attack'
    showInteractionMenu(options, subject);
}
Character.prototype.steal = function() {}
Character.prototype.trade = function() {}
Character.prototype.talk = function() {}

document.body.addEventListener('keypress', event => {
    // console.log(event);
    let nextTile = {
        x: hero.x_coord, 
        y: hero.y_coord,
    }
    switch (event.keyCode) {
        case 100:
        case 1074:
            nextTile.x++;
            hero.view = 'right';
            break;
        case 97:
        case 1092:
            nextTile.x--;
            hero.view = 'left';
            break;
        case 115:
        case 1099:
            nextTile.y++;
            hero.view = 'down';
            break;
        case 119:
        case 1094:
            nextTile.y--;
            hero.view = 'up';
            break;
    }
    if (map[nextTile.y][nextTile.x].landscape != 'deep_water') {
        if (!isTileFilled(nextTile.x, nextTile.y)) {
            map[hero.y_coord][hero.x_coord].filled = null;
            hero.x_coord = nextTile.x;
            hero.y_coord = nextTile.y;
            map[hero.y_coord][hero.x_coord].filled = JSON.stringify(hero);
            removeFog(nextTile.x, nextTile.y);
        }
        else hero.interact(JSON.parse(map[nextTile.y][nextTile.x].filled));
    }
    
});

window.onresize = () => {
    height = mainScreen.scrollHeight;
    width = mainScreen.scrollWidth;
    x_tiles = Math.floor(width / TILE_SIZE);
    y_tiles = Math.floor(height / TILE_SIZE);
    renderScreen(hero.x_coord, hero.y_coord);
}