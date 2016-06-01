function Laser()
{
	var _self = this;
	this.margins = {};
	this.ctxCamera = canvasCamera.getContext("2d");
	this.ctxGame = canvas.getContext("2d");
	this.video = document.getElementById("video");
	this.videoObj = { "video": true };

	this.calibrateState = ['first', 'second', 'third', 'fourth', false];
	this.indexMargin = 0;


	this.spaceCalibrate = function(e)
	{
		if(Input.KeysDown[67])
		{
			console.log('ici');
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

	// // Grab elements, create settings, etc.
	// canvas.style.width = window.innerWidth;
	// canvas.style.height = window.innerHeight;
	// canvasCamera.style.width = window.innerWidth * 0.1;
	// canvasCamera.style.height = window.innerHeight * 0.1;

	// Put video listeners into place
	if(navigator.getUserMedia) 
    { // Standard
		navigator.getUserMedia(this.videoObj, function(stream)
        {
			this.video.src = stream;
			this.video.play();
		}, function(){ console.log('C KC'); });
	} else if(navigator.webkitGetUserMedia) 
    { // WebKit-prefixed
		navigator.webkitGetUserMedia(this.videoObj, function(stream)
        {
			this.video.src = window.webkitURL.createObjectURL(stream);
			this.video.play();
		}, function(){ console.log('C KC'); });
	}
	else if(navigator.mozGetUserMedia)
     { // Firefox-prefixed
		navigator.mozGetUserMedia(this.videoObj, function(stream)
        {
			this.video.src = window.URL.createObjectURL(stream);
			this.video.play();
		}, function(){ console.log('C KC'); });
	}
	
	this.FindBrightest = function() 
	{
		return this.Detection(function(index, sum) 
		{
			var i = index * 0.25;
		    var x = i % canvasCamera.width;
		    var y = (i - x) / canvasCamera.width;

		    var diffMiddle = y - canvasCamera.height * 0.5;
		    if (diffMiddle > 0)
		    {
		    	//EN BAS
		    	y += (canvasCamera.height - y) * diffMiddle / (canvasCamera.height * 0.5);
		    }
		    else 
		    {
		    	 //EN HAUT
		    	y += y * diffMiddle / (canvasCamera.height * 0.5);
		    }

/*			var widthPercent = x / canvasCamera.width;
			var heightPercent = y / canvasCamera.height;*/
			// _self.ctxGame.fillStyle = "darkblue";
			// if (_self.calibrateState[_self.indexMargin]) 
			// {
			// 	console.log('ici')
			// 	_self.ctxGame.fillRect(x, y, 10, 10);
			// }
			// else 
			// {
				Input.Laser.x = x;
				Input.Laser.y = y;
				ctx.fillStyle = "darkblue";
				ctx.font = "30px Arial";
				ctx.textBaseline = "middle";
				ctx.textAlign = "center";
				/*ctx.fillText("{+} x = "+ x +" -- y = " + y, x, y);*/
				ctx.fillText("{+}",x,y);

			// }
			

			var brightest = { 'x' : x, 'y' : y	};
			return brightest;		
			
		});
	}

	this.Detection = function(callback)
	{
		var imageData = this.ctxCamera.getImageData(0,0,canvasCamera.width,canvasCamera.height);
		//var imageData = this.ctxCamera.getImageData(20,65,600,335);

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
/*			g = data[x+1];
			b = data[x+2];*/

			/*avg = Math.floor((r+g+b) /3);*/
			/*avg = Math.floor((r*15+g+b) /17);*/
			avg = r;
			
			if(avg > best.sum)
			{
				best.index = x;
				best.sum = avg;
			}
			
			colorSum += avg;
		}
		
		// var brightness = Math.floor(colorSum / (canvasCamera.width * canvasCamera.height));
		return callback(best.index, best.sum);
	}

	this.Calibrate = function() 
	{
		var size = 3;
		var corner = 
		{
			'first' : { 'x' : 0, 'y' : 0},
			'second' : { 'x' : canvas.width - size, 'y' : 0},
			'third' : { 'x' : canvas.width - size, 'y' : canvas.height - size},
			'fourth' : { 'x' : 0, 'y' : canvas.height - size}
		};

		this.ctxGame.fillStyle = 'white';
		this.ctxGame.fillRect(corner[this.calibrateState[this.indexMargin]].x, corner[this.calibrateState[this.indexMargin]].y, size, size);
		
	}

	this.Grid = function()
	{
		this.x = canvas.width * 0.01;
		this.y = canvas.height * 0.01;
		for (var i = 0; i < 100; i++) 
		{
			for (var j = 0; j < 100; j++) 
			{
				this.ctxGame.strokeStyle = "gray";
				this.ctxGame.strokeRect(i * this.x, j * this.y, this.x, this.y);
			}
		}

	}

	this.Run = function()
	{
		this.ctxCamera.drawImage(this.video, 0, 0, 640, 480);
/*		this.ctxGame.fillStyle = "black";
		this.ctxGame.fillRect(0,0, canvas.width, canvas.height);*/
/*		console.log(canvas.style.width)*/
		// if(this.calibrateState[this.indexMargin])
		// {
		// 	this.Calibrate();
		// }		
		this.FindBrightest();
	}


}	