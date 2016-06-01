// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");
	
console.log(context);

var cellSize = 10;
var nbrCol = 40;

var w = canvas.width;
var h = canvas.height;
var cells = []

function drawGrid(cellSize){

	for (var i = 0; i < canvas.width ; i += cellSize) {
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, canvas.height);
		context.closePath();
		context.stroke();
	}

	for (var i = 0; i < canvas.height ; i += cellSize) {
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(canvas.width, i);
		context.closePath();
		context.stroke();
	}
}

/*
	var gridW = function(){
		
		context.beginPath();
		context.moveTo(w, h - cellSize);
		context.lineTo(0, h - cellSize);
		context.stroke();
		context.closePath();
		h -= cellSize;
		if (h > 0) {
			requestAnimationFrame(gridW);
		}
		if (h <= 0){
			requestAnimationFrame(gridH);
		}
	}

	var gridH = function(){
		context.beginPath();
		context.moveTo(w, 0);
		context.lineTo(w, canvas.width 	);
		context.stroke();
		context.closePath();
		w -= cellSize;
		if (w > 0) {
			requestAnimationFrame(gridH);
		}
	}

	requestAnimationFrame(gridW);
*/

for (var i = 0; i < w; i += cellSize) {

	for (var j = 0; j < h; j += cellSize) {

		var cell = new Cell({
			posX : 0 + j,
			posY : 0 + i,
			cellSize : cellSize,
			itsAlive : false,
		});

		cells.push(cell);
	}
}

cells[500].itsAlive = true;
cells[460].itsAlive = true;
cells[600].itsAlive = true;
cells[50].itsAlive = true;
cells[460].itsAlive = true;
cells[0].itsAlive = true;
cells[501].itsAlive = true;
cells[599].itsAlive = true;
console.log(cells);

var checkLive = function(){

	for (var i = 0; i < cells.length; i ++) {

			if (cells[i].itsAlive == true){
				
				cells[i].chockCell();
			}
	} 
}

checkLive();
cells[500].destiny();
cells[501].destiny();
cells[0].destiny();
cells[700].destiny();
cells[600].destiny();