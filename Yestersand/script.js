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
    'container': ['barrel', 'chest', 'pot', 'armored chest', 'shelves', 'box'],
    'resources': {coal: {type: 'minerals', tool: 'pickaxe'}, iron: {type: 'minerals', tool: 'pickaxe'}, 
        copper: {type: 'minerals', tool: 'pickaxe'}, tree: {type: 'wood', tool: 'axe'}, mushroom: {type: 'plants', tool: 'knife'}},
    'item': ['money', 'potion', 'sword', 'pot', 'shovel']
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
        this.hitPoints = this.maxHP;
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

class Container {
    constructor(view) {
        this.type = 'container';
        this.view = view;
        this.isLocked = (view == 'chest' || view == 'armored chest') ? true : false;
        if (view = 'chest') this.hitPoints = 50;
        else if (view = 'armored chest') this.hitPoints = 250;
        else this.hitPoints = 10;
        this.content = ['pot', 'money'];
    }
}

class Resources {
    constructor(view) {
        this.type = 'resources';
        this.view = view;
        this.resourceType = ITEM_TYPES.resources.view.type;
        this.needTool = ITEM_TYPES.resources.view.tool;
        this.solidity = 1;
        this.content = ['coal', 'iron bar'];
    }
}

class Item {
    constructor() {
        this.type = 'item';
        this.view = view;
        this.usage = 'head';
        if (this.usage == 'main_hand') attackType = 'blunt';
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
        this.prosperity = 0.05;
        //  switch(type) {
        //      case 'forest':
        //      this.exhaustion = 1.5;
        //      this.prosperity = 0.15;
        //      break;
        //  }
    }
}

const isSuccess = (chance) => {
    return Math.random() > chance ? true : false;


    //
    //
    //   skillUp(); // remove to 'action' code
    //
    //
}

const generateItem = (tile) => {
    if (isSuccess(1 - tile.prosperity)) {
        let view = 'barrel';
        let object = new Container(view);
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

const mainScreen = document.querySelector('main > div.field');
const aside = document.querySelector('aside');
const moveControl = document.querySelector('.controls');
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
removeFog(hero.x_coord, hero.y_coord);

const isTileFilled = (x, y) => {
    return map[y][x].filled;
}

const levelUp = (character) => {}

const skillUp = () => {}

const createButton = (message, subject) => {
    let button = document.createElement('div');
    button.style.margin = '10px 20px';
    button.style.border = 'solid 2px blue';
    button.style.padding = '10px';
    button.dataset.option = message;
    button.innerText = message;
    button.style.textAlign = 'center';
    return button;
}

const showInteractionMenu = (options, subject) => {
    aside.innerHTML = '';
    aside.setAttribute('data-target', JSON.stringify(subject));
    for (let item in options) {
        let button = createButton(options[item], subject);
        aside.appendChild(button);
    }
}

const checkOptions = (subject) => {
    let options = [];
    switch (subject.type) {
        case 'container':
        case 'barrel':
        case 'chest':
            options.push('open', 'break', 'lock');
            break;
        case 'beast':
            options.push('tame', 'feed', 'attack');
            break;
        case 'worker':
        case 'trader':
            options.push('trade', 'talk', 'steal', 'attack');
            break;
        case 'enemy':
            options.push('steal', 'attack', 'talk');
            break;
        default:
            break;
    }
    return options;
}

Character.prototype.chanceCalc = function(skill) {
    // console.log(this);
    //calculate chance according to skills
}

Character.prototype.attack = function(opponent) {
    let attack, attackType;
    this.stats.strength = 10;
    this.aggroSkills.unarmed = 5;
    if (this.equipped[5] == undefined) {
        attackType = 'unarmed';
        attack = this.stats.strength * (this.aggroSkills[attackType] || 1);
    }
    else {
        attackType = this.equipped[5].attackType;
        attack = this.stats.strength * (this.aggroSkills[attackType] || 1) + this.equipped[5].damage;
    }
    console.log(attack);
    chanceCalc(attack);
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
    // console.log('interaction ', subject, this);
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

Character.prototype.move = function (direction) {
    aside.innerHTML = '';
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
    this.view = direction;
    if (map[nextTile.y][nextTile.x].landscape != 'deep_water') {
        if (!isTileFilled(nextTile.x, nextTile.y)) {
            map[this.y_coord][this.x_coord].filled = null;
            this.x_coord = nextTile.x;
            this.y_coord = nextTile.y;
            map[this.y_coord][this.x_coord].filled = JSON.stringify(this);
        }
        else this.interact(JSON.parse(map[nextTile.y][nextTile.x].filled));
    }
}

document.body.addEventListener('keypress', event => {
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
    removeFog(hero.x_coord, hero.y_coord);
});

moveControl.addEventListener('click', function (e) {
    e.stopPropagation();
    hero.move(e.target.getAttribute('data-direction'));
    removeFog(hero.x_coord, hero.y_coord);
});

aside.addEventListener('click', function (e) {
    e.stopPropagation();
    if (e.target.dataset.option == 'attack' || e.target.dataset.option == 'break') {
        hero.attack(aside.dataset.target);
    }
});

window.onresize = () => {
    height = mainScreen.scrollHeight;
    width = mainScreen.scrollWidth;
    x_tiles = Math.floor(width / TILE_SIZE);
    y_tiles = Math.floor(height / TILE_SIZE);
    renderScreen(hero.x_coord, hero.y_coord);
}