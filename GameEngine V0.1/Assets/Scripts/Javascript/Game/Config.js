/**
 * Get Canvas and the context<br/>
 *
 * - Create Scene Object which will contain the scene<br/>
 * - Create and set the gravity<br/>
 * - Application : An Object which will handle the scene to load, if game is paused or not and if debug mode is activate<br/>
 * - imagesLoaded : counter for loaded images<br/>
 * - WalkableTiles : an Array which will contain where integer where we can walk<br/>
 * - ImagesPath : Array of image object. Each image has a name and a path<br/>
 * - Images : an object which contain all loaded image
 * 
 * */


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var Scenes = {};
var Gravity = new Vector();
Gravity.y = -9.81;


var Application = 
{
	LoadedScene: null,
	gamePaused: false,
	debugMode: false
};

var imagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = 
[
	// { name:"monImage",path: "background/image.png"},
	{ name:"Boy",path: "Examples/PlanetCute/Character Boy.png"},
	{ name:"Cat",path: "Examples/PlanetCute/Character Cat Girl.png"},
	{ name:"Horn",path: "Examples/PlanetCute/Character Horn Girl.png"},
	{ name:"Pink",path: "Examples/PlanetCute/Character Pink Girl.png"},
	{ name:"Princess",path: "Examples/PlanetCute/Character Princess Girl.png"},
	{ name:"Brown Block",path: "Examples/PlanetCute/Brown Block.png"},
	{ name:"Enemy Bug",path: "Examples/PlanetCute/Enemy Bug.png"},
	{ name:"Gem Blue",path: "Examples/PlanetCute/Gem Blue.png"},
	{ name:"Gem Green",path: "Examples/PlanetCute/Gem Green.png"},
	{ name:"Gem Orange",path: "Examples/PlanetCute/Gem Orange.png"},
	{ name:"Heart",path: "Examples/PlanetCute/Heart.png"},
	{ name:"Dirt Block",path: "Examples/PlanetCute/Dirt Block.png"},
	{ name:"Grass Block",path: "Examples/PlanetCute/Grass Block.png"},
	{ name:"Key",path: "Examples/PlanetCute/Key.png"},
	{ name:"Plain Block",path: "Examples/PlanetCute/Plain Block.png"},
	{ name:"Rock",path: "Examples/PlanetCute/Rock.png"},
	{ name:"Stone Block",path: "Examples/PlanetCute/Stone Block.png"},
	{ name:"Stone Block Tall",path: "Examples/PlanetCute/Stone Block Tall.png"},
	{ name:"Tree Short",path: "Examples/PlanetCute/Tree Short.png"},
	{ name:"Tree Tall",path: "Examples/PlanetCute/Tree Tall.png"},
	{ name:"Wall Block",path: "Examples/PlanetCute/Wall Block.png"},
	{ name:"Wall Block Tall",path: "Examples/PlanetCute/Wall Block Tall.png"},
	{ name:"Selector",path: "Examples/PlanetCute/Selector.png"},
	{ name:"Chest Closed",path: "Examples/PlanetCute/Chest Closed.png"},
	{ name:"Chest Open",path: "Examples/PlanetCute/Chest Open.png"},
	{ name:"Chest Lid",path: "Examples/PlanetCute/Chest Lid.png"},
	{ name:"Water Block",path: "Examples/PlanetCute/Water Block.png"},
	{ name:"Stone Block Tall",path: "Examples/PlanetCute/Stone Block Tall.png"},
	{ name:"Wall Block Tall",path: "Examples/PlanetCute/Wall Block Tall.png"},
	{ name:"Wood Block",path: "Examples/PlanetCute/Wood Block.png"},
	{ name:"alphaMask1",path: "Examples/AlphaMask/round.jpg"},
	{ name:"alphaMask2",path: "Examples/AlphaMask/fire.jpg"},
	{ name:"Fond",path: "Examples/Fond.jpg"},
	{ name:"bgDemo",path: "Examples/bgDemo.jpg"},
	{ name:"alphaMask3",path: "Examples/AlphaMask/mask.png"},
	{ name:"sprite",path: "Examples/drake.png"}
];
var Images = {};