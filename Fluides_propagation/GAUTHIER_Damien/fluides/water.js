function Water() {
	this.name = "Water";
	this.x;
	this.y;
	this.isActive = false;
	this.isPropagateNextTurn;
}
Water.prototype.init = function(x, y, isPropagateNextTurn) {
	this.x = x;
	this.y = y;
	this.isPropagateNextTurn = isPropagateNextTurn;
};
Water.prototype.draw = function() {
	context.fillStyle = "blue";
	context.fillRect(this.x*celluleWith, this.y*celluleHeight, celluleWith, celluleHeight);
	this.isActive = true;
	this.isPropagateNextTurn = false;
};

Water.prototype.propagateNextTurn = function() {

	for (var x = -1; x < 2; x++){
		var cell = tabCellule.find(c => c.x == this.x + x && c.y == this.y);
		if (cell && cell.name == "Vide") {
			
			var tmpWater = new Water();
			tmpWater.init(this.x + x, this.y, true);

			tabCellule[tabCellule.indexOf(cell)] = tmpWater;
		}
	}
	for (var y = -1; y < 2; y++) {
		var cell = tabCellule.find(c => c.x == this.x && c.y == this.y + y)
		if (cell && cell.name == "Vide") {
			
			var tmpWater = new Water();
			tmpWater.init(this.x, this.y + y, true);

			tabCellule[tabCellule.indexOf(cell)] = tmpWater;
		}
	}
};