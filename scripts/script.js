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

//play a game of 5 rounds
function game() {
    //reset the score whenever a new game is initialised
    playerScore = 0;
    computerScore = 0;

    for (let i=1; i<=5; i++){
        //define the selections
        const computerSelected = computerPlay();
        const playerSelected = playerSelection();

        //play each round 
        console.log("Round " + i + ": " + playRound(playerSelected, computerSelected));
    }

    //print a result
    console.log(checkWinner());
}


//get player's choice with a prompt
function playerSelection(){
    let loop =true;
    while(loop){
        const playerSelection = window.prompt("Rock? Paper? Scissors?", "Type Rock, Paper, or Scissors");
        if (playerSelection.toLowerCase() === 'rock' || playerSelection.toLowerCase() === 'paper' || playerSelection.toLowerCase() === 'scissors'){
            loop=false;
            return playerSelection;
        }
    }
}
    

//helper function to update score
function keepScore(winner){
    if (winner.toLowerCase() === 'player'){
        playerScore++;
    } else if (winner.toLowerCase() === 'computer') {
        computerScore++;
    } else {
        console.error('keepScore() is undefined');
        return null;
    }
}


//helper function to check winner
//first to 3 wins
function checkWinner(){
    if (playerScore === 3) {
        return `Score is ${playerScore} (Player) : ${computerScore} (Computer) | Player wins!`;
    } else if (computerScore === 3){
        return `Score is ${playerScore} (Player) : ${computerScore} (Computer) | Computer wins!`;
    } else {
        return `Score is ${playerScore} (Player) : ${computerScore} (Computer) | No winner after 5 rounds!`;
    }
}

//play a game when index.html loads
game()
