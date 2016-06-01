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

// Socket
var socket = null;
/*window.onbeforeunload = Exit;
function Exit()
{
	socket.emit("disconnect");
}*/

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
	{name: "ItemPoint", path: "MultiColor/greenCrystal.png"},
	{name: "Player", path: "MultiColor/PlayerRed.png"},
	{name: "PlayerJump", path: "MultiColor/PlayerRedJump.png"},
	{name: "PlayerJumpLeft", path: "MultiColor/PlayerRedJumpLeft.png"},
	{name: "PlayerJumpUp", path: "MultiColor/PlayerRedJumpUp.png"},
	{name: "PlayerJumpRight", path: "MultiColor/PlayerRedJumpRight.png"},
	{name: "PlayerJumpDown", path: "MultiColor/PlayerRedJumpDown.png"},
	{name: "Tiles", path: "MultiColor/TilesGrey.png"},
	{name: "Panel", path: "MultiColor/panel.png"},
	{name: "Title", path: "MultiColor/title.png"}

];
var Images = {};