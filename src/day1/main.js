'use strict';
import fs from "fs";

function count_depth(input) {
  let increases = 0;
  //console.log(input[0] + " n/a");
  for( let i = 1; i < input.length ; i++){
    if (input[i] > input[i-1]){
      increases++;
    }
  }
  console.log(increases);
}

function count_depth_sliding(input) {
  let summed_depth = [];
  for(let i = 1; i< input.length ; i ++){
    let sum = parseInt(input[i-1]) + parseInt(input[i])+ parseInt(input[i+1]);
    summed_depth.push(sum);
  }
  console.log(summed_depth[0]);
  count_depth(summed_depth);
}

function read_file() {
  var text = fs.readFileSync("./inputs.txt").toString("utf-8");
  var textByLine = text.split("\n");
  return textByLine;
}

let inputs = read_file();
//count_depth(inputs);
count_depth_sliding(inputs);
