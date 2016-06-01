var port = 8000;
var express = require('express');
var app = express();
var serverUrl = app.get('port');//"127.0.0.1";

var http = require("http");
var path = require("path"); 
var fs = require("fs"); 
		

console.log("Starting web server at " + serverUrl + ":" + port);

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
	console.log("toto " + localPath);
	var isValidExt = validExtensions[ext];

	if (isValidExt) {
		localPath += filename;
		fs.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
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

io.on('connection', function(socket) {
	socket.on('deviceorientation', function (data) 
	{
		//console.log('deviceorientation',data);
		socket.broadcast.emit('move', data);
	});
	socket.on('devicemotion', function (data) 
	{
		console.log('devicemotion',data);
		socket.broadcast.emit('shake', data);
	});
	socket.on('restartgame', function (data) 
	{
		console.log('restartgame');
		socket.broadcast.emit('restart');
	});

});
