/*
	1 : Dessiner sur la canvas un des héros dans le dossier image
	2 : aténuer l'opacité de cette image 
	3 : Dessiner par dessus avec les formes 
	4 : Remplir les formes de couleur
 	5 : Ajouter un dégradé dans une partie du corp ou plus si vous avez le temps
*/

// Canvas Cheat Sheet 1 : http://cheatsheetworld.com/programming/html5-canvas-cheat-sheet/
// Canvas Cheat sheet 2 : https://simon.html5.org/dump/html5-canvas-cheat-sheet.html



// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");
	

var rows = context.canvas.width/5;
var columns = context.canvas.height/5;

function cellule(posX,posY) {
	this.isAlife= false;
	this.stillAlife=true;
	this.posX=posX;	
	this.posY=posY;
	this.size=5;
	this.draw = function(){
		if(this.isAlife){
			context.beginPath();
			context.rect( this.posX*this.size, this.posY*this.size, this.size, this.size );
			context.closePath();
			context.fillStyle = "rgb(0,0,0)";
			context.fill();
		}else{
			context.beginPath();
			context.rect( this.posX*this.size, this.posY*this.size, this.size, this.size );
			context.closePath();
			context.fillStyle = "rgb(255,255,255)";
			context.fill();
		}
	}

	this.update=function(){
		this.isAlife=this.stillAlife;
		this.draw();
	}
}
var arrayColumns = [];

for (var i = 0; i < rows; i++) {
	var arrayRows = [];
	
	for (var j = 0; j < columns; j++) {
		
	var cell = new cellule(i,j);
	arrayRows.push(cell);
	cell.draw();
		
	}
	arrayColumns.push(arrayRows);
}

function checkNeighboursAlive(cell){
	var nbOfAlive =0;
	var posX=cell.posX;
	var posY=cell.posY;


	if(posX>0){
		
		if(posY > 0 && arrayColumns[posX-1][posY-1].isAlife){
			
		nbOfAlive++;
		}
		if(arrayColumns[posX-1][posY].isAlife){
			
			nbOfAlive++;
		}
		if(posY < arrayColumns.length-1 && arrayColumns[posX-1][posY+1].isAlife){
			
			nbOfAlive++;
		}
	}

	if(posX < arrayColumns.length-1 ){
		if(posY > 0 && arrayColumns[posX+1][posY-1].isAlife){
			
		nbOfAlive++;
		}
		if(arrayColumns[posX+1][posY].isAlife){
		
			nbOfAlive++;
		}
		if(posY < arrayColumns.length-1 && arrayColumns[posX+1][posY+1].isAlife){
			
			nbOfAlive++;
		}
	}
	if(posY > 0 && arrayColumns[posX][posY-1].isAlife){
		
		nbOfAlive++;
	}
	if(posY < arrayColumns.length-1 && arrayColumns[posX][posY+1].isAlife){
		
		nbOfAlive++;
	}
	
	return nbOfAlive;

}

function checkAlive(cell){
	var neighboursAlive = checkNeighboursAlive(cell);

	if(neighboursAlive<=1){
		cell.stillAlife=false;
		
	} else if(neighboursAlive>=4){
		cell.stillAlife=false;
		
	} else if(neighboursAlive==2||neighboursAlive==3){
		cell.stillAlife=true;
		
		
	}
}

function turn(){
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
		
		checkAlive(arrayColumns[i][j]);
		
		}
	}
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
		
		arrayColumns[i][j].update();
		
		}
	}
	setTimeout(turn,200);
	console.log("turn");
}

function start(){
	arrayColumns[39][40].isAlife = true;
	arrayColumns[39][40].draw();
	arrayColumns[41][40].isAlife = true;
	arrayColumns[41][40].draw();
	arrayColumns[40][39].isAlife = true;
	arrayColumns[40][39].draw();
	arrayColumns[40][40].isAlife = true;
	arrayColumns[40][40].draw();
}
start();
setTimeout(turn,200);

	