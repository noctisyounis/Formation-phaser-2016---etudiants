var canvas 		= document.getElementById("monCanvas");
var wW = canvas.width 	= 800;
var wH = canvas.height 	= 800;
var context = canvas.getContext('2d');
var cellSize = 50;

var cells = [];

var fps     = 2;
var COLUMN 	= 11;
var ROWS	= COLUMN;


var lecture = false;


function drawGrid(){
	for (var i = 0; i < COLUMN; i++) {
		for (var y = 0; y < ROWS; y++) {
			context.beginPath();
			context.rect(i*cellSize,y*cellSize,cellSize,cellSize);
			context.stroke();
		}
	}
}

var Cell = function(x,y){
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
        /*
        si vivant
            - si vivant au suivant -> vert
            - sinon rouge
        si mort
            - si vivant au prochain - > gris
            - sinon blancs
        */
        if (_self.isAlive) {
            if (_self.willBeAlive){
                context.fillStyle = "green";
            }else{
                context.fillStyle = "red";
            }
        }else{
            if(_self.willBeAlive){
                context.fillStyle = "gray";
            }else{
                context.fillStyle = "white";
            }
        }
        _self.isAlive = _self.willBeAlive;
        context.beginPath();
        context.rect(_self.x,_self.y,cellSize,cellSize);
        context.fill();
        context.stroke();
	}
}




init();
/*cells[60].isAlive = true;
cells[60].willBeAlive = true;
cells[61].isAlive = true;
cells[61].willBeAlive = true;
cells[49].isAlive = true;
cells[49].willBeAlive = true;
cells[50].isAlive = true;
cells[50].willBeAlive = true;*/
//checkCell();
drawCell();
//animate();



function animate(){
    setTimeout(function() {
        window.requestAnimationFrame(animate);
        if(lecture){
            checkCell();
            drawCell();
        }
    }, 1000 / fps);
}

function init(){
	for (var x = 0; x < COLUMN; x++) {
		for (var y = 0; y < ROWS; y++) {
			cells.push(new Cell(x*cellSize,y*cellSize));
		}
	}
}

function checkCell(){
    for(var idx in cells){
        cells[idx].check();
    }
}
function drawCell(){
	for(var idx in cells){
		cells[idx].draw();
	}
}



function drawCube(event){
    var clickX = event.offsetX / cellSize;
    var clickY = event.offsetY / cellSize;
    var x = Math.floor(clickX);
    var y = Math.floor(clickY);

    for(var i = 0 ;  i < cells.length ; i++){
        var cell = cells[i];
        if(x*cellSize == cell.x && y*cellSize == cell.y){
            cell.isAlive = true;
            cell.willBeAlive = true;
            cell.draw();
        }
    }
}



function startDrawing(){
    lecture = true;
    animate();
}
function stopDrawing(){
    lecture = false;
}


/* HANDLER */
canvas.addEventListener('click',drawCube);


var btnStart = document.getElementById('start');
var btnStop = document.getElementById('stop');
btnStop.addEventListener('click',stopDrawing);
btnStart.addEventListener('click',startDrawing);