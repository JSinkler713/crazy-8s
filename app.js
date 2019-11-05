//will stop you with global variables
'use strict'

//make the deck 52 cards, 13 of each type, 4 suits.
let makeDeck = function() {
	let deck = [];
	let suits = ['clubs', 'hearts', 'spades', 'diamonds'];
	for (let suit of suits) {
		for (let i = 2; i <= 10; i++) {
			let newcard = {};
			newcard.suit = suit;
			newcard.value = i;
			deck.push(newcard);
		}
	}
	console.log("Make Deck: ", deck)
	return deck;
}

let deck = makeDeck();
//shuffle deck
//Need to complete


//deal the player 7 cards need to connect to DOM
let dealSeven = function(deck) {
	//assume deck was shuffled for now
	let playerHand = deck.splice(0, 7);
	console.log("Deal Seven: ", playerHand)
	return playerHand;
}
let playerHand = dealSeven(deck);

let updateHand = function (playerHand) {
	console.log("Update Hand")
	for (let card of playerHand) {
		console.log("Card: ", card)
		let cardDiv = document.createElement('div');
		cardDiv.innerText = `${card.value} of ${card.suit}`
		cardDiv.classList.add('card');
		cardDiv.addEventListener('click', function() {
			playCard(card);
		});
		document.querySelector(".player-hand").append(cardDiv);
	}
}
updateHand(playerHand)

let playFirstCard = function(deck, playedCards) {
	playedCards.push(deck.pop())
}
let playedCards = []
playFirstCard(deck, playedCards)


let playedCardFunc = function () {
  //this should push a card into the array and then display the top card
    for (card of playedCards) {
        let cardDiv = document.createElement('div');
        cardDiv.innerText = `${card.value} of ${card.suit}`;
		cardDiv.classList.add('card');
        document.querySelector(".played-cards").append(cardDiv);
	}
}
//function to allow player to play a card into the "Played" area
let playCard = function (card) {
	//see which card was clicked-its the div that represents it - not the object
	//chec if it has the same "suit" or "value" or is an "eight"
	console.log("User playing: ", card);
	console.log("Compare to: ", playedCards[0])
	//console.log(playedCards[0].value);
	//console.log(playedCards[0].suit);
	if(card.suit == playedCards[0].suit || card.value == playedCards[0].value) {
		console.log("LEGIT!")
	}
	else {
		console.log("BOO")
	}
}



//function to allow player to draw from the deck
let draw = function () {
  let newCard = deck.splice(0,1)[0];
  playerHand.push(newCard);
  let cardDiv = document.createElement('div');
  cardDiv.innerText = `${newCard.value} of ${newCard.suit}`
  cardDiv.classList.add('card');
  cardDiv.addEventListener('click', function() {
	  playCard(newCard);
  });
  document.querySelector(".player-hand").append(cardDiv);
}
  

let deckElement = document.querySelector('.deck');
deckElement.addEventListener('click', draw);

//playedCardFunc();
//console.log(deck);	
