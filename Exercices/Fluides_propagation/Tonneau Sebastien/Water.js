function Water(x, y) {
	this.position = {x: 0, y:0};

	this.position.x = x;
	var reste = this.position.x % celluleSize;
	this.position.x -= reste;

	this.position.y = y;
	reste = this.position.y % celluleSize;
	this.position.y -= reste;
}

Water.prototype.create = function() {
	context.beginPath();
	context.rect(this.position.x, this.position.y, celluleSize, celluleSize);
	context.fillStyle = 'blue';
	context.fill();
	context.stroke();
};