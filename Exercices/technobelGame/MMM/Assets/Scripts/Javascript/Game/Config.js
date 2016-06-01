var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var Scenes = {};
var gravity = new Vector();
gravity.y = -9.81;

var Application = {
	LoadedScene: null,
	GamePaused: false,
	debugMode: true,
	LoadLevel: function (SceneLevel) {
		this.LoadedScene = SceneLevel;
	}
};

var ImagesLoaded = 0;
var WalkableTiles = [];

var ImagesPath = [
	// { name:"monImage",path: "background/image.png"},
	{ name: "boy", path:"/PlanetCute/CharacterBoy.png"},
	{ name: "catGirl", path:"/PlanetCute/CharacterCatGirl.png"},
	{ name: "pinkGirl", path:"/PlanetCute/CharacterPinkGirl.png"},
	{ name: "PricessGirl", path:"/PlanetCute/CharacterPrincessGirl.png"},
	{ name: "woodBlock", path:"/PlanetCute/WoodBlock.png"},
	{ name: "sky", path:"/PlanetCute/sky.jpg"},
	{ name: "heart", path:"/PlanetCute/Heart.png"}

];
var Images = {};
var nombreDeVies = 4;
