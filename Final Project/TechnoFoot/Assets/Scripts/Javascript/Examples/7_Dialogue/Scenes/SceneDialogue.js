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
function SceneDialogue() {
	this.name = "SceneDialogue";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;

	this.dialogue = new Dialogs();
	this.text = "After that, there is a short pause <pause> then a medium pause an a color changer for 3 words, <mediumPause> <color:blue> this is blue. <color> A little more text for vertical scrolling. You can also interupt the text whit the spacebar and after that you can scroll with the up and down arrows.";

	//this.text = "Ceci est un exemple de dialogue";

	this.started = false;

	this.WorldSize = new Vector(4096,4096);


	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start

			this.dialogue.InitText(this.text, "Arial", 30, "red", new Box(100,100,350,200), 2);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {
		
			ctx.fillStyle = "rgb(70,70,70)";
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(100,100,350,200);
			this.dialogue.Continue();

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) {
				this.Groups[i].Start();
			}

			if (Input.KeysDown[32]) {
				this.dialogue.Interupt();
			}
			if (Input.KeysDown[38] && this.dialogue.interupted) {
				this.dialogue.LineUp();
			}
			if (Input.KeysDown[40] && this.dialogue.interupted) {
				this.dialogue.LineDown();
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