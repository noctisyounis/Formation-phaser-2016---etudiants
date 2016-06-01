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

var url = 'http://10.10.10.76:8000';
//var url = 'http://192.168.1.58:8000';
var socket = io.connect(url);

var Application = 
{
	LoadedScene: null,
	gamePaused: false,
	debugMode: false,
	batteryMode: false,
	CurrentPlayer: null
};



var imagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = 
[
	//{ name:"monImage",path: "background/image.png"},
	{ name:"Boy",path: "Examples/PlanetCute/Character_Boy.png"},
	/*{ name:"Cat",path: "Examples/PlanetCute/Character Cat Girl.png"},
	{ name:"Horn",path: "Examples/PlanetCute/Character Horn Girl.png"},
	{ name:"Pink",path: "Examples/PlanetCute/Character Pink Girl.png"},
	{ name:"Princess",path: "Examples/PlanetCute/Character Princess Girl.png"},
	{ name:"Brown Block",path: "Examples/PlanetCute/Brown Block.png"},*/
	{ name:"Enemy Bug",path: "Examples/PlanetCute/Enemy_Bug.png"},
	/*{ name:"Gem Blue",path: "Examples/PlanetCute/Gem Blue.png"},
	{ name:"Gem Green",path: "Examples/PlanetCute/Gem Green.png"},
	{ name:"Gem Orange",path: "Examples/PlanetCute/Gem Orange.png"},*/
	{ name:"Heart",path: "Examples/PlanetCute/Heart.png"},
	/*
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
	{ name:"alphaMask3",path: "Examples/AlphaMask/mask.png"},*/
	{ name:"Title",path: "SentreeLike/TitleBG.png"},
	{ name:"TitleOn",path: "SentreeLike/TitleBGLightOn.png"},
	{ name:"Ending",path: "SentreeLike/EndBG.png"},
	{ name:"battery",path: "SentreeLike/battery.png"},
	{ name:"pixelHearth",path: "SentreeLike/hearth.png"},
	{ name:"pixelHearthGray",path: "SentreeLike/hearthGray.png"},
	{ name:"mask",path: "SentreeLike/mask.png"},
	{ name:"grassTile",path: "SentreeLike/GrassTile.png"},
	{ name:"monster0",path: "SentreeLike/Monsters/monster0.png"},
	{ name:"monster1",path: "SentreeLike/Monsters/monster1.png"},
	{ name:"monster2",path: "SentreeLike/Monsters/monster2.png"},
	{ name:"monster3",path: "SentreeLike/Monsters/monster3.png"},
	{ name:"monster4",path: "SentreeLike/Monsters/monster4.png"},
	{ name:"girl_0",path: "SentreeLike/Players/girl_0.png"},
	{ name:"girl_1",path: "SentreeLike/Players/girl_1.png"},
	{ name:"girl_2",path: "SentreeLike/Players/girl_2.png"},
	{ name:"girl_3",path: "SentreeLike/Players/girl_3.png"},
	{ name:"boy_0",path: "SentreeLike/Players/boy_0.png"},
	{ name:"boy_1",path: "SentreeLike/Players/boy_1.png"},
	{ name:"boy_2",path: "SentreeLike/Players/boy_2.png"},
	{ name:"boy_3",path: "SentreeLike/Players/boy_3.png"},

];
var Images = {};


var audioLoaded = 0;
var AudioPath = [
	{ name:"Run",path: "SFX/run.mp3"},
	{ name:"Bend",path: "SFX/TechnoGame_Bend.mp3"},
	{ name:"Acoustic",path: "AudioShort/TechnoGame_Acoustic.mp3"},
	{ name:"Bass",path: "AudioShort/TechnoGame_Bass.mp3"},
	{ name:"Chorus",path: "AudioShort/TechnoGame_Chorus.mp3"},
	{ name:"HighNotes",path: "AudioShort/TechnoGame_HighNotes.mp3"},

];

var Audios = {};


var PlayersConfig = 
[
	{spriteName: "girl_0", "Range of the ligth": 250, "Area of the Light": 15, "Number of Lifes": 5, "Battery's lifetime" : 100},
	{spriteName: "boy_0", "Range of the ligth": 200, "Area of the Light": 25, "Number of Lifes": 5, "Battery's lifetime" : 100},
	{spriteName: "girl_1", "Range of the ligth": 350, "Area of the Light": 20, "Number of Lifes": 3, "Battery's lifetime" : 75},
	{spriteName: "boy_1", "Range of the ligth": 100, "Area of the Light": 30, "Number of Lifes": 5, "Battery's lifetime" : 500},
];