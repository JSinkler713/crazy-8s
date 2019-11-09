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
	return deck;
}

let deck = makeDeck();
//shuffle deck
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

//initialize hands
let playerHand = []
let pHandLength;

let computerHand = []
let cHandLength;
//deal opening hands function
let dealSeven = function(deck) {
	//assume deck was shuffled for now
	for (let i=0; i < 7; i++) {
		draw();
		computerDraw();
	}
}

// pass in a hand, and the class of the parent element to attach to
//get computer to update hand and draw if they dont have a card

let computerDraw = function () {
	reshuffle(graveyard);
	let newCard = deck.splice(0,1)[0];
	computerHand.push(newCard);
	let left = computerHand.length;
	let cardDiv = document.createElement('div');
	cardDiv.innerText = `${newCard.value} of ${newCard.suit}`
	cardDiv.classList.add('card');
	cardDiv.style['z-index'] = computerHand.length * 10;
	cardDiv.style.left = (computerHand.length)*30 + 'px';	
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
  cardDiv.style['z-index'] = playerHand.length * 10;
  cardDiv.style.left = (playerHand.length)*30 + 'px';
  cardDiv.addEventListener('click', function() {
	  playCard(newCard);
  });
  document.querySelector(".player-hand").append(cardDiv);
}

//check for win
let checkWin = function(hand) {
	if(hand.length == 0) {
	let winner;
		if(hand == computerHand) {
			winner = "Computer";
		} else {
			winner = "Player";
		}
		let winningStatement = (winner + " has won!");
		let winnerElement = '<div class="winner">'+winningStatement+' Reload the page to play again.'+'</div>';
		document.querySelector('.game').innerHTML = winnerElement;
	}
}

let playFirstCard = function(deck, doneCards) {
	doneCards.push(deck.pop())
}
let doneCards = [];
let graveyard = [];

//put functions in playGameButtonFunction
let playGameButtonFunction = function() {
	dealSeven(deck);
	pHandLength = playerHand.length;
	cHandLength = computerHand.length;
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
		}
	}
	console.log(cardToPlay);
	return cardToPlay;
}

//called everytime after player plays a card
let computerPlay = function () {
	let compCard = findCompCard();
	if (compCard == undefined) {
		//computer needs to keep drawing cards.. use timer to make more like a game
		//take a card from deck and update comp hand and run findCompCard function again
		computerDraw()
		compCard = setTimeout(computerPlay(), 4000);
	} else {
		setTimeout(console.log("The computer is playing it! This is a valid card: " + compCard.value + "of " + compCard.suit), 5000);
		let overWrittenCard = doneCards.pop();
		graveyard.push(overWrittenCard);
		//get index of card and then splice
		let indexOfCard = computerHand.indexOf(compCard);
		//splice out of computerHand
		computerHand.splice(indexOfCard, 1);
		//take out the div element associated with it as well
		let computerHandElement = document.querySelector('.computer-hand');
		let divToRemove = computerHandElement.childNodes[indexOfCard + 1];
		computerHandElement.removeChild(divToRemove);
		//checkwin
		checkWin(computerHand);
		//update position
		for (let i = indexOfCard; i<= computerHand.length; i++) {
			if(i === 0) {
				i++
			}
			let cardToChangeLeft = computerHandElement.childNodes[i];
			console.log(cardToChangeLeft);
			cardToChangeLeft.style.left = i*30 + 'px';
			cardToChangeLeft.style['z-index']= i*10;
			console.log(cardToChangeLeft);
		}
		let playedPileElement = document.querySelector('.played-cards');
		playedPileElement.removeChild(playedPileElement.firstChild);
		doneCards.push(compCard);
		playedCardFunc();
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
	if (card.value == 8) {
		let changeSuit = prompt("That's an eight, what do you want to change the suit to?");
		//
		let newCard = {
			suit: changeSuit,
			value: 8
		}
		let overWrittenCard = doneCards.pop();
		graveyard.push(overWrittenCard);
		//get index of card and then splice
		let indexOfCard = playerHand.indexOf(card);
		//splice out of playerHand
		playerHand.splice(indexOfCard, 1);
		//take out the div element associated with it as well
		let playerHandElement = document.querySelector('.player-hand');
		let divToRemove = playerHandElement.childNodes[indexOfCard + 1];
		playerHandElement.removeChild(divToRemove);
		//check if 0 cards update if won!!
		checkWin(playerHand);
		//update the left position of the next cards....so that they slide over to proper spot
		for (let i = indexOfCard; i<= playerHand.length; i++) {
			if(i === 0) {
				i++
			}
			let cardToChangeLeft = playerHandElement.childNodes[i];
			console.log(cardToChangeLeft);
			cardToChangeLeft.style.left = i*30 + 'px';
			cardToChangeLeft.style['z-index']= i*10;
			console.log(cardToChangeLeft);
		}
		let playedPileElement = document.querySelector('.played-cards');
		playedPileElement.removeChild(playedPileElement.firstChild);
		doneCards.push(newCard);
		playedCardFunc();
		//get computer to play use timer to make more real feeling
		setTimeout(computerPlay, 3000);
	}
	else if (card.suit == doneCards[0].suit || card.value == doneCards[0].value) {
		console.log("Playing it! That is a valid card")
		let overWrittenCard = doneCards.pop();
		graveyard.push(overWrittenCard);
		//get index of card and then splice
		let indexOfCard = playerHand.indexOf(card);
		//splice out of playerHand
		playerHand.splice(indexOfCard, 1);
		//take out the div element associated with it as well
		let playerHandElement = document.querySelector('.player-hand');
		let divToRemove = playerHandElement.childNodes[indexOfCard + 1];
		playerHandElement.removeChild(divToRemove);
		//check win
		checkWin(playerHand);
		let playedPileElement = document.querySelector('.played-cards');
		playedPileElement.removeChild(playedPileElement.firstChild);
		doneCards.push(card);
		playedCardFunc();
		//update position of cards
		for (let i = indexOfCard; i<= playerHand.length; i++) {
			if(i === 0) {
				i++
			}
			let cardToChangeLeft = playerHandElement.childNodes[i];
			console.log(cardToChangeLeft);
			cardToChangeLeft.style.left = i*30 + 'px';
			cardToChangeLeft.style['z-index']= i*10;
			
		}
		//then get computer to play a card use timer to make more real feeling
		setTimeout(computerPlay, 3000);
	}
	else {
		console.log("That doesn't work, you need to match the suit/value/ or play an eight")
	}
}

//enable draw function when deckElement is clicked
let deckElement = document.querySelector('.deck');
deckElement.addEventListener('click', draw);

//toggle computer hand a visible or not
let hide = function (e) {
	this.classList.toggle('hidden');
}
let computerHandElement = document.querySelector('.computer-hand');
computerHandElement.addEventListener('click', hide);
