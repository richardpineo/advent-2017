/*jshint esversion: 6 */

const val = 347991;

const directions = {
    right: 0,
    up: 1,
    left: 2,
    down: 3
};

let direction = directions.right;

let position = {
    x: 0,
    y: 0
};

let move = function () {
    switch (direction) {
        case directions.right:
            position.x++;
            break;
        case directions.up:
            position.y++;
            break;
        case directions.left:
            position.x--;
            break;
        case directions.down:
            position.y--;
            break;
        default:
            throw ("nope");
    }
};

let turn = function () {
    switch (direction) {
        case directions.right:
            direction = directions.up;
            break;
        case directions.up:
            direction = directions.left;
            break;
        case directions.left:
            direction = directions.down;
            break;
        case directions.down:
            direction = directions.right;
            break;
        default:
            throw ("nope");
    }
};

let stepCount = 0;
let stepSize = 1;
let turnCount = 0;

for (let i = 1; i < val; i++) {
    // update position
    move();
    stepCount++;
    if (stepCount === stepSize) {
        turn();
        turnCount++;
        if (turnCount === 2) {
            turnCount = 0;
            stepSize++;
        }
        stepCount = 0;
    }
}

console.log(`Ended at position ${JSON.stringify(position)}`);
console.log(`Distance from start: ${Math.abs(position.x) + Math.abs(position.y)}`);
// 480
