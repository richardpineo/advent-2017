/*jshint esversion: 6 */

// With big thanks to : https://www.redblobgames.com/grids/hexagons/

var fs = require('fs');
var moves = fs.readFileSync('./data/11-input.txt').toString().split(",");
console.log(`Read file, ${moves.length} moves found`);

let position = {
    x: 0,
    y: 0,
    z: 0
};

let getOffset = function (move) {
    switch (move) {
        case "s": return { x: 0, y: -1, z: 1 };
        case "n": return { x: 0, y: 1, z: -1 };
        case "ne": return { x: 1, y: 0, z: -1 };
        case "nw": return { x: -1, y: 1, z: 0 };
        case "se": return { x: 1, y: -1, z: 0 };
        case "sw": return { x: -1, y: 0, z: 1 };
        default:
            throw ("nope");
    }
};

let move = function (offset) {
    position = {
        x: position.x + offset.x,
        y: position.y + offset.y,
        z: position.z + offset.z,
    };
};

moves.forEach((m) => {
    move(getOffset(m));
});

console.log(`Final position = (${position.x}, ${position.y}, ${position.z})`);

let distance = function (a, b) {
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;
};

let distanceFromStart = distance(position, { x: 0, y: 0, z: 0 });
console.log(`Distance from starting point: ${distanceFromStart}`);
// 696