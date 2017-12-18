/*jshint esversion: 6 */

let _ = require("lodash");

var fs = require('fs');
var commandsRaw = fs.readFileSync('./data/18-input.txt').toString().split("\n");

/*
commandsRaw = `snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`.split("\n");*/

console.log(`${commandsRaw.length} commands read`);

const regexCommand = /(...) (.) ?([\w\d-]*)/;

let commands = commandsRaw.map(c => {
    let result = regexCommand.exec(c);
    return {
        which: result[1],
        register: result[2],
        arg: result.length === 4 ? result[3] : undefined
    };
});

let getVal = function (program, name) {
    let value = program.registers[name];
    if( value === undefined ) {
        value = 0;
        // console.log(`access p${program.id} ${name} not found ***`);
    }
    // console.log(`access p${program.id} ${name} => ${value}`);
    return value;
};
let putVal = function (program, name, value) {
    // console.log(`put    p${program.id} ${name} <= ${value}`);
    program.registers[name] = value;
};
let getValSmart = function (program, nameOrVal) {
    if( nameOrVal === "" ) {
        return undefined;
    }
    let numVal = parseInt(nameOrVal);
    if (Number.isNaN(numVal)) {
        return getVal(program, nameOrVal);
    }
    return numVal;
};

// returns 1 for no more instructions
// returns 2 for waiting to receive
let executeNextCommand = function (program) {
    if (program.commandPos < 0 || program.commandPos >= commands.length) {
        return 1;
    }

    let command = commands[program.commandPos];

    let register = command.register;
    let arg = command.arg;

    let regVal = getValSmart(program, register);
    let argVal = getValSmart(program, arg);
    let commandInc = 1;
    switch (command.which) {
        case "set":
            putVal(program, register, argVal);
            break;
        case "add":
            putVal(program, register, regVal + argVal);
            break;
        case "mul":
            putVal(program, register, regVal * argVal);
            break;
        case "mod":
            putVal(program, register, regVal % argVal);
            break;
        case "jgz":
            if (regVal > 0) {
                commandInc = argVal;
            }
            break;
        case "snd":
            program._otherProgram.queue.push(regVal);
            program.sendValueCount++;
            break;
        case "rcv":
            if (!program.queue.length) {
                return 1;
            }
            let val = program.queue.shift();
            putVal(program, register, val);
            break;
        default:
            throw ("Nope!");
    }
    program.commandPos = program.commandPos + commandInc;
    if (program.commandPos < 0 || program.commandPos >= commands.length) {
        return 1;
    }
    program.count++;
    return 0;
};

let p0 = {
    id: 0,
    commandPos: 0,
    count: 0,
    sendValueCount: 0,
    registers: { "p": 0 },
    queue: [],
};
let p1 = {
    id: 1,
    commandPos: 0,
    count: 0,
    sendValueCount: 0,
    registers: { "p": 1 },
    queue: [],
};

p0._otherProgram = p1;
p1._otherProgram = p0;

let executeUntilHung = function(program) {
    let count = 0;
    for( let ret = executeNextCommand(program); !ret; ret = executeNextCommand(program) ) {
        count++;
    }
    return count;
};

let totalExecutions = 0;
while (true) {
    let count0 = executeUntilHung(p0);
    let count1 = executeUntilHung(p1);
    if (!count0 && !count1) {
        // both have nothing to do - out of instructions or deadlocked
        console.log();
        console.log(`Total command executions: ${totalExecutions}`);
        console.log(`Program 1 sent ${p1.sendValueCount} values`);
        return;
    }
    totalExecutions = totalExecutions + count0 + count1;
}

// 2951