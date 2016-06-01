/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * <br />
 * You can change your logo by changing Logo.src.
 * @class
 * 
 * @return {Scene}
 * */
function Loader()
{
	this.name = "Loader";
	this.GameObjects =[];
	this.started = false;
	this.imageLoaded = 0;
	this.Logo = new Image();
	this.Logo.src = "Assets/Graphics/Logos/logo_technobel.png";
	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function()
	{
		//console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	/**
	 * Load every Scene and show a message in console or launch Update() if already started
	 * Add your Scene here.
	 * */
	this.Start = function()
	{
		if (!this.started)
		{
			Time.SetTimeWhenGameBegin();
			// operation start
/*			Scenes["SceneHub"] = new SceneHub();
			Scenes["SceneInput"] = new SceneInput();
			Scenes["SceneCamera"] = new SceneCamera();
			Scenes["SceneGroup"] = new SceneGroup();
			Scenes["SceneParticules"] = new SceneParticules();
			Scenes["SceneVector"]  = new SceneVector();
			Scenes["SceneTween"]  = new SceneTween();
			Scenes["ScenePostEffect"]  = new ScenePostEffect();
			Scenes["SceneAnim"]  = new SceneAnim();
			Scenes["SceneDialogue"]  = new SceneDialogue();
			Scenes["ScenePhysics_Debug"]  = new ScenePhysics_Debug();
			Scenes["ScenePathFinding"]  = new ScenePathFinding();
			Scenes["SceneSave"]  = new SceneSave();
			Scenes["SceneIA"]  = new SceneIA();	*/	
			Scenes["Title"] = new Title();
			Scenes["Ending"] = new Ending();

			LoadImages();
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenGameLoaded();
		}
		this.PreUpdate();
	}
	/**
	 * Code here for every action before the rendering
	 * */
	this.PreUpdate = function()
	{
		this.Update();
	}
	/**
	 * Render the scene.
	 * Called each frame.
	 * */
	this.Update = function()
	{
			ctx.fillStyle = "rgb(230, 230, 230)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(this.Logo, canvas.width * .5 - this.Logo.width * .5, canvas.height * .3);
			for (var i = 0; i < this.GameObjects.length; i++)
			{
				//this.GameObjects[i].Start();
			}
		this.PostUpdate();
	}
	/**
	 * Code here for every action after the rendering
	 * */
	this.PostUpdate = function()
	{
		this.GUI();
	}
	/**
	 * Launch the loading bar and the debug mode if asked.
	 * Called each frame.
	 * */
	this.GUI = function()
	{
			ctx.strokeStyle = "grey";
			ctx.strokeRect( canvas.width / 2 - 200, 500, 400, 20);
			ctx.fillStyle = "grey";
			var portion = 400 / ImagesPath.length;
			ctx.RoundedBox( canvas.width / 2 - 198, 503, this.imageLoaded * portion - 4, 15, 6);
		
		if(Application.debugMode)
		{
			Debug.DebugScene();
		}
	}
	this.Awake();
}