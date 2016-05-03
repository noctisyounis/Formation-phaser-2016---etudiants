var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");




var Scenes = {};
var gravity = new Vector();
gravity.y = -9.81;

var Application = {
	LoadedScene: null,
	GamePaused: false,
	debugMode: false
};

var ImagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = [
	{ name:"Boy",path: "PlanetCute/Character Boy.png"},
	{ name:"herve",path: "PlanetCute/herve.png"},
	{ name:"vincianne",path: "PlanetCute/vincianne.png"},
];
var Images = {};
