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
	{ name:"Character Boy",path: "PlanetCute/Character Boy.png"},
	{ name:"Star",path: "PlanetCute/Star.png"},
	{ name:"mask",path: "mask.png"},
];
var Images = {};
