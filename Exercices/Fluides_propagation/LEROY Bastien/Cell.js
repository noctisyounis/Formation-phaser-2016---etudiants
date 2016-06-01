var Status = {
	canBeSpread : 0,
	spreading : 1,
	WATER : 2,
	WALL : 3
}

var Element = {
	NONE : 0,
	BOAT : 1,
	PIRATE : 2
}

function Cell(x,y) {
	this.x = x;
	this.y = y;
	this.status = Status.canBeSpread;
	this.element = Element.NONE;
	this.checkSpreading = function() {
		var neighbours = cells.filter(cell => cell.isNeighbouring(this));
		var pirate = neighbours.find(cell => cell.element == Element.PIRATE);
		console.log(pirate);
		if (pirate) {
			endGame();
		}
		if (neighbours.length == neighbours.filter(c => c.status > Status.canBeSpread && c.status < Status.WALL).length) {
			this.status = Status.WATER;
		}
		var cellsCanBeSpread = neighbours.filter(cell => cell.status == Status.canBeSpread);
		if(cellsCanBeSpread.length != 0){
			cellsCanBeSpread.forEach(cell => { cell.status = Status.spreading; cell.draw(); });
		}

	}
	this.draw = function() {
		var color;
		if (this.status == Status.WALL) {
			//context.fillStyle = "gray";
			color = "gray";
		} else if (this.status == Status.spreading) {
			//context.fillStyle = "blue";
			color = "blue";
		} else {
			//context.fillStyle = "white";
			color = "white";
		}

		drawFillRect(this, color);
/*		context.beginPath();
		context.rect(this.x * sizeCell, this.y * sizeCell, sizeCell, sizeCell);
		context.fill();*/
		if (this.element) {
			drawElement(this)
		}
	}
	this.isNeighbouring = function (cell) {
		return (cell.x == this.x && (cell.y == this.y - 1 || cell.y == this.y + 1)) || (cell.y == this.y && (cell.x == this.x - 1 || cell.x == this.x + 1));
	}
}

function drawFillRect(cell,color){
	context.beginPath();
	context.fillStyle = color;
	context.rect(cell.x * sizeCell, cell.y * sizeCell, sizeCell, sizeCell);
	context.fill();
}

function drawElement(cell){
	var offset = 5;
	var color;
	if (cell.element == Element.BOAT) { color = "green"; }
	else { color = "red"; }
	context.fillStyle = color;
	context.beginPath();
	context.rect(cell.x * sizeCell + offset, cell.y * sizeCell + offset, sizeCell - 2 * offset , sizeCell - 2 * offset);
	context.fill();
}