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
	// { name:"monImage",path: "background/image.png"},
	{name: "Character Boy", path: "PlanetCute/Character Boy.png"},
	{name: "Grass Block", path: "PlanetCute/Grass Block.png"},
	{name: "Stone Block Tall", path: "PlanetCute/Stone Block Tall.png"},
	{name: "Brown Block", path: "PlanetCute/Brown Block.png"},
	{name: "Chest Closed", path: "PlanetCute/Chest Closed.png"},
	{name: "Chest Open", path: "PlanetCute/Chest Open.png"},
	{name: "Dirt Block", path: "PlanetCute/Dirt Block.png"},
	{name: "Plain Block", path: "PlanetCute/Plain Block.png"},
	{name: "Ramp East", path: "PlanetCute/Ramp East.png"},
	{name: "Ramp North", path: "PlanetCute/Ramp North.png"},
	{name: "Ramp South", path: "PlanetCute/Ramp South.png"},
	{name: "Ramp West", path: "PlanetCute/Ramp West.png"},
	{name: "Rock", path: "PlanetCute/Rock.png"},
	{name: "Roof East", path: "PlanetCute/Roof East.png"},
	{name: "Roof North East", path: "PlanetCute/Roof North East.png"},
	{name: "Roof North West", path: "PlanetCute/Roof North West.png"},
	{name: "Roof North", path: "PlanetCute/Roof North.png"},
	{name: "Roof South East", path: "PlanetCute/Roof South East.png"},
	{name: "Roof South West", path: "PlanetCute/Roof South West.png"},
	{name: "Roof South", path: "PlanetCute/Roof South.png"},
	{name: "Roof West", path: "PlanetCute/Roof West.png"},
	{name: "Star", path: "PlanetCute/Star.png"},
	{name: "Stone Block", path: "PlanetCute/Stone Block.png"},
	{name: "Tree Short", path: "PlanetCute/Tree Short.png"},
	{name: "Tree Tall", path: "PlanetCute/Tree Tall.png"},
	{name: "Tree Ugly", path: "PlanetCute/Tree Ugly.png"},
	{name: "Wall Block Tall", path: "PlanetCute/Wall Block Tall.png"},
	{name: "Wall Block", path: "PlanetCute/Wall Block.png"},
	{name: "Water Block", path: "PlanetCute/Water Block.png"},
	{name: "Window Tall", path: "PlanetCute/Window Tall.png"},
	{name: "Wood Block", path: "PlanetCute/Wood Block.png"},
	{name: "Key", path: "PlanetCute/Key.png"},
	{name: "Door Tall Closed", path: "PlanetCute/Door Tall Closed.png"},
	{name: "Door Tall Open", path: "PlanetCute/Door Tall Open.png"},
	{name: "Enemy Bug", path: "PlanetCute/Enemy Bug.png"},
	{name: "Heart", path: "PlanetCute/Heart.png"},
	{name: "Gem Blue", path: "PlanetCute/Gem Blue.png"},
	{name: "Gem Green", path: "PlanetCute/Gem Green.png"},
	{name: "Gem Orange", path: "PlanetCute/Gem Orange.png"},
	{name: "Character Cat Girl", path: "PlanetCute/Character Cat Girl.png"},
	{name: "Character Horn Girl", path: "PlanetCute/Character Horn Girl.png"},
	{name: "Character Pink Girl", path: "PlanetCute/Character Pink Girl.png"},
	{name: "Character Princess Girl", path: "PlanetCute/Character Princess Girl.png"},
];
var Images = {};
