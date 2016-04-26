var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var tiles = [];

canvas.width = 800;
canvas.height = 600;

var cell = 50

var arrayColumns = [];
var arrayRows = [];




function addWater(e) {

	// console.log( (e.offsetY/10) |0 );
	var x = (e.offsetX/10) | 0;
	var y = (e.offsetY/10) | 0;

	context.beginPath();
	context.rect(x, y, cell, cell);
	context.fillStyle = '#00F'
	context.fill();
	context.closePath();

}

function init() {

	for (var i = 0; i < canvas.width; i += cell) {				
		for (var j = 0; j < canvas.height; j += cell) {			
			var block = new Block(i,j);
			// block.type();
			arrayRows.push(block);
		}
		arrayColumns.push(arrayRows);
	}
	// console.log(arrayColumns);
	addWalls();
}

function addWalls() {

	for (var i = 0; i < 20; i++) {
		var rnd1 = Math.floor((Math.random() * arrayRows.length) + 1);
		var rnd2 = Math.floor(Math.random() * arrayColumns.length);
		// console.log(arrayColumns[rnd2][rnd1]);
		var current = arrayColumns[rnd2][rnd1];
		current.wall = true;
		current.empty = false;
		current.type();
		current.draw();
	}


}

init();

canvas.addEventListener('click', addWater);