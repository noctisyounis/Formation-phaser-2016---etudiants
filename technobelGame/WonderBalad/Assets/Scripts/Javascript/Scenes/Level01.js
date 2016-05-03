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
function Level01() {
	this.name = "Level01";
	this.GameObjects =[];
	this.map = [];

	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start
			map = 	[0,0,0,0,1,1,1,1,1,1,
					 0,0,0,1,1,3,3,3,3,3,
					 0,0,1,1,1,3,1,1,1,1,
					 0,1,1,1,1,2,1,1,1,1,
					 1,1,2,2,2,2,1,1,1,1,
					 1,1,2,1,1,1,1,1,1,4,
					 1,1,2,1,1,1,1,1,4,0,
					 1,1,2,1,1,1,1,4,0,0];

			var indexCount = 0;
			for (var j = 0; j < 8; j++)
			{
				for (var i = 0; i < 10; i++)
				{
					if(indexCount === 0)
					{
						this.GameObjects.push(new Tiles(12, -24, TilesType[map[indexCount]]));
					}
					this.GameObjects.push(new Tiles(i*100+12, j*82-24, TilesType[map[indexCount]]));
					indexCount++;
				}
			}

			this.GameObjects.push(new Player(100, 100, Game.imageCharacter));
			//this.GameObjects.push(new Tiles(100, 300, TilesType[map[56]]));

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			ctx.fillStyle = "rgba(125, 125, 125, 0.4)";
			ctx.fillRect(0, 0, 1024, 728);

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
				//Debug.debugObject(this.GameObjects[i]);
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