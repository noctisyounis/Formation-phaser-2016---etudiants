var fps = 1;

var sizeCell = 40;
var ROWS = 10;
var COLUMNS = 10;
var NB_WALLS = 16;
var cells = [];

var idSetTimeout, gameOver = false;

// select the canvas
var canvas = document.querySelector("#canvas");
	canvas.height = ROWS * sizeCell;
	canvas.width = COLUMNS * sizeCell;

// set the context
var context = canvas.getContext("2d");
//Version normal
//canvas.addEventListener('click', startSpreading);
//Bonus
canvas.addEventListener('click', toggleWall);
//FIN BONUS

init();
animate();

function init() {
	for (var x = 0; x < COLUMNS; x++) {
		for (var y = 0; y < ROWS; y++) {
			cells.push(new Cell(x,y));
		}
	}
	//Version normal
	//randomWalls();
	//cells.filter(cell => cell.status == Status.WALL).forEach(wall => wall.draw());
	//Bonus
	var startWater = cells.filter(cell => (cell.x == 0 || cell.x == COLUMNS - 1) && (cell.y == 0 || cell.y == ROWS -1));
	startWater.forEach(cell => { wallAroundCell(cell); cell.status = Status.spreading;});
	//BOAT
	var cellBoat;
	do {
		var pos = randomCoordonates();
		cellBoat = cells.find(cell => cell.x == pos.x && cell.y == pos.y);
	}while (cellBoat.status != Status.canBeSpread || cellBoat.element);
	cellBoat.element = Element.BOAT;
	//PIRATE
	var cellPirate;
	do {
		var pos = randomCoordonates();
		cellPirate = cells.find(cell => cell.x == pos.x && cell.y == pos.y);
	}while (cellPirate.status != Status.canBeSpread || cellPirate.element);
	cellPirate.element = Element.PIRATE;
	//FIN BONUS
	cells.filter(cell => cell.status != Status.canBeSpread || cell.element).forEach(cell => cell.draw());
	
}

function animate() {
	idSetTimeout = setTimeout(function() {
		cells.filter(cell => cell.status == Status.spreading).forEach(cell => cell.checkSpreading());
		if (!gameOver) {
			requestAnimationFrame(animate);
		}
	}, 1000/fps);
}

function startSpreading(event){
	var startX = event.offsetX / sizeCell | 0;
	var startY = event.offsetY / sizeCell | 0;
	var cell = cells.find(c => c.x == startX && c.y == startY);
	cell.status = Status.spreading;
	cell.draw();
}

function toggleWall(event) {
	var startX = event.offsetX / sizeCell | 0;
	var startY = event.offsetY / sizeCell | 0;
	var cell = cells.find(c => c.x == startX && c.y == startY);
	cell.status = (cell.status == Status.WALL) ? Status.canBeSpread : Status.WALL;
	cell.draw();
}


function randomWalls(){
	var increment = 0;
	var posX; 
	var posY;
	var cell;
	while (increment < NB_WALLS) {
		do {
			var pos = randomCoordonates();
/*			posX = Math.floor(Math.random() * COLUMNS);
			posY = Math.floor(Math.random() * ROWS);*/
			cell = cells.find(cell => cell.x == pos.x && cell.y == pos.y);
		} while (cell.status == Status.WALL);
		cell.status = Status.WALL;
		increment++;
	}
}

function wallAroundCell(cell) {
	for (var x = -1; x < 2; x++) {
		for (var y = -1; y < 2; y++) {
			var selectCell = cells.find(c => c.x == cell.x + x && c.y == cell.y + y);
			if (selectCell) {
				selectCell.status = Status.WALL;
			}
		}
	}
}

function endGame() {
	clearTimeout(idSetTimeout);
	gameOver = true;
	console.log("GAME OVER");
}

function randomCoordonates(){
	return { x : Math.floor(Math.random() * COLUMNS), y : Math.floor(Math.random() * ROWS) };
}