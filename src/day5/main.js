import fs from "fs";

function read_file(name) {
    var text = fs.readFileSync(name).toString("utf-8");
    var textByLine = text.split("\n");
    var coordinates = []
    for (let i = 0; i < textByLine.length; i++) {
        var coords = textByLine[i].split(" -> ");
        coordinates.push(coords);
    }
    //console.log(coordinates);
    return coordinates;
}


function draw_lines(coordinates, size) {
    //initialize board
    var map = [...Array(size)].map(e => Array(size).fill(0));;

    for (let i = 0; i < coordinates.length; i++) {
        let startingPoint = coordinates[i][0].split(",").map(Number);
        let endingPoint = coordinates[i][1].split(",").map(Number);
        map = mark_map(map, startingPoint, endingPoint);
    }
    console.log(map);

    //count intersections
    let counter = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (map[i][j] > 1) {
                counter++;
            }
        }
    }
    console.log("intersections: " + counter);
}

function mark_map(map, startingPoint, endingPoint) {

    //console.log("coords" + startingPoint + " " +  endingPoint)
    let [startingX, startingY] = startingPoint;
    let [endingX, endingY] = endingPoint;
    //horizontal
    if (startingX === endingX) {
        if (endingY < startingY) {
            let temp = endingY;
            endingY = startingY;
            startingY = temp;
        }
        for (let y = startingY; y <= endingY; y++) {
            map[startingX][y] = parseInt(map[startingX][y]) + 1;

        }
        //vertical
    } else if (startingY === endingY) {
        if (endingX < startingX) {
            let temp = endingX;
            endingX = startingX;
            startingX = temp;
        }
        for (let x = startingX; x <= endingX; x++) {
            map[x][startingY] = parseInt(map[x][startingY]) + 1;

        }
    } else {
        //flip if direction reversed
        if (endingX < startingX) {
            let temp = endingX;
            let temp2 = endingY;
            endingX = startingX;
            endingY = startingY;
            startingX = temp;
            startingY = temp2;
        }
        let ydiag = startingY;
        if (startingY < endingY) {
            for (let x = startingX; x <= endingX; x++) {
                map[x][ydiag] = parseInt(map[x][ydiag]) + 1;
                ydiag++;
            }
        } else {
            for (let x = startingX; x <= endingX; x++) {
                map[x][ydiag] = parseInt(map[x][ydiag]) + 1;
                ydiag--;
            }
        }
    }


    return map;
}

// var coords = read_file("./inputs-ex.txt");
// draw_lines(coords, 10)

var coords = read_file("./inputs.txt");
draw_lines(coords, 999);