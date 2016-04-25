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

	 if (cells[index - 1].itsAlive) {
	 	voisin ++;
	 }	 
	 if (cells[index + 1].itsAlive) {
	 	voisin ++;
	 }
	 
	 if (cells[index - nbrCol].itsAlive) {
	 	voisin ++;
	 }
	 if (cells[index - nbrCol - 1].itsAlive) {
	 	voisin ++;
	 }
	 if (cells[index - nbrCol + 1].itsAlive) {
	 	voisin ++;
	 }
	if (cells[index + nbrCol].itsAlive) {
	 	voisin ++;
	 }
	if (cells[index + nbrCol + 1].itsAlive) {
	 	voisin ++;
	 }
	if (cells[index + nbrCol - 1].itsAlive) {
	 	voisin ++;
	 }
	 
 	

	 console.log(voisin);
}

