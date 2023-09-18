#!/usr/bin/env node
 // $node r-example.js

var R = require("r-script");

// sync
var out = R("R-Sync/ex-sync.R")
    .data("hello world", 20)
    .callSync();
console.log(out);

// async
var attitude = JSON.parse(
    require("fs").readFileSync("R-Async/attitude.json", "utf8"));

R("R-Async/ex-async.R")
    .data({ df: attitude, nGroups: 3, fxn: "mean" })
    .call(function(err, d) {
        if (err) throw err.toString();
        console.log(d);
    });