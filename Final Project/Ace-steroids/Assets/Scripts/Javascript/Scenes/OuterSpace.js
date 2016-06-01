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
function OuterSpace() 
{
	this.name = "OuterSpace";
	this.GameObjects =[];
	this.SpaceFleet = [];
	this.Asteroids = [];
	this.SpaceFleetPosition = [];
	this.Groups = [];
	this.Cameras = [];
	this.Emitters = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
	this.laser = new Laser();

	this.alreadyDid = false;

	this.level = 1;

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
			Time.SetTimeWhenSceneBegin();
			for (var i = 0; i < AudioPath.length; i++) 
			{	
				var name = AudioPath[i].name
				var path = "Assets/Audio/" + AudioPath[i].path;

				Audios[name] = document.createElement("audio");
				Audios[name].src = path;

				Audios[name].addEventListener("canplaythrough",function() 
				{
					audioLoaded++;
					if (audioLoaded == AudioPath.length) 
					{
						Audios[name].play();
					}
				}, false);
			}
			// operation start
			// var particleSystem = new Kaboom(new Vector());
			// this.Groups.push(particleSystem);

			var ss = new SpaceShip(canvas.height * .5);
			this.SpaceFleetPosition.push(canvas.height * .5);
			this.SpaceFleet.push(ss);

			for(var i = 0; i < 5; i++)
			{
				var a = new Asteroid();
				this.GameObjects.push(a);
			}

			/*for (var i = 1; i < Application.LoadedScene.GameObjects.length; i++) 
			{
				var AsteroidParticule = new Kaboom(new Vector(Application.LoadedScene.GameObjects[i].Transform.RelativePosition.x, Application.LoadedScene.GameObjects[i].Transform.RelativePosition.y));
				console.log(AsteroidParticule.Transform.RelativePosition)
				this.Emitters.push(AsteroidParticule);
			}*/

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
		if (!Application.GamePaused) 
		{
			ctx.fillStyle = "rgb(0, 0, 0)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for (var i = 1; i < this.GameObjects.length; i++) 
			{
				var rnd = Math.Random.RangeInt(2,5,true);
				if (this.GameObjects.length < 7) 
				{
					console.log("+ 1")
					var a = new Asteroid();
					this.GameObjects.push(a);
				}
			}

			this.NextLevel();

			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.SpaceFleet.length; i++) 
			{
				this.SpaceFleet[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
			for (var i = 0; i < this.Emitters.length; i++) 
			{
				
				if (this.Emitters[i].time + 8000 < Time.Time) 
				{
					this.Emitters.splice(i,1);
					i--;
					continue;
				}
				this.Emitters[i].Start();
				
				
			}
			ctx.fillStyle = "rgba(0,134,134,0.8)";
			ctx.textAlign = "left";
			ctx.fillText("LEVEL : " + this.level + " --  LIVES : " + this.SpaceFleet[0].lives, 0,25);

			this.OutOfBounds();
			this.laser.Run();
			this.CollisionWithLaser();


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
		if (!Application.GamePaused) 
		{
			//Show UI
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.OutOfBounds = function()
	{
		for (var i = 0; i < this.GameObjects.length; i++)
		{
			if(this.GameObjects[i].Transform.RelativePosition.x > canvas.width*.5 + 1020 || this.GameObjects[i].Transform.RelativePosition.x < canvas.width*.5 - 1020 || this.GameObjects[i].Transform.RelativePosition.y > canvas.height*.5 + 1020 || this.GameObjects[i].Transform.RelativePosition.y < canvas.height*.5 - 1020)
			{
				console.log("delete")
				this.GameObjects.splice(i, 1);
				i--;
			}

		}

	}

	this.CollisionWithLaser = function()
	{

		for (var i = 0; i < Application.LoadedScene.GameObjects.length; i++) 
		{
			var Go = Application.LoadedScene.GameObjects[i];
			var box = new Box(Go.Transform.Position.x - Go.Transform.Size.x * Go.Transform.Scale.x * Go.Transform.Pivot.x,
				Go.Transform.Position.y - Go.Transform.Size.y * Go.Transform.Scale.y * Go.Transform.Pivot.y,Go.Transform.Size.x * Go.Transform.Scale.x ,Go.Transform.Size.y * Go.Transform.Scale.y);

			if (Physics.PointBoxCollision(Input.Laser,box)) 
			{
				//alert("Touché");
				console.log("Touché");
				console.log(Go.Transform.RelativePosition);
				var AsteroidParticule = new Kaboom(new Vector(Go.Transform.RelativePosition.x, Go.Transform.RelativePosition.y));
				//console.log(AsteroidParticule.Transform.RelativePosition)
				Application.LoadedScene.GameObjects.splice(i,1);
				i--;
				this.Emitters.push(AsteroidParticule);
				
			}			
		}	
	}

	this.NextLevel = function()
	{
		this.WhichLevel();
		
			if(this.SpaceFleet[this.SpaceFleet.length - 1].Transform.RelativePosition.x > canvas.width + 50)
			{
				for (var i = 0; i < this.SpaceFleet.length; i++)
				{
					this.SpaceFleet[i].SetPosition(-50, this.SpaceFleet[i].Transform.RelativePosition.y);
					this.SpaceFleet[i].speed += 1.20;
				}
				this.level ++;
			}
	}

	this.WhichLevel = function()
	{
		if(this.level % 3 == 0 && !this.alreadyDid)
		{
			for (var i = 0; i < this.SpaceFleetPosition.length; i++) 
			{

				var element = this.SpaceFleetPosition[i];
				var rnd = Math.Random.RangeInt(75, canvas.height -75, true);

				if(rnd > element + 75 || rnd < element - 75)
				{
					var ss = new SpaceShip(rnd);
				}
				else
				{
					rnd = Math.Random.RangeInt(75, canvas.height -75, true);
					i--;
				}
			}
			
			if(Math.Random.RangeInt(0, 1, true) == 1)
			{
				ss.isSin = true;
			}
			this.SpaceFleet.push(ss);
			this.alreadyDid = true;
		}
		else if(this.level % 3 != 0)
		{
			this.alreadyDid = false;	
		}
	}


	this.Awake()
}

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
function GameOver() 
{
	this.name = "GameOver";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

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
			Time.SetTimeWhenSceneBegin();
			// operation start
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	// *
	//  * Start every GameObject, Group and apply the debug mode if asked
	//  * Called each frame,code game is here.
	//  * 
	this.Update = function() 
	{
		if (!Application.GamePaused) 
		{
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
		}

		ctx.fillStyle = "rgba(0,134,255,1)";
		ctx.font = "55px Consolas";
		ctx.fillText("Game Over", canvas.width * 0.5, 150 );


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
		if (!Application.GamePaused) 
		{
			//Show UI
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}