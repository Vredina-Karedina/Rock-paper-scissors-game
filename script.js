"Use strict"

let computerScore = 0;
let playerScore = 0;

//Loop the game cycle 5 times
for (let i=0; i<5; i++) {

    //The game rules to determine the winner
    function gameRound (playerFigure, computerFigure) {
        if (playerFigure === "scissors" && computerFigure === "paper" || playerFigure === "paper" && computerFigure === "rock" || playerFigure === "rock" && computerFigure === "scissors") {
            playerScore++;
            return ("You won, " + playerFigure + " beats " + computerFigure +"!");
        } else if (playerFigure === computerFigure) {
            return ("Dead heat, " + computerFigure + " = " + playerFigure +"!");
        } else {
            computerScore++;
            return ("You lose, " + computerFigure + " beats " + playerFigure +"!");
        }
    }

    //Requesting the value from the player
    let playerAnswer = prompt ("Type eiser Rock, Paper or Scissors:");
    let playerFigure = playerAnswer.toLowerCase();
    while (true) {
        if (playerFigure === "rock" || playerFigure === "paper" || playerFigure === "scissors") {
            break;
        } else {
            playerFigure = prompt("You shold choose from eiser Rock, Paper or Scissors:");
        }
    }

    //Requesting the random value from computer
    const figures = ["rock", "paper", "scissors"];
    let computerAnswer = Math.floor(Math.random() * figures.length);
    let computerFigure = figures[computerAnswer];

    //Output the winner of the round to the console
    console.log(gameRound (playerFigure, computerFigure));
    console.log("playerScore: " + playerScore);
    console.log("computerScore: " + computerScore);

}

//Output the game winner to the console
if (playerScore > computerScore) {
    console.log("Congratulations! You won 5-round game!");
} else if (playerScore < computerScore) {
    console.log("You lose the game!");
} else {
    console.log("It's a draw!")
}