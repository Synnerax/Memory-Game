/** 
 * ----------------------------------------------------------------------------------------------
 *                                   Variables 
 * ----------------------------------------------------------------------------------------------
 */
const cards = document.querySelectorAll('.flip-card-inner');
const gameBox = document.getElementById('game')
const startGameButton = document.getElementById('start-game');
const restartGameButton = document.getElementById('restart-game');


const totalScore = document.getElementById('matched-total-score');
const totalFlips = document.getElementById('total-flips');
const flipCounter = document.getElementById('flips-counter');
const scoreCounter = document.getElementById('score-counter');

let countFlips = 0;
let countScore = 0;
let countMatchedFlips = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

/** 
 * ----------------------------------------------------------------------------------------------
 *                                   Game Logic
 * ----------------------------------------------------------------------------------------------
 */
// gömmer start screen overlay och visar spel brädan
// function gameStart() {
//     countMatchedFlips = 0;
//     if (gameBox.style.display == "") {
//     gameStartState();
//     shuffle();
//     gameBox.style.display = "flex";
//     } else {
//         gameBox.style.display = "";
//     }
// } 

function gameStart(){
    countMatchedFlips = 0;
    gameBox.classList.toggle('hide')
    gameStartState();
    shuffle();
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


// matching cards 
function checkCards(){
    // matching cards 
    if (firstCard.dataset.framework === 
        secondCard.dataset.framework) {
            disableCards();
            completedMatchedCard();
            console.log(countMatchedFlips)
        } else {
            //no match
            unflipCards();
        }
}



//resets game from gameover overlay button
function restartGame(){
    countFlips = 0;
    countScore = 0;
    flipCounter.innerText = countFlips;
    scoreCounter.innerText = countScore;
    for(let i = 0; i < cards.length;i++){
    cards[i].classList.remove('flip');
    enableCards();
    gameOverScreenOff();
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



// overlay när spelet är vunnet
function completedMatchedCard(){
    countMatchedFlips++;
    scoreCounter.innerText = countMatchedFlips;
    if(countMatchedFlips === 8){
        gameOverScreenOn();
        totalFlips.innerText = countFlips;
        totalScore.innerText = countMatchedFlips;
        
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
    }, 700);     // matched 
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







function gameStartState(){
    shuffle();
    document.getElementById("start-screen").style.display = "none";

}


// when all cards are matched, goes to win overylay
function gameOverScreenOn() {
    document.getElementById("overlay").style.display = "block";

}

// resets win overlay and resets score counter
function gameOverScreenOff() {
    document.getElementById("overlay").style.display = "none";
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

// lägger till så att alla kort kan "flippa"
cards.forEach(card => card.addEventListener('click', flipCard));


