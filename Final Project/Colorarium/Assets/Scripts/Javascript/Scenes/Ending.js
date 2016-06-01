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
function Ending(_scores) 
{
	this.name = "Ending";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;
	this.Scores = _scores;

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

			var fn = function(e)
			{
				Scenes["Title"] = new Title();
				Application.LoadedScene = Scenes["Title"];
				window.removeEventListener('click',fn);
			};
			window.addEventListener('click',fn);

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
		//ctx.fillStyle = "#E8FFBC"
		//ctx.fillRect(0,0,canvas.width,canvas.height);

		ctx.font = '50px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle ="blue";
		ctx.fillText('Congrats, The winner is : ' + this.Scores[1].Player.pseudo ,canvas.width * 0.5, 150);

		for (var i = 1; i < this.Scores.length; i++) 
		{
			ctx.font = '36px Arial';
			ctx.textAlign = 'left';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = this.Scores[i].Player.color;
			ctx.fillText(this.Scores[i].Player.pseudo, canvas.width * 0.25, 200 + 50 * i);
			ctx.textAlign = 'right';
			ctx.fillText(this.Scores[i].Player.score, canvas.width * 0.75, 200 + 50 * i);
		
		}
		//ctx.fillStyle = this.Player.color;
		//ctx.fillText(this.Player.pseudo + " - " + this.Player.score, this.Transform.Position.x, this.Transform.Position.y);

		
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
			this.StartGame();
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.StartGame = function()
	{
		var time = Math.floor(Time.Time / 500);

		if (time % 3 != 0)
		{
			ctx.font = '40px Arial';
			ctx.textAlign = 'center';
			ctx.fillStyle = 'red';
			ctx.fillText('Click for return to launcher', canvas.width * 0.5,canvas.height - 50 );
		}
	}

	this.Awake()
}