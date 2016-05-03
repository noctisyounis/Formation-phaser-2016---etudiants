// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");
	
console.log(context);

var cellSize = 100;
var w = canvas.width;
var h = canvas.height;
var blocs = [];


function drawGrid(cellSize){

	for (var i = 0; i < w; i += cellSize) {
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, canvas.height);
		context.closePath();
		context.stroke();	
	}

	for (var i = 0; i < h; i += cellSize) {
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(w, i);
		context.closePath();
		context.stroke();	
	}
}

	var gridW = function(){
		
		context.beginPath();
		context.moveTo(w, h - cellSize);
		context.lineTo(0, h - cellSize);
		context.stroke();
		context.closePath();
		h -= cellSize;
		if (h > 0) {
			requestAnimationFrame(gridW);
		}
		if (h <= 0){
			requestAnimationFrame(gridH);
		}
	}

	var gridH = function(){
		context.beginPath();
		context.moveTo(w, 0);
		context.lineTo(w, canvas.width 	);
		context.stroke();
		context.closePath();
		w -= cellSize;
		if (w > 0) {
			requestAnimationFrame(gridH);
		}
	}

	requestAnimationFrame(gridW);

drawGrid();

function Bloc(config){
	this.posX = config.posX;
	this.posY = config.posY;
	this.cellSize = config.cellSize;
	this.empty = config.empty;
	this.wall = config.wall;
	this.water = config.water;

	this.createBloc();

	return this;
}

Bloc.prototype.createBloc = function(){
		
	if(this.water){
		context.beginPath();
		context.rect(this.posX,this.posY,this.cellSize,this.cellSize);
		context.fillStyle = "#000177";
		context.fill();
		context.stroke();
		context.closePath();  
	}
	if (this.wall) {
		context.beginPath();
		context.rect(this.posX,this.posY,this.cellSize,this.cellSize);
		context.fillStyle = "#B4D455";
		context.fill();
		context.stroke();
		context.closePath();  
	}else{
		context.beginPath();
		context.rect(this.posX,this.posY,this.cellSize,this.cellSize);
		context.fillStyle = "white";
		context.fill();
		context.stroke();
		context.closePath();
	}
	
};	

Bloc.prototype.transformToWater = function () {
	if (this.empty) {
		context.fillStyle = "#000177";
		context.fillRect(this.posX,this.posY,this.cellSize,this.cellSize);
		console.log("magie");
		this.empty = false;
		this.water = true;
	}
	//this.flow();
};

Bloc.prototype.flow = function(){
	var index = blocs.indexOf(this);
	var nbrCol = 8;

	if ((index + 1) <= blocs.length && blocs[index + 1].empty === true && this.posY === blocs[index + 1].posY){
		blocs[index + 1].transformToWater();
	}
	if ((index - 1) >= 0 && blocs[index - 1].empty === true && this.posY === blocs[index - 1].posY){
		blocs[index - 1].transformToWater();
	}
	if ((index + nbrCol) <= blocs.length && blocs[index + nbrCol].empty === true){

		blocs[index + nbrCol].transformToWater();
	}
	if ((index + nbrCol) >= 0 && blocs[index - nbrCol].empty === true){
		blocs[index - nbrCol].transformToWater();
	}
}

//ajout des blocs
for (var i = 0; i < w; i += cellSize) {
	for (var j = 0; j < h; j += cellSize) {
	
		var bloc = new Bloc({
			posX : 0 + j,
			posY : 0 + i,
			cellSize : cellSize,
			empty : true,
			water : false,
			wall : false,
		});
		bloc.createBloc();
		blocs.push(bloc);
	}
}

//create Wall
for (var i = 0; i < w; i+= cellSize) {
	for (var i = 0; i < h; i+= cellSize) {
		var rnd1 = (Math.random() * (blocs.length) | 0);
		var wall = blocs[rnd1];
		// console.log(blocs[rnd1]);
			wall.empty = false;
			wall.wall = true;
	wall.createBloc();
	// blocs.push(bloc);
	}	
};


//create Water
function addWater(e){
	console.log(e)
	var x = Math.floor(e.offsetX / cellSize);
	var y = Math.floor(e.offsetY / cellSize);

	index = y * 8 + x;

	console.log(index)
	console.log(x + " - " + y);
	blocs[index].transformToWater();
	blocs[index].flow();
};
canvas.addEventListener('click', addWater);

//propager l'eau





