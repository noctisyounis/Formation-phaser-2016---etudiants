// Canvas Cheat Sheet 1 : http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/
// Canvas Cheat sheet 2 : https://simon.html5.org/dump/html5-canvas-cheat-sheet.html

// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");

var celluleWith = 40;
var celluleHeight = 40;
// tab 10*10
var tabCellule = new Array(100);
var nbColumn = 10;
var timestamp = 0;

// create grid
for (var i = 0; i < 400; i = i + celluleHeight) {
	context.beginPath();
	context.moveTo(i, 0);
	context.lineTo(i, 400);
	context.closePath();
	context.strokeStyle = "Black";
	context.lineWidth = 1;
	context.stroke();
}

for (var i = 0; i < 400; i = i + celluleWith) {
	context.beginPath();
	context.moveTo(0, i);
	context.lineTo(400, i);
	context.closePath();
	context.strokeStyle = "Black";
	context.lineWidth = 1;
	context.stroke();
}


// fill tab
for (var i = 0; i < tabCellule.length; i++) {
	tabCellule[i] = {
		name : "Vide",
		x : i % nbColumn,
		y : (i - i % nbColumn ) / nbColumn
	}
}


//test obstacle
var obstacle1 = new Obstacle();
var obstacle2 = new Obstacle();
var obstacle3 = new Obstacle();

obstacle1.init(0,9);
obstacle2.init(5,5);
obstacle3.init(3,7);

obstacle1.draw();
obstacle2.draw();
obstacle3.draw();

tabCellule[obstacle1.y * nbColumn + obstacle1.x] = obstacle1;
tabCellule[obstacle2.y * nbColumn + obstacle2.x] = obstacle2;
tabCellule[obstacle3.y * nbColumn + obstacle3.x] = obstacle3;

//test Water
/*var water1 = new Water();
water1.init(6,5);
water1.isActive = true;
water1.draw();
tabCellule[water1.y * nbColumn + water1.x] = water1;*/


/* *** pseudo code ***

	parcourir chaque case de la grille
	si c'est un bloc d'eau: 
		verifier les voisins dans les quatres axes
		si ce n'est pas un obstacle ou un bloc d'eau, changer son etat en "eau"
		continuer ... 
		(faire attention a ne pas verifier les blocs d'eau qui ne sont pas propager, boucle infinie aie aie aie ... )
*/

function evolution(){
	for (var i = 0; i < tabCellule.length; i++) {
		if (tabCellule[i] != "undefined" 
			&& tabCellule[i].name == "Water"
			&& tabCellule[i].isActive) {
			tabCellule[i].propagateNextTurn();
		}
	}
	for (var i = 0; i < tabCellule.length; i++) {
		if (tabCellule[i] != null 
			&& tabCellule[i].name == "Water"
			&& tabCellule[i].isPropagateNextTurn
			) {
				tabCellule[i].draw();
		}
	}
}

function step(){
	if(timestamp == 0){
		timestamp = 50;
		evolution();
	} else {
		timestamp --;
	}
	requestAnimationFrame(step);
}

step();

function createWater(e){
	console.log(e);
	console.log((e.clientX/celluleWith));
	console.log((e.clientY/celluleHeight));
	var waterOnClick = new Water();
	waterOnClick.init((e.clientX/celluleWith)|0, (e.clientY/celluleHeight)|0,false);
	waterOnClick.isActive = true;
	waterOnClick.draw();
	tabCellule[waterOnClick.y * nbColumn + waterOnClick.x] = waterOnClick;
	
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.addEventListener("click", createWater);