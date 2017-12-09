/*jshint esversion: 6 */

var fs = require('fs');
var array = fs.readFileSync('5-input.txt').toString().split("\n");
console.log(`Read file, ${array.length} lines found`);

let numbers = array.map(v => parseInt(v));

let solve = function(index, count) {
    if( numbers.length < index || index < 0 ) {
        return count;
    }

    let step = numbers[index];
    console.log(`${count} step at index ${index} has value ${step}`);

    numbers[index] = numbers[index] + 1;
    return solve(index + step, count + 1);
}
// recursion is too deep
// let count = solve(0, 0);

let index = 0;
let count = 0;
while(true) {
    if( index >= numbers.length || index < 0 ) {
        console.log("exit found");
        break;
    }

    let newIndex = index + numbers[index];
    numbers[index] = numbers[index] + 1;
    index = newIndex;
    count++;
}

console.log(`Solved in ${count} steps`);
// 336905

