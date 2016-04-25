var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

var w = canvas.width;
var h = canvas.height;
var cells = [];

var gridW = function(){
	
	context.beginPath();
	context.moveTo(w, h - 10);
	context.lineTo(0, h - 10);
	context.stroke();
	context.closePath();
	h -= 10;
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
	context.lineTo(w, 600);
	context.stroke();
	context.closePath();
	w -= 10;
	if (w > 0) {
		requestAnimationFrame(gridH);
	}
}

var x = canvas.width/2;
var y = canvas.height/2;

var cell = new Cell(400,300);
var cell2 = new Cell(390,310);
var cell3 = new Cell(410,310);
var cell4 = new Cell(400,320);
cells.push(cell, cell2, cell3, cell4);


for (var i = 0; i < cells.length; i++) {
	cells[i].create(cells);
}

/*requestAnimationFrame(gridW);*/

function init() {
	gridW();
}

var count = 0;

function animate(){
			
	var cell = new Cell(400, 310);

	cells.push(cell);
	cell.create(cells);

	requestAnimationFrame(animate);
}

init();
animate();