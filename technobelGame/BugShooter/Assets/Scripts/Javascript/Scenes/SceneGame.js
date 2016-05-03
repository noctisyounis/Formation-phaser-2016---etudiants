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
function SceneGame() {
	this.name = "SceneGame";
	this.GameObjects = [];

	this.rnd = 0;
	this.timer = 0;

	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:yellow');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();

			// operation start
			this.timer = 20;
			var boy = new CharacterBoy();
			var key = new Key();
			this.GameObjects.push(boy);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:yellow');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {
			ctx.fillStyle = "rgb(50, 50, 50)";
			ctx.fillRect(0,0, canvas.width, canvas.height);

			// background
			for (var j = 0; j < 17; j++) {
				for (var i = 0; i < 21; i++) {				
					ctx.drawImage(Images["Grass Block"], i*50, j*40, 50, 85);
				}
			}

			//ctx.drawImage(Images["Star"], 0, 0, 101*0.5, 171*0.5);

			if (this.timer == 0) {
				this.timer = 30;
				this.rnd = Math.Random.RangeInt(0, canvas.width, false);
				var bug = new Bug(this.rnd);
				this.GameObjects.push(bug);
			}

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}

			this.timer--;
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