/*
var styleTag = document.createElement("style");
styleTag.innerHTML += `.board { counter-reset: cnter; } .board > .tile::before { counter-increment: cnter; content: counter(cnter); position: absolute; top: 0; left: 0; background: red; font-size: .5em; }`;
document.body.appendChild(styleTag);
*/

const puzzle   = "PUMLBEAMLFIYIHXATNNLE",
      solution = "PLUMBLNEAXIALNFITHYME";
var currentSolution = solution;

var notInPlace = puzzle.split("").map((el, index) => index).filter(index => puzzle[index] != solution[index]);
var used = [],
    currentStack = [], currentQueue = [],
    emStop = false;

console.log(notInPlace.map(el => el + " " + puzzle[el] + " " + solution[el]).join("\n"));

function findChainDFS(index) {
	if(emStop) return;
	for(let i = 0; i < notInPlace.length && !emStop; i++) {
		let nextIndex = notInPlace[i];
		if(emStop) return;
		if(puzzle[index] == solution[nextIndex]) {
			if(nextIndex == notInPlace[0]) {
				emStop = true;
			} else {
				if(used[i] !== 0) continue;
				currentStack.push(nextIndex);
				used[i] = 1;
				findChainDFS(nextIndex);
				if(emStop) return;
				used[i] = 0;
				currentStack.pop();
			}
		}
	}
}

function findChainBFS() {
	var secondTime = false;
	while(currentQueue.length > 0) {
		var index = currentQueue.shift();
		console.log(index + "!");
		if(index == notInPlace[0]) {
			if(!secondTime) secondTime = true;
			else return;
		}
		for(let i = 0; i < notInPlace.length; i++) {
			let nextIndex = notInPlace[i];
			if(puzzle[index] == solution[nextIndex]) {
				if(used[i] !== 0 && i != 0) continue;
				used[i] = 1;
				currentQueue.push(nextIndex);
			}
		}
	}
}

var allowed = 1;
while(notInPlace.length > 0 && allowed > 0) {
	used = notInPlace.map(el => 0);
	used[0] = 1;
	currentQueue = [notInPlace[0]];
	emStop = false;
	findChainBFS();

	var sol = notInPlace.filter((el, index) => used[index] != 0).map(el => el + 1);
	notInPlace = notInPlace.filter((el, index) => used[index] == 0);
	console.log(sol, notInPlace);
	allowed--;
}

// var allowed = 50;
// while(notInPlace.length > 0 && allowed > 0) {
// 	used = notInPlace.map(el => 0);
// 	used[0] = 1;
// 	currentStack = [notInPlace[0]];
// 	emStop = false;
// 	findChainDFS(notInPlace[0]);

// 	notInPlace = notInPlace.filter((el, index) => used[index] == 0);
// 	console.log(currentStack.map(el => el + 1), notInPlace);
// 	allowed--;
// }

// while(true) {
// 	let foundPair = false;
// 	for(let i = 0; i < notInPlace.length && foundPair === false; i++) {
// 		for(let j = i + 1; j < notInPlace.length && foundPair === false; j++) {
// 			if(puzzle[notInPlace[i]] == currentSolution[notInPlace[j]] && puzzle[notInPlace[j]] == currentSolution[notInPlace[i]])
// 				foundPair = [notInPlace[i], notInPlace[j]];
// 		}
// 	}
// 	if(foundPair === false) break;
// 	console.log(foundPair);
// 	notInPlace = notInPlace.filter(el => el != foundPair[0] && el != foundPair[1]);
// }