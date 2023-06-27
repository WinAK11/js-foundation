const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const playerScorePara = document.getElementById("playerScore");
const computerScorePara = document.getElementById("computerScore");
const scoreInfo = document.getElementById("scoreInfo");
const endgameMsg = document.getElementById("result");
rockBtn.addEventListener("click", () => handleClick("Rock"));
paperBtn.addEventListener("click", () => handleClick("Paper"));
scissorsBtn.addEventListener("click", () => handleClick("Scissors"));

let getComputerChoice = () => {
    let choice = Math.floor(Math.random() * 3 + 1);
    switch (choice) {
        case 1:
            choice = "Rock";
            break;
        case 2:
            choice = "Paper";
            break;
        case 3:
            choice = "Scissors";
            break;
        default:
            break;
    }
    return choice;
};
let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

let finalMessage = () => {
    return playerScore > computerScore
        ? (endgameMsg.textContent = "You won!")
        : (endgameMsg.textContent = "You lost...");
};
let isGameOver = () => {
    return playerScore === 5 || computerScore === 5;
};

let playRound = (playerSelection, computerSelection) => {
    if (playerSelection == computerSelection) roundWinner = "tie";
    if (
        (playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Scissors" && computerSelection === "Paper") ||
        (playerSelection === "Paper" && computerSelection === "Rock")
    ) {
        playerScore++;
        roundWinner = "player";
    }
    if (
        (computerSelection === "Rock" && playerSelection === "Scissors") ||
        (computerSelection === "Scissors" && playerSelection === "Paper") ||
        (computerSelection === "Paper" && playerSelection === "Rock")
    ) {
        computerScore++;
        roundWinner = "computer";
    }
    updateScoreMessage(roundWinner, playerSelection, computerSelection);
};
let showModal = () => {
    finalMessage();
    $("#exampleModal").modal("show");
};

let handleClick = (playerChoice) => {
    if (isGameOver()) {
        showModal();
        return;
    }
    let computerChoice = getComputerChoice();
    playRound(playerChoice, computerChoice);
    updateChoice(playerChoice, computerChoice);
    updateScore();
};

let updateChoice = (player, computer) => {
    switch (player) {
        case "Rock":
            playerSign.textContent = "✊";
            break;
        case "Paper":
            playerSign.textContent = "✋";
            break;
        case "Scissors":
            playerSign.textContent = "✌";
            break;
        default:
            break;
    }
    switch (computer) {
        case "Rock":
            computerSign.textContent = "✊";
            break;
        case "Paper":
            computerSign.textContent = "✋";
            break;
        case "Scissors":
            computerSign.textContent = "✌";
            break;
        default:
            break;
    }
};

let updateScore = () => {
    if (roundWinner === "tie") {
        scoreInfo.textContent = "It's a tie!";
    } else if (roundWinner === "player") {
        scoreInfo.textContent = "You won!";
    } else if (roundWinner === "computer") {
        scoreInfo.textContent = "You lost!";
    }

    playerScorePara.textContent = `Player: ${playerScore}`;
    computerScorePara.textContent = `Computer: ${computerScore}`;
};
let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
let updateScoreMessage = (winner, playerSelection, computerSelection) => {
    if (winner === "player") {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} beats ${computerSelection.toLowerCase()}`;
        return;
    }
    if (winner === "computer") {
        scoreMessage.textContent = `${capitalizeFirstLetter(
            playerSelection
        )} is beaten by ${computerSelection.toLowerCase()}`;
        return;
    }

    scoreMessage.textContent = `${capitalizeFirstLetter(
        playerSelection
    )} ties with ${computerSelection.toLowerCase()}`;
};

let restart = () => {
    playerScore = 0;
    computerScore = 0;
    scoreInfo.textContent = "Choose your weapon";
    scoreMessage.textContent = "First to score 5 points wins the game";
    playerScorePara.textContent = "Player: 0";
    computerScorePara.textContent = "Computer: 0";
    playerSign.textContent = "❔";
    computerSign.textContent = "❔";
};
