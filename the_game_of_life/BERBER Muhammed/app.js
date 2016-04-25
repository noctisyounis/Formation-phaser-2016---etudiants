var canvas 		= document.getElementById("monCanvas");
var wW = canvas.width 	= 800;
var wH = canvas.height 	= 800;
var context = canvas.getContext('2d');
var cellSize = 20;

var cells = [];


var COLUMN 	= 5;
var ROWS	= 5;


function drawGrid(){
	for (var i = 0; i < COLUMN; i++) {
		for (var y = 0; y < ROWS; y++) {
			context.beginPath();
			context.rect(i*cellSize,y*cellSize,cellSize,cellSize);
			context.stroke();
		}
	}
}



var cell = function(x,y){
	var _self 		= this;
	_self.x 		= x;
	_self.y 		= y;
	_self.isAlive 	= false;
	_self.willBeAlive = false;

	_self.check = function(){
		var compteur = 0;
		for (var i = 0; i < cells.length; i++) {

			var cell = cells[i];
			//top left
			if(_self.x - cellSize == cell.x && _self.y - cellSize == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}
			//top
			if(_self.x == cell.x && _self.y - cellSize == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}
			//top right
			if(_self.x + cellSize == cell.x && _self.y - cellSize == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}

			//left
			if(_self.x - cellSize == cell.x && _self.y == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}
			//right
			if(_self.x + cellSize == cell.x && _self.y == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}

			//bottom left
			if(_self.x - cellSize == cell.x && _self.y + cellSize == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}
			//bottom
			if(_self.x == cell.x && _self.y + cellSize == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}
			//bottom right
			if(_self.x + cellSize == cell.x && _self.y + cellSize == cell.y){
				if(cell.isAlive){
					compteur++;
				}
			}

			if(compteur == 2 || compteur == 3 ){
				_self.willBeAlive = true;
			} else{
				_self.willBeAlive = false;
			}
		}
	}
	_self.draw = function(){
		_self.isAlive = _self.willBeAlive;
		context.beginPath();
		context.rect(_self.x,_self.y,cellSize,cellSize);
		if(_self.isAlive){
			context.fill();
		}else{
			context.stroke();
		}
	}
}




init();

/*	for(var idx in cells){
		cells[idx].draw();
	}*/
animate();



function animate(){
	
	//drawCell();
	for(var idx in cells){
		cells[idx].check();
	}
	for(var idx in cells){
		cells[idx].draw();
	}
	window.requestAnimationFrame(animate);
}

function init(){
	for (var x = 0; x < COLUMN; x++) {
		for (var y = 0; y < ROWS; y++) {
			cells.push(new cell(x*cellSize,y*cellSize));
		}
	}
	cells[12].isAlive = true;
	cells[12].willBeAlive = true;
	//drawGrid();

}

console.log(cells);

/*function drawCell(){
	for(var idx in cells){
		cells[idx].check();
	}
}*/