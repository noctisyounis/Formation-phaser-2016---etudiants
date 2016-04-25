var fps = 5;

var sizeCell = 5;
var ROWS = 50;
var COLUMNS = 50;
var cells = [];

var start = false;

var patterns = {
	point : {
		col : 1,
		cells : [1]	
	},
	block : {
		col : 2,
		cells : [ 1,1,
				  1,1]
	},
	tub : {
		col : 3,
		cells : [0,1,0,
				 1,0,1,
				 0,1,0] 
	},
	boat : {
		col : 3,
		cells : [0,1,0,
				 1,0,1,
				 0,1,1]
	},
	snake : {
		col : 4,
		cells : [1,0,1,1,
				 1,1,0,1]
	}
}

var pattern = patterns.point;

function Cell(x,y) {
	this.x = x;
	this.y = y;
	this.isAlive = false;
	this.stillAlive = false;
	this.check = function() {
		var count = 0;

		//Boucles pour compter le nombre de cellules voisines vivantes
		for (var x = -1; x < 2; x++) {
			for (var y = -1; y < 2; y++) {
				var cell = cells.find(c => c.x == this.x + x && c.y == this.y + y);
				if (cell != undefined && cell.isAlive && cell != this) {
					count++;
				}
			}
		}

		//si 2 ou 3 cellules voisines vivantes la cellule survit ou nait
		if (count == 2 || count == 3) {
			this.stillAlive = true;
		} else {
			//console.log("La cellule meurt");
			this.stillAlive = false;
		}

	}
	this.draw = function() {
		if (this.isAlive) {
			if (this.stillAlive) {
				context.fillStyle = "green";
			}
			else {
				context.fillStyle = "red";
			}
		} else {
			if(this.stillAlive){
				context.fillStyle = "gray";
			} else {
				context.fillStyle = "white";
			}
		}

		this.isAlive = this.stillAlive;
		context.beginPath();
		context.rect(this.x * sizeCell, this.y*sizeCell, sizeCell, sizeCell);
		context.fill();
		context.stroke();
	}
}

var btnPoint = document.querySelector("#point");
btnPoint.addEventListener('click', selectPattern);

var btnTub = document.querySelector("#tub");
btnTub.addEventListener('click', selectPattern);

function selectPattern(event) {
	pattern = patterns[event.target.id];
}

var btnPlay = document.querySelector("#play");
var btnNext = document.querySelector("#next");

btnPlay.addEventListener('click', function() {
	start = !start;
	if (start) {
		btnPlay.innerHTML = "Stop";
		animate();
	}
	else {
		btnPlay.innerHTML = "Start";
	}
})

btnNext.addEventListener('click', function(){
	if (start) {
		checkCells();
		drawCells();
	}
})

// select the canvas
var canvas = document.querySelector("#canvas");
	canvas.height = ROWS * sizeCell;
	canvas.width = COLUMNS * sizeCell;

// set the context
var context = canvas.getContext("2d");
context.fillStyle = "white";

canvas.addEventListener('click', drawPattern);

init();
drawCells();
//animate();

function init() {
	for (var x = 0; x < COLUMNS; x++) {
		for (var y = 0; y < ROWS; y++) {
			cells.push(new Cell(x,y));
		}
	}
}

function drawPattern(event){
	//var posX = event.offsetX;
	//var posY = event.offsetY;
	//var x = Math.floor(posX / sizeCell);
	var startX = event.offsetX / sizeCell | 0;
	//var y = Math.floor(posY / sizeCell);
	var startY = event.offsetY / sizeCell | 0;
	var offset = pattern.cells.length / 2 | 0;
	var x = offset % pattern.col;
	var y = (offset - x) / pattern.col;
	startX -= x;
	startY -= y;
	//var offset = Math.round(pattern.cells.length / 2);
	for (var i = 0; i < pattern.cells.length; i++) {
		if(pattern.cells[i]) {
			x = i % pattern.col;
			y = (i - x) / pattern.col;
			var cell = cells.find(c => c.x == startX + x && c.y == startY + y);
			cell.stillAlive = !cell.stillAlive;
			cell.draw();
		}
	}
}

function animate() {
	//setTimeout(function() {
		if (!start) {
			console.log("STOP");
			return;
		}
		console.log("START");
		requestAnimationFrame(animate);
		checkCells();
		drawCells();
	//}, 1000 / fps);
}

function drawCells() {
/*	for (var index in cells) {
		cells[index].draw();
	}*/
	cells.forEach(c => c.draw());
}
function checkCells() {
/*	for (var index in cells) {
		cells[index].check();
	}*/
	cells.forEach(c => c.check());
}


