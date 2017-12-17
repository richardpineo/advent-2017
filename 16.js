/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var movesRaw = fs.readFileSync('./data/16-input.txt').toString().split(",");
console.log(`${movesRaw.length} moves read`);

const Spin = 0;
const Exchange = 1;
const Partner = 2;

const regexSpin = /s(\d+)/;
const regexExchange = /x(\d+)\/(\d+)/;
const regexPartner = /p(\w)\/(\w)/;

let moves = movesRaw.map(m => {
    let result;
    result = regexSpin.exec(m);
    if (result) {
        return { type: Spin, v: parseInt(result[1]) };
    }

    result = regexExchange.exec(m);
    if (result) {
        return { type: Exchange, v1: parseInt(result[1]), v2: parseInt(result[2]) };
    }

    result = regexPartner.exec(m);
    if (result) {
        return { type: Partner, v1: result[1], v2: result[2] };
    }

    throw ("oops");
});

let values = [];
let startingPositions = [];

let valuesString = function() {
    return values.join("");
};

let printValues = function () {
    console.log(valuesString());
};

let spinOne = function () {
    let v = values[15];
    for (let i = 14; i >= 0; i--) {
        values[i + 1] = values[i];
    }
    values[0] = v;
};

let spin = function (num) {
    for (let i = 0; i < num; i++) {
        spinOne();
    }
};

let exchange = function (x, y) {
    let v = values[x];
    values[x] = values[y];
    values[y] = v;
};

let partner = function (a, b) {
    let posA = values.findIndex(v => v === a);
    let posB = values.findIndex(v => v === b);
    exchange(posA, posB);
};

let init = function () {
    values = [];
    values.push('a');
    values.push('b');
    values.push('c');
    values.push('d');
    values.push('e');
    values.push('f');
    values.push('g');
    values.push('h');
    values.push('i');
    values.push('j');
    values.push('k');
    values.push('l');
    values.push('m');
    values.push('n');
    values.push('o');
    values.push('p');
    startingPositions = [];
};

let oneRound = function () {
    moves.forEach(m => {
        switch (m.type) {
            case Spin:
                spin(m.v);
                break;
            case Exchange:
                exchange(m.v1, m.v2);
                break;
            case Partner:
                partner(m.v1, m.v2);
                break;
            default:
                throw ("Oops");
        }
    });
};

let oneTest = function (count) {
    console.log(`Attempting ${count} iterations.`);
    init();
    for (let i = 0; i < count; i++) {
        let valuesStr = valuesString();
        let found = startingPositions.findIndex(v => v === valuesStr);
        if( found !== -1 ) {
            console.log(`Found at position ${found} on iteration ${i}!`);
            printValues();
            let baseIndex = count % i;
            console.log(`${count} position should be ${startingPositions[baseIndex+found]}`);
            return;
        }
        startingPositions.push(valuesStr);
        oneRound();
    }
    console.log(`${count} iteration(s) yielded:`);
    printValues();
};

oneTest(1);
oneTest(1000000000);

// 16a: iabmedjhclofgknp
// 16b: oildcmfeajhbpngk
