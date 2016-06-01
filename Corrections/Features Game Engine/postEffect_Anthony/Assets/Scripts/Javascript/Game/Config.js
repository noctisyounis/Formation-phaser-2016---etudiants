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
	{ name:"boy",path: "PlanetCute/boris.png"},
	{ name:"maskRound",path: "Masks/round.gif"},
	{ name:"maskRectangle",path: "Masks/rectangle.png"}
];

var Images = {};
