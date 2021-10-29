//randomly assign a computer choice
function computerPlay() {
    let prob = Math.random(1);
    
    if (prob >= 0.67) {
        return 'Rock';
    } else if (prob >= 0.33) {
        return 'Scissors';
    } else if (prob >= 0) {
        return 'Paper';
    }
}

// a 3x3 matrix shows that there are 9 combinations 
// function to play a round
function playRound(playerSelection, computerSelection){
    comparePlayer = playerSelection.toLowerCase()
    compareComputer = computerSelection.toLowerCase()
    
    switch(true){
        //cases where player wins
        case (comparePlayer==='rock' && compareComputer==='scissors'):
        case (comparePlayer==='scissors' && compareComputer==='paper'):
        case (comparePlayer==='paper' && compareComputer==='rock'):
            keepScore('player');
            return `You Win! ${playerSelection} beats ${computerSelection}`;

        //cases where player loses
        case (compareComputer==='rock' && comparePlayer==='scissors'):
        case (compareComputer==='scissors' && comparePlayer==='paper'):
        case (compareComputer==='paper' && comparePlayer==='rock'):
            keepScore('computer');
            return `You Lose! ${computerSelection} beats ${playerSelection}`;

        //cases of draw
        case (compareComputer===comparePlayer):
            return `Draw! ${computerSelection} draws with ${playerSelection}`;
        
        //default
        default:
            console.error('playRound() result is undefined');
            return null;
    }
}

//define 'global' score variables, which are accessible to keepScore()
let playerScore;
let computerScore;
let roundNumber;

// //play a game of 5 rounds
// function game() {
//     //reset the score whenever a new game is initialised
//     playerScore = 0;
//     computerScore = 0;
    
//     for (let i=1; i<=5; i++){
//         //define the selections
//         const computerSelected = computerPlay();
//         const playerSelected = playerSelection();

//         //play each round 
//         let id = i.toString();
//         let para = "Round " + i + ": " + playRound(playerSelected, computerSelected);
//         console.log(para);
//         createPara(id, para)
//     }

//     //print the game result after 5 rounds
//     gameResult = checkWinner();
//     createPara("gameResult",gameResult);
//     console.log(gameResult);
// }

const playerBoard = document.getElementById("playerScore");
const computerBoard = document.getElementById("computerScore");
const resultBoard = document.getElementById("gameResult");

//game() //better to run function when <body> loads
function game() {
    //reset the score whenever a new game is initialised
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;

    playerBoard.textContent = playerScore;
    computerBoard.textContent = computerScore;
}
const body = document.body;
body.onload = game();


// update state of the game
function updateGame(playerSelection) {
    //game resets if there has been a winner
    if(playerScore >= 5 || computerScore >= 5) {
        game();
    }
    
    //define selections
    const computerSelected = computerPlay();
    const playerSelected = playerSelection;
    
    //play each round 
    let para = "Round " + roundNumber + ": " + playRound(playerSelected, computerSelected);
    console.log(para);
    // createPara(roundNumber, para)
    

    roundNumber+=1;
    resultBoard.textContent = checkWinner();
}


// //get player's choice with a prompt
// function playerSelection(){
//     let loop =true;
//     while(loop){
//         const playerSelection = window.prompt("Rock? Paper? Scissors?", "Rock");
//         if (playerSelection.toLowerCase() === 'rock' || playerSelection.toLowerCase() === 'paper' || playerSelection.toLowerCase() === 'scissors'){
//             loop=false;
//             return playerSelection;
//         }
//     }
// }


//helper function to update score
function keepScore(winner){
    if (winner.toLowerCase() === 'player'){
        playerScore++;
        playerBoard.textContent = playerScore;
        computerBoard.textContent = computerScore;
    } else if (winner.toLowerCase() === 'computer') {
        computerScore++;
        playerBoard.textContent = playerScore;
        computerBoard.textContent = computerScore;
    } else {
        console.error('keepScore() is undefined');
        return null;
    }
}


//helper function to check winner
function checkWinner(){
    //first to 5 points wins
    let winningScore = 5

    if (playerScore >= winningScore) {
        return `Score is ${playerScore} (Player) : ${computerScore} (Computer) | Player wins!`;
    } else if (computerScore >= winningScore){
        return `Score is ${playerScore} (Player) : ${computerScore} (Computer) | Computer wins!`;
    } else {
        return `Score is ${playerScore} (Player) : ${computerScore} (Computer) | No winner yet!`;
    }
}

// //print to <p> element in index.html
// function createPara(id, phrase) {
//     let para = document.createElement("P");
//     let text = document.createTextNode(phrase);
//     para.appendChild(text);
//     document.getElementById(id).appendChild(para);    
// }


// add click event listener to RPS buttons
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // alert(button.id);
        updateGame(button.id);
    })
})
