import fs from "fs";
import {nthRoot, pow} from "mathjs";

function read_file(name) {
    var text = fs.readFileSync(name).toString("utf-8");
    var fishAges = text.split(",").map(Number);
    //console.log(fishAges);
    return fishAges;
}


function count_fish(ages, days) {
    while(days>0){
        let newFishToAdd = 0;
        for(let i =0; i<ages.length; i++){
            if(ages[i]>0){
                ages[i]--;
            } else if (ages[i]==0){
                ages[i]=6;
                newFishToAdd++;
            }
        }
        while(newFishToAdd>0){
            ages.push(8);
            newFishToAdd--;
        }
        days--;
    }
    //console.log(ages);
    console.log("count: "+ ages.length);
    return ages.length;
}

// function predict_fish(ages, days){
//     // function: y=ab^x
//     let a = ages.length;
//     let y = count_fish(ages,80);
//     //y=a*b^80
//     let b = nthRoot(y/a,80);
//     console.log("a "+a+" b "+b);
//     let finalCount = a*pow(b,days);
//     console.log("predicted count "+finalCount);
// }

function count_fish2(ages, days){
    let groupings = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        'total': 0
    };

    for (let age of ages) {
        groupings[age] ++;
        groupings['total'] ++;
    }

    while(days>0){

        var newFishToGenerate = groupings[0];

        for(let i = 0; i<=7; i++){
            groupings[i] = groupings[i+1];
        }

        groupings[6] += newFishToGenerate;
        groupings[8] = newFishToGenerate;
        groupings['total'] += newFishToGenerate; 

        days--;
    }

    console.log("total: "+ groupings['total']);
}


// var ages = read_file("./inputs-ex.txt");
// // count_fish(ages, 18)
// // count_fish(ages, 80)
// count_fish2(ages,256)

var ages = read_file("./inputs.txt");
// //count_fish(ages, 80);
count_fish2(ages, 256);