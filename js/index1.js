const cards = document.querySelectorAll('.flip-card-inner');
const cardImg = document.querySelectorAll('.flip-card-back')
let addedCards = []

let hasFlippedCard = false;

let lockBoard = false;
let firstCard, secondCard;

function flipCard() {

    if (lockBoard) return;
        this.classList.toggle('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    return;
    }
    secondCard = this;
    hasFlippedCard = false;

    checkForMatch();
};


function checkForMatch() {
    let isMatch = firstCard.innerText == secondCard.innerText;
    isMatch ? disableCards() : unflipCards();
};


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

cards.forEach(card => card.addEventListener('click', flipCard));

