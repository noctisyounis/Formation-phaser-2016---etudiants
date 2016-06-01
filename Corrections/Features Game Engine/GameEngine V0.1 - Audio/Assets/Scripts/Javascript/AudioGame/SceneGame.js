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
	this.name = "AudioGame";
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
			for (var i = 0; i < AudioPath.length; i++) {
				var name = AudioPath[i].name;
				var path = "Assets/Audio/" + AudioPath[i].path;
				Audios[name] = document.createElement("audio");
				Audios[name].src = path;

				Audios[name].addEventListener("canplaythrough", function()
				{
				 	audioLoaded++;
				 	if (audioLoaded == AudioPath.length) {
						for (var item in Audios) {
							if (item != "Bend") {
								if (item != "Acoustic") {
									Audios[item].volume = 0;
									var square = new SquareAudioGame(Audios[item]);
									square.Transform.RelativePosition = Math.Random.InScreen({ width : canvas.width - 100, height : canvas.height - 100});
									square.Transform.RelativePosition.Add(new Vector(square.Transform.Size.x / 2, square.Transform.Size.y / 2));
									Application.LoadedScene.GameObjects.push(square);
								}
								Audios[item].play();
							}
						}
				 	}
				})

				if (name != "Bend") {
					Audios[name].addEventListener("ended", function()
					{
						for (var item in Audios) {
							if (item != "Bend") {
								Audios[item].currentTime = 0;
								Audios[item].play();	
							}
						}
					})	
				}
				else {
					Audios[name].volume = 0.35;
				}
			}


			this.GameObjects.push(new Player());

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
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
/*			var str = "";
			for (var item in Audios) {
				str += " -- " + Audios[item].currentTime;
				str += " " + Audios[item].volume;
			}
			console.log(str);*/
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

	this.Awake()
}