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
function Title() 
{
	this.name = "Title";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.playerIndex = 0;

	this.lightOn = false;
	this.Music = null;
	this.Scale = new Vector(1,1)

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

			var _self = this.Music = document.createElement("audio");
			this.Music.src = "Assets/Audio/Haunted2.mp3";
			this.Music.addEventListener("canplaythrough",function() 
			{
				_self.play();
			}, false);
			this.Music.addEventListener("ended",function() 
			{
				_self.currentTime = 0;
				_self.play();
			}, false);

			Application.CurrentPlayer = PlayersConfig[this.playerIndex];

			var iw = Images["Title"].width;
			var ih = Images["Title"].height;
			var cw = canvas.width;
			var ch = canvas.height;
			this.Scale = new Vector(cw / iw, ch / ih);
			//console.log(this.Scale);

			this.GameObjects.push(new ButtonStart(canvas.width * 0.5, canvas.height - 100, this.Scale.x, this.Scale.y));
			this.GameObjects.push(new ButtonBattery(canvas.width * 0.85, canvas.height - 100, this.Scale.x, this.Scale.y));
			this.GameObjects.push(new ButtonLight(this.Scale.x, this.Scale.y));
			this.GameObjects.push(new DisplayPlayer(canvas.width * 0.5, canvas.height * 0.5));
			this.GameObjects.push(new ButtonRight(canvas.width * 0.6, canvas.height * 0.5, this.Scale.x, this.Scale.y));
			this.GameObjects.push(new ButtonLeft(canvas.width * 0.4, canvas.height * 0.5, this.Scale.x, this.Scale.y));
			this.GameObjects.push(new StatDisplay(canvas.width * 0.15, canvas.height - 170, this.Scale.x, this.Scale.y));


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
		//ctx.fillStyle = "#E8FFBC";
		//ctx.fillRect(0,0,canvas.width,canvas.height);
		var img;
		if (this.lightOn) img = Images["TitleOn"];
		else img = Images["Title"];

		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		if (!Application.gamePaused) 
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
			
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}