//will stop you with global variables
'use strict'

//make the deck 52 cards, 13 of each type, 4 suits.
let makeDeck = function() {
	let deck = [];
	let facecards = ['Ace', 'King', 'Queen', 'Jack'];
	let suits = ['clubs', 'hearts', 'spades', 'diamonds'];
	for (let suit of suits) {
		for (let i = 2; i <= 10; i++) {
			let newcard = {};
			newcard.suit = suit;
			newcard.value = i;
			deck.push(newcard);
		}
		for (let face of facecards) {
			let newcard = {
				suit: suit,
				value: face
			}
			deck.push(newcard);
		}
	} 
	console.log("Make Deck: ", deck)
	return deck;
}

let deck = makeDeck();
//shuffle deck
console.log(deck);
let shuffle = function(deck) {
	let length = deck.length;
	let shuffledDeck = [];
	while (length > 0) {
		let randomIndex = Math.floor(Math.random()*length);
		let randomCard = deck.splice(randomIndex, 1);
		shuffledDeck.push(randomCard[0]);
		length -= 1;
	}
	return shuffledDeck;
}
deck = shuffle(deck)
console.log(deck);


//deal computer and player hands and update DOM

//deal the player 7 cards need to connect to DOM
let dealSeven = function(deck) {
	//assume deck was shuffled for now
	let playerHand = deck.splice(0, 7);
	console.log("Deal Seven: ", playerHand)
	return playerHand;
}
//deal player
//let playerHand = dealSeven(deck);
let playerHand;
let pHandLength;
//get length .. if ever 0 after this it's Game over Player Wins
//let pHandLength = playerHand.length;

//deal computer
//let computerHand = dealSeven(deck);
let computerHand;
let cHandLength;
//get length .. if ever 0 after this it's Game over Comp wins
//let cHandLength = computerHand.length;
// pass in a hand, and the class of the parent element to attach to

//check for win
let checkWin = function(hand) {
	if(hand.length == 0) {
		console.log("WINNNNERRRR");
		let winnerElement = '<span class="winner">Game Over we all won!!!</span>';
		document.querySelector('.game').innerHTML = winnerElement;
	}
}


let updateHand = function (Hand, parentClass) {
	console.log("Update Hand")
	for (let card of Hand) {
		console.log("Card: ", card)
		let cardDiv = document.createElement('div');
		cardDiv.innerText = `${card.value} of ${card.suit}`
		cardDiv.classList.add('card');
		//if user than add this part form DOM interactivity
		if (Hand == playerHand) {
			cardDiv.addEventListener('click', function() {
				playCard(card);
			});
		}
		document.querySelector(parentClass).append(cardDiv);
	}
}
//attach to DOM playerHand
//updateHand(playerHand, ".player-hand")
//attach to DOM computerhand
//updateHand(computerHand, ".computer-hand")



let playFirstCard = function(deck, doneCards) {
	doneCards.push(deck.pop())
}
let doneCards = [];
let graveyard = [];
//playFirstCard(deck, doneCards)




//put functions in playGameButtonFunction


let playGameButtonFunction = function() {
	playerHand = dealSeven(deck);
	pHandLength = playerHand.length;
	updateHand(playerHand, ".player-hand")
	computerHand = dealSeven(deck);
	cHandLength = computerHand.length;
	updateHand(computerHand, ".computer-hand")
	playFirstCard(deck, doneCards);
	playedCardFunc();
}

let buttonElement = document.querySelector('.start');
buttonElement.addEventListener('click', playGameButtonFunction);

//function to allow the computer to play a card from their hand or if none available draw a card.
let findCompCard = function () {
	let cardToPlay;
	for (let card of computerHand) {
		if (card.suit == doneCards[0].suit || card.value == doneCards[0].value) {
		cardToPlay = card;
		} else if (card.value == 8) {
		cardToPlay = card;
		//maybe choose random suit later
		}
	}
	console.log(cardToPlay);
	return cardToPlay;
}

//called everytime after player plays a card
let computerPlay = function () {
	let compCard = findCompCard();
	console.log("what do i have:" + compCard)
	console.log(typeof compCard);
	if (compCard == undefined) {
		//computer needs to keep drawing cards.. use timer to make more like a game
		//take a card from deck and update comp hand and run findCompCard function again
		computerDraw()
		compCard = setTimeout(computerPlay(), 4000);
	} else {
		setTimeout(console.log("The computer is playing it! This is a valid card: " + compCard.value + "of " + compCard.suit), 5000);
		let overWrittenCard = doneCards.pop();
		graveyard.push(overWrittenCard);
		//need to remove card from computerHand
		//get index of card and then splice
		let indexOfCard = computerHand.indexOf(compCard);
		//splice out of computerHand
		computerHand.splice(indexOfCard, 1);
		//take out the div element associated with it as well
		let computerHandElement = document.querySelector('.computer-hand');
		let divToRemove = computerHandElement.childNodes[indexOfCard + 1];
		computerHandElement.removeChild(divToRemove);
		//console.log(indexOfCard);
		let playedPileElement = document.querySelector('.played-cards');
		playedPileElement.removeChild(playedPileElement.firstChild);
		doneCards.push(compCard);
		playedCardFunc();
		//check if hand empty if so console log winner!!!!!
		checkWin(computerHand);
	}
}
let playedCardFunc = function () {
  //this should push a card into the array and then display the top card
    for (let card of doneCards) {
        let cardDiv = document.createElement('div');
        cardDiv.innerText = `${card.value} of ${card.suit}`;
		cardDiv.classList.add('card');
        document.querySelector(".played-cards").append(cardDiv);
	}
}
//call function to show played cards in browser
playedCardFunc();


//function to allow player to play a card into the "Played" area
let playCard = function (card) {
	//see which card was clicked-its the div that represents it - not the object
	//chec if it has the same "suit" or "value" or is an "eight"
	console.log("User playing: ", card);
	console.log("Compare to: ", doneCards[0])
	//console.log(playedCards[0].value);
	//console.log(playedCards[0].suit);
	if (card.value == 8) {
		let changeSuit = prompt("That's an eight, what do you want to change the suit to?");
		//
		let newCard = {
			suit: changeSuit,
			value: 8
		}
		let overWrittenCard = doneCards.pop();
		graveyard.push(overWrittenCard);
		//need to remove card from playerHand
		//get index of card and then splice
		let indexOfCard = playerHand.indexOf(card);
		//splice out of playerHand
		playerHand.splice(indexOfCard, 1);
		//take out the div element associated with it as well
		let playerHandElement = document.querySelector('.player-hand');
		let divToRemove = playerHandElement.childNodes[indexOfCard + 1];
		playerHandElement.removeChild(divToRemove);
		//console.log(indexOfCard);
		let playedPileElement = document.querySelector('.played-cards');
		playedPileElement.removeChild(playedPileElement.firstChild);
		doneCards.push(newCard);
		playedCardFunc();
		//check if hand empty if so console log winner!!!!!
		checkWin(playerHand);
		//then get computer to play use timer to make more real feeling
		setTimeout(computerPlay, 3000);
	}
	else if (card.suit == doneCards[0].suit || card.value == doneCards[0].value) {
		console.log("Playing it! That is a valid card")
		let overWrittenCard = doneCards.pop();
		graveyard.push(overWrittenCard);
		//need to remove card from playerHand
		//get index of card and then splice
		let indexOfCard = playerHand.indexOf(card);
		//splice out of playerHand
		playerHand.splice(indexOfCard, 1);
		//take out the div element associated with it as well
		let playerHandElement = document.querySelector('.player-hand');
		let divToRemove = playerHandElement.childNodes[indexOfCard + 1];
		playerHandElement.removeChild(divToRemove);
		//console.log(indexOfCard);
		let playedPileElement = document.querySelector('.played-cards');
		playedPileElement.removeChild(playedPileElement.firstChild);
		doneCards.push(card);
		playedCardFunc();
		//check if hand empty if so console log winner!!!!!
		checkWin(playerHand);
		//then get computer to play a card use timer to make more real feeling
		setTimeout(computerPlay, 3000);
	}
	else {
		console.log("That doesn't work, you need to match the suit/value/ or play an eight")
	}
}


//get computer to update hand and draw if they dont have a card
let computerDraw = function () {
	reshuffle(graveyard);
	let newCard = deck.splice(0,1)[0];
	computerHand.push(newCard);
	let cardDiv = document.createElement('div');
	cardDiv.innerText = `${newCard.value} of ${newCard.suit}`
	cardDiv.classList.add('card');
	document.querySelector(".computer-hand").append(cardDiv);
}
//function to update deck with used cards if the deck gets to a size of zero
//player and computer may draw all the cards before game ends
let reshuffle = function(usedCards) {
	if (deck.length == 0 ) {
		deck = shuffle(usedCards);
	}
}

//function to allow player to draw from the deck
let draw = function () {
  reshuffle(graveyard);
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

//enable draw function when deckElement is clicked
let deckElement = document.querySelector('.deck');
deckElement.addEventListener('click', draw);

//toggle computer hand a visible or not
let hide = function (e) {
	this.classList.toggle('hidden');
}
let computerHandElement = document.querySelector('.computer-hand');
console.log(computerHandElement);
computerHandElement.addEventListener('click', hide);
