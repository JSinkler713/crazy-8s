//let pElement = document.querySelector('p');
let htmlElement = document.querySelector('html');

//function to toggle hidden class
let allChanges = function (e) {
	//find out which element was targeted
	let target = getEventTarget(e);
	if(target.classList[0] == "deck") {
		//draw a card and put in player hand
		draw();
	}
}


//this gets the specific element that was clicked..
let getEventTarget = function (event) {
	console.log(event.target);
	return event.target;
}

//By adding to html it will work on all elements on page..
htmlElement.addEventListener('click', allChanges);

//make the deck 52 cards, 13 of each type, 4 suits.
let makeDeck = function() {
	let deck = [];
	let suits = ['clubs', 'hearts', 'spades', 'diamonds'];
	for (suit of suits) {
		for (let i = 2; i <= 10; i++) {
		let newcard = {};
		newcard.suit = suit;
		newcard.value = i;
		deck.push(newcard);
		}
	}
	return deck;
}

let deck = makeDeck();
console.log(deck);
//shuffle deck
//Need to complete


//deal the player 7 cards
let deal = function(deck) {
  //assume deck was shuffled for now
  let playerHand = deck.splice(0, 7);
  return playerHand;
}
let playerHand = deal(deck);
let updateHand = function () {
        for (card of playerHand) {
                let text = card.value + " of " + card.suit + "'s";
                console.log(text);
                let cardDiv = document.createElement('div');
                cardDiv.innerText = text;
                cardDiv.classList.add('card');
                document.querySelector(".player-hand").append(cardDiv);
        }
}
console.log(playerHand);
updateHand();
//initialize playedCards array
let playedCards = [];

//flip over the starting card
let initCard = function() {
  let firstCardPlayed = deck.splice(0, 1);
  playedCards.push(firstCardPlayed[0]);
}

console.log(deck);

let playedCardFunc = function () {
  //this should push a card into the array and then display the top card
  //the top card is the one thats just been added.
  
  for (card of playedCards) {
        let text = card.value + " of " + card.suit + "'s";
        console.log(text);
        let cardDiv = document.createElement('div');
        cardDiv.innerText = text;
        cardDiv.classList.add('card');
        document.querySelector(".played-cards").append(cardDiv);
	}
}

//function to allow player to draw from the deck
let draw = function () {
  let newCard = deck.splice(0,1)[0];
  console.log(newCard);
  playerHand.push(newCard);
  let text = newCard.value + " of " + newCard.suit + "'s";
  console.log(text);
  let cardDiv = document.createElement('div');
  cardDiv.innerText = text;
  cardDiv.classList.add('card');
  document.querySelector(".player-hand").append(cardDiv);
}
  



initCard();
playedCardFunc();
console.log(deck);
