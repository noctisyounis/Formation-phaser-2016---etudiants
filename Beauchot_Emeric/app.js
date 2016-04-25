/**
	My canvas	
*/

// select the canvas
var canvas = document.querySelector("#canvas");
	canvas.width = 800;
	canvas.height = 600;
// set the context
var context = canvas.getContext("2d");
var size = 10;
var timeBetweenGen = 500;

drawGrid();
var array = fillArray();
//array[0][0].isAlive = true;
//array[0][1].isAlive = true;
//array[10][3].isAlive = true;
//array[10][4].isAlive = true;
//array[10][5].isAlive = true;
drawAliveCell();

var interval;

var pattern = {
	point: [1],
	block: [0,0,0,
			0,1,1,
			0,1,1],
	hub:   [0,0,0,0,0,
			0,0,1,0,0,
			0,1,0,1,0,
			0,0,1,0,0,
			0,0,0,0,0],
	boat:  [0,0,0,0,0,
			0,0,1,0,0,
			0,1,0,1,0,
			0,0,1,1,0,
			0,0,0,0,0],
	snake: [0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,
			0,1,0,1,1,1,0,
			0,1,1,1,0,1,0,
			0,0,0,0,0,0,0]
}
for (var property in pattern) {
    if (pattern.hasOwnProperty(property)) {
    	var n = document.createElement("option");
    	n.text = property;
        document.getElementById("selectPattern").options.add(n);
    }
}

function drawGrid() {
	for (var i = 0; i <= canvas.width; i += size) {
		context.beginPath();
		context.moveTo(i,0);
		context.lineTo(i, canvas.height);
		context.closePath();
		context.stroke();	
	}
	
	for (var j = 0; j <= canvas.height; j += size) {
		context.beginPath();
		context.moveTo(0, j);
		context.lineTo(canvas.width, j);
		context.closePath();
		context.stroke();
	}
}

function saveAliveCell() {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {			
			array[i][j].saveState();
		}
	}
}

function drawAliveCell() {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {			
			if (array[i][j].isAlive) {
				context.beginPath();
				context.rect(i*size, j*size, size, size);
				context.closePath();
				if (array[i][j].age == 0) {
					context.fillStyle = "#979696";
				} else {
					var b =array[i][j].willSurvive;
					if (b) {
						context.fillStyle = "#06FF00";
					} else {
						context.fillStyle = "#FF0000";
					}
				}
				context.fill();
				context.fillStyle = "#000";
			}
		}
	}
}

function nextGeneration() {
	console.log("next");
	context.clearRect(0,0,canvas.width,canvas.height);
	drawGrid();
	saveAliveCell();
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			var cel = array[i][j];
			cel.checkIsAlive(true); 	
		}
	}
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			var cel = array[i][j];
			cel.checkIsAlive(false); 	
		}
	}
	drawAliveCell();
}

function fillArray() {
	var array = [];
	for (var i = 0; i < canvas.width/size; i ++) {
		var arrayY = [];
		for (var j = 0; j < canvas.height/size; j ++) {
			var cel = new cellule(i,j);
			arrayY.push(cel);
		}
		array.push(arrayY);
	}
	return array;
}


function cellule(x,y) {
	var _self = this;
	_self.x = x; 
	_self.y = y;
	_self.age = 0;
	_self.isAlive = false;
	_self.willSurvive;
	_self.isCurrentlyAlive = false;
	_self.saveState = function() {
		_self.isCurrentlyAlive = this.isAlive;
	}
	_self.checkIsAlive = function(modify) {
		var neighborhood = 0;
		for (var i = _self.x - 1; i <= _self.x + 1; i ++) {
			if (i>=0 && i < canvas.width/size) {
				for (var j = _self.y-1; j <= _self.y + 1; j ++) {
					if ( j>=0 && j < canvas.height/size) {
						if (modify) {
							if (array[i][j].isCurrentlyAlive) {
								var isItself = (i==_self.x && j==_self.y)
								if (!isItself) {
									neighborhood++;	
								}													
							}
						} else{
							if (array[i][j].isAlive) {
								var isItself = (i==_self.x && j==_self.y)
								if (!isItself) {
									neighborhood++;	
								}													
							}
						}
						
					}	
				}
			}
			
		}
		//console.log(neighborhood);
		switch(neighborhood) {
			case 0:
			case 1:
				if (modify) {
					_self.isAlive = false;
					_self.age = 0;
				} else {
					_self.willSurvive = false;
				}
				break;
			case 2:
			case 3:
				if (modify) {
					_self.isAlive = true;
					if (_self.isCurrentlyAlive) {
						_self.age++;
					}
				} else {
					_self.willSurvive = true;
				}
				
				break;
			default:
				if (modify) {
					_self.isAlive = false;
					_self.age = 0;
				} else {
					_self.willSurvive = false;
				}
				break;
		}
	};
}

function toggleCell(e) {
	//console.log(e);
	var centerX = e.clientX / size |0;
	var centerY = e.clientY / size |0;

	var matrice = pattern[document.getElementById("selectPattern").value];
	var offset = (Math.sqrt(matrice.length)-1) / 2;
	console.log(offset);
	var matricePosition = 0;

	for (var x = centerX - offset; x <= centerX + offset; x++) {

		for (var y = centerY - offset; y <= centerY + offset; y++) {
			if (y >= 0 && y < array[0].length && x >= 0 && x < array.length) {
				if(matrice[matricePosition] == 1){
					array[x][y].isAlive = !array[x][y].isAlive;
					if (!array[x][y].isAlive) {
						context.fillStyle = 0xFFFFFF;
					}
					context.beginPath();
					context.rect(x*size, y*size, size, size);
					context.closePath();
					context.fill();
					context.fillStyle = 0x000000;
				}
			}
			matricePosition++;
		}
	
	}

}

function stopSimulation(){
	clearInterval(interval);
	document.getElementById("play").removeAttribute("disabled");
	document.getElementById("pause").setAttribute("disabled",true);
}
function playSimulation(){
	interval  = setInterval(nextGeneration,timeBetweenGen);
	document.getElementById("pause").removeAttribute("disabled");
	document.getElementById("play").setAttribute("disabled",true);
}

document.getElementById("canvas").addEventListener('click', toggleCell);
document.getElementById("play").addEventListener('click', playSimulation);
document.getElementById("pause").addEventListener('click', stopSimulation);
document.getElementById("next").addEventListener('click', nextGeneration);