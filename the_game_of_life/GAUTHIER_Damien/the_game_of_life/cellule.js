/*
		Object : Cellule
*/
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
	context.fillStyle = "grey";
	context.fillRect(this.x*10, this.y*10, 10, 10);
	this.isActive = false;

};
Cellule.prototype.born = function() {
	this.draw();
};

Cellule.prototype.countingNeighbour = function() {
	var countNeighbour = 0;
	var celIndex = tabCellule.indexOf(this);

	// top
	var indexElementTop = ( this.y - 1 ) * 40 + this.x;
	if (tabCellule[indexElementTop] 
		&& tabCellule[indexElementTop].isActive
		) {
		countNeighbour++;
	}

	// bot
	var indexElementBot = ( this.y + 1 ) * 40 + this.x;
	if (tabCellule[indexElementBot] 
		&& tabCellule[indexElementBot].isActive
		) {
		countNeighbour++;
	}

	if (!(this.x == 40)) {
		// right
		var indexElementRight = this.y * 40 + this.x + 1;
		if (tabCellule[indexElementRight] 
			&& tabCellule[indexElementRight].isActive
			) {
			countNeighbour++;
		}
		//TOP/RIGHT
		var indexElementTopRight = (this.y - 1) * 40 + this.x + 1;
		if (tabCellule[indexElementTopRight] 
			&& tabCellule[indexElementTopRight].isActive
			) {
			countNeighbour++;
		}
		//BOT/RIGHT
		var indexElementBotRight = (this.y + 1) * 40 + this.x + 1;
		if (tabCellule[indexElementBotRight] 
			&& tabCellule[indexElementBotRight].isActive
			) {
			countNeighbour++;
		}
	}

	if (!(this.x == 0)) {
		// left
		var indexElementLeft = this.y * 40 + this.x - 1;
		if (tabCellule[indexElementLeft] 
			&& tabCellule[indexElementLeft].isActive
			) {
			countNeighbour++;
		}
		//TOP/LEFT
		var indexElementTopLeft = (this.y - 1) * 40 + this.x - 1;
		if (tabCellule[indexElementTopLeft] 
			&& tabCellule[indexElementTopLeft].isActive
			) {
			countNeighbour++;
		}
		//Bot/LEFT
		var indexElementBotLeft = (this.y + 1) * 40 + this.x - 1;
		if (tabCellule[indexElementBotLeft] 
			&& tabCellule[indexElementBotLeft].isActive
			) {
			countNeighbour++;
		}
	}	

	return countNeighbour;
};