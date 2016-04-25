

// select the canvas
var canvas = document.querySelector("#canvas");

// set the context
var context = canvas.getContext("2d");

var COTE = 10;
function getCordonnee(x, y) {
	_self = this;

	_self.abx = x;
	_self.ord = y;
	_self.cote = 10;
	_self.valid = false;

	_self.extemite = 
	{
		top: (y == 0)? true:false,
		rigth: (x == 290)? true:false,
		bottom: (y == 290)? true:false,
		left: (x == 0)? true:false,
	};
	_self.voisins = [];
	_self.nbVoisinsOn = 0;

}

function generateCoordVoisinages(arg) {
		if(arg.extemite.top == true	&& arg.extemite.left == true ) {
				arg.voisins	 = [new getCordonnee(arg.abx + COTE, arg.ord ),
				 				 new getCordonnee(arg.abx + COTE, arg.ord + COTE ),
				 				new getCordonnee(arg.abx, arg.ord + COTE ) ];
		}
		if(arg.extemite.top == true	&& arg.extemite.rigth == true ) {
				arg.voisins	 = [new getCordonnee(arg.abx - COTE, arg.ord ),
				 				new getCordonnee(arg.abx - COTE, arg.ord - COTE ),
				 				new getCordonnee(arg.abx, arg.ord - COTE ) ];
		}
		if(arg.extemite.bottom == true	&& arg.extemite.left == true ) {
				arg.voisins	 = [new getCordonnee(arg.abx, arg.ord - COTE ),
				 				new getCordonnee(arg.abx + COTE, arg.ord - COTE ),
				 				new getCordonnee(arg.abx + COTE, arg.ord) ];
		} 
		if(arg.extemite.bottom == true	&& arg.extemite.rigth == true ) {
				arg.voisins	 = [new getCordonnee(arg.abx - COTE, arg.ord),
				 				new getCordonnee(arg.abx - COTE, arg.ord - COTE ),
				 				new getCordonnee(arg.abx, arg.ord - COTE) ];
		} //
		if(arg.extemite.top == true	&& arg.extemite.rigth == false && arg.extemite.left == false  ) {
				arg.voisins	 = [new getCordonnee(arg.abx + COTE, arg.ord ),
				 				new getCordonnee(arg.abx - COTE, arg.ord),
				 				new getCordonnee(arg.abx, arg.ord + COTE ),
				 				new getCordonnee(arg.abx + COTE, arg.ord + COTE),
				 				new getCordonnee(arg.abx - COTE, arg.ord + COTE)   ];
		}
		if(arg.extemite.bottom == true	&& arg.extemite.left == false && arg.extemite.rigth == false  ) {
				arg.voisins	 = [new getCordonnee(arg.abx, arg.ord - COTE ),
				 				new getCordonnee(arg.abx - COTE, arg.ord - COTE ),
				 				new getCordonnee(arg.abx - COTE, arg.ord),
				 				new getCordonnee(arg.abx + COTE, arg.ord - COTE),
				 				new getCordonnee(arg.abx + COTE, arg.ord)   ];
		} //
		if(arg.extemite.left == true && arg.extemite.top == false && arg.extemite.bottom == false   ) {
				arg.voisins	 = [new getCordonnee(arg.abx, arg.ord - COTE ),
				 				new getCordonnee(arg.abx, arg.ord + COTE ),
				 				new getCordonnee(arg.abx + COTE, arg.ord + COTE ),
				 				new getCordonnee(arg.abx + COTE, arg.ord - COTE),
				 				new getCordonnee(arg.abx + COTE, arg.ord)  ];
		}
		if(arg.extemite.rigth == true && arg.extemite.top == false && arg.extemite.bottom == false   ) {
				arg.voisins	 = [new getCordonnee(arg.abx, arg.ord - COTE ),
				 				new getCordonnee(arg.abx, arg.ord + COTE ),
				 				new getCordonnee(arg.abx - COTE, arg.ord + COTE ),
				 				new getCordonnee(arg.abx - COTE, arg.ord - COTE),
				 				new getCordonnee(arg.abx - COTE, arg.ord)  ];
		}
		if(arg.extemite.top == false && arg.extemite.bottom == false && arg.extemite.rigth == false	&& arg.extemite.left == false ) {
			arg.voisins	 = [new getCordonnee(arg.abx - COTE, arg.ord),
				 				new getCordonnee(arg.abx - COTE, arg.ord - COTE),
				 				new getCordonnee(arg.abx - COTE, arg.ord + COTE),
				 				new getCordonnee(arg.abx, arg.ord - COTE), 
				 				new getCordonnee(arg.abx, arg.ord + COTE),
				 				new getCordonnee(arg.abx + COTE, arg.ord - COTE ),
				 				new getCordonnee(arg.abx + COTE, arg.ord + COTE),
				 				new getCordonnee(arg.abx + COTE, arg.ord) ];	
		}
}
var ae = new getCordonnee(0, 0);
generateCoordVoisinages(ae);
console.log(ae)

var tbCordonneePredefini = [ new getCordonnee(20, 0) , new getCordonnee(20, 10), new getCordonnee(0, 50),
					new getCordonnee(100, 0) , new getCordonnee(50, 100), new getCordonnee(120, 80),
					new getCordonnee(200, 0) , new getCordonnee(50, 50), new getCordonnee(290, 290),
				];

				//CHECK FOR LEFT RIGHT BOTTOM TOP
//  for(var i = 0; i<tbCordonneePredefini.length ; i++){
//  console.log(tbCordonneePredefini[i].extemite)
// }

var cpt = 0
var tbCordonnee = [];

function checkToDrawColor(tbArg, arg) {
		for(var i = 0; i < tbArg.length; i++) {
				if(tbArg[i].abx === arg.abx && tbArg[i].ord === arg.ord) {
			 		arg.valid = true;
					tbArg[i].valid = true;
				}
			}
}

function drawPixel() {
		
		for (var i = 0; i< 30; i++) {
			for(var j = 0; j<30; j++) {
				var a = i*COTE;
				var b = j*COTE;

				 var obj = new getCordonnee(a, b);

				 checkToDrawColor(tbCordonneePredefini, obj);

			      context.beginPath();
			      context.rect(a, b, COTE, COTE);
			      if(obj.valid == true){
			      	context.fillStyle = 'green';
			      	// 
			      } else {
			      context.fillStyle = 'white';
				  }
			      context.fill();
			      context.lineWidth = 0;
			      context.strokeStyle = 'black';
			      context.stroke();		     

			  generateCoordVoisinages(obj)
			   tbCordonnee.push(obj);
		  }
		}
}


drawPixel();
// console.log(tbCordonnee)

// var contraint1 = new getCordonnee(80, 150);

function checkToDrawColorAgain() {
	for(var i = 0; i < tbCordonnee.length; i++) {
		for(var j = 0; j < tbCordonnee[i].voisins.length; j++) {
			if(tbCordonnee[i].voisins[j] ==true) {
				///////////
			}
		}
	}
}


function drawPixelAgain() {
		
	for(var t = 0; t<tbCordonnee.length; t++){

			

			      context.beginPath();
			      context.rect(tbCordonnee[t].abx, tbCordonnee[t].ord, COTE, COTE);

			      checkToDrawColorAgain();

			      if(tbCordonnee[t].valid == true){
			      	context.fillStyle = 'green';
			      	// 
			      } else {
			      context.fillStyle = 'white';
				  }

			      context.fill();
			      context.lineWidth = 0;
			      context.strokeStyle = 'black';
			      context.stroke();		
			   }   

}


setTimeout( drawPixelAgain , 2000);

console.log(tbCordonnee)

/*
	Rules : game of life
		-	cellule avec 1 ou 0 voisins meurt de solitude
		-	cellule avec 4 ou + voisins meurt de surpopulation
		-	chaque cellue avec 2 ou 3 voisins survi ou nait
*/


