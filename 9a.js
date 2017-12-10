let _ = require("lodash");

var fs = require('fs');
var stream = fs.readFileSync('9-input.txt').toString();
console.log(`Read file, ${stream.length} characters found`);

let cleanStream = function(s) {
    let garbage = false;
    let correct = false;
    let chars = s.split("");
    return chars.reduce((clean, c) => {
        if(garbage) {
            if(correct) {
                correct = false;
                return clean;
            }
            if(c === '!') {
                correct = true;
                return clean;
            }
    
            if(c === '>') {
                garbage = false;
                return clean;
            }
            return clean;
        }
        if(c === '<') {
            garbage = true;
            return clean;
        }
        if(c === '}' || c === "{") {
            return clean + c;
        } 
        return clean;
    }, "");
}

let cs = cleanStream(stream);
//console.log(cs);

let csArray = cs.split("");

let calcScore = function(array) {
    var level = 1;
    let score = array.reduce((score, c) => {
        level = level + ((c === '{') ? 1 : -1);
        return score + level * ((c === '{') ? 0 : 1);
    }, 0);
    return score;
};

let score = calcScore(csArray);
console.log(`score is ${score}`);
// 10050
