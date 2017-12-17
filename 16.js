/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var moves = fs.readFileSync('./data/16-input.txt').toString().split(",");
console.log(`${moves.length} moves read`);

let values = [];

let printValues = function () {
    values.forEach(v => {
        process.stdout.write(v);
    });
    console.log();
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


const regexSpin = /s(\d+)/;
const regexExchange = /x(\d+)\/(\d+)/;
const regexPartner = /p(\w)\/(\w)/;

let result;
moves.forEach(m=> {
    result = regexSpin.exec(m);
    if( result ) {
        spin(parseInt(result[1]));
    }

    result = regexExchange.exec(m);
    if( result ) {
        exchange(parseInt(result[1]), parseInt(result[2]));
    }

    result = regexPartner.exec(m);
    if( result ) {
        partner(result[1], result[2]);
    }
});
printValues();
// iabmedjhclofgknp