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


// create 10 obstacles (random)
for (var i = 0; i < 10; i++) {
	var tmpObstacle = new Obstacle();
	var x = (Math.random()*10)|0;
	var y = (Math.random()*10)|0
	tmpObstacle.init(x,y);
	tmpObstacle.draw();
	tabCellule[y * nbColumn + x] = tmpObstacle;
}

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

function createWaterOnClick(e){
	var x = (e.clientX/celluleWith)|0;
	var y = (e.clientY/celluleHeight)|0;
	if (tabCellule[y * nbColumn + x].name == "Vide") {
		var waterOnClick = new Water();
		waterOnClick.init(x, y, false);
		waterOnClick.isActive = true;
		waterOnClick.draw();
		tabCellule[waterOnClick.y * nbColumn + waterOnClick.x] = waterOnClick;
	}
	
}

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.addEventListener("click", createWaterOnClick);