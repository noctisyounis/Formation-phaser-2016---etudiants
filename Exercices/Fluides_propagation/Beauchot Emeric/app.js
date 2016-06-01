/**
	My canvas	
*/

// select the canvas
var canvas = document.getElementById("canvas");
	canvas.width = 800;
	canvas.height = 800;
// set the context
var context = canvas.getContext("2d");
var tileSize = 25;
var delayPropagation = 1000;
var timeouts = [];
var playing = false;
var colorsByType = {
	empty : "#FFFFFF",
	rock : "#898989",
	water : "#2512DB",
	people : "#FB8FD6",
	fire : "#F3B521",
	lava : "#FF0000",
	key: function(n) {
        return this[Object.keys(this)[n]];
    }
}
var select = document.getElementById("selectPattern")
for (var property in colorsByType) {
    if (colorsByType.hasOwnProperty(property)) {
    	var n = document.createElement("option");
    	n.text = property;
        select.options.add(n);
    }
}
//remove key from select
select.options.remove(select.options.length-1);


// 0 = empty, 1 = water, 2 = rock
var mapData =  [0,0,0,0,0,0,0,0,0,0,
				1,1,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,1,0,0,
				0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,
				0,0,1,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,
				0,0,1,0,0,0,0,0,0,0,
				0,0,0,0,1,0,0,1,0,0]

var map = fillMap();
map[10][10].changeType("people");
map[15][15].changeType("people");
map[7][9].changeType("fire");
map[4][18].changeType("fire");

drawGrid();


function drawGrid() {
	for (var i = 0; i <= canvas.width; i += tileSize) {
		context.beginPath();
		context.moveTo(i,0);
		context.lineTo(i, canvas.height);
		context.closePath();
		context.stroke();	
	}
	
	for (var j = 0; j <= canvas.height; j += tileSize) {
		context.beginPath();
		context.moveTo(0, j);
		context.lineTo(canvas.width, j);
		context.closePath();
		context.stroke();
	}
}

function fillMap() {
	var map = [];
	var dataCounter = 0;
	for (var i = 0; i < canvas.width/tileSize; i ++) {
		var mapY = [];
		for (var j = 0; j < canvas.height/tileSize; j ++) {
			//var tileType = Object.keys(colorsByType) [ mapData[dataCounter] ] || "empty";
			var tileType = Object.keys(colorsByType) [ Math.round(Math.random() - 0.40) ] || "empty";
			var tile = new mapTile(i,j,tileType);
			mapY.push(tile);
			dataCounter++;
		}
		map.push(mapY);
	}
	return map;
}

function mapTile(x,y,type) {
	var _self = this;
	_self.x = x;
	_self.y = y;
	_self.type = type || "empty";

	_self.changeType = function(newType) {
		if (_self.type == newType) {
			return false;
		} else {
			_self.type = newType
			_self.drawItself();

			_self.propagation();

			return true;
		}
	}
	_self.changeToWater = function () {
		if (_self.type == "empty" ) {
			_self.changeType("water");
		} else if (_self.type == "people") {
			_self.changeType("water");
			alert("you Lose !!!");
			for (var i=0; i<timeouts.length; i++) {
			  clearTimeout(timeouts[i]);
			}
		}else if (_self.type == "fire") {
			_self.changeType("water");
			console.log('fire extinct');
		}
	}
	_self.toggleRock = function () {
		if (_self.type == "empty") {
			_self.changeType("rock");
		} else if(_self.type == "rock"){
			if (_self.x - 1 >= 0 && map[_self.x - 1 ][_self.y ].type == "water" ) {
					_self.changeType("water");
			} else if (_self.x + 1 < map.length && map[_self.x + 1 ][_self.y ].type == "water" ) {
					_self.changeType("water");
			} else if (_self.y - 1 >= 0 && map[_self.x ][_self.y - 1 ].type == "water" ) {
					_self.changeType("water");
			} else if (_self.y + 1 < map[_self.x].length && map[_self.x ][_self.y + 1 ].type == "water" ) {
					_self.changeType("water");
			} else {
				_self.changeType("empty");
			}
		}
	}
	_self.drawItself = function() {
		context.fillStyle = colorsByType[_self.type];
		context.fillRect(_self.x*tileSize, _self.y*tileSize, tileSize, tileSize);
		context.strokeStyle="#000";
		context.strokeRect(_self.x*tileSize, _self.y*tileSize, tileSize, tileSize);		
	}
	_self.propagation = function() {
		if (_self.type != "water") {
			return false;
		} else {
			if (_self.x - 1 >= 0) {
				var id = setTimeout(function() {
					map[_self.x - 1 ][_self.y ].changeToWater("water");
				},delayPropagation);
				timeouts.push(id);
			}
			if (_self.x + 1 < map.length) {
				var id = setTimeout(function() {
					map[_self.x + 1 ][_self.y ].changeToWater("water");
				},delayPropagation);
				timeouts.push(id);
			}
			if (_self.y - 1 >= 0) {
				var id = setTimeout(function() {
					map[_self.x ][_self.y - 1 ].changeToWater("water");
				},delayPropagation);
				timeouts.push(id);
			}
			if (_self.y + 1 < map[_self.x].length) {
				var id = setTimeout(function() {
					map[_self.x ][_self.y + 1 ].changeToWater("water");
				},delayPropagation);
				timeouts.push(id);
			}

			return true;
		}
	}
	_self.drawItself();
}

function putWater(e) {
	var x = Math.floor( e.offsetX / tileSize );
	var y = Math.floor( e.offsetY / tileSize );
	
	map[x][y].changeToWater();
}
function putRock(e) {
	var x = Math.floor( e.offsetX / tileSize );
	var y = Math.floor( e.offsetY / tileSize );
	if (playing) {
		map[x][y].toggleRock("rock");
	}
}
function putSelectedBlock(e) {
	var x = Math.floor( e.offsetX / tileSize );
	var y = Math.floor( e.offsetY / tileSize );
	if (playing) {
		map[x][y].toggleRock("rock");
	} else {
		map[x][y].changeType(select.value);
	}
}

function start() {
	playing = true;
	select.setAttribute("disabled",true);
	map[0][0].changeToWater();
	map[map.length-1][0].changeToWater();
	map[0][map[0].length-1].changeToWater();
	map[map.length-1][map[0].length-1].changeToWater();
}



//document.getElementById("canvas").addEventListener('click', putWater);
//document.getElementById("canvas").addEventListener('click', putRock);
document.getElementById("canvas").addEventListener('click', putSelectedBlock);
document.getElementById("start").addEventListener('click', start);