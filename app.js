let pElement = document.querySelector('p');
let htmlElement = document.querySelector('html');

//function to toggle hidden class
let stylechange = function (e) {
	let target = getEventTarget(e);
	target.classList.toggle('hidden');
}


//this gets the specific element that was clicked..
let getEventTarget = function (event) {
	console.log(event.target);
	return event.target;
}

//By adding to html it will work on all elements on page..
htmlElement.addEventListener('click', stylechange);

