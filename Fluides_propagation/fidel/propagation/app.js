var div = document.querySelector('#myId1');

//Create Canvas
var canvas = document.createElement('canvas');
canvas.style.width = '1200px';
canvas.style.height = '1200px';
div.appendChild(canvas);
//

// var canvas = document.getElementById('myCanvas');
canvas.width = 400;
canvas.height = 400;


console.log(canvas);

var context = canvas.getContext('2d');
var COTE = 10;
var HEIGHT = canvas.height/COTE;  // nbre sur colon
var WIDTH = canvas.width/COTE;		// nbre sur ligne
var tbPixels = [];

//Un bloc
function getPixel(argAbx, argOrd, argIndiceColor) {
	_self = this;

	_self.abx =argAbx;
	_self.ord = argOrd;
	_self.color = (argIndiceColor == 1) ? 'grey' : 'white';
			// au extremité
		_self.top = (argOrd == 0)? true:false;
		_self.rigth = (argAbx == WIDTH - COTE)? true:false;
		_self.bottom = (argOrd == HEIGHT - COTE)? true:false;
		_self.left = (argAbx == 0)? true:false;
	_self.nbVoisinWithColor = 0;
}

//Draw 
function drawOnePixel(argPixel) {
  context.fillStyle = argPixel.color;
  context.fillRect(argPixel.abx, argPixel.ord, COTE, COTE);
}


function fillCanvas() {
	for(var i = 0; i < WIDTH; i++){
		for(var j = 0; j < HEIGHT; j++) {
			var random = Math.floor(Math.random()*4)
			var obj = new getPixel(i*COTE, j*COTE, random);
			console.log(obj.abx)
			tbPixels.push(obj);
			drawOnePixel(obj);
		}
	}
}


function initVoisinage(arg, indicArg) {
			
		if(arg.top == true	&& arg.left == true ) {
				var tbIndic	 = [indicArg + 1, indicArg + HEIGHT, indicArg + HEIGHT + 1];
				console.log(tbIndic)
				for(var n = 0; n < tbIndic.length; n++) {
					if(tbPixels[tbIndic[n]].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
				console.log	(tbPixels[indicArg])

		}
		if(arg.top == true	&& arg.rigth == true ) {
				var tbIndic	 = [indicArg + 1, indicArg - HEIGHT, indicArg - HEIGHT + 1];
				for(var n = 0; n < tbIndic.length; n++) {
					if(tbPixels[tbIndic[n]].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
		}
		if(arg.bottom == true	&& arg.left == true ) {
				var tbIndic	 = [indicArg - 1, indicArg + HEIGHT, indicArg + HEIGHT - 1];
				for(var n = 0; n < tbIndic.length; n++) {
					if(tbPixels[tbIndic[n]].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
		} 
		if(arg.bottom == true	&& arg.rigth == true ) {
				var tbIndic	 = [indicArg - 1, indicArg - HEIGHT, indicArg - HEIGHT - 1];
				for(var n = 0; n < tbIndic.length; n++) {
					if(tbPixels[tbIndic[n]].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
		} //
		if(arg.top == true	&& arg.rigth == false && arg.left == false  ) {
				var tbIndic	 = [indicArg + 1, indicArg + HEIGHT, indicArg + HEIGHT + 1,
									indicArg - HEIGHT, indicArg - HEIGHT + 1];
									for(var n = 0; n < tbIndic.length; n++) {
					if(tbPixels[n].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
				console.log("======")
										console.log(tbIndic)
		}
		if(arg.bottom == true	&& arg.left == false && arg.rigth == false  ) {
				var tbIndic	 = [indicArg - 1, indicArg + HEIGHT, indicArg + HEIGHT - 1,
									indicArg - HEIGHT, indicArg - HEIGHT - 1];
									for(var n = 0; n < tbIndic.length; n++) {
					if(tbPixels[n].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
		} //
		if(arg.left == true && arg.top == false && arg.bottom == false   ) {
				var tbIndic	 = [indicArg + 1, indicArg - 1, indicArg + HEIGHT,
									indicArg + HEIGHT  + 1, indicArg + HEIGHT - 1];
									for(var n = 0; n < tbIndic.length; n++) {
					if(tbPixels[n].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
		}
		if(arg.rigth == true && arg.top == false && arg.bottom == false   ) {
				var tbIndic	 = [indicArg + 1, indicArg - 1, indicArg - HEIGHT,
									indicArg - HEIGHT  + 1, indicArg - HEIGHT - 1];
									for(var n = 0; n < tbIndic.length; n++) {
					if(tbIndic[n].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
		}
		if(arg.top == false && arg.bottom == false && arg.rigth == false	&& arg.left == false ) {
				var tbIndic	 = [indicArg + 1, indicArg - 1, indicArg + HEIGHT, indicArg - HEIGHT,
									indicArg + HEIGHT  + 1, indicArg + HEIGHT - 1,
									indicArg - HEIGHT  + 1, indicArg - HEIGHT - 1];
									for(var n = 0; n < tbIndic.length; n++) {
					if(tbIndic[n].color == 'blue') {
						tbPixels[indicArg].nbVoisinWithColor++;
					}
				}
		}
}



fillCanvas();


// console.log(tbPixels[20])
// console.log(tbPixels.length)

// for(var t = 0; t<tbPixels.length; t++) {
// 	initVoisinage(tbPixels[t], t);
// 	console.log(t + "==> "+ tbPixels.nbVoisinWithColor);
// }
var id;
function getPixFromClick(clieX, clieY) {
	var vx = Math.ceil(clieX/COTE);
	var vy = Math.ceil(clieY/COTE);
	id = (vx - 1)*HEIGHT + vy - 1;
}

function propage() {

	if(tbPixels[id].color !== 'grey' && tbPixels[id].color !== 'blue'){
		 tbPixels[id].color = "blue";
		}
	drawOnePixel(tbPixels[id])
	id--;


}
function voisinn(argument) {
	var iTopLeft = [1, HEIGHT, HEIGHT+1, HEIGHT+2];
	var iTopRight = [HEIGHT-1, HEIGHT+COTE, HEIGHT+COTE-1];
	var iBottomLeft = [HEIGHT-1, HEIGHT+COTE, HEIGHT+COTE-1];
	var iBottomRight = [];
}
function propagation(e){
  // CAPTURE LE BOUT DU CLICK  console.log((e.offsetX + 1)/3+' '+(e.offsetY+1)/3);
    getPixFromClick((e.offsetX + 1)/3, (e.offsetY + 1)/3);
    setInterval(propage, 1000);
}

	



 canvas.addEventListener("click", propagation);