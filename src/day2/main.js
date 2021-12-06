import fs from "fs";

function read_file() {
    var text = fs.readFileSync("./inputs.txt").toString("utf-8");
    var textByLine = text.split("\n");
    return textByLine;
}

function move(inputs){
    console.log("part1")
    let position = 0;
    let depth = 0;

    for (let i = 0; i < inputs.length; i ++){
        let command = inputs[i].split(" ");
        switch(command[0]) {
            case "forward":
                position += parseInt(command[1]);
                break;
            case "down":
                depth += parseInt(command[1]);
                break;
            case "up":
                depth -= parseInt(command[1]);
                break;
        }
    }
    console.log("horizontal "+ position);
    console.log("depth "+depth);
    console.log(position*depth);
}

function move2(inputs){
    console.log("part2");
    let aim = 0;
    let position =0;
    let depth =0;

    for (let i = 0; i < inputs.length; i ++){
        let command = inputs[i].split(" ");
        switch(command[0]) {
            case "forward":
                position += parseInt(command[1]);
                depth += parseInt(command[1])*aim;
                break;
            case "down":
                aim += parseInt(command[1]);
                break;
            case "up":
                aim -= parseInt(command[1]);
                break;
        }
    }
    console.log("horizontal "+ position);
    console.log("depth "+depth);
    console.log(position*depth);
}

let inputs = read_file();
move(inputs)
move2(inputs)