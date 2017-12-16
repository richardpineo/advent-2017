/*jshint esversion: 6 */

let _ = require("lodash");
let knothash = require("./knothash");

let inputs = [
    "",
    "AoC 2017",
    "1,2,3",
    "1,2,4",
    "212,254,178,237,2,0,1,54,167,92,117,125,255,61,159,164"
];
inputs.forEach(knothash.compute);

// 96de9657665675b51cd03f0b3528ba26