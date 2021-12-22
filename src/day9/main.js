import fs from "fs";
import { i } from "mathjs";

function read_file(name) {
    var text = fs.readFileSync(name).toString("utf-8");
    var d1 = text.split('\n');
    let d2 = [];
    for (let pos in d1){
        d2.push(d1[pos].split('').map(Number));
    }
    //console.log(d2);
    return d2;
}

function lava_tubes(map) {
    let lowPoints = [];
    let risk = 0;
    const iLength = map.length;

    let heightMap = map
    for (var i = 0; i < iLength; i++) {
        var row = heightMap[i];
        for (var j = 0; j < row.length; j++) {
            let top = (i === 0 ? 10 : heightMap[i - 1][j]);
            let right = (j === row.length - 1 ? 10 : row[j + 1]);
            let bottom = (i === iLength - 1 ? 10 : heightMap[i + 1][j]);
            let left = (j === 0 ? 10 : row[j - 1]);

            if (row[j] < top && row[j] < right && row[j] < bottom && row[j] < left) {
                risk += (row[j] + 1);
                lowPoints.push(new Node(j, i));
            }
        }
    }
    //console.log(lowPoints);
    //let risk= lowPoints.reduce((a,b)=> a+b,0);
    console.log(risk);
}

// var heightmap = read_file("./inputs-ex.txt");
// lava_tubes(heightmap)

var heightmap = read_file("./inputs.txt");
lava_tubes(heightmap)