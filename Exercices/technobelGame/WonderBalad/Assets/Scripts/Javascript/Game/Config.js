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

var Game = {
	imageCharacter: null,
	currentDirection: null,
}

var ImagesLoaded = 0;

var TilesType = ["Water Block", "Grass Block", "Dirt Block", "Stone Block", "Wood Block"];
var WalkableTiles = ["Grass Block", "Dirt Block", "Stone Block"];

var ImagesPath = [
	// { name:"monImage",path: "background/image.png"},
	{ name:"Character Boy",path: "PlanetCute/Character Boy.png"},
	{ name:"Character Cat Girl",path: "PlanetCute/Character Cat Girl.png"},
	{ name:"Character Horn Girl",path: "PlanetCute/Character Horn Girl.png"},
	{ name:"Character Pink Girl",path: "PlanetCute/Character Pink Girl.png"},
	{ name:"Character Princess Girl",path: "PlanetCute/Character Princess Girl.png"},
	{ name:"Gem Blue",path: "PlanetCute/Gem Blue.png"},
	{ name:"Gem Green",path: "PlanetCute/Gem Green.png"},
	{ name:"Gem Orange",path: "PlanetCute/Gem Orange.png"},
	{ name:"Heart",path: "PlanetCute/Heart.png"},
	{ name:"Enemy Bug",path: "PlanetCute/Enemy Bug.png"},
	{ name:"Key",path: "PlanetCute/Key.png"},
	{ name:"Chest Closed",path: "PlanetCute/Chest Closed.png"},
	{ name:"Chest Open",path: "PlanetCute/Chest Open.png"},
	{ name:"Water Block",path: "PlanetCute/Water Block.png"},
	{ name:"Stone Block",path: "PlanetCute/Stone Block.png"},
	{ name:"Plain Block",path: "PlanetCute/Plain Block.png"},
	{ name:"Grass Block",path: "PlanetCute/Grass Block.png"},
	{ name:"Plain Block",path: "PlanetCute/Plain Block.png"},
	{ name:"Brown Block",path: "PlanetCute/Brown Block.png"},
	{ name:"Dirt Block",path: "PlanetCute/Dirt Block.png"},
	{ name:"Wood Block",path: "PlanetCute/Wood Block.png"},
];
var Images = {};
