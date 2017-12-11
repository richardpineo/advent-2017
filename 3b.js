/*jshint esversion: 6 */

const val = 347991;

const directions = {
    right: 0,
    up: 1,
    left: 2,
    down: 3
}

let direction = directions.right;

let position = {
    x: 0,
    y: 0
}

let grid = {}

let putVal = function(position, val) {
    grid[JSON.stringify(position)] = val;
    console.log(`Assigning value at ${JSON.stringify(position)} to ${val}`);
    return val;
}

let getVal = function(position) {
    let val = grid[JSON.stringify(position)];
    if( val === undefined ) {
        val = 0;
    }
    // console.log(`Value at ${JSON.stringify(position)} is ${val}`);
    return val;
}

let computeVal = function(position) {
    let v = getVal({x: position.x +  1, y: position.y + -1}) +
        getVal({x: position.x +  1, y: position.y +  0}) +
        getVal({x: position.x +  1, y: position.y +  1}) +
        getVal({x: position.x + -1, y: position.y +  1}) +
        getVal({x: position.x + -1, y: position.y +  0}) +
        getVal({x: position.x + -1, y: position.y + -1}) +
        getVal({x: position.x +  0, y: position.y +  1}) +
        getVal({x: position.x +  0, y: position.y + -1});
    return v;
}

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
}

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
}

let stepCount = 0;
let stepSize = 1;
let turnCount = 0;

putVal({x:0, y:0}, 1);

for (let i = 1;; i++) {
    // update position
    move();

    if( val < putVal(position, computeVal(position))) {
        console.log(`Ended at position ${JSON.stringify(position)} with value ${getVal(position)}`);
        console.log(`Distance from start: ${Math.abs(position.x) + Math.abs(position.y)}`);
        break;
    }

    stepCount++;
    if (stepCount === stepSize) {
        turn();
        turnCount++;
        if( turnCount === 2 ) {
            turnCount = 0;
            stepSize++;
        }
        stepCount = 0;
    }
}
// 349975
// Ended at position {"x":-2,"y":4} with value 349975
// Distance from start: 6
