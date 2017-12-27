/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var mazelines = fs.readFileSync('./data/19-input.txt').toString().split("\n");
console.log(`${mazelines.length} maze lines read`);

let maze = mazelines.map(l => l.split(""));

let getAt = coord => maze[coord.y][coord.x];

let current = {
    x: maze[0].findIndex(c => c === '|'),
    y: 0
};

let direction = {
    x: 0,
    y: 1
};
const Up = { x: 0, y: -1 };
const Down = { x: 0, y: 1 };
const Left = { x: -1, y: 0 };
const Right = { x: 1, y: 0 };

let sameDirection = (a, b) => {
    return a.x === b.x && a.y === b.y;
};

let move = (c, d) => {
    return {
        x: c.x + d.x,
        y: c.y + d.y
    };
};
let moveCurrent = () => {
    let newCurrent = move(current, direction);
    if (newCurrent.x < 0 || newCurrent.x >= maze[0].length ||
        newCurrent.y < 0 || newCurrent.y >= maze[0].length || 
        getAt(newCurrent) === " ") {
        throw ("fin");
    }
    current = newCurrent;
};

let isLetter = c => c.toLowerCase() != c.toUpperCase();

let validChar = c => {
    switch (c) {
        case '-':
        case '|':
        case '+':
            return true;
        default:
            return isLetter(c);
    }
};

let checkLR = () => {
    if (validChar(getAt(move(current, Right)))) {
        direction = Right;
    } else if (validChar(getAt(move(current, Left)))) {
        direction = Left;
    } else {
        throw ("Nope!");
    }
    moveCurrent();
};

let checkUD = () => {
    if (validChar(getAt(move(current, Up)))) {
        direction = Up;
    } else if (validChar(getAt(move(current, Down)))) {
        direction = Down;
    } else {
        throw ("Nope!");
    }
    moveCurrent();
};

let turn = () => {
    if (sameDirection(direction, Up) || sameDirection(direction, Down)) {
        checkLR();
    } else if (sameDirection(direction, Left) || sameDirection(direction, Right)) {
        checkUD();
    } else {
        throw ("Not even a little bit");
    }
};

let found = "";
let currentCharacter;
try {
    while (true) {
        currentCharacter = getAt(current);
        // console.log(`${JSON.stringify(current)}: ${currentCharacter}`);
        switch (currentCharacter) {
            case '|':
            case '-':
                moveCurrent();
                break;
            case '+':
                turn();
                break;
            default:
                if (isLetter(currentCharacter)) {
                    found += currentCharacter;
                    moveCurrent();
                    console.log(`Found: ${found}`);
                } else {
                    throw ("nope");
                }
        }
    }
} 
catch (e) {
    if( e === "fin") {
        console.log(`Exit found: ${currentCharacter} @ ${JSON.stringify(current)}`);
        console.log(`Letters: ${found}`);
    } else {
        console.log(`Oops: ${e}`);
    }
}

// QPRYCIOLU
