function Laser()
{
	
	this.margins = {};
	this.canvasCamera = document.getElementById("canvasCamera");
	this.canvasGame = document.getElementById("canvasGame");
	this.ctxCamera = this.canvasCamera.getContext("2d");
	this.ctxGame = this.canvasGame.getContext("2d");
	this.video = document.getElementById("video");
	this.videoObj = { "video": true };

	this.calibrateState = ['first', 'second', 'third', 'fourth', false];
	this.indexMargin = 0;

	function spaceCalibrate(e)
	{
		if(Input.KeysDown[32])
		{
			this.margins[this.calibrateState[this.indexMargin]] = FindBrightest();

			this.indexMargin++;
			if (!this.calibrateState[this.indexMargin]) 
			{
				var marginTop = Math.round((this.margins.first.y + this.margins.second.y) * 0.5);
				var marginRight = Math.round((this.margins.second.x + this.margins.third.x) * 0.5);
				var marginBottom = Math.round((this.margins.third.y + this.margins.fourth.y) * 0.5);
				var marginLeft = Math.round((this.margins.first.x + this.margins.fourth.x) * 0.5);
				this.margins = 
				{
					'first' : { 'x' : marginLeft, 'y' : marginTop},
					'second' : { 'x' : marginRight, 'y' : marginTop},
					'third' : { 'x' : marginRight, 'y' : marginBottom},
					'fourth' : { 'x' : marginLeft, 'y' : marginBottom},
					'width' : marginRight - marginLeft,
					'height' : marginBottom - marginTop
				};
			}
		}
	}

	// Grab elements, create settings, etc.


		this.canvasGame.style.width = window.innerWidth;
		this.canvasGame.style.height = window.innerHeight;
		this.canvasCamera.style.width = window.innerWidth * 0.1;
		this.canvasCamera.style.height = window.innerHeight * 0.1;

	// Put video listeners into place
	if(navigator.getUserMedia) 
    { // Standard
		navigator.getUserMedia(this.videoObj, function(stream)
        {
			this.video.src = stream;
			this.video.play();
		}, errBack);
	} else if(navigator.webkitGetUserMedia) 
    { // WebKit-prefixed
		navigator.webkitGetUserMedia(this.videoObj, function(stream)
        {
			this.video.src = window.webkitURL.createObjectURL(stream);
			this.video.play();
		}, errBack);
	}
	else if(navigator.mozGetUserMedia)
     { // Firefox-prefixed
		navigator.mozGetUserMedia(this.videoObj, function(stream)
        {
			this.video.src = window.URL.createObjectURL(stream);
			this.video.play();
		}, errBack);
	}
	
function FindBrightest() 
{
	return Detection(function(brightness, index, sum) 
	{
		
	
		var i = index * 0.25;
	    var x = i % this.canvasCamera.width;
	    var y = (i - x) / this.canvasCamera.width;

		var widthPercent = x / this.canvasCamera.width;
		var heightPercent = y / this.canvasCamera.height;
		this.ctxGame.fillStyle = "darkblue";
		if (this.calibrateState[this.indexMargin]) 
		{
			this.ctxGame.fillRect(x, y, 10, 10);
		}
		else 
		{
			this.ctxGame.fillStyle = "darkblue";
			this.ctxGame.font = "40px Arial";
			this.ctxGame.textBaseline = "middle";
			this.ctxGame.textAlign = "center";
			this.ctxGame.fillText("{+}", x, y);

		}
		

		var brightest = { 'x' : x, 'y' : y	};
		return brightest;		
		
	})
}

function Detection(callback)
{
	var imageData = this.ctxCamera.getImageData(0,0,this.canvasCamera.width,this.canvasCamera.height);
	var data = imageData.data;
	var r,g,b,avg;
	var colorSum = 0;
	var best =
	{
		index: 0,
		sum: 0
	};
	for(var x = 0, len = data.length; x < len; x+=4) 
	{
		r = data[x];
		g = data[x+1];
		b = data[x+2];

		avg = Math.floor((r+g+b) /3);
		
		if(avg > best.sum)
		{
			best.index = x;
			best.sum = avg;
		}
		
		colorSum += avg;
	}
	
	var brightness = Math.floor(colorSum / (this.canvasCamera.width * this.canvasCamera.height));
	return callback(brightness, best.index, best.sum);
}

function Calibrate() {
	var size = 3;
	
	
	var corner = 
	{
		'first' : { 'x' : 0, 'y' : 0},
		'second' : { 'x' : this.canvasGame.width - size, 'y' : 0},
		'third' : { 'x' : this.canvasGame.width - size, 'y' : this.canvasGame.height - size},
		'fourth' : { 'x' : 0, 'y' : this.canvasGame.height - size}
	};

	this.ctxGame.fillStyle = 'white';
	this.ctxGame.fillRect(corner[this.calibrateState[this.indexMargin]].x, corner[this.calibrateState[this.indexMargin]].y, size, size);
	
}

function Grid()
{
	this.x = this.canvasGame.width * 0.01;
	this.y = this.canvasGame.height * 0.01;
	for (var i = 0; i < 100; i++) 
	{
		for (var j = 0; j < 100; j++) 
		{
			this.ctxGame.strokeStyle = "gray";
			this.ctxGame.strokeRect(i * this.x, j * this.y, this.x, this.y);
		}
	}

}

function Run()
{
	this.ctxCamera.drawImage(this.video, 0, 0, 640, 480);
	this.ctxGame.fillStyle = "black";
	this.ctxGame.fillRect(0,0,this.canvasGame.width,this.canvasGame.height);
	
	if(this.calibrateState[this.indexMargin])
	{
		Calibrate();

	}
	else 
	{

	}
	
	FindBrightest();
	
}


}	