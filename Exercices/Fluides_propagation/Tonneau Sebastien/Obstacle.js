function Obstacle() {
	this.position = {x: 0, y:0};
	this.name = "obstacle";

	this.position.x = (Math.random() * canvas.width)|0;
	var reste = this.position.x % celluleSize;
	this.position.x -= reste;

	this.position.y = (Math.random() * canvas.width)|0;
	reste = this.position.y % celluleSize;
	this.position.y -= reste;
}

Obstacle.prototype.create = function() {
	context.beginPath();
	context.rect(this.position.x, this.position.y, celluleSize, celluleSize);
	context.fillStyle = 'gray';
	context.fill();
	context.stroke();
};