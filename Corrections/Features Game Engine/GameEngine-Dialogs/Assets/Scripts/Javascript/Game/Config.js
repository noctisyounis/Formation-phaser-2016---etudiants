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
	{ name:"Boy",path: "PlanetCute/Character Boy.png"},
	{ name:"Cat",path: "PlanetCute/Character Cat Girl.png"},
	{ name:"Horn",path: "PlanetCute/Character Horn Girl.png"},
	{ name:"Pink",path: "PlanetCute/Character Pink Girl.png"},
	{ name:"Princess",path: "PlanetCute/Character Princess Girl.png"},
	{ name:"Brown Block",path: "PlanetCute/Brown Block.png"},
	{ name:"Enemy Bug",path: "PlanetCute/Enemy Bug.png"},
	{ name:"Gem Blue",path: "PlanetCute/Gem Blue.png"},
	{ name:"Gem Green",path: "PlanetCute/Gem Green.png"},
	{ name:"Gem Orange",path: "PlanetCute/Gem Orange.png"},
	{ name:"Heart",path: "PlanetCute/Heart.png"},
	{ name:"Dirt Block",path: "PlanetCute/Dirt Block.png"},
	{ name:"Grass Block",path: "PlanetCute/Grass Block.png"},
	{ name:"Key",path: "PlanetCute/Key.png"},
	{ name:"Plain Block",path: "PlanetCute/Plain Block.png"},
	{ name:"Rock",path: "PlanetCute/Rock.png"},
	{ name:"Stone Block",path: "PlanetCute/Stone Block.png"},
	{ name:"Stone Block Tall",path: "PlanetCute/Stone Block Tall.png"},
	{ name:"Tree Short",path: "PlanetCute/Tree Short.png"},
	{ name:"Tree Tall",path: "PlanetCute/Tree Tall.png"},
	{ name:"Wall Block",path: "PlanetCute/Wall Block.png"},
	{ name:"Wall Block Tall",path: "PlanetCute/Wall Block Tall.png"},
	{ name:"Selector",path: "PlanetCute/Selector.png"},
	{ name:"Chest Closed",path: "PlanetCute/Chest Closed.png"},
	{ name:"Chest Open",path: "PlanetCute/Chest Open.png"},
	{ name:"Chest Lid",path: "PlanetCute/Chest Lid.png"},
	{ name:"Water Block",path: "PlanetCute/Water Block.png"},
	{ name:"Stone Block Tall",path: "PlanetCute/Stone Block Tall.png"},
	{ name:"Wall Block Tall",path: "PlanetCute/Wall Block Tall.png"},
	{ name:"Wood Block",path: "PlanetCute/Wood Block.png"},
	{ name:"alphaMask1",path: "AlphaMask/round.jpg"},
	{ name:"alphaMask2",path: "AlphaMask/fire.jpg"}
];
var Images = {};

var AlphaMasksPath = [
	
];
var AlphaMasks = {};