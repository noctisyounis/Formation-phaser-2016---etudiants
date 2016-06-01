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
function SceneGame() 
{
	this.name = "SceneGame";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.score = 0;

	this.SoundPlaying = false;

	this.pop = false;


	this.WorldSize = new Vector(4096,4096);

	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		//console.clear();
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

			// create in Loader
			// var track = new Tracker();
			for (var i = 0; i < AudiosPath.length; i++) 
			{	
				var name = AudiosPath[i].name
				var path = "Assets/Audio/" + AudiosPath[i].path;

				Audios[name] = document.createElement("audio");
				Audios[name].src = path;


				Audios[name].addEventListener("canplaythrough",function() 
				{
					audioLoaded++;
					
				}, false);
			}
			var ball = new Ball();
			this.ball = ball;
			this.GameObjects.push(Scenes["Loader"].track,ball);

			this.Groups.push(new ParticlesSystem(new Vector(0, 0)));
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

			if(Scenes['Game'].score == Scenes['Loader'].highScore+1 && !this.SoundPlaying){
				this.SoundPlaying = true;
				Audios["ola"].volume = 1;
				Audios["ola"].currentTime = 0;
				Audios["ola"].play();
				console.log("ola");
			}
			if(Scenes['Game'].score != Scenes['Loader'].highScore+1){
				this.SoundPlaying = false;
			}

			if (this.score && this.score % 10 == 0) 
			{
				if (this.pop) 
				{
					this.GameObjects.push(new Ball());
					this.pop = false;
				}
			}

			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
			var el;
			for (var i = 0; i < this.GameObjects.length; i++) {
				el = this.GameObjects[i];
				if(el.name == "Ball" && el.outOfBounds && this.GameObjects.length > 2) {
					this.GameObjects.splice(i,1);
					i--;
				}
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
			//Show UI
			/*ctx.fillStyle = "black";
			ctx.font = "15px candara";
			ctx.fillText("Score : " + this.score,10,canvas.height-20);*/


			

			divScore.innerHTML = this.score;
			divHighScore.innerHTML = Scenes['Loader'].highScore;
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}