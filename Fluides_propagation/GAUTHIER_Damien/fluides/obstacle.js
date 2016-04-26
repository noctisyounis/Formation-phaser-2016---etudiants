function Obstacle() {
	this.name = "Obstacle"
	this.x;
	this.y;		
}

Obstacle.prototype.init = function(x,y) {
	this.x = x;
	this.y = y;
};

Obstacle.prototype.draw = function() {
	context.fillStyle = "green";
	context.fillRect(this.x*celluleWith, this.y*celluleHeight, celluleWith, celluleHeight);
	//this.y * nbColumn + this.x = index of this
	tabCellule[this.y * nbColumn + this.x] = this;
};