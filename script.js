//1. Having two players
//1.1 Playing with CPU
//1.2 Playing online with a friend
//2. Creating the paper, rock and scissors object
//3. Getting the input of the player
//4. If it is the CPU randomize the result
//5. Validating the result 
//6. Starting over
//7. Give the option of the best of 3


// Game Configuration
const options = {
    'rock': 1,
    'paper': 2,
    'scissors': 3
  };

// DOM Elements
const playerStatus = document.querySelector('.player__status-txt');
const buttons = document.querySelectorAll('.player__choice-btn');
const roundTxt = document.querySelector('.round');
const scoreTxt = document.querySelectorAll('.player__score');
const resultTxt = document.querySelector('.result');
const player2ChoiceTxt = document.querySelector('.player__choice--2');

// Game State
let player1Choice, player2Choice, scores, result, round;

// Event Listener for Button Clicks
document.querySelector('.player__choice').addEventListener("click", (e) => {
    if (e.target && e.target.matches(".player__choice-btn")) {
        makeChoice(e.target.id);
    }
});

// Function to Handle Player Choice and Evaluate Round
function makeChoice(e) {
    roundTxt.innerText = `Round ${round}`;
    player1Choice = options[e];
    playerStatus.innerText = `You chose ${e}`;
    player2Play();
    evaluate();
}

// Evaluate the Round Result
function evaluate() {
    if (
        (player1Choice === 1 && player2Choice === 3) ||
        (player1Choice === 2 && player2Choice === 1) ||
        (player1Choice === 3 && player2Choice === 2)
    ) {
        scores[0]++;
        result = 'win';
    } else if (player1Choice === player2Choice) {
        result = 'tie';
    } else {
        scores[1]++;
        result = 'lose';
    }
    round++;
    resultTxt.innerText = `You ${result}`;
    scoreTxt[0].innerText = scores[0];
    scoreTxt[1].innerText = scores[1];
}

// Initialize the Game
function initializeGame() {
    scores = [0, 0];
    result = '';
    round = 1;
    roundTxt.innerText = `Round ${round}`;
}

// Get a Random Choice for Player 2
function player2Play() {
    player2Choice = getRandomInt(1, 3);
    player2ChoiceTxt.innerText = Object.keys(options)[player2Choice - 1];
}

// Function for getting a random number with a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize the game when the script loads
initializeGame();