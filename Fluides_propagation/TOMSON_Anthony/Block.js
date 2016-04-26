var Block = function(x, y){

	this.x = x;
	this.y = y;
	this.water = false;
	this.empty = true;
	this.wall = false;
	
	this.type();
	this.draw();

	return this;
}

Block.prototype.draw = function(){
	
	context.beginPath();
	context.moveTo(this.x, this.y);
	context.rect(this.x, this.y, 50, 50);
	context.fill();
	context.stroke();
	context.closePath();

}

Block.prototype.type = function(){

	if (this.empty) {
		context.fillStyle = 'white';
	} else if(this.water){
		context.fillStyle = '#00f';
	} else{
		context.fillStyle = 'grey';
	}

}