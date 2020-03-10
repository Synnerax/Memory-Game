const cards = document.querySelectorAll('.flip-card-inner');
const cardImg = document.querySelectorAll('.flip-card')
let addedCards = []

addedCards.push(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8)

function randomCards(){
    for(let i = 0; i < addedCards.length; i++){
        let random = Math.floor(Math.random() * 15);
        pushCard = addedCards[random];
        cardImg[i].innerText = pushCard;
        console.log(pushCard);
    } 

};


randomCards();

function flipCard(event) {

this.classList.toggle('flip');
}


/**
 * when card is clicked > toggles class "flip" to the card
 */
cards.forEach(card => card.addEventListener('click', flipCard));

