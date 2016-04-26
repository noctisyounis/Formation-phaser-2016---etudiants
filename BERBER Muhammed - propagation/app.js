var canvas 		= document.getElementById("monCanvas");
var wW = canvas.width 	= 800;
var wH = canvas.height 	= 800;
var context = canvas.getContext('2d');
var cellSize = 50;

var cells = [];

var fps     		= 2,
	COLUMN 			= 15,
	ROWS			= COLUMN,
	totalCellNumber = COLUMN * ROWS,
	wallTileNbr 	= 40,
	drownTileNbr 	= 15,
	leftTileNbr 	= 10,
	lecture 		= false,
	tileStyle		= "wall";

/* recuperer des idnex random pour la grille  */
var rndRange = function(min, max){ return Math.floor(min + (Math.random() * (max - min))); }

var Cell = function(x,y){
	var _self 			= this;
	_self.x 			= x;
	_self.y 			= y;
	_self.isAWall 		= false;//si c'est un mur
	_self.isWater	 	= false;//si c'est de l'eau
	_self.propagation	= false;//si la cellule est en etat de propagation
	_self.toDrown		= false;//Element a noyer
	_self.toLeft		= false;//Element a ne pas noyer

	_self.check = function(){
		var compteur = 0;
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			if(_self.isWater){
				//compare la cellule par rapport a: 
				if(_self.x - cellSize == cell.x && _self.y == cell.y){//gauche
					//si la cellule n'est pas un mur ou un elem a noyer alors
					//cellule devient de l'eau et l'elem a noyer disparais
					if(!cell.isAWall || !cell.toLeft){ cell.isWater = true; cell.toDrown = false;}
				}
				if(_self.x + cellSize == cell.x && _self.y == cell.y){//droite
					if(!cell.isAWall || !cell.toLeft){ cell.isWater = true; cell.toDrown = false;}
				}
				if(_self.x == cell.x && _self.y - cellSize == cell.y){//haut
					if(!cell.isAWall || !cell.toLeft){ cell.isWater = true; cell.toDrown = false;}
				}
				if(_self.x == cell.x && _self.y + cellSize == cell.y){//bas
					if(!cell.isAWall || !cell.toLeft){ cell.isWater = true; cell.toDrown = false;}
				}
			}
			
		}
	}
	_self.draw = function(){
        if(_self.isAWall){
        	context.fillStyle = 'gray';//si mur 
        }else if(_self.toLeft){
        	context.fillStyle = 'red';//si elem a ne pas noyer
        }else if(_self.toDrown){
        	context.fillStyle = 'lightgreen';//si elem a noyer
        }else{
        	if(_self.isWater){
        		/*
        		MET LE WATER A TRUE MAIS OULIE DE METTRE LA PROPAGATION A TRUE AUSSI
        		LE CHECKCELL NE BOUCLE QUE SI IL Y A DE LA PROPAGATION
        		*/
        		_self.propagation = !_self.propagation;//la propgation de la cellule courant est propagation
        		context.fillStyle = 'lightblue';//si eau
        	}else{
        		context.fillStyle = 'white';//si vide
        	}
        }
        context.beginPath();
        context.rect(_self.x,_self.y,cellSize,cellSize);
        context.fill();
        context.stroke();
	}
}
init();
animate();


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
	for(var a = 0 ; a <= wallTileNbr ; a++ ){
		var wallRngCell 	= rndRange(0,totalCellNumber);
		cells[wallRngCell].isAWall = true;
		cells[wallRngCell].isWater = false;
		/* COMMENCE DANS UN COIN FORCE */
		cells[0].isAWall 	= false;
		cells[0].toDrown 	= false;
		cells[0].toLeft 	= false;
		cells[0].isWater 	= true;
		cells[0].propagation = true;
	}
	for(var b = 0 ; b <= drownTileNbr ; b++ ){
		var drownRngCell = rndRange(0,totalCellNumber);
		cells[wallRngCell].isAWall = false;
		cells[drownRngCell].toDrown = true;
		cells[drownRngCell].isWater = false;
	}
	for(var c = 0 ; c <= leftTileNbr ; c++ ){
		var leftRngCell 	= rndRange(0,totalCellNumber);
		cells[wallRngCell].isAWall = false;
		cells[leftRngCell].toLeft 	= true;
		cells[leftRngCell].isWater 	= false;
	}
	drawCell();
}

function checkCell(){
    for(var idx in cells){
    	if (cells[idx].propagation) {//seul les cellule dont la propagation est vrai sont appelé
        	cells[idx].check();
    	}
    }
}
function drawCell(){
	for(var idx in cells){
		cells[idx].draw();//dessine après le check
	}
}


/*
Remplit une cellue selectionné
*/
function drawWater(event){
    var clickX = event.offsetX / cellSize;
    var clickY = event.offsetY / cellSize;
    var x = Math.floor(clickX);
    var y = Math.floor(clickY);

    for(var i = 0 ;  i < cells.length ; i++){
        var cell = cells[i];
        if(x*cellSize == cell.x && y*cellSize == cell.y){

        	/* GESTION DES TYPE DE TUILES */
/*        	switch(tileStyle){
        		case 'wall':
	        		selectTile = cell.isAWall;
        		break;
        		case 'humain': //roleft
        			selectTile = cell.toLeft;
        		break;
        		case 'trash': //toDrown
        			selectTile = cell.toDrown;
        		break;
        		default:
        			selectTile = cell.isAWall;
        		break;
        	}*/
        	if(cell.isAWall){/* ENLEVE LE MUR SELECTIONNE */
        		cell.isAWall = false;
        		cell.draw();
        	}else{/* AJOUTE UN MUR SELECTIONNE */
        		cell.isAWall = true;
        		cell.draw();
        	}

        	/* AJOUT DE L'EAU A L'EMPLCEMENT SELECTIONNE (AU DEBUT DE L'EXO) */
            // cell.isWater = true;
            // cell.propagation = true;
            // cell.draw();
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


function selectList(event){
	//console.log(event.target.value);
	tileStyle = event.target.value;
}



/* HANDLER */
canvas.addEventListener('click',drawWater);


var btnStart = document.getElementById('start');
var btnStop = document.getElementById('stop');
btnStop.addEventListener('click',stopDrawing);
btnStart.addEventListener('click',startDrawing);

var optionList = document.querySelector('select');
optionList.addEventListener('change',selectList);
