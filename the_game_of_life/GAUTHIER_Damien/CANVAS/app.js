// Canvas Cheat Sheet 1 : http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/
// Canvas Cheat sheet 2 : https://simon.html5.org/dump/html5-canvas-cheat-sheet.html

// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");
// create grille
for (var i = 0; i < 400; i = i + 10) {
	context.beginPath();
	context.moveTo(i, 0);
	context.lineTo(i, 400);
	context.closePath();
	context.strokeStyle = "Black";
	context.lineWidth = 1;
	context.stroke();
}

for (var i = 0; i < 400; i = i + 10) {
	context.beginPath();
	context.moveTo(0, i);
	context.lineTo(400, i);
	context.closePath();
	context.strokeStyle = "Black";
	context.lineWidth = 1;
	context.stroke();
}

// tab 40*40
var tabCellule = new Array(1600);
var nbColumn = 40;
var timestamp = 0;

// remplir le tab d'objet !!!
for (var i = 0; i < tabCellule.length; i++) {
	tabCellule[i] = new Cellule();
	// set x et y
	tabCellule[i].x = i % nbColumn;
	tabCellule[i].y = (i - tabCellule[i].x)/nbColumn;
}

function evolution(){
	// foreach tabCellule, countingNeighbour -> kill||born
	for (var i = 0; i < tabCellule.length; i++) {
		var tmpCount = tabCellule[i].countingNeighbour();
		//console.log(tmpCount);
		//	cellule avec 4 ou + voisins meurt de surpopulation
		if (tmpCount >= 4) {
			tabCellule[i].survivedNextLevel = false;
		//	chaque cellue avec 2 ou 3 voisins survi ou nait
		} else if (tmpCount == 2 || tmpCount == 3) {
			tabCellule[i].survivedNextLevel = true;
		//	cel avec 1 ou 0 voisins meurs de solitude
		} else {
			tabCellule[i].survivedNextLevel = false;
		}
	}
	for (var i = 0; i < tabCellule.length; i++) {
		if (tabCellule[i].survivedNextLevel) {
			tabCellule[i].born();
		} else {
			tabCellule[i].kill();
		}
	}
}


//try it
function step(){
	if (timestamp == 0) {
		timestamp = 50;
		evolution();
	}
	if (timestamp > 0) {
		timestamp --;
	}
	requestAnimationFrame(step);
}

//test 
/*tabCellule[302].draw();
tabCellule[399].draw();
tabCellule[400].draw();
tabCellule[401].draw();
tabCellule[402].draw();
tabCellule[403].draw();*/

for (var i = 0; i < 5; i++) {
	//tabCellule[300 + i].draw();
	tabCellule[540 + i].draw();
	tabCellule[630 + i].draw();
	tabCellule[670 + i].draw();
}
/*
console.log(tabCellule[302]);
console.log(tabCellule[399]);
console.log(tabCellule[400]);
console.log(tabCellule[401]);
console.log(tabCellule[402]);
console.log(tabCellule[403]);*/



console.log("countingNeighbour 0 : " + tabCellule[0].countingNeighbour());
console.log("countingNeighbour 632 : " + tabCellule[632].countingNeighbour());
step();
console.log("countingNeighbour 672 : " + tabCellule[672].countingNeighbour());

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;