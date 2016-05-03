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
	this.GameObjects =[];

	this.started = false;

	this.selectedGem = null;
	this.switchGem = null;
	this.matchGems = [];

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start
			this.insertGems();
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}

	this.Update = function() {
		if (!Application.GamePaused) {

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
			this.matchGems.forEach( function(element, index) {
				ctx.strokeStyle = "BLACK";
				ctx.lineHeight = 5;
				ctx.strokeRect(element.Transform.position.x, element.Transform.position.y, CONSTANTS_GEM.SIZE.x * CONSTANTS_GEM.SCALE, CONSTANTS_GEM.SIZE.y * CONSTANTS_GEM.SCALE);
			});
		}
		this.GUI();
	}

	this.GUI = function() {
		if (!Application.GamePaused) {
			//Show UI
		} else {
			// Show pause menu
		}
		Debug.debugScene();
		/*Debug.debugObject(this.GameObjects[0]);*/

	}

	this.insertGems = function() {
		var offset = {
			x : (canvas.width - COLUMNS * Images["blueGem"].width * CONSTANTS_GEM.SCALE) / 2,
			y : (canvas.height - ROWS * Images["blueGem"].height * CONSTANTS_GEM.SCALE) / 2
		}

		for (var x = 0; x < COLUMNS; x++) {
			for (var y = 0; y < ROWS; y++) {
				var gem = new GameObjectGem();
				/* RANDOM GEMS */
				switch (Math.Random.RangeInt(0,2,true)) {
					case 0:
						gem.Renderer.Material.Source = Images["blueGem"];
						break;
					case 1:
						gem.Renderer.Material.Source = Images["greenGem"];
						break;
					case 2:
						gem.Renderer.Material.Source = Images["orangeGem"];
						break;
					default:
						console.log("Error in random color Gem");
						break;
				}
				gem.Transform.position.x = x * gem.Transform.size.x * gem.Transform.scale.x + offset.x;
				gem.Transform.position.y = y * gem.Transform.size.y * gem.Transform.scale.y + offset.y;
				this.GameObjects.push(gem);
			}
		}
	}

	this.switchGems = function() {
		var tempImage = this.selectedGem.Renderer.Material.Source;
		this.selectedGem.Renderer.Material.Source = this.switchGem.Renderer.Material.Source;
		this.switchGem.Renderer.Material.Source = tempImage;
		this.selectedGem.checkMatch();
		this.switchGem.checkMatch();
	}

	this.Awake()
}