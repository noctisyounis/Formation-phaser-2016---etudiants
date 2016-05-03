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
var play = true;
var blockSize=50;
var rows = context.canvas.width/blockSize;
var columns = context.canvas.height/blockSize;

function cellule(posX,posY) {
	this.isPeople= false;
	this.isFish= false;
	this.isBlock= false;
	this.isWater=false;
	this.isWaterNextTurn=false;
	this.posX=posX;	
	this.posY=posY;
	this.size=blockSize;
	this.draw = function(){
		if(this.isBlock){
			context.beginPath();
			context.rect( this.posX*this.size, this.posY*this.size, this.size, this.size );
			context.closePath();
			context.fillStyle = "rgb(111,111,111)";
			context.fill();
		}else if (this.isWater){
			context.beginPath();
			context.rect( this.posX*this.size, this.posY*this.size, this.size, this.size );
			context.closePath();
			context.fillStyle = "rgb(0,255,225)";
			context.fill();
		} else if (this.isPeople){
			context.beginPath();
			context.rect( this.posX*this.size, this.posY*this.size, this.size, this.size );
			context.closePath();
			context.fillStyle = "rgb(255,0,0)";
			context.fill();
		} else if (this.isFish){
			context.beginPath();
			context.rect( this.posX*this.size, this.posY*this.size, this.size, this.size );
			context.closePath();
			context.fillStyle = "rgb(255,255,0)";
			context.fill();
		}else {
			context.beginPath();
			context.rect( this.posX*this.size, this.posY*this.size, this.size, this.size );
			context.closePath();
			context.fillStyle = "rgb(255,255,255)";
			context.fill();
		}
	}

	this.update=function(){
		this.isWater=this.isWaterNextTurn;
		this.draw();
	}
}
var arrayColumns = [];

for (var i = 0; i < rows; i++) {
	var arrayRows = [];
	
	for (var j = 0; j < columns; j++) {
		
	var cell = new cellule(i,j);
	arrayRows.push(cell);
	var rand = Math.floor(Math.random()*100);
	if(rand<30){
		cell.isBlock= true;
	}
	if(rand<10){
		cell.isBlock=false;
		cell.isFish= true;
	}
	
	cell.draw();
		
	}
	arrayColumns.push(arrayRows);
}

function checkNeighboursEmpty(cell){
	var posX=cell.posX;
	var posY=cell.posY;



	if(cell.isWater){


		//GAUCHE

		if(posX > 0 && !arrayColumns[posX-1][posY].isWater && !arrayColumns[posX-1][posY].isBlock){
			if (arrayColumns[posX-1][posY].isPeople) {
				play =false;
				return;
			}
			arrayColumns[posX-1][posY].isWaterNextTurn = true;
		}
			
		
		//DROITE
		if(posX < arrayColumns.length-1 && !arrayColumns[posX+1][posY].isWater && !arrayColumns[posX+1][posY].isBlock){
			if (arrayColumns[posX+1][posY].isPeople) {
				play =false;
				return;
			}
			arrayColumns[posX+1][posY].isWaterNextTurn = true;
		}
			
		//HAUT
		if(posY > 0 && !arrayColumns[posX][posY-1].isWater && !arrayColumns[posX][posY-1].isBlock){
			if (arrayColumns[posX][posY-1].isPeople) {
				play =false;
				return;
			}
			arrayColumns[posX][posY-1].isWaterNextTurn = true;
		}

		//BAS
		if(posY < arrayColumns.length-1 && !arrayColumns[posX][posY+1].isWater && !arrayColumns[posX][posY+1].isBlock){
			if (arrayColumns[posX][posY+1].isPeople) {
				play =false;
				return;
			}
			arrayColumns[posX][posY+1].isWaterNextTurn = true;
		}	
	}
	

}

// function checkAlive(cell){
// 	var neighboursAlive = checkNeighboursAlive(cell);

// 	if(neighboursAlive<=1){
// 		cell.stillAlife=false;
		
// 	} else if(neighboursAlive>=4){
// 		cell.stillAlife=false;
		
// 	} else if(neighboursAlive==2||neighboursAlive==3){
// 		cell.stillAlife=true;
		
		
// 	}
// }

function turn(){
	if(play){
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
			checkNeighboursEmpty(arrayColumns[i][j]);
			}
		}
		for (var i = 0; i < rows; i++) {
			for (var j = 0; j < columns; j++) {
			arrayColumns[i][j].update();
			}
		}
		setTimeout(turn,1000);
		console.log("turn");
	}
	
}


// BASE
// function setActive(){
// 	if(Math.floor(event.clientX/50)<arrayColumns.length && Math.floor(event.clientY/50)<arrayColumns.length){

// 	arrayColumns[Math.floor(event.clientX/50)][Math.floor(event.clientY/50)].isWater=true;
// 	arrayColumns[Math.floor(event.clientX/50)][Math.floor(event.clientY/50)].isWaterNextTurn=true;
// 	arrayColumns[Math.floor(event.clientX/50)][Math.floor(event.clientY/50)].draw();

// 	}
// }

//BONUS
function setActive(){
	if(Math.floor(event.clientX/blockSize)<arrayColumns.length && Math.floor(event.clientY/blockSize)<arrayColumns.length){

		if(arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].isBlock){

		arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].isBlock=false;
		arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].isWater=false;
		arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].isWaterNextTurn=false;
		
		}else {

			arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].isBlock=true;
			arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].isWater=false;
			arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].isWaterNextTurn=false;
		
		}

 		arrayColumns[Math.floor(event.clientX/blockSize)][Math.floor(event.clientY/blockSize)].draw();
	}
}

window.addEventListener('click',setActive);
function start(){
	arrayColumns[0][0].isWater= true;
	arrayColumns[0][0].isWaterNextTurn= true;
	arrayColumns[0][0].isBlock= false;
	arrayColumns[0][0].draw();
	arrayColumns[0][1].isBlock= true;
	arrayColumns[0][1].draw();
	arrayColumns[1][0].isBlock= true;
	arrayColumns[1][0].draw();

	arrayColumns[5][5].isPeople=true;
	arrayColumns[5][5].isBlock= false;
	arrayColumns[5][5].draw();
}
start();
setTimeout(turn,1000);

	