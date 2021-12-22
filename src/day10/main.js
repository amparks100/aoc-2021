import fs from "fs";
import { basename } from "path";

function read_file(name) {
    var text = fs.readFileSync(name).toString("utf-8");
    var d1 = text.split('\n');
    return d1;
}

function syntax_error(navigation) {

    var scores = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }

    let invalid_closes = []
    for(let i =0; i<navigation.length; i++){
        let bad_close = find_first_invalid_close(navigation[i]);
        if(bad_close!=''){
            invalid_closes.push(bad_close);
        }else{
            //part2
            
        }
    }
    console.log("found bad closes: "+invalid_closes);
    let total_score = 0;
    for(let i= 0; i< invalid_closes.length; i++){
        let score = scores[invalid_closes[i]];
        total_score+=score;
    }
    console.log("error score: "+ total_score)
}

function find_first_invalid_close(line){
    var closings = {
        ')': '(',
        ']':'[',
        '}':'{',
        '>':'<'
    }
    let openings = ['(','{','[','<'];
    let openOrder = [];
    for(let i = 0; i<line.length; i++){
        let character = line.charAt(i);
        if(openings.includes(character)){
            openOrder.push(character);
        } else {
            //console.log("found a closing char "+ character);
            if(openOrder[openOrder.length-1] != closings[character]){
                console.log("character doesnt match" + openOrder[openOrder.length-1]+ " "+character);
                return character;
            } else{
                openOrder.pop();
            }
        }
    }
    return ''
}

// var navigation = read_file("./inputs-ex.txt");
// syntax_error(navigation)

var navigation = read_file("./inputs.txt");
syntax_error(navigation)