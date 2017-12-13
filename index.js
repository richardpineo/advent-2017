/*jshint esversion: 6 */

var colors = require('colors');

console.log("starting up".blue);

let all = [
    "./1a", "./1b",
    "./2a", "./2b",
    "./3a", "./3b",
    "./4a", "./4b",
    "./5a", "./5b",
    "./6a", "./6b",
    "./7a", "./7b",
    "./8a", "./8b",
    "./9a", "./9b",
    "./10a", "./10b",
    "./11a", "./11b",
    "./12",
    "./13a", "./13b"
];

let toRun = function () {
    if (process.argv.length > 2) {
        let tests = process.argv.slice(2);
        console.log(`Running tests ${tests.join(", ")}`.gray);
        return tests;
    }
    console.log("Running all tests...".gray);
    return all;
};

toRun().forEach(r => {
    console.log("-----".green);
    console.log(`--> Solving advent puzzle ${r}`.red);
    require(r);
    console.log("-----".green);
});

console.log("\nshutting down".blue);
process.exit();