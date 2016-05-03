/**	**** Create a new Scene **** 
*
*	@step 1							Copy the content of this file in a new .js document.
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 2							Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 3                      	In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"
*	----------------------------------------------------------------------------------------------------------------------------
*	@step 4						    For create a new scene, use this instruction: "new Scene()".
*/

/*	**** How to make the setup of a Scene ****
*	
*	@property name 																											{string} 			 
*	The name of the scene.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@property GameObjects 																				   {array[GameObject1, ...]} 			 
*	All the GameObject of the scene	
*
*/

/*	**** Scene's Methods ****
*
*	@method Awake()									
*	Called at the instruction new Scene().
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Start()									
*	Called at the first use of scene in game.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Update()								
*	Called each frame,code game is here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method GUI()
*	Called each frame, code all the GUI here.
*/

/* **** For launch Scene ****
*
*	To load your scene, use this instruction: "Application.LoadLevel(LevelName)".
*/
function Loader() {
	this.name = "Loader";
	this.GameObjects =[];

	this.started = false;
	this.imageLoaded = 0;
	this.logo = new Image();
	this.logo.src = "Assets/Graphics/Logos/logo_technobel.png";

	this.Awake = function() {
		//console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');
	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenGameBegin();
			Time.SetTimeWhenSceneBegin();
			// operation start
			LoadImages();
			Scenes["Menu"] = new Menu();
			Scenes["Game"] = new Game();
			
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenGameLoaded();
		}
		this.Update();
	}
	this.Update = function() {
			ctx.fillStyle = "rgb(230, 230, 230)";
			ctx.fillRect(0,0, canvas.width, canvas.height);
			ctx.drawImage(this.logo, canvas.width * .5 - this.logo.width *.5, canvas.height *.3);
			for (var i = 0; i < this.GameObjects.length; i++) {
				//this.GameObjects[i].Start();
			}
			if(Input.MouseClick)
			{
				Application.LoadedScene = Scenes["Menu"];
			}
			
		this.GUI();
	}
	this.GUI = function() {
			ctx.strokeStyle = "grey";
			ctx.strokeRect( canvas.width / 2 - 200, 500, 400, 20);
			ctx.fillStyle = "grey";
			var portion = 400 / ImagesPath.length;
			ctx.RoundedBox( canvas.width / 2 - 198, 503, this.imageLoaded * portion - 4, 15, 6);
		
		if(Application.debugMode)
		{
			Debug.debugScene();
		}
	}

	this.Awake()
}