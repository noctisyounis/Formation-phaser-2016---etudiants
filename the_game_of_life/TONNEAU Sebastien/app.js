/*
	- Une cellule avec 1 ou 0 voisins meurs de solitude
	- Une cellule avec 4 ou + voisins meurs de surpopulation
	- chaque cellule avec 2 ou 3 voisin survi ou nait

	BONUS
	- click pour activer / désactiver la cellule
	- space pour pause la simulation
	- button next generation (si pause étape par étape)
	- couleurs 	bleu si elle vient de naître
				verte si elle survit
				rouge si elle va mourir au prochain tour
*/

// select the canvas
var canvas = document.querySelector("#canvas");
	canvas.width = 100; 
	canvas.height = 100;

// set the context
var context = canvas.getContext("2d");
var canvasCenterX = canvas.width / 2;
var canvasCenterY = canvas.height / 2;

var arrayCellules = [];
var onPause = true;
var celluleByColumn = canvas.width / 10;
var celluleByRow = canvas.height / 10;
var timestamp = 50;

// set space to pause

//grille
for (var i = 0; i < celluleByColumn; i++) {
	context.beginPath();
	context.moveTo(10*i, 0);
	context.lineTo(10*i, 600);
	context.stroke();
}

for (var i = 0; i < celluleByRow; i++) {
	context.beginPath();
	context.moveTo(0, 10*i);
	context.lineTo(800, 10*i);
	context.stroke();
}

// création des cellules
var x = 0;
var y = 0;
for (var i = 0; i < celluleByColumn * celluleByRow; i++) {

	var newCellule = new Cellule(x, y);
	newCellule.create();
	arrayCellules.push(newCellule);
	x++;

	if (x >= celluleByColumn) {	
		y++;
		x = 0;
	}
}

function evolution() {
	for (var i = 0; i < arrayCellules.length; i++) {
		
		for (var j = 0; j < arrayCellules.length; j++) {
			if (arrayCellules[i].x != arrayCellules[j].x && arrayCellules[i].y != arrayCellules[j].y) {

				// haut
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].y == (arrayCellules[j].y - 10)) &&
					(arrayCellules[i].x == arrayCellules[j].x) ) {
					arrayCellules[i].voisinNumber++;
				}

				// droite
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].x == (arrayCellules[j].x - 10)) &&
					(arrayCellules[i].y == arrayCellules[j].y) ) {
					arrayCellules[i].voisinNumber++;
				}

				// bas
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].y == (arrayCellules[j].y + 10)) &&
					(arrayCellules[i].x == arrayCellules[j].x) ) {
					arrayCellules[i].voisinNumber++;
				}

				// gauche
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].x == (arrayCellules[j].x + 10)) &&
					(arrayCellules[i].y == arrayCellules[j].y) ) {
					arrayCellules[i].voisinNumber++;
				}

				// haut gauche
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].x == (arrayCellules[j].x - 10)) &&
					(arrayCellules[i].y == (arrayCellules[j].y - 10)) ) {
					arrayCellules[i].voisinNumber++;
				}

				// haut droite
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].x == (arrayCellules[j].x + 10)) &&
					(arrayCellules[i].y == (arrayCellules[j].y - 10)) ) {
					arrayCellules[i].voisinNumber++;
				}

				// bas gauche
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].x == (arrayCellules[j].x - 10)) &&
					(arrayCellules[i].y == (arrayCellules[j].y + 10)) ) {
					arrayCellules[i].voisinNumber++;
				}

				// bas droite
				if ( arrayCellules[j].isActive &&
					(arrayCellules[i].x == (arrayCellules[j].x + 10)) &&
					(arrayCellules[i].y == (arrayCellules[j].y + 10)) ) {
					arrayCellules[i].voisinNumber++;
				}

				// selon le nombre de voisin la cellule meurt ou pas
				// va mourir

				/*if (arrayCellules[i].isActive && (arrayCellules[i].voisinNumber <= 1 || arrayCellules[i].voisinNumber >= 4) ) {
					arrayCellules[i].setLife(false);
					//va naitre
				} else if(!arrayCellules[i].isActive && 2 <= arrayCellules[i].voisinNumber <= 3) {
					console.log(arrayCellules[i].voisinNumber)
					arrayCellules[i].setLife(true);
					// va survivre
				} else if(arrayCellules[i].isActive && 2 <= arrayCellules[i].voisinNumber <= 3) {
					arrayCellules[i].setLife(true);
				}

				arrayCellules[i].voisinNumber = 0;*/
			}
		}
	console.log(arrayCellules[i].voisinNumber)
	}
	console.log(arrayCellules)
}

//evolution en temps réel
function updateEvolution() {
	// check les voisins des cellules
	if (!onPause && timestamp == 0) {
		timestamp = 50;
		evolution();
	}

	if (timestamp != 0) {
		timestamp--;
	}

	requestAnimationFrame(updateEvolution);
}

function evolutionPerStep(event){
	if (event.keyCode == 13) {
		evolution();
	}
}

function pause(event) {
	if (event.keyCode == 32) {
		if (onPause) {	
			onPause = false;		
			console.log("play");
		} else {
			onPause = true;		
			console.log("pause");
		}
	}
}

function setActive(event) {
	console.log("x: " + event.clientX);
	console.log("y: " + event.clientY);

	for (var i = 0; i < arrayCellules.length; i++) {
		if (arrayCellules[i].x < event.clientX && arrayCellules[i].x + 10 > event.clientX) {
			if (arrayCellules[i].y < event.clientY && arrayCellules[i].y + 10 > event.clientY) {
				arrayCellules[i].toggleActive();
			}
		}
	}
}

/*
	EVENT
*/
window.addEventListener("keydown", evolutionPerStep)
window.addEventListener("keydown", pause);
window.addEventListener("click", setActive);

window.requestAnimationFrame = 	window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// Execution
updateEvolution();