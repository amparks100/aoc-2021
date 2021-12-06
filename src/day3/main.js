import fs from "fs";

function read_file() {
    var text = fs.readFileSync("./inputs.txt").toString("utf-8");
    var textByLine = text.split("\n");
    return textByLine;
}

function power_consumption(inputs){
    console.log("part1")
    let gamma = [];
    let epsilon = [];

    let half = inputs.length / 2;
    let x = 0;
    while(x<= 11){
        let iCounter = 0;
        for(let i = 0; i< inputs.length; i++) {
            if(inputs[i].charAt(x)==='1'){
                iCounter++;
            }
        }
        
        if(iCounter>half){
            gamma.push(1);
            epsilon.push(0);
        } else {
            epsilon.push(1);
            gamma.push(0);
        }
        x++;
    }

    //convert to decimal
    let gammaD = parseInt(gamma.join('') , 2);
    let epsilonD = parseInt(epsilon.join(''), 2);
    console.log("gamma decimal " + gammaD);
    console.log("epsilon decimal " + epsilonD);
    console.log(gammaD*epsilonD);
}

function life_support_rating(inputs){
    console.log("part2")
    let oneCounter = 0;
    let half = inputs.length / 2;
    let mostCommon='0';
    let oxygenInputs = [];
    let coInputs = [];
    for( let i = 0; i< inputs.length; i++){
        if(inputs[i].charAt(0)==='1'){
            oneCounter++;
        }
    }
    if(oneCounter>=half){
        mostCommon = '1';
    }
    for( let i = 0; i< inputs.length; i++){
        if(inputs[i].charAt(0)===mostCommon){
            oxygenInputs.push(inputs[i]);
        } else {
            coInputs.push(inputs[i]);
        }
    }

    let oxRating = oxygen_rating(oxygenInputs);
    let coRating = co_rating(coInputs);
    let oxD = parseInt(oxRating , 2);
    let coD = parseInt(coRating, 2);
    console.log("oxygen decimal " + oxD);
    console.log("co decimal " + coD);
    console.log(oxD*coD);
}

function oxygen_rating(inputs){
    let list = inputs;
    let x = 1;
    while(x < 11 && list.length>1){
        
        let oneCounter = 0;
        let half = Math.round(list.length / 2);
        let mostCommon='0';
        for(let i = 0; i< list.length; i++) {
            if(list[i].charAt(x)==='1'){
                oneCounter++;
            }
        }
        if(oneCounter>=half){
            mostCommon = '1';
        }
        //console.log("ox: char "+ x+ "found most common "+mostCommon);
        //console.log("ox: one counter "+ oneCounter+ " half "+ half);
        //list.filter(bits => bits.charAt(x) === mostCommon);
        list = filterList(list, x, mostCommon);
        x++;
    }
    console.log("oxygen found: " + list[0]);
    return list[0];
}

function filterList(list, index, charToKeep) {
    let newList = [];
    for( let i = 0; i< list.length; i++){
        if(list[i].charAt(index)===charToKeep){
            newList.push(list[i]);
        } 
    }
    //console.log("new list: "+ newList)
    return newList;
}

function co_rating(inputs){
    let list = inputs;
    let x = 1;
    while(x < 11 && list.length>1){
        //console.log("char "+x+" list: "+ list)
        let oneCounter = 0;
        let half = Math.round(list.length / 2);
        let leastCommon='1';
        for(let i = 0; i< list.length; i++) {
            if(list[i].charAt(x)==='1'){
                oneCounter++;
            }
        }
        if(oneCounter>=half){
            leastCommon = '0';
        } 
        //console.log("ox: char "+ x+" one counter "+oneCounter+ " half "+ half+  "found least common "+leastCommon);
        list = filterList(list, x, leastCommon);
        x++;
    }
    console.log("co2 found: "+ list[0]);
    return list[0];
}

let inputs = read_file();
life_support_rating(inputs)