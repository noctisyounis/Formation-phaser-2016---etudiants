function Cell(config){
	this.posX = config.posX;
	this.posY = config.posY;
	this.cellSize = config.cellSize;
	this.itsAlive = config.itsAlive;

	this.drawCell();

	return this;
}

Cell.prototype.drawCell = function(){

	context.beginPath();
	context.rect(this.posX, this.posY, this.cellSize, this.cellSize);
	context.fillStyle = "#fff";
	context.fill();
	context.stroke();
	context.closePath();
};

Cell.prototype.chockCell = function(){
	context.fillStyle = "#1CE";
	context.fillRect(this.posX, this.posY, this.cellSize, this.cellSize);
}

Cell.prototype.checkNeighborhood = function(){

	var neighborCount = 0;
	var index = cells.indexOf(this);
	// debugger;
	if (cells[index+1].itsAlive && this.posY == cells[index + 1].posY){
		neighborCount ++;
		console.log("droite");
	};
	if (cells[index-1].itsAlive && this.posY == cells[index - 1].posY){
		neighborCount ++;
	};
	if (cells[index+ nbrCol].itsAlive && this.posY == cells[index + nbrCol].posY){
		neighborCount ++;
	};
	if (cells[index-nbrCol].itsAlive && this.posY == cells[index - nbrCol].posY){
		neighborCount ++;
	};
	if (cells[index+nbrCol+1].itsAlive && this.posY == cells[index + nbrCol + 1].posY){
		neighborCount ++;
	};
	if (cells[index-nbrCol+1].itsAlive && this.posY == cells[index - nbrCol + 1].posY){
		neighborCount ++;
	};
	if (cells[index+nbrCol-1].itsAlive && this.posY == cells[index + nbrCol - 1].posY){
		neighborCount ++;
	};
	if (cells[index-nbrCol-1].itsAlive && this.posY == cells[index - nbrCol - 1].posY){
		neighborCount ++;
	};

	return neighborCount;
}

