/*
	- generer grille
	- obstacles random
	- au clic poser un bloc d'eau
	- propager l'eau sur la grille
*/

// select the canvas
var canvas = document.querySelector("#canvas");
	canvas.width = 600; // x
	canvas.height = 600; // y

// set the context
var context = canvas.getContext("2d");

// variables
var celluleSize = 60;
var celluleByColumn = canvas.width / celluleSize;
var celluleByRow = canvas.height / celluleSize;
var obstacleNumber = 16;
var celluleArray = new Array(celluleByColumn * celluleByRow);
var celluleArrayClone = new Array(celluleByColumn * celluleByRow);

var obstacleArray = [];
var waterArray = [];
var waterArrayClone = [];
var timeStep = 50;

var waterBlockRigth = {};
var waterBlockLeft = {};
var waterBlockDown = {};
var waterBlockUp = {};

// grille
for (var i = 0; i <= celluleByColumn; i++) {
	context.beginPath();
	context.moveTo(celluleSize * i, 0);
	context.lineTo(celluleSize * i, canvas.height);
	context.stroke();
}

for (var i = 0; i <= celluleByRow; i++) {
	context.beginPath();
	context.moveTo(0, celluleSize * i);
	context.lineTo(canvas.width, celluleSize * i);
	context.stroke();
}

// obstacles
for (var i = 0; i < obstacleNumber; i++) {
	var newObstacle = new Obstacle();
	newObstacle.create();
	var index = getIndexOfPosition(newObstacle.position.x, newObstacle.position.y);
	obstacleArray[index] = newObstacle;
}

/*
	FUNCTIONS
*/

// event au click pour poser l'eau [TODO]
function dropWater(event) {
	var waterBlock = new Water(event.clientX, event.clientY);
	waterBlock.create();
	var index = getIndexOfPosition(waterBlock.position.x, waterBlock.position.y);
	celluleArray[index] = waterBlock;
	waterPropagation();
}

function waterPropagation() {
	//check si j'essaye de poser de l'eau sur un obstacle [TODO]

	if (timeStep == 0) {
		timeStep = 50;

	//si il y a de l'eau ou un obstacle je ne fais rien

		for (var i = 0; i < celluleArray.length; i++) {

			if (celluleArray[i] != undefined && celluleArray[i].name == undefined) {

				if (celluleArray[i+1] != "vide") {
					waterBlockRigth = new Water(celluleArray[i].position.x + celluleSize, celluleArray[i].position.y);
					waterBlockRigth.create();
					celluleArrayClone[i+1] = waterBlockRigth;					
				}
				
				if (celluleArray[i-1] != "vide") {
					waterBlockLeft = new Water(celluleArray[i].position.x - celluleSize, celluleArray[i].position.y);
					waterBlockLeft.create();
					celluleArrayClone[i-1] = waterBlockLeft;					
				}
				
				if (celluleArray[i + celluleByColumn] != "vide") {
					waterBlockDown = new Water(celluleArray[i].position.x, celluleArray[i].position.y + celluleSize);
					waterBlockDown.create();
					celluleArrayClone[i + celluleByColumn] = waterBlockDown;					
				}
				
				if (celluleArray[i - celluleByColumn] != "vide") {
					waterBlockUp = new Water(celluleArray[i].position.x, celluleArray[i].position.y - celluleSize);
					waterBlockUp.create();
					celluleArrayClone[i - celluleByColumn] = waterBlockUp;					
				}
			}

		}

		celluleArray.splice(0,celluleArray.length);
		celluleArray = celluleArrayClone.splice(0);
		celluleArrayClone.splice(0,celluleArrayClone.length);
	}

	timeStep--;

	// (si j'ai tout rempli j'arrête)
	requestAnimationFrame(waterPropagation);
}

function getIndexOfPosition(x, y) {
	var indexX = x / celluleSize;
	var indexY = y / celluleSize;

	if (y == 0) {
		return x;
	} else {
		return y + "" + x;
	}
}

/*
	EVENT
*/
window.addEventListener("click", dropWater);
window.requestAnimationFrame = 	window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;