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
	{ name:"logo",path: "Logos/logo_technobel.png"},
	{ name:"cards",path :"Card/CardSpriteSheet.png"},
	{ name:"cardBack",path :"Card/CardBack.png"},
	{ name:"background",path :"Background/green_felt.jpg"}
];
var Images = {};
