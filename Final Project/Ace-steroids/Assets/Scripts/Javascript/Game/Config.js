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


var canvas = document.getElementById('canvasGame');
var canvasCamera = document.getElementById('canvasCamera');
var ctx = canvas.getContext("2d");

var Scenes = {};
var Gravity = new Vector();
Gravity.y = -9.81;

// PATH FICHIER AUDIO




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
	{ name:"Ship",path: "Ace_Steroïd/ship.png"},
	{ name:"Asteroid",path: "Ace_Steroïd/asteroid00.png"},
	{ name:"Asteroid01",path: "Ace_Steroïd/asteroid01.png"}
];
var Images = {};

var audioLoaded = 0;

var AudioPath = 
[
	{ name:'BackgroundSound', path: 'Arpanauts.mp3'},
	
];
var Audios = {};