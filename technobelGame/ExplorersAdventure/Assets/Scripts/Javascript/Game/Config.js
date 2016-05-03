var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var Scenes = {};
var gravity = new Vector();
gravity.y = -9.81;


var Application = {
	LoadedScene: null,
	GamePaused: false,
	debugMode: false,
	PlayerImg: "",
	Player: null,
	Level:1,
	LevelMap:null,
	LevelItemMap:null
};

var ImagesLoaded = 0;
var WalkableTiles = [0,1,2,3,4,5];
var BlockingObject = [7,8,9,10,11];

//					0				1			2			  3				4			  5				6 			   7					 8
var TileType= ["Plain Block","Brown Block","Dirt Block","Grass Block","Stone Block","Wood Block","Water Block","Stone Block Tall","Wall Block Tall"]
//				0		 1			2			3		   4			5		 6		7			8			9			10			 11 			12 
var ItemType= [null,"Selector","Enemy Bug","Gem Blue","Gem Green","Gem Orange","Key","Rock","Tree Short","Tree Tall","Chest Closed","Chest Open","Chest Lid"]


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
	{ name:"Wood Block",path: "PlanetCute/Wood Block.png"}
];
var Images = {};



/*********************
		LEVEL 
*********************/

var LevelData = [];

var map1 = [
	3,3,3,3,3,4,5,6,6,6,
	3,3,3,3,4,4,4,5,6,6,
	3,3,3,4,4,4,4,4,5,6,
	3,3,4,4,4,4,4,4,4,5,
	3,3,4,4,4,4,4,4,4,4,
	3,3,4,4,4,4,4,4,4,4,
	3,3,4,4,4,4,4,4,4,4,
	3,3,4,4,4,4,4,4,4,4
];


var items1 = [
	-1,0,0,0,0,0,0,0,0,0,
	2,0,0,1,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	9,0,0,0,0,3,0,0,0,0,
	9,0,0,4,0,0,0,0,0,5,
	9,0,0,0,0,0,7,7,0,0,
	0,0,2,0,2,0,7,7,5,0,
	5,0,0,0,0,0,0,0,0,0
];

LevelData[1]={map:map1,items:items1};

var map2 = [
	6,6,6,6,6,6,6,6,6,6,
	6,6,6,6,3,3,6,6,6,6,
	6,6,6,3,3,3,3,6,6,6,
	6,6,3,3,3,3,3,3,6,6,
	6,6,3,3,3,3,3,3,6,6,
	6,6,6,3,3,3,3,6,6,6,
	6,6,6,6,3,3,6,6,6,6,
	6,6,6,6,6,6,6,6,6,6
];


var items2 = [
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,1,0,0,0,0,0,
	0,0,0,0,0,-1,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0
];

LevelData[2]={map:map2,items:items2};