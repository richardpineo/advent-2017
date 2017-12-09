var fs = require('fs');
var array = fs.readFileSync('7-input.txt').toString().split("\n");
console.log(`Read file, ${array.length} lines found`);

const regex = /(\w+) \((\d+)\)( -> ([a-z, ]+)+)?/;

let objs = array.map((v) => {
    let result = regex.exec(v);
    // group 1 = name
    // group 2 = weight
    // group 4 = carries (may not exist, format is csv 'name, name, ..'
    let carries = [];
    if( result[4]) {
        carries = result[4].split(",").map(s => s.replace(" ", ""));
    }
    return {
        name: result[1],
        weight: result[2],
        carries: carries
    }
});

let findName = function(name) {
    return objs.find(o => o.carries && o.carries.find(n => n === name));
}

// find the one that isn't carried
objs.forEach((o) => {
    if(!findName(o.name)) {
        console.log(`base found: ${o.name}`);
    }
})
// hmvwl

