import fs from "fs";

function get_boards(fileName) {
    var text = fs.readFileSync(fileName).toString("utf-8");
    var textByLine = text.split("\n");
    //var boards = textByLine.split("");
    textByLine = textByLine.filter(x => x !== "");
    let inputs = [];
    for (let i = 0; i < textByLine.length; i++) {
        let formatted = textByLine[i].replace("  ", " ").split(/\s+/);
        formatted = formatted.filter(x => x !== '');
        inputs.push(formatted.map(Number));
    }
    //console.log(inputs);
    var boards = [];
    while (inputs.length > 0) {
        boards.push(inputs.splice(0, 5));
    }

    //console.log(boards);
    return boards;
}

function bingo_game(boards, draws) {
    console.log("part1")
    //for each draw
    for (let i = 0; i <= draws.length; i++) {
        let calledNumber = draws[i];
        boards = mark_boards(boards, calledNumber);
        let winningBoardIndexes = check_win(boards);
        //console.log("hi", winningBoard);
        let winningBoardIndex = winningBoardIndexes[0];
        if (winningBoard) {
            console.log("do math")
            let sum = calculate_sum(boards[winningBoardIndex]);
            console.log("final score ", sum * calledNumber);
            break;
        }
    }
}

function bingo_game_losing(boards, draws) {
    console.log("part2")
    //for each draw
    var calledNumber;
    var done = false;
    for (let i = 0; i <= draws.length; i++) {
        console.log(draws[i] + " drawn")
        calledNumber = draws[i];
        boards = mark_boards(boards, calledNumber);
        let winningBoardIndexes = check_win(boards);
        if (winningBoardIndexes.length > 0) {
            console.log(winningBoardIndexes.length+ " winning boards");
            //winningBoardIndexes.forEach(winningBoardIndex => {boards.splice(winningBoardIndex, 1);});
            for (let w = 0; w < winningBoardIndexes.length; w++) {
                let winningBoardIndex = winningBoardIndexes[w];
                console.log("boards remaining: " + boards.length)
                if (boards.length == 1) {
                    console.log("do math for last board")
                    console.log(boards[0]);
                    let sum = calculate_sum(boards[0]);
                    console.log("sum" + sum)
                    console.log("final score ", sum * calledNumber);
                    done = true;
                    break;
                }
                boards.splice(winningBoardIndex, 1);
            }
        }
        if (done) break;


    }



}

function mark_boards(boards, number) {
    boards.forEach(board => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j <= 4; j++) {
                if (board[i][j] == number) {
                    board[i][j] = -1;
                }
            }
        }
    });
    return boards;
}

function check_win(boards) {
    
    var winningIndex = [];
    for (let x = 0; x < boards.length; x++) {
        let board = boards[x]
        let alreadyWon = false;
        //check rows
        for (let i = 0; i < board.length; i++) {
            let row = board[i];
            //console.log("row to check"+ row);
            var sum = row.reduce(function (a, b) {
                return a + b;
            }, 0);
            //console.log("sum "+sum)
            if (sum == -5) {
                console.log("found winner row!")
                alreadyWon = true;
                winningIndex.push(x);
                break;
            }
        }
        if(alreadyWon) continue;
        //check columns
        //console.log("board to check")
        //console.log(board)
        for (let i = 0; i < board.length; i++) {
            let columSum = 0;
            for (let j = 0; j < 5; j++) {
                columSum += board[j][i];
            }
            //console.log(columSum)
            if (columSum == -5) {
                console.log("found winner column!")
                
                winningIndex.push(x);
                break;
            }
        }
    }
    return winningIndex;
}

function calculate_sum(board) {
    let sum = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j <= 4; j++) {
            if (board[i][j] != -1) {
                sum += board[i][j];
            }
        }
    }
    return sum;
}


// let boardsEx = get_boards("./boards-ex.txt");
// let drawsEx = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];
// //let drawsEx = [22,8,21,6,1]
// bingo_game_losing(boardsEx, drawsEx);

let boards = get_boards("./boards.txt");
let draws = [1,76,38,96,62,41,27,33,4,2,94,15,89,25,66,14,30,0,71,21,48,44,87,73,60,50,77,45,29,18,5,99,65,16,93,95,37,3,52,32,46,80,98,63,92,24,35,55,12,81,51,17,70,78,61,91,54,8,72,40,74,68,75,67,39,64,10,53,9,31,6,7,47,42,90,20,19,36,22,43,58,28,79,86,57,49,83,84,97,11,85,26,69,23,59,82,88,34,56,13];
//bingo_game(boards,draws)
bingo_game_losing(boards, draws)
