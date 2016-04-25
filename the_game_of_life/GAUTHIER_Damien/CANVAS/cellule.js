// Objet : Cellule
function Cellule() {
	this.x;
	this.y;
	this.isActive = false;
	this.survivedNextLevel = false;
}
Cellule.prototype.draw = function() {
	context.fillStyle = "rgb(255, 200, 50)";
	context.fillRect(this.x*10, this.y*10, 10, 10);
	this.isActive = true;
};
Cellule.prototype.kill = function() {
	context.fillStyle = "red";
	context.fillRect(this.x*10, this.y*10, 10, 10);
	this.isActive = false;

};
Cellule.prototype.born = function() {
	this.draw();
	// add tab
};

// A adapter avec le nouveau tab
Cellule.prototype.countingNeighbour = function() {
	var countNeighbour = 0;
	var celIndex = tabCellule.indexOf(this);

	// top
	var indexElementTop = ( this.y - 1 ) * 40 + this.x;
	//console.log(tabCellule[indexElementTop]);
	if (tabCellule[indexElementTop] && tabCellule[indexElementTop].isActive) {
		countNeighbour++;
	}

	// bot
	var indexElementBot = ( this.y + 1 ) * 40 + this.x;
	if (tabCellule[indexElementBot] && tabCellule[indexElementBot].isActive) {
		countNeighbour++;
	}

	// right
	var indexElementRight = this.y * 40 + this.x + 1;
	//console.log(indexElementRight);
	if (tabCellule[indexElementRight] && tabCellule[indexElementRight].isActive) {
		countNeighbour++;
	}

	// left
	if (tabCellule[this.y * 40 + this.x - 1] && tabCellule[this.y * 40 + this.x - 1].isActive) {
		countNeighbour++;
	}
	//TOP/RIGHT
	if (tabCellule[(this.y - 1) * 40 + this.x + 1] && tabCellule[(this.y - 1) * 40 + this.x + 1].isActive) {
		countNeighbour++;
	}
	//BOT/RIGHT
	if (tabCellule[(this.y + 1) * 40 + this.x + 1] && tabCellule[(this.y + 1) * 40 + this.x + 1].isActive) {
		countNeighbour++;
	}
	//TOP/LEFT
	if (tabCellule[(this.y - 1) * 40 + this.x - 1] && tabCellule[(this.y - 1) * 40 + this.x - 1].isActive) {
		countNeighbour++;
	}
	//Bot/LEFT
	if (tabCellule[(this.y + 1) * 40 + this.x - 1] && tabCellule[(this.y + 1) * 40 + this.x - 1].isActive) {
		countNeighbour++;
	}
	

	return countNeighbour;
};