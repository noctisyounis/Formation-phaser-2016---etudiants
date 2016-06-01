var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var Scenes = {};
var gravity = new Vector();
gravity.y = -9.81;

var Application = {
	LoadedScene: null,
	GamePaused: false,
	debugMode: true
};

var ImagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = [
	// { name:"monImage",path: "background/image.png"},
	{ name:"blueGem", path: "PlanetCute/Gem Blue.png"},
	{ name:"greenGem", path: "PlanetCute/Gem Green.png"},
	{ name:"orangeGem", path: "PlanetCute/Gem Orange.png"}
];
var Images = {};


var CONSTANTS_GEM = {
	that : this,
	SCALE : 0.5,
	SIZE : new Vector(101,171),
	dist : {
		x : 0,//that.SIZE.x * that.SCALE, 
		y : 0//that.SIZE.y * that.SCALE
	}
};

	CONSTANTS_GEM.dist.x = CONSTANTS_GEM.SIZE.x * CONSTANTS_GEM.SCALE;
	CONSTANTS_GEM.dist.y = CONSTANTS_GEM.SIZE.y * CONSTANTS_GEM.SCALE;

var ROWS = COLUMNS = 5;


