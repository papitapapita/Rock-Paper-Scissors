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
const options = ['rock', 'paper', 'scissors'];
const winRules = {
  'rock': 'scissors',
  'paper': 'rock',
  'scissors': 'paper'
};

// DOM Elements
const playerStatus = document.querySelector('.player__status-txt');
const buttons = document.querySelectorAll('.player__choice-btn');
const roundTxt = document.querySelector('.round');
const scoreTxt = document.querySelectorAll('.player__score');
const resultTxt = document.querySelector('.result');
const player2ChoiceTxt = document.querySelector('.player__choice--2');
const restartBtn = document.querySelector('.restart-btn');

// Game State
let player1Choice, player2Choice, scores, result, round, gameOver;

// Event Listener for Button Clicks
document.querySelector('.player__choice').addEventListener("click", handleButtonClick);
restartBtn.addEventListener("click", initializeGame);

// Function to Handle Button Click
function handleButtonClick(e) {
  if (e.target && e.target.matches(".player__choice-btn")) {
    makeChoice(e.target.id);
  }
}

// Function to Handle Player Choice and Evaluate Round
function makeChoice(choice) {
    if(gameOver){
        return;
    }
    roundTxt.innerText = `Round ${round}`;
    player1Choice = options.indexOf(choice) + 1;
    playerStatus.innerText = `You chose ${choice}`;
    player2Play();
    evaluate();
}

// Evaluate the Round Result
function evaluate() {
    if (scores[0] >= 3 || scores[1] >= 3) {
        result = scores[0] >= 3 ? 'won the match' : 'lost the match';
        gameOver = true;
        restartBtn.style.display = 'block';
    }else{
        const player1ChoiceName = options[player1Choice - 1];
        if (player1ChoiceName === player2ChoiceTxt.innerText) {
        result = 'tie';
        } else if (winRules[player1ChoiceName] === player2ChoiceTxt.innerText) {
        scores[0]++;
        result = 'win';
        } else {
        scores[1]++;
        result = 'lose';
        }
        round++;
        updateScoreDisplay();
    }
    resultTxt.innerText = `You ${result}`;
}

// Initialize the Game
function initializeGame() {
    scores = [0, 0];
    result = '';
    round = 1;
    gameOver = false;
    roundTxt.innerText = `Round ${round}`;
    restartBtn.style.display = 'none';
    updateScoreDisplay();
    resultTxt.innerText = '';
    player2ChoiceTxt.innerText = '';
    playerStatus.innerText = '';
}

// Update the Score Display
function updateScoreDisplay() {
    scoreTxt[0].innerText = scores[0];
    scoreTxt[1].innerText = scores[1];
}

// Get a Random Choice for Player 2
function player2Play() {
    player2Choice = getRandomInt(1, 3);
    player2ChoiceTxt.innerText = options[player2Choice - 1];
}

// Function for getting a random number with a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize the game when the script loads
initializeGame();