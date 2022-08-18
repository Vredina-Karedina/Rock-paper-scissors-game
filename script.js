"Use strict"

let computerScore = 0;
let playerScore = 0;
let score = "";
let text = "";

const buttons = document.querySelectorAll(".buttons button");
buttons.forEach(button => {
    button.disabled = true;
    button.classList.add(':disabled');
});


// Rules
const display = document.querySelector(".display");
const rules = document.querySelector(".rules");
rules.addEventListener("click", showRules);

function showRules() {
    let rulesText = "Rock paper scissors, the game has 3 outcomes: win, lose, draw.\r\n"
    rulesText += "Rules are fairly simple: rock beats scissors, scissors beat paper, paper beats rock.\r\n"
    rulesText += "If both players choose the same item they will tie and the game will repeat to break the tie.\r\n"
    rulesText += "To win the game 5 points on either player’s end must be scored."

    if (display.textContent !== rulesText) {
        display.textContent = rulesText;
        display.classList.add("rules-text");
    } else {
        display.textContent = score + "\r\n" + text;
        display.classList.remove("rules-text");
    }
}

// Start of game
let leftPalm = document.createElement("img");
let rightPalm = document.createElement("img");
const start = document.querySelector(".start");
const invitation = document.querySelector("h1");
start.addEventListener("click", showScore);

function showScore () {
    leftPalm.src = "images/rock-hand-colored-flipped.png";
    leftPalm.alt = "Fist";
    leftPalm.classList.add("left-palm-img");
    document.querySelector(".left-palm").appendChild(leftPalm);

    rightPalm.src = "images/rock-hand-colored.png";
    rightPalm.alt = "Fist";
    rightPalm.classList.add("right-palm-img");
    document.querySelector(".right-palm").appendChild(rightPalm);

    display.classList.remove("rules-text");
    invitation.textContent = "";
    computerScore = 0;
    playerScore = 0;
    score = `Score:\r\n${computerScore}   :   ${playerScore}`;
    text = "Choose either Rock, Paper or Scissors!";
    display.textContent = `${score}\r\n${text}`;
    buttons.forEach(button => {
        button.disabled = false;
        button.classList.remove(':disabled');
    });
    leftPalm.style.setProperty("--rotateLeftHand", 40 + "deg");
    rightPalm.style.setProperty("--rotateRightHand", -40 + "deg");
}


//---------GAME LOGIC---------

let playerFigure;
let computerFigure;

// Player choise
let playerChoise = function () {
    playerFigure = this.className;

    // Right palm processing
    rightPalm.src = `images/${playerFigure}-hand-colored.png`;
    rightPalm.alt = `${playerFigure}`;
    rightPalm.style.setProperty("--rotateRightHand", -90 + "deg");
    document.querySelector(".right-palm").appendChild(rightPalm);

    return playerFigure;
}
buttons.forEach(button => button.addEventListener("click", playerChoise));

function game (playerChoise) {
    display.classList.remove("rules-text");

    // Computer choise
    let computerChoise = function () {
        const figures = ["rock", "paper", "scissors"];
        let computerAnswer = Math.floor(Math.random() * figures.length);
        computerFigure = figures[computerAnswer];

        // Left palm processing
        leftPalm.src = `images/${computerFigure}-hand-colored-flipped.png`;
        leftPalm.alt = `${computerFigure}`;
        leftPalm.style.setProperty("--rotateLeftHand", 90 + "deg");
        document.querySelector(".left-palm").appendChild(leftPalm);
    
        return computerFigure;
    }
    computerChoise();
    
    // Round winner
    function roundScore(playerFigure, computerFigure) {
        if (playerFigure === "scissors" && computerFigure === "paper"
            || playerFigure === "paper" && computerFigure === "rock"
            || playerFigure === "rock" && computerFigure === "scissors") {
            playerScore++;
            text = "You won, " + playerFigure + " beats " + computerFigure +"!";
        } else if (playerFigure === computerFigure) {
            text = "Dead heat, " + computerFigure + " = " + playerFigure +"!";
        } else {
            computerScore++;
            text = "You lose, " + computerFigure + " beats " + playerFigure +"!";
        }
        score = `Score:\r\n ${computerScore}   :   ${playerScore}`;
    }
    roundScore(playerFigure, computerFigure);

    // Game winner
    //The game continues untill some player's score riches 5
    function gameEnd () {
        if (playerScore >= 5 || computerScore >= 5) {
            invitation.textContent = "- Play Rock-Paper-Scissors game with me again!";

            if (playerScore > computerScore) {
                text = text + "\r\nCONGRATULATIONS! YOU WON THE GAME!\r\nTo start the next game press Start.";
            } else {
                text = text + "\r\nYOU LOSE THE GAME!\r\nTo start the next game press Start.";
            }
            display.textContent = `${score} \r\n`
            display.textContent +=  `${text} \r\n`;

            buttons.forEach(button => {
                button.disabled = true;
                button.classList.add(':disabled');
            });
        } else {
            display.textContent = `${score} \r\n`
            display.textContent += `${text} \r\n`;
        }
    }
    gameEnd ();
}

buttons.forEach(button => button.addEventListener("click", game));
