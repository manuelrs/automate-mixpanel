#!/usr/bin/env node
var clone = require("./clone");
var copyDir = require("./copyDir");

var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  var a = clone.cloneiOS("temp");

  console.log("a ", a);

  if (a === "finished") {
    resolve("Stuff worked!");
  } else {
    reject(Error("It broke"));
  }
});

promise.then(
  function(result) {
    console.log(result); // "Stuff worked!"
  },
  function(err) {
    console.log(err); // Error: "It broke"
    process.exit();
  }
);
