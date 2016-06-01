var GAME_TIME = 90;

var port = 8000;
var express = require('express');
var app = express();
var serverUrl = app.get('port');//"127.0.0.1";

var http = require("http");
var path = require("path"); 
var fs = require("fs"); 

var Sockets = {};
var Clients = [];
var Players = [];
var host = null;

//console.log("Starting web server at " + serverUrl + ":" + port);

var server = http.createServer( function(req, res) 
{

	var now = new Date();

	var filename = req.url || "index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = 
	{
		".html" : "text/html",			
		".js": "application/javascript", 
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".mp3": "application/force-download",
		".png": "image/png",
		".ico": "icon"
	};
	//console.log("toto " + localPath);
	var isValidExt = validExtensions[ext];

	if (isValidExt) {
		localPath += filename;
		fs.exists(localPath, function(exists) {
			if(exists) {
				//console.log("Serving file: " + localPath);
				getFile(localPath, res, ext);
			} else {
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
		});

	} else {
		console.log("Invalid file extension detected: " + ext);
	}

}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
	
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

var io = require('socket.io')(server);

io.on('connection', function(socket) 
{
	Sockets[socket.id] = socket;
	//console.log(socket.id);
	socket.emit('CheckConnection',socket.id);
	socket.on("ConnectionOK",function (socketID) 
	{
		Clients.push(socketID);
		console.log('Player Connected', socketID , "Nb",Clients.length);
		if (host == null) 
		{
			//console.log("emit host");
			socket.emit("IsHost",true);
			host = socket.id;
		}
		io.emit('PlayersConnected',Clients.length)
	});
	socket.on('restartgame', function (data) 
	{
		//console.log('restartgame');
		socket.broadcast.emit('restart');
	});
	socket.on('disconnect', function (data) 
	{
		//console.log("Player Disconected", socket.id);
		for (var i = 0; i < Clients.length; i++) 
		{
			if (Clients[i] == socket.id)
			{
				//console.log('removed');
				Clients.splice(i,1);
			}
		}
		io.emit('PlayersConnected',Clients.length);
		if (socket.id == host) 
		{
			var b = Clients.length > 0;
			//console.log('test host', b)
			if (b) 
			{
				host = Clients[0];
				Sockets[Clients[0]].emit("IsHost",true);
			}
			else
			{
				host = null;
			}
			//console.log('New host : ' + host);
		}
	});
	socket.on('Ready', function (data) 
	{
		//console.log('Ready')
		var length = Clients.length * 2;

		Players = SetPosition(length);

		var mycolors = SetColors();
		for (var i = 0; i < Clients.length; i++) 
		{
			var myData = 
			{
				id: i,

				StartPos: Players,

				Colors: mycolors,
				Timer: GAME_TIME
			};
			Sockets[Clients[i]].emit('StartGame',myData);
		}
		// Stop Game
		setTimeout(function () 
		{
			Players = [];
			Clients = [];
			Sockets = {};
			host = null; 
		}, GAME_TIME * 1000 + 3);

		setTimeout(DropItem, Math.Random.RangeInt(2500,7500,true));


	})
	socket.on('Move', function (data) 
 	{
 		//console.log(data);
 		//Players[data.id].x = data.x;
 		//Players[data.id].y = data.y;
 		socket.broadcast.emit('MoveOther',data);
 	})
	socket.on('SetScore', function (data) 
 	{
 		//console.log(data);
 		socket.broadcast.emit('UpdateScore',data);
 	})
});


// Import Random.js
Math.Random = {};
Math.Random.RangeInt = function(_min, _max, _isInclusive)
{
	if(typeof _min != 'number') PrintErr("Parameter minimum in RangeInt");
    if(typeof _max != 'number') PrintErr("Parameter maximum in RangeInt");
    if(typeof _isInclusive != 'boolean') PrintErr("Parameter isInclusive in RangeInt");
	_isInclusive ? _max++ : _min++;
	return Math.floor(Math.random() * (_max - _min) + _min); 
};
Math.Random.ColorHEX = function() 
{
	var letters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    var color = '#';
    for (var i = 0; i < 6; i++ )
    {
        color += letters[Math.Random.RangeInt(0,letters.length - 1,true)];
    }
    return color;
};

function SetPosition(_length) 
{
	var sp = [];
	for (var i = 0; i < Clients.length; i++) 
	{
		var v = {
			x: Math.Random.RangeInt(0,_length - 1,true),
			y: Math.Random.RangeInt(0,_length - 1,true)
		};
		for (var j = 0; j < sp.length; j++) 
		{
			if (sp[j].x == v.x && sp[j].y == v.y) 
			{
				i--;
				break;
			}
		}
		sp.push(v);
	}
	return sp;
}
function SetColors() 
{
	var colors = [];
	for (var i = 0; i < Clients.length; i++) 
	{
		var c =Math.Random.ColorHEX();
		for (var j = 0; j < colors.length; j++) 
		{
			if (colors[j] == c) 
			{
				i--;
				break;
			}
		}
		colors.push(c);
	}
	return colors;
}

function DropItem () 
{
	var v = {};
	//console.log(Players.length);
	v.x = Math.Random.RangeInt(0, Players.length * 2 - 1, true);
	v.y = Math.Random.RangeInt(0, Players.length * 2 - 1, true);

	/*for (var i = 0; i < Players.length; i++) 
	{
		if (v.x == Players[i].x && v.y == Players[i].y) 
		{
			return DropItem;
		}
	}*/
	io.emit("SetItemPoint",{x: v.x,y: v.y});
	//console.log(v);
	var min = 5000/Players.length;
	var max = 20000/Players.length;
	var rand = Math.Random.RangeInt(min,max,true);
	//console.log(rand);
	setTimeout(DropItem, rand);
}