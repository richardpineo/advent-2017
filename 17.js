/*jshint esversion: 6 */

let _ = require("lodash");

let buffer = [0];
let currentPosition = 0;

let dump = function() {
    buffer.forEach((b, index) => {
        process.stdout.write(index === currentPosition ? `(${b}) ` : `${b} `);
    });    
};

let step = function (value, stepSize) {
    for (let i = 0; i < stepSize; i++) {
        currentPosition++;
        if (currentPosition >= buffer.length) {
            currentPosition = 0;
        }
    }
    currentPosition++;
    buffer.splice(currentPosition, 0, value);
};

// const input = 3;
const input = 304;
for (let i = 1; i <= 2017; i++) {
    step(i, input);
}

console.log(`The value after the current position is ${buffer[currentPosition+1]}`);
// 1173