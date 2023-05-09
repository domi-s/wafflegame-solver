/*
var styleTag = document.createElement("style");
styleTag.innerHTML += `.board { counter-reset: cnter; } .board > .tile::before { counter-increment: cnter; content: counter(cnter); position: absolute; top: 0; left: 0; background: red; font-size: .5em; }`;
document.body.appendChild(styleTag);
*/

String.prototype.replaceAt = function(index, replacement) {
	return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const puzzle   = "BEADHESTCLUAXTLUHCCRH",
      solution = "BEECHRXUADULTSLCHATCH";
var currentPuzzleState = puzzle;

var notInPlace = puzzle.split("").map((el, index) => index).filter(index => puzzle[index] != solution[index]);
var used = [], ln = [], crtAns = [],
    currentStack = [], currentQueue = [],
    numMoves = 0,
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

function findChainBFS(startIndex) {
	var secondTime = false;
	while(currentQueue.length > 0) {
		var index = currentQueue.shift();
		if(index == notInPlace[startIndex]) {
			if(!secondTime) secondTime = true;
			else {
				var ind = used[index];
				var cnt = 1;
				crtAns = [index];
				while(ind != notInPlace[startIndex]) {
					cnt++;
					crtAns.push(ind);
					ind = used[ind];
				}
				ln[startIndex] = cnt;
				return;
			}
		}
		for(let i = 0; i < notInPlace.length; i++) {
			let nextIndex = notInPlace[i];
			if(puzzle[index] == solution[nextIndex]) {
				if(used[nextIndex] !== 0) continue;
				used[nextIndex] = index;
				currentQueue.push(nextIndex);
			}
		}
	}
}

document.body.innerHTML += displayPuzzle(currentPuzzleState, solution);

var allowed = 50;
while(notInPlace.length > 0 && allowed > 0) {
	ln = puzzle.split("").map(el => 0);
	for(let i = 0; i < notInPlace.length; i++) {
		used = puzzle.split("").map(el => 0);
		used[i] = "!";
		currentQueue = [notInPlace[i]];
		findChainBFS(i);
	}
	//console.log(ln);
	var selectedCurrent = ln.indexOf(ln.filter(el => !!el).sort((a, b) => a - b)[0]);

	used = puzzle.split("").map(el => 0);
	used[selectedCurrent] = "!";
	currentQueue = [notInPlace[selectedCurrent]];
	findChainBFS(selectedCurrent);

	//console.log(crtAns);

	// var sol = notInPlace.filter((el, index) => used[index] != 0).map(el => el + 1);
	notInPlace = notInPlace.filter(el => crtAns.indexOf(el) == -1);
	numMoves += crtAns.length - 1;
	crtAns.forEach(el => currentPuzzleState = currentPuzzleState.replaceAt(el, solution[el]));

	console.log(crtAns.map(el => el + 1), notInPlace);
	document.body.innerHTML += displayPuzzle(currentPuzzleState, solution);
	allowed--;
}
console.log((15 - numMoves) + "-star solution found - solved in " + numMoves + " moves!");

function displayPuzzle(puzzle, solution = "?????????????????????") {
	let toret = `<div class='puzzle'>`;
	for(let i = 0, index = 0; i < 5; i++) {
		for(let j = 0; j < 5; j++) {
			if(i % 2 == 1 && j % 2 == 1) {
				toret += `<div class='empty-slot'></div>`;
			} else {
				toret += `<div class='slot ` + (puzzle[index] == solution[index] ? `correct` : `wrong`) + `'>` + puzzle[index] + `</div>`;
				index++;
			}
		}
	}
	toret += `</div>`;
	return toret;
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