var colors = require('colors');

console.log("starting up".green)

console.log("\n1a".red);
require("./1a");

console.log("\n1b".red);
require("./1b");

console.log("\n2a".red);
require("./2a");

console.log("\n2b".red);
require("./2b");

console.log("\n3a".red);
require("./3a");

console.log("\n4a".red);
require("./4a");


console.log("\nshutting down".green)

process.exit();