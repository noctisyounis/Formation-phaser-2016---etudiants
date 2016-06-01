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
	context.fillStyle = "#B4D455";
	context.fillRect(this.posX, this.posY, this.cellSize, this.cellSize);
}

Cell.prototype.destiny = function () {
	 var voisin = 0;
	 var index = cells.indexOf(this);

	 if (index != 0  && cells[index - 1].itsAlive) {
	 	voisin ++;
	 }	 
	 if (index != (cells.length -1) && cells[index + 1].itsAlive) {
	 	voisin ++;
	 }

	if ((index - nbrCol) >= 0) {
		if (cells[index - nbrCol].itsAlive) {
	 		voisin ++;
	 	}
	 	if (cells[index - nbrCol - 1].itsAlive) {
	 		voisin ++;
	 	}
	 	if (cells[index - nbrCol + 1].itsAlive) {
	 		voisin ++;
		 }
	} 

	if ((index + nbrCol) < cells.length) {
		if (cells[index + nbrCol].itsAlive) {
		 	voisin ++;
		 }
		if (cells[index + nbrCol + 1].itsAlive) {
		 	voisin ++;
		 }
		if (cells[index + nbrCol - 1].itsAlive) {
		 	voisin ++;
		 }
	}
	
	if (voisin == 0 || voisin == 1) {
		context.rect(this.posX, this.posY, this.cellSize, this.cellSize);
		context.fillStyle = "#fff";
		cells[index].itsAlive = false;

	}
	if (voisin >= 4) {
		context.rect(this.posX, this.posY, this.cellSize, this.cellSize);
		context.fillStyle = "#fff";
		cells[index].itsAlive = false;

	}
	if (voisin == 3 || voisin == 4) {
		context.fillStyle = "#B4D455";
		context.fillRect(this.posX, this.posY, this.cellSize, this.cellSize);
		cells[index].itsAlive = true;
	}

	 console.log(voisin);
}
