let _ = require("lodash");

var fs = require('fs');
var array = fs.readFileSync('./data/8-input.txt').toString().split("\n");
console.log(`Read file, ${array.length} lines found`);

var registers = {}

let getVal = function(v) {
    if(registers[v] === undefined) {
        return 0;
    }
    return registers[v];
}

let putVal = function(reg, oper, operVal) {
    registers[reg] = getVal(reg) + ((oper === "inc" ? 1 : -1)*operVal);
}

let evalCond = function(a, cond, b) {
    switch(cond) {
        case "==": return a == b;
        case "!=": return a != b;
        case ">": return a > b;
        case ">=": return a >= b;
        case "<": return a < b;
        case "<=": return a <= b;
        default: throw("nope " + cond);
    }
}

let evalParsed = function(parsed) {
    let val = getVal(parsed.regCond);
    if( evalCond( val, parsed.cond, parsed.condVal ) ) {
        putVal(parsed.regTo, parsed.oper, parsed.operVal);
        // console.log(`assigned ${parsed.regTo} to ${val}. ${JSON.stringify(parsed)}`);
    }
}

let getMax = function() {
    let max;
    for (var name in registers) {
        if (registers.hasOwnProperty(name)) {
            if( max === undefined || registers[name] > max ) {
                max = registers[name];
            } 
        }
    };
    return max;
}

let regex = /(\w+) (\w+) (-?\d+) if (\w+) (\S+) (-?\d+)/;

let totalMax = undefined;
array.forEach((v) => {
    //console.log(v);
    let expMatch = regex.exec(v);
    if(expMatch.length !== 7) {
        console.log(`no match: ${v}`);
    }
    let parsed = {
        regTo: expMatch[1],
        oper: expMatch[2],
        operVal: parseInt(expMatch[3]),
        regCond: expMatch[4],
        cond: expMatch[5],
        condVal: parseInt(expMatch[6])
    }
    // console.log(JSON.stringify(parsed));
    evalParsed(parsed);
    let thisMax = getMax();
    if(totalMax === undefined || thisMax > totalMax) {
        totalMax = thisMax;
    }
});

console.log(`maximum value: ${totalMax}`);
// 6347
