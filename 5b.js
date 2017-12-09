/*jshint esversion: 6 */

var fs = require('fs');
var array = fs.readFileSync('5-input.txt').toString().split("\n");
console.log(`Read file, ${array.length} lines found`);

let numbers = array.map(v => parseInt(v));

let index = 0;
let count = 0;
while(true) {
    if( index >= numbers.length || index < 0 ) {
        console.log("exit found");
        break;
    }

    let step = numbers[index];
    let newIndex = index + step;
    numbers[index] = numbers[index] + (step>=3 ? -1 : 1);
    index += step;
    count++;
}

console.log(`Solved in ${count} steps`);
// 21985262

