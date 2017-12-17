/*jshint esversion: 6 */

let _ = require("lodash");

let MaxBuffer = 50000000;
let buffer = new Array(MaxBuffer);

let bufferLen;
let currentPosition;
let init = function () {
    buffer[0] = 0;
    bufferLen = 1;
    currentPosition = 0;
};

let dump = function () {
    buffer.forEach((b, index) => {
        process.stdout.write(index === currentPosition ? `(${b}) ` : `${b} `);
    });
};

let step = function (value, stepSize) {
    currentPosition = (currentPosition + stepSize) % bufferLen + 1;
    for(let i=bufferLen; i>currentPosition; i--) {
        buffer[i] = buffer[i-1];
    }
    buffer[currentPosition] = value;
    bufferLen++;
};

let stepSlow = function (value, stepSize) {
    for (let i = 0; i < stepSize; i++) {
        currentPosition++;
        if (currentPosition >= bufferLen) {
            currentPosition = 0;
        }
    }
    currentPosition++;
    buffer.splice(currentPosition, 0, value);
};

const tests = [
    { input: 3, count: 2017 },
    { input: 304, count: 2017 },
    { input: 304, count: 50000000, find: 0 }
];

let importantPosition = function (findVal) {
    if (!findVal) {
        return currentPosition + 1;
    }
    return buffer.findIndex(b => b === findVal) + 1;
};

tests.forEach(t => {
    init();

    for (let i = 1; i <= t.count; i++) {
        step(i, t.input);
        
        if ((i % 1000) === 0) {
            process.stdout.write(".");
        }

        if (0 === i % 1000000) {
            console.log(`${i} values processed`);
        }
    }

    console.log(`Inputs ${JSON.stringify(t)} gives value ${buffer[importantPosition(t.find)]}`);
});

// 1173