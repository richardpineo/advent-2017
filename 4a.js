/*jshint esversion: 6 */

var fs = require('fs');
var array = fs.readFileSync('./data/4-input.txt').toString().split("\n");
console.log(`Read file, ${array.length} lines found`);

let isValid = function(v) {
    let tokens = v.split(" ");
    return tokens.reduce((isValid, token, index, tokens) => {
        if( !isValid ) {
            return false;
        }

        let matches = tokens.filter(t => t === token);
        return matches.length === 1;
    }, true);
}

let numValid = array.reduce((count, val) => {
    return count + (isValid(val) ? 1 : 0);
}, 0)

console.log(`${numValid} matching pass phrases found`);
// 455

