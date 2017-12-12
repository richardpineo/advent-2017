/*jshint esversion: 6 */
let _ = require("lodash");

var fs = require('fs');
var pipes = fs.readFileSync('./data/12-input.txt').toString().split("\n");
console.log(`${pipes.length} pipes read`);

const regex = /^([0-9]+) <-> ([0-9, ]+)$/;

let groups = pipes.map((p) => {
    let result = regex.exec(p);
    // group 1 = source
    // group 2 = csv of dests
    if (result.length != 3) {
        throw ("nope");
    }
    let group = [parseInt(result[1])];
    let dests = result[2].split(", ");
    dests.forEach(d => group.push(parseInt(d)));
    return _.uniq(group);
});

console.log(`${groups.length} pipes converted`);
console.log(`Reducing the groups... this is gonna take a while.`);

var start = new Date();

// Holy crap this is inefficient
let outCount = 0;
let consolidate = function() {
    for(let i=0; i<groups.length; i++ ) {
        for(let j=groups.length-1; j>i; j--) {
            // If any of the members of source group are the test group, absorb the test group.
            let intersect = _.intersection(groups[i], groups[j]);
            if(intersect && intersect.length) {
                // They match - combine them
                groups[i] = _.union(groups[i], groups[j]);
                _.pullAt(groups, j);
                process.stdout.write(".");
                if(outCount++ > 80) {
                    process.stdout.write("\n");
                    outCount = 0;
                }
                return true;
            }
        }
    };
    return false;
};

while( consolidate() ) {}

let elapsedMs = new Date().getTime() - start.getTime();
console.log("");
console.log(`Consolidated to ${groups.length} groups in ${elapsedMs} ms`);

console.log(`${groups[0].length} members of the group containing 0`);
console.log(`${groups.length} total groups`);
// 306 members of the group containing 0
// 200 total groups