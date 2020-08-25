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
            unarmed: 50,
            magic: 1,
            knife: 1,
            sword: 1,
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
        this.attackSpeed = 1;
        this.damage = 10;
        this.inventory = [];
        this.equipped = [];
        map[y][x].filled = this;
    }
}

const USAGE_TYPES = [
    'head',
    'body',
    'legs',
    'arms',
    'neck',
    'mainHand',
    'offHand',
];

/*  
    objects? containers, resourses, items
    should inherit from one class or create different classes?

    container class {type: , isLocked: , solidity: , content: []}
    resources class {type: , neeedTool: , solidity: , content: []}
    item class {type: , usage: , solidity: , weight: , damage: , aggroSkills: {}, peaceSkills: {}}  
    should update heroes skills or calculate?
*/

class Container {
    constructor(view, x, y) {
        this.x_coord = x;
        this.y_coord = y;
        this.type = 'container';
        this.view = view;
        this.isLocked = (view == 'chest' || view == 'armored chest') ? true : false;
        if (view = 'chest') this.solidity = 50;
        else if (view = 'armored chest') this.solidity = 250;
        else if (view == 'barrel') this.solidity = 10;
        else {
            this.view = 'sack';
            this.solidity = 0;
        }
        this.content = ['pot', 'money'];
    }
}

Container.prototype.generateContent() = {}

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
    // console.log('isSuccess');
    return Math.random() > chance ? true : false;


    //
    //
    //   skillUp(); // remove to 'action' code
    //
    //
}

const generateItem = (tile, x, y) => {
    if (isSuccess(1 - tile.prosperity)) {
        let view = 'barrel';
        let object = new Container(view, x, y);
        // console.log('Generating ', object);
        tile.filled = object;
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
            if (tile.landscape != 'deep_water') generateItem(tile, x, y);
            row.push(tile);
        }
        worldMap.push(row);
    }
    return worldMap;
}

const mainScreen = document.querySelector('main > div.field');
const aside = document.querySelector('aside');
const moveControl = document.querySelector('.controls');
const moveLeft = document.querySelector('.arrow-left');
const moveUp = document.querySelector('.arrow-up');
const moveRight = document.querySelector('.arrow-right');
const moveDown = document.querySelector('.arrow-down');
const debugChat = document.querySelector('content');
const map = buildMap();
// debugChat.innerHTML += ('<p>' + 'x' + '</p>');

const renderScreen = () => {

// Add options for media queries to make the game responsive

    mainScreen.height = window.innerHeight * 0.8 + 'px';
    mainScreen.width = window.innerWidth * 0.8 + 'px';
    moveControl.style.bottom = window.innerHeight * 0.2 + 25 + 'px';
    moveControl.style.right = window.innerWidth * 0.2 + 25 + 'px';
    mainScreen.innerHTML = '';
    for (let i = 0, n = map.length; i < n; i++) {
        let row = document.createElement('div');
        row.className = 'container';
        row.style.width = map[i].length * TILE_SIZE + 'px';
        for (let j = 0, l = map[i].length; j < l; j++) {
            let element = document.createElement('div');
            element.className = 'tile';
            element.style.backgroundSize = 'cover';
            element.style.width = element.style.height = TILE_SIZE + 'px';
            element.style.backgroundImage = 'url(resources/img/bg/fog.svg)';
            row.appendChild(element);
        }
        mainScreen.appendChild(row);
    }
}

renderScreen();

function renderTile(x, y) {  
    let tile = map[y][x];
    let tileDiv = document.querySelectorAll('.container > .tile')[y * map[y].length + x];
    if (tile.discovered) {
        tileDiv.innerHTML = '';
        tileDiv.style.backgroundImage = 'url(resources/img/bg/' + tile.landscape + '.svg)';
        if (tile.filled) {
            let object = tile.filled;
            let object_image = document.createElement('img');
            object_image.src = 'resources/img/' + object.type + '/' + object.view + '.svg';
            object_image.alt = object.type;
            object_image.height = object_image.width = TILE_SIZE;
            tileDiv.appendChild(object_image);
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
                renderTile(j, i);
            }
        }
    }
    moveScreen(x, y);
}

function moveScreen(x, y) {
    renderTile(x, y);
    let main = document.querySelector('main');
    main.scrollTop = (y * TILE_SIZE - parseFloat(mainScreen.height.substr(0, mainScreen.height.length - 2)) / 2);
    main.scrollLeft = (x * TILE_SIZE - parseFloat(mainScreen.width.substr(0, mainScreen.width.length - 2)) / 2);
}

let hero = new Character(10, 10, 'hero');
removeFog(hero.x_coord, hero.y_coord);

const isTileFilled = (x, y) => {
    return map[y][x].filled;
}

const levelUp = (character) => {}

const skillUp = (character, skill) => {}

const createButton = (message, subject) => {
    // console.log('Create button menu');
    let button = document.createElement('div');
    button.style.margin = '10px 20px';
    button.style.border = 'solid 2px blue';
    button.style.padding = '10px';
    button.innerText = message;
    button.dataset.action = message == 'destroy' ? 'attack' : message;
    button.style.textAlign = 'center';
    // console.log(button);
    return button;
}

const showInteractionMenu = (options, subject) => {
    aside.innerHTML = '';
    aside.setAttribute('data-target', JSON.stringify({x_coord: subject.x_coord, y_coord: subject.y_coord}));
    for (let item in options) {
        let button = createButton(options[item], subject);
        aside.appendChild(button);
    }
    aside.onclick = function(event) {
        if (event.target != aside) {
            event.stopPropagation();
            let coords = JSON.parse(aside.dataset.target);
            console.log(coords);
            hero[event.target.dataset.action](map[coords.y_coord][coords.x_coord].filled);
        }
        else return;
    }
}

const checkOptions = (subject) => {
    let options = [];
    switch (subject.type) {
        case 'container':
        case 'barrel':
        case 'chest':
            options.push('open', 'destroy', 'lock');
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
            // console.log('Can\'t define the class of the obstacle. It is: ' + subject);
            break;
    }
    return options;
}

Character.prototype.chanceCalc = function(skill) {
    console.log('this.chanceCalc ' + skill);

    if (isSuccess(skill < 5 ? 0.05 : skill * 0.01)) {
        skillUp(this, skill);
        return true;
    }
    return false;
    //calculate chance according to skills
}

function showRemains(object) {
    let inventory = object.inventory ? object.inventory : new Array();
    let equipped = object.equipped ? object.equipped : new Array();
    let content = object.content ? object.content : new Array();
    let remains = inventory.concat(equipped).concat(content);
    console.log(remains);
}

Character.prototype.attack = function(object) {
    let subject = map[object.y_coord][object.x_coord].filled;
    let distance = 1;
    let weapon = this.equipped.mainHand;
    let skill = weapon ? weapon.attackType : 'unarmed';
    let interval;
    interval = setInterval(() => {
        distance = Math.abs(this.y_coord - object.y_coord) + Math.abs(this.x_coord - object.x_coord);
        // console.log('Inside interval');
        if (distance == 1) {
            if (this.hitPoints > 0) {
                if (subject.solidity ? subject.solidity > 0 : subject.hitPoints > 0) {
                    // console.log('Attack in interval');
                    if (this.chanceCalc(this.aggroSkills[skill])) {
                        subject.solidity ? subject.solidity = subject.solidity - this.damage : subject.hitPoints = subject.hitPoints - this.damage;
                    }
                    // else console.log('Attack failed');
                }
                else {
                    let inventory = showRemains(subject);
                    clearInterval(interval);
                }
            }
            else {
                let inventory = showRemains(this);
                clearInterval(interval);
            }
        }
        else {
            // console.log('clearing interval');
            // console.log(distance, this, subject);
            clearInterval(interval);
        }
            
    }, this.attackSpeed * 1000);
    
    

    // How to proceed with constant attacks????
    // Should I add button for attack?
    // Should it be charging attack option?

    isSuccess(); // add raising skill after successes
    //relationChange();
    //showResult();
}

Character.prototype.defence = function() {
    chanceCalc();
    isSuccess();
}

Character.prototype.interact = function(subject) {
    console.dir(subject);
    if (this.type = 'hero') {
        let options = checkOptions(subject);
        showInteractionMenu(options, subject);
    }
    // check
    // console.log('interaction ', subject, this);
    
    // if container show 'unlock', 'open', 'break'
    // if resourses show 'collect', 'break'
    // if character show 'attack', 'steal', 'talk'
    // if beast show 'feed', 'tame', 'attack'
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
            let img = document.querySelectorAll('.container > .tile')[this.y_coord * map[this.y_coord].length + this.x_coord];
            img.innerHTML = '';
            this.x_coord = nextTile.x;
            this.y_coord = nextTile.y;
            map[this.y_coord][this.x_coord].filled = this;
        }
        else this.interact(map[nextTile.y][nextTile.x].filled);
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
})

window.onresize = () => {
    mainScreen.height = window.innerHeight * 0.8 + 'px';
    mainScreen.width = window.innerWidth * 0.8 + 'px';
    moveControl.style.bottom = window.innerHeight * 0.2 + 25 + 'px';
    moveControl.style.right = window.innerWidth * 0.2 + 25 + 'px';
    moveScreen(hero.x_coord, hero.y_coord);
}