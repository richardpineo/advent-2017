/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var commands = fs.readFileSync('./data/18-input.txt').toString().split("\n");
console.log(`${commands.length} commands read`);

let registers = {};

let getVal = function (name) {
    return registers[name] || 0;
};
let putVal = function (name, value) {
    registers[name] = value;
};
let getValSmart = function (nameOrVal) {
    let numVal = parseInt(nameOrVal);
    if (Number.isNaN(numVal)) {
        return getVal(nameOrVal);
    }
    return numVal;
};

const regexCommand = /(...) (.) ?([\w\d-]*)/;

let commandPos = 0;
let recovered;
let count = 0;
let freq;
while (!recovered) {
    let str = commands[commandPos];
    if (!str) {
        break;
    }
    let result = regexCommand.exec(str);
    let which = result[1];
    let register = result[2];
    let arg = result.length === 4 ? result[3] : undefined;
    let regVal = getVal(register);
    let argVal = getValSmart(arg);
    switch (which) {
        case "snd":
            freq = regVal;
            commandPos++;
            break;
        case "set":
            putVal(register, argVal);
            commandPos++;
            break;
        case "add":
            putVal(register, regVal + argVal);
            commandPos++;
            break;
        case "mul":
            putVal(register, regVal * argVal);
            commandPos++;
            break;
        case "mod":
            putVal(register, regVal % argVal);
            commandPos++;
            break;
        case "rcv":
            if (regVal) {
                recovered = freq;
            }
            commandPos++;
            break;
        case "jgz":
            if (regVal > 0) {
                commandPos += argVal;
            }
            else {
                commandPos++;
            }
            break;
        default:
            throw ("Nope!");
    }
    count++;
}

console.log(`${recovered} frequency recovered in ${count} steps`);
// 2951