function Block(config){
	this.posX = config.posX;
	this.posY = config.posY;
	this.cellSize = config.cellSize;
	this.itsEmpty = config.itsEmpty;
	this.itsWater = config.itsWater;
	this.itsRock = config.itsRock;

	this.drawBlock();

	return this;
}

Block.prototype.drawBlock = function(){
	
	context.beginPath();
	context.rect(this.posX, this.posY, this.cellSize, this.cellSize);
	context.fillStyle = "#fff";
	context.fill();
	context.closePath(); 
};

Block.prototype.transformToRock = function(){

	context.fillStyle = "#1E2A2D";
	context.fillRect(this.posX, this.posY, this.cellSize, this.cellSize);

	this.itsEmpty = false;
	this.itsRock = true;
}

Block.prototype.transformToWater = function(){

	if (this.itsEmpty === true && this.itsRock === false && this.itsWater === false){

		context.fillStyle = "#57A7E5";
		context.fillRect(this.posX, this.posY, this.cellSize, this.cellSize);

		this.itsEmpty = false;
		this.itsWater = true;
	}
}

Block.prototype.waterFlows = function(){

	var index = blocks.indexOf(this);
	//debugger;
	if ((index + 1) <= 99 && blocks[index + 1].itsEmpty === true && this.posY === blocks[index + 1].posY){
		blocks[index + 1].transformToWater();
	}
	if ((index - 1) >= 0 && blocks[index - 1].itsEmpty === true && this.posY === blocks[index - 1].posY){
		blocks[index - 1].transformToWater();
	}
	if ((index + nbrCol) <= 99 && blocks[index + nbrCol].itsEmpty === true){

		blocks[index + nbrCol].transformToWater();
	}
	if ((index + nbrCol) >= 0 && blocks[index - nbrCol].itsEmpty === true){
		blocks[index - nbrCol].transformToWater();
	}
}