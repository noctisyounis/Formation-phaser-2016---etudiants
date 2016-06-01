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
	{name : "CharaBoy", path : "Character_Boy.png"},
	{name : "CharaCatGirl", path : "Character_Cat_Girl.png"},
	{name : "CharaHornGirl", path : "Character_Horn_Girl.png"},
	{name : "CharaPinkGirl", path : "Character_Pink_Girl.png"},
	{name : "CharaPrincess", path : "Character_Princess_Girl.png"},
	{name : "GemBlue", path : "Gem_Blue.png"},
	{name : "GemGreen", path : "Gem_Green.png"},
	{name : "GemOrange", path : "Gem_Orange.png"},
	{name : "Heart", path : "Heart.png"},
	{name : "Key", path : "Key.png"},
	{name : "Rock", path : "Rock.png"},
	{name : "Star", path : "Star.png"},
	{name : "WaterBlock", path : "Water_Block.png"},
	{name : "DirtBlock", path : "Dirt_Block.png"},
	{name : "GrassBlock", path : "Grass_Block.png"},
	{name : "BigArbre", path : "BigArbre.png"},
	{name : "TreeShort", path : "Tree_Short.png"},
	{name : "TreeUgly", path : "Tree_Ugly.png"},
	{name : "Bug", path : "Bug.png"}
];
var Images = {};
