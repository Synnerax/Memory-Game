const cards = document.querySelectorAll('.flip-card-inner');
const cardsall = document.querySelectorAll('.flip-card');
const gameBox = document.getElementById('game')
// const gameBox = document.getElementsByTagName('main')
const startGame = document.getElementById('start-game');
const gameInfo = document.getElementById('game-info-container');
let countMatchedFlips = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


// game score container
let matchedScore = document.getElementById('matched-final-score');
let finalFlips = document.getElementById('total-final-flips');
let flipCounter = document.getElementById('flips-counter');
let scoreCounter = document.getElementById('score-counter');

let countFlips = 0;
let countScore = 0;


// gömmer start screen overlay och visar spel brädan
function gameStart() {
    countMatchedFlips = 0;
    if (gameBox.style.display == "") {
    shuffle();
    gameBox.style.display = "flex";
    } else {
        gameBox.style.display = "";


    }
} 


function shuffle(){
    cardsall.forEach(card => {
        let randomOrder = Math.floor(Math.random() * 16);
        card.style.order = randomOrder;
    });
}

function flipCard(){
    countFlips++;
    flipCounter.innerText = countFlips;
    //låser alla om det ej matchar tills timeOut är klar
    if(lockBoard) return;
    // om kortet du trycker på är samma som fC, körs inte reseten
    if (this === firstCard) return;
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



// overlay när spelet är vunnet
function completedMatchedCard(){
    countMatchedFlips++;
    scoreCounter.innerText = countMatchedFlips;
    if(countMatchedFlips === 8){
        gameOverScreenOn();

        pushScore.innerText = countMatchedFlips + '0';
        
    } return;
}



function resetBoard(){
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard =null;
}





function enableCards(){
    for(let i = 0; i < cards.length;i++){
        cards[i].addEventListener('click', flipCard);
    }
        
}


function gameStartState(){
    shuffle();
    document.getElementById("start-screen").style.display = "none";

}

//resets game from gameover overlay button
function gameOverState(){
        for(let i = 0; i < cards.length;i++){
        cards[i].classList.remove('flip');
        enableCards();
        gameOverScreenOff();
    }
}




function gameOverScreenOn() {
    document.getElementById("overlay").style.display = "block";

}

function gameOverScreenOff() {
    document.getElementById("overlay").style.display = "none";
    countFlips = 0;
    countScore = 0;
} 


// startar igång spelet när start knappen trycks 
document.getElementById('start-game').addEventListener('click', gameStart);

// starta om spelet efter avklarad runda
document.getElementById('restart-game').addEventListener('click', gameOverState);


cards.forEach(card => card.addEventListener('click', flipCard));
startGame.addEventListener('click', gameStartState);






// const startTimer = false
// var count=100;
// var counter=setInterval(timer, 1000); //1000 will  run it every 1 second
// function timer(){

//     count=count-1;
//     if (count <= 0 )
//     {
//         clearInterval(counter);
//      //counter ended, do something here
//         return
//     }
//     //Do code for showing the number of seconds here
//     document.getElementById('time-counter').innerText = count;

// }
