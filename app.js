//let pElement = document.querySelector('p');
//let htmlElement = document.querySelector('html');

//function to toggle hidden class
//let stylechange = function (e) {
//	let target = getEventTarget(e);
//	target.classList.toggle('hidden');
//}


//this gets the specific element that was clicked..
//let getEventTarget = function (event) {
//	console.log(event.target);
//	return event.target;
//}

//By adding to html it will work on all elements on page..
//htmlElement.addEventListener('click', stylechange);

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



//deal the player 7 cards
let deal = function(deck) {
  //assume deck was shuffled for now
  let playerHand = deck.splice(0, 7);
  return playerHand;
}
let playerHand = deal(deck);

console.log(playerHand);

//flip over the starting card
let startgame = function() {
  let firstCardPlayed = deck.splice(0, 1);
  return firstCardPlayed;
}
let firstCardPlayed = startgame();

console.log(firstCardPlayed);
console.log(deck);

