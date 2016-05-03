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
function Menu() {
	this.name = "Menu";
	this.GameObjects =[];
	this.background = new Image();
	this.background.src = "Assets/Graphics/Background/green_felt.jpg";
	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		ctx.drawImage(this.background,0,0, canvas.width , canvas.height );
		ctx.fillStyle= "white";
		ctx.textAlign= "center";
		ctx.font ="60px Georgia";
		ctx.fillText("Jeux du Roi",canvas.width*.5,canvas.height*.5-80);
		ctx.font ="40px Georgia";
		ctx.fillText("Jouer",canvas.width*.5,canvas.height*.5);
		ctx.fillText("Règles",canvas.width*.5,canvas.height*.5+50);
		if(Input.MouseClick)
		{	
			console.log(Input.MousePosition.x+","+Input.MousePosition.y);
			if(Input.MousePosition.x>455 && Input.MousePosition.x<570)
			{
				if(Input.MousePosition.y>330 && Input.MousePosition.y<370)
				{
					Application.LoadedScene = Scenes["Game"];
				}
			}
		}
		if (!Application.GamePaused) {

			for (var i = 0; i < this.GameObjects.length; i++) {
				//this.GameObjects[i].Start();
			}
		}
		this.GUI();
	}
	this.GUI = function() {
		if (!Application.GamePaused) {
			//Show UI
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}