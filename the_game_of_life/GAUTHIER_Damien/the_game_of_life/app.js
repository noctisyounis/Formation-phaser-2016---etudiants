// Canvas Cheat Sheet 1 : http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/
// Canvas Cheat sheet 2 : https://simon.html5.org/dump/html5-canvas-cheat-sheet.html

// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");
// create grid
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

// fill tab
for (var i = 0; i < tabCellule.length; i++) {
	tabCellule[i] = new Cellule();
	// set x and y
	tabCellule[i].x = i % nbColumn;
	tabCellule[i].y = (i - tabCellule[i].x)/nbColumn;
}

function evolution(){
//	foreach tabCellule, countingNeighbour -> kill||born
	for (var i = 0; i < tabCellule.length; i++) {
		var tmpCount = tabCellule[i].countingNeighbour();
//	cellule with 4 or + neighbour die by overpopulation
		if (tmpCount >= 4) {
			tabCellule[i].survivedNextLevel = false;
//	foreach cellule with 2 or 3 neighbour life or born	
		} else if (tmpCount == 2 || tmpCount == 3) {
			tabCellule[i].survivedNextLevel = true;
//	cellule with 1 or 0 neighbour die by solitude
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


//"Step" _ requestAnimationFrame
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

//Draw Cellule for starter
tabCellule[302].draw();
tabCellule[399].draw();
tabCellule[400].draw();
tabCellule[401].draw();
tabCellule[402].draw();
tabCellule[403].draw();

/*for (var i = 0; i < 5; i++) {
	tabCellule[540 + i].draw();
	tabCellule[630 + i].draw();
	tabCellule[670 + i].draw();
}*/

step();

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;