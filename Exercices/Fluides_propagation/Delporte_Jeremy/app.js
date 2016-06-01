// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");
	
console.log(context);

var cellSize = 50;
var nbrCol = 10;
var nbrRaw = 10;

var nbrBlocks = nbrCol * nbrRaw; 

var w = canvas.width;
var h = canvas.height;
var blocks = []

function drawGrid(cellSize){

	for (var i = 0; i < canvas.width ; i += cellSize) {
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, canvas.height);
		context.closePath();
		context.stroke();
	}

	for (var i = 0; i < canvas.height ; i += cellSize) {
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(canvas.width, i);
		context.closePath();
		context.stroke();
	}
}

function rndRange(min, max){
    return min + (Math.random() * (max - min));
}

function rndIntRange (min, max){
    return Math.round(rndRange(min, max));
}

function compteur(){

	var cpt = 0;

	for (var i = 0; i < blocks.length; i++) {

		if (blocks[i].itsRock == true) {
			cpt ++;
		}
	}

	console.log(cpt);
}

for (var i = 0; i < w; i += cellSize) {
	for (var j = 0; j < h; j += cellSize) {
	
		var block = new Block({
			posX : 0 + j,
			posY : 0 + i,
			cellSize : cellSize,
			itsEmpty : true,
			itsWater : false,
			itsRock : false,
		});

		blocks.push(block);
	}
}

console.log(blocks); 

for (var k = 0; k < 16; k++) {

	console.log('im in');

	randBlock = rndIntRange(0, 99);

	if (blocks[randBlock].itsRock === false && blocks[randBlock].itsEmpty === true ){

		console.log('im a rock');
		blocks[randBlock].transformToRock();
	} else 	{
		k -= 1;
	}
}

canvas.addEventListener("click", dropWater);

function dropWater(e) {

	console.log(e);

	var canvasX = (e.clientX / cellSize | 0 ) + 1;
	var canvasY = (e.clientY / cellSize | 0 ) + 1;

	var indexBlock = ((canvasY - 1) * nbrCol + canvasX)- 1;
	console.log(indexBlock);

	blocks[indexBlock].transformToWater();

}

function flow() {
	for (var l = 0; l < blocks.length; l++) {
		console.log('ici et la')
		if(blocks[l].itsWater){
			blocks[l].waterFlows();
		}
	}
	requestAnimationFrame(flow);
}

flow();