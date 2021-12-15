import fs from "fs";

function read_file(name) {
    var text = fs.readFileSync(name).toString("utf-8");
    var positions = text.split(",").map(Number);
    //console.log(positions);
    return positions;
}

function cheapest_position(positions, part){
    //order positions
    positions = positions.sort((a,b)=> a-b);
    let highestPosition = positions[positions.length-1];
    //console.log(positions);
    //group positions
    let group = {}
    for(let pos of positions){
        if(!group[pos]){
            group[pos] = 1;
        } else {
            group[pos] ++;
        }
    }
    //console.log(group);
    //count fuel
    let smallestFuel = find_small_fuel(group, parseInt(highestPosition/2), parseInt(highestPosition/4), part);
    console.log("answer: "+ smallestFuel);
}

function find_small_fuel(positions, currentPoint, difference, part) {
    let currentValue = calculate_fuel(positions, currentPoint, part);

    if (difference == 0) {
        console.log("position: "+ currentPoint + " fuel total: "+ currentValue);
        return currentValue;
    }
    //console.log("current point: "+ currentPoint+" difference "+ difference)
    let highValue = calculate_fuel(positions, currentPoint+difference, part);
    let lowValue = calculate_fuel(positions, currentPoint-difference, part);
    let nextDiff = parseInt(difference/2);
    //console.log("high value: "+ highValue + " low value: "+ lowValue + " current value: "+ currentValue);

    if(highValue<currentValue){
        let nextPoint = currentPoint+difference;
        //console.log("next point to check: "+ nextPoint);
        return find_small_fuel(positions, nextPoint, nextDiff);
    } else if (lowValue<currentValue){
        let nextPoint = currentPoint-difference;
        //console.log("next point to check: "+ nextPoint);
        return find_small_fuel(positions, nextPoint, nextDiff);
    } else {
        return find_small_fuel(positions, currentPoint, nextDiff);
        
        //return currentValue;
    }
}

function calculate_fuel(positions, spot, part){
    let fuel = 0;
    
    for( const [key, value] of Object.entries(positions)){
        let distance = Math.abs(spot - parseInt(key))
        if(part == 1){
        fuel += value*distance;
        } else {
            fuel += value * ((distance*(distance+1))/2);
        }
    }
    return fuel;
}

// var positions = read_file("./inputs-ex.txt");
// cheapest_position(positions,1)
// cheapest_position(positions,2)

var positions = read_file("./inputs.txt");
//cheapest_position(positions, 1)
cheapest_position(positions, 2)