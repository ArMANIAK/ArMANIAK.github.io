//
//                          Prototyping process
//
//          To-Do
//    1. Rendering map
//       1.1. Building an array of tiles
//       1.2. Checking whether within borders
//       1.3. Calculating and rendering from the center og the map
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

const LANDSCAPE_TYPES = [
    'forest',
    'sand',
    'mountain',
    'water',
    'meadow',
];

const MAP = [
    ['sand', 'sand', 'sand', 'rock', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'forest', 'forest', 'sand', 'forest', 'forest', 'forest',],
    ['sand', 'sand', 'rock', 'rock', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'rock', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'rock', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'sand', 'sand', 'rock', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'rock', 'sand', 'rock', 'sand', 'forest', 'forest', 'forest', 'sand', 'forest', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'rock', 'sand', 'sand', 'sand', 'forest', 'forest', 'forest', 'forest', 'forest', 'forest', 'forest', 'rock',],
    ['sand', 'sand', 'sand', 'rock', 'rock', 'sand', 'rock', 'forest', 'forest', 'forest', 'sand', 'sand', 'forest', 'forest', 'rock',],
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
    constructor() {
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
    constructor(type = 'deep_water') { // add landscape type into constructor
        this.filled = 'empty';
        this.landscape = type;
        this.exaughstance = 2;
    }
}

const checkIndex = (x, y) => {
    if (x < 0 || y < 0 || x >= MAP[0].length || y >= MAP.length) return new Tile();
    return new Tile(MAP[y][x]);
}

const buildMapArray = (x, y, x_center, y_center) => {
    let map = new Array;
    let x_start = x_center - Math.floor(x / 2); 
    let x_finish = x_start + x;
    let y_start = y_center - Math.floor(y / 2); 
    let y_finish = y_start + y;
    for (let i = y_start; i < y_finish; i++) {
        for (let j = x_start; j < x_finish; j++) {
            map.push(checkIndex(j, i));
        }
    }
    return map;
}

const mainScreen = document.querySelector('main');
const debugChat = document.querySelector('content');
let height = mainScreen.scrollHeight;
let width = mainScreen.scrollWidth;
debugChat.innerHTML += ('<p>' + width + 'x' + height + '</p>');
let x_tiles = Math.floor(width / 50);
let y_tiles = Math.floor(height / 50);
debugChat.innerHTML += ('<p>' + x_tiles + 'x' + y_tiles + '</p>');
console.log(checkIndex(0, 0), checkIndex(0, 3), checkIndex(-1,5));
let viewport_x_center = Math.floor(x_tiles / 2);
let viewport_y_center = Math.floor(y_tiles / 2);
let map = buildMapArray(x_tiles, y_tiles, viewport_x_center, viewport_y_center);
console.log(map);

const levelUp = (character) => {}

const isSuccess = (chance) => {
    console.log('isSuccess');
    // generate number
    // compare to chance
    skillUp();
}

class Character {
    constructor() {  // add charType as a parameter?
        this.charType = ['enemy'];
        this.stats = {
            strength: 0,
            agility: 0,
            endurance: 0,
            intelect: 0,
            charm: 0,
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
        this.level = 0;
        this.hitPoints = 10;
        this.race = 'human';
        this.attackSpeed = 0;
        this.inventory = [];
        this.equipped = [];
    }
    
    chanceCalc = () => {
        //calculate chance according to skills
        console.log('chanceCalc');
        console.dir(this);
    }
    
    attack() {
        chanceCalc();
        isSuccess(); // add raising skill after successes
        //relationChange();
        //showResult();
    }
    defence() {
        chanceCalc();
        isSuccess();
    }

    interact() {
        // check
        showInteractionMenu();
    }
    steal() {}
    trade() {}
    talk() {}
}