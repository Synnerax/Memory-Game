/** 
 * ----------------------------------------------------------------------------------------------
 *                                   Variables 
 * ----------------------------------------------------------------------------------------------
 */
const cards = document.querySelectorAll('.flip-card-inner');
const gameBox = document.getElementById('game')
const startGameButton = document.getElementById('start-game');
const restartGameButton = document.getElementById('restart-game');
const restartGameButtonLost = document.getElementById('restart-game-lost');


const scoreTime = document.getElementById('game-timer');
const totalScore = document.getElementById('matched-total-score');
const totalFlips = document.getElementById('total-flips');
const flipCounter = document.getElementById('flips-counter');
const scoreCounter = document.getElementById('score-counter');
const finalTime = document.getElementById('final-time');

// losing screen values
const totalFlipsLost = document.getElementById('total-flips-lost');
const totalScoreLost = document.getElementById('matched-total-score-lost');

let time = 101;
let countFlips = 0;
let countScore = 0;
let countMatchedFlips = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


let gameTimer;
let countDown = function(){
    
    if (time > 0){
        time--;
        scoreTime.innerText = time;
    }else {
        clearInterval(gameTimer);
        gameOverScreenOnLost();
        totalFlipsLost.innerText = countFlips;
        totalScoreLost.innerText = countMatchedFlips;
    }
}
/** 
 * ----------------------------------------------------------------------------------------------
 *                                   Game Logic
 * ----------------------------------------------------------------------------------------------
 */
function gameStart(){
    time = 101;
    countMatchedFlips = 0;
    gameBox.classList.toggle('hide');
    gameStartState();
    shuffle();
    startTimeNow();
}

function flipCard(){
    //låser alla om det ej matchar tills timeOut är klar
    if(lockBoard) return;
    // om kortet du trycker på är samma som fC, körs inte reseten
    if (this === firstCard) return;
    countFlips++;
    flipCounter.innerText = countFlips;
    this.classList.toggle('flip')
    // om hasFlippedCard = false kommer den bytas till true
        if (!hasFlippedCard){
            hasFlippedCard = true;
            firstCard = this;
        } else { // om hasFlippedCard = true sparas de till second
            secondCard = this;
            checkCards();
            
        }
}


function checkCards(){
    // matching cards 
    if (firstCard.dataset.framework === 
        secondCard.dataset.framework) {
            disableCards();
            completedMatchedCard();
            console.log(countMatchedFlips)
        } else {
            //no matching cards
            unflipCards();
        }
}



function restartGame(){
    countMatchedFlips = 0;
    countFlips = 0;
    countScore = 0;
    time = 100;
    scoreTime.innerText = time;
    flipCounter.innerText = countFlips;
    startTimeNow();    
    for(let i = 0; i < cards.length;i++){
    cards[i].classList.remove('flip');
    enableCards();
    gameOverScreenOff();
    gameOverScreenOffLost();
}
}



/** 
 * ----------------------------------------------------------------------------------------------
 *                                   Game Functions
 * ----------------------------------------------------------------------------------------------
 */



function shuffle(){
    const cardsall = document.querySelectorAll('.flip-card');
        cardsall.forEach(card => {
            let randomOrder = Math.floor(Math.random() * 16);
            card.style.order = randomOrder;
    });
}


// matchar kort upp till 8 par, går sedan till winst overlay
function completedMatchedCard(){
    countMatchedFlips++;
    countScore+=10;
    if(countMatchedFlips === 8){
        gameOverScreenOn();
        clearTimer();
        totalFlips.innerText = countFlips;
        totalScore.innerText = countMatchedFlips;
        finalTime.innerText = time;
        document.getElementById('display-score').innerText = countScore + time - countFlips;
        
    } return;
}


// om firstCard och secondCard har samma värde, lås korten 
function disableCards(){
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    console.log('Match');
    resetBoard();

}
// om fC och sC har olika värden, vänd på koren igen
function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 700);    
}


function enableCards(){
    for(let i = 0; i < cards.length;i++){
        cards[i].addEventListener('click', flipCard);
    }
        
}

function resetBoard(){
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard =null;
}


function startTimeNow(){
    gameTimer = setInterval(countDown, 1000);
}
function clearTimer() {
    clearInterval(gameTimer);
}


function gameStartState(){
    shuffle();
    document.getElementById("start-screen").style.display = "none";
}

function gameOverScreenOn() {
    document.getElementById("overlay").style.display = "block";
}
function gameOverScreenOff() {
    document.getElementById("overlay").style.display = "none";
} 
function gameOverScreenOnLost() {
document.getElementById("overlay-lost").style.display = "block";
}
function gameOverScreenOffLost() {
    document.getElementById("overlay-lost").style.display = "none";
}
/** 
 * ----------------------------------------------------------------------------------------------
 *                                   Event Listeners
 * ----------------------------------------------------------------------------------------------
 */



// startar igång spelet när start knappen trycks 
startGameButton.addEventListener('click', gameStart);

// starta om spelet efter avklarad runda
restartGameButton.addEventListener('click', restartGame);
restartGameButtonLost.addEventListener('click', restartGame);

// lägger till så att alla kort kan "flippa"
cards.forEach(card => card.addEventListener('click', flipCard));

