/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * 
 * @class
 * 
 * @return {Scene}
 * */
function Level() 
{
	this.name = "LevelNightmare";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
	this.Player = null;

	this.tilesOffset = new Vector(0,0);
	this.speed = 50;

	this.tileSize = new Vector(92,62);

	this.maxLife;

	this.dropTime = 4000;
	this.lastEnnemy;

	this.WorldSize = new Vector(4096,4096);

	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	
	/**
	 * Start the Scene and show a message in console or launch Update() if already started
	 * Called at the first use of scene in game.
	 * */
	this.Start = function() 
	{
		
		if (!this.started) 
		{
			//Application.debugMode = true;
			var p = new Player(canvas.width/2,canvas.height/2);
			this.Player = p;
			this.GameObjects.push(p);
			socket.emit('restartgame');

			this.lastEnnemy = Time.Time;
			this.maxLifes = p.lifes;
			
			for (var i = 0; i < AudioPath.length; i++) 
			{	
				var name = AudioPath[i].name
				var path = "Assets/Audio/" + AudioPath[i].path;

				Audios[name] = document.createElement("audio");
				Audios[name].src = path;

				if (name == "Run") {
					Audios["Run"].loop = true;
					Audios["Run"].volume = 0;
					Audios["Run"].play();
				}

				Audios[name].addEventListener("canplaythrough",function() 
				{
					audioLoaded++;
					if (audioLoaded == AudioPath.length) 
					{
						for (index in Audios) 
						{
							if (index != "Run") 
							{
								Audios[index].volume = 0;
								Audios[index].play();
							}
							
						}
					}
				}, false);
				if (name != "Bend" && name != "Run") 
				{
					Audios[name].addEventListener("ended",function() 
					{
						for (index in Audios) 
						{
							if (index != "Bend" && index != "Run") 
							{
								Audios[index].currentTime = 0;
								Audios[index].play();
							}
						}
	
					}, false);
				}

			}

			

			Time.SetTimeWhenSceneBegin();
			// operation start
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	/**
	 * Start every GameObject, Group and apply the debug mode if asked
	 * Called each frame,code game is here.
	 * */
	this.Update = function() 
	{
		//console.log(Audios["Acoustic"].currentTime)
		//Move
		if (this.Player.calibrated && this.Player.controllerConnected) 
		{
			Audios["Run"].volume = 0.15;
			this.tilesOffset.x -= this.speed * Time.deltaTime * Math.cos(Math.DegreeToRadian(this.Player.Transform.angle - 90));
			this.tilesOffset.y -= this.speed * Time.deltaTime * Math.sin(Math.DegreeToRadian(this.Player.Transform.angle - 90));
			if (this.tilesOffset.x < 0 ) 
			{
				this.tilesOffset.x += this.tileSize.x;
			} 
			else if (this.tilesOffset.x >= this.tileSize.x) 
			{
				this.tilesOffset.x -= this.tileSize.x;
			}
			if (this.tilesOffset.y < 0 ) 
			{
				this.tilesOffset.y += this.tileSize.y;
			} 
			else if (this.tilesOffset.y >= this.tileSize.y) 
			{
				this.tilesOffset.y -= this.tileSize.y;
			}
		}
		for (var i = - this.tilesOffset.x; i < canvas.width; i+= this.tileSize.x) 
		{
			for (var j = - this.tilesOffset.y; j < canvas.height; j+= this.tileSize.y) 
			{
				ctx.drawImage(Images["grassTile"], i, j);
			}	
		}

		if (this.Player.score > 60 ) 
		{
			Audios["HighNotes"].volume = 1;
		}
		if (this.Player.score > 30 ) 
		{
			Audios["Chorus"].volume = 1;
		}
		if (this.Player.score > 15 ) 
		{
			Audios["Bass"].volume = 1;
		}
		if (this.Player.score > 0 ) 
		{
			Audios["Acoustic"].volume = 1;
		}

		if (!Application.gamePaused) 
		{
			
			if (this.Player.calibrated && this.Player.controllerConnected && this.lastEnnemy + this.dropTime < Time.Time) 
			{
				this.lastEnnemy = Time.Time;
				this.AddEnnemy();
			}

			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
		}
		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}
		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		ctx.drawImage(Images["mask"],
				0, 0, Images["mask"].width, Images["mask"].height,
				0, 0, canvas.width, canvas.height);
		if (!Application.GamePaused) 
		{
			if (!this.Player.controllerConnected) 
			{
				ctx.textAlign = 'left';
				ctx.textBaseline = 'top';
				ctx.font = '40px Consolas';
				ctx.fillStyle = 'rgb(222,70,69)';
				ctx.fillText('Device Not Connected', 50, 50);
			} else if (!this.Player.calibrated) 
			{
				ctx.textAlign = 'left';
				ctx.textBaseline = 'top';
				ctx.font = '40px Consolas';
				ctx.fillStyle = 'rgb(222,70,69)';
				ctx.fillText('Calibrate to start', 50, 50);
			}
			for (var i = 0; i < this.maxLifes; i++) 
			{
				if (i >= Application.LoadedScene.Player.lifes) 
				{
					ctx.drawImage(Images["pixelHearthGray"],i * 60, canvas.height - 70);
				} 
				else 
				{
					ctx.drawImage(Images["pixelHearth"],i * 60, canvas.height - 70);
				}
				
			}

			ctx.font = '40px Consolas';
			ctx.textAlign = 'right';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'rgb(222,70,69)';
			ctx.fillText('Your Score : ' + Application.LoadedScene.Player.score, canvas.width -30 , canvas.height - 50);

			if (Application.LoadedScene.Player.lifes <= 0 || this.Player.batteryLife <= 0)  
			{
				socket.removeListener('move');
				Scenes["GameOver"] = new GameOver(this.Player.score);
				Application.LoadedScene = Scenes["GameOver"];

			}

			if (Application.batteryMode) 
			{
				
				if (this.Player.batteryLife < 20) ctx.fillStyle = "red";
				else if (this.Player.batteryLife < 50) ctx.fillStyle = "orange";
				else ctx.fillStyle = "rgb(91, 194, 54)";
				
				var percent = this.Player.batteryLife |0 / this.Player.maxBatteryLife *100;
				//ctx.fillText(percent,canvas.width - 80 , 50)
				ctx.fillRect(canvas.width - 200 , 30, percent * 1.5 , 60)
				ctx.drawImage(Images["battery"],canvas.width - 200 , 30);

			}


		} 
		else
		{
			ctx.font = '40px Consolas';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'rgb(222,70,69)';
			ctx.fillText('Game Paused',canvas.width / 2, canvas.height / 2);
		}
	}

	this.Awake()

	this.AddEnnemy = function() 
	{
		var radius = canvas.width / 2;
		radius += Math.Random.RangeInt(100,500,true);

		var speed = Math.Random.RangeInt(75,250,true);

		var type = 0;
		var rnd = Math.Random.RangeInt(1,100,true);
		if (rnd < 30) {
			type = 0;
		} else if (rnd < 65) {
			type = 1;
		} else if (rnd < 80) {
			type = 2;
		} else if (rnd < 95) {
			type = 3;
		} else if (rnd <= 100) {
			type = 4;
		}

		var c = new Circle(canvas.width / 2, canvas.height / 2, radius)
		var pos = Math.Random.InCircle(c);

		this.GameObjects.push(new Ennemy(pos.x, pos.y, type));
	}
}