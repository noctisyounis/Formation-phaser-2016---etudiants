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
var WalkableTiles = [1];

var ImagesPath = [
	// { name:"monImage",path: "background/image.png"},
	{ name:"Rock",path: "PlanetCute/Rock.png"},
	{ name:"Character Boy",path: "PlanetCute/Character Boy.png"},
	{ name:"Enemy Bug",path: "PlanetCute/Enemy Bug.png"},

	{ name:"Gem Blue",path: "PlanetCute/Gem Blue.png"},
	{ name:"Gem Green",path: "PlanetCute/Gem Green.png"},
	{ name:"Gem Orange",path: "PlanetCute/Gem Orange.png"},
	{ name:"Chest Closed",path: "PlanetCute/Chest Closed.png"},

	{ name:"Dirt Block",path: "PlanetCute/Dirt Block.png"},
	{ name:"Grass Block",path: "PlanetCute/Grass Block.png"},
	{ name:"Hole Block",path: "PlanetCute/Hole Block.png"},
	{ name:"Tree Tall",path: "PlanetCute/Tree Tall.png"},

	{ name:"Heart",path: "PlanetCute/Heart.png"},
	{ name:"Key",path: "PlanetCute/Key.png"}
	
];
var Images = {};
