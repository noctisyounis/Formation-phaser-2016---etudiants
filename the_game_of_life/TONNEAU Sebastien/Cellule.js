function Cellule(x, y) {
	this.x = x * 10;
	this.y = y * 10;
	this.size = 10;
	this.voisinNumber = 0;
	this.isActive = false;
	//this.color = "gray";
}

Cellule.prototype.create = function() {
	context.beginPath();
	context.rect(this.x, this.y, this.size, this.size);
	context.fillStyle = 'gray';
	context.fill();
	context.stroke();
};

Cellule.prototype.setLife = function(active) {
	if (!active) {
		this.isActive = false;
		context.fillStyle = 'gray';

	} else {
		this.isActive = true;
		context.fillStyle = 'yellow';
	}

	context.beginPath();
	context.rect(this.x, this.y, this.size, this.size);
	context.fill();
	context.stroke();
};

Cellule.prototype.toggleActive = function() {
	if (this.isActive) {
		this.isActive = false;
		context.fillStyle = 'gray';

	} else {
		this.isActive = true;
		context.fillStyle = 'yellow';
	}

	context.beginPath();
	context.rect(this.x, this.y, this.size, this.size);
	context.fill();
	context.stroke();
};

Cellule.prototype.setColor = function() {
	
};