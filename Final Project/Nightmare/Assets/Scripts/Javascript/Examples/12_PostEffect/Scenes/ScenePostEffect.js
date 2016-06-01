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
function ScenePostEffect() {
	this.name = "ScenePostEffect";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.AlphaMask = null;
	this.CurrentCamera = null;


	this.started = false;

	this.WorldSize = new Vector(4096,4096);


	this.Awake = function() {
		console.clear();
		Print('System:Scene ' + this.name + " Created !");

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			var sprite1 = new Sprite();
			this.GameObjects.push(sprite1);
			var sprite2 = new Sprite();
			sprite2.Transform.relativePosition = new Vector(canvas.width/2,0);
			this.GameObjects.push(sprite2);
			var sprite3 = new Sprite();
			sprite3.Transform.relativePosition = new Vector(0,canvas.height/2);
			this.GameObjects.push(sprite3);
			this.AlphaMask = new Mask();
			var sprite4 = new Sprite();
			sprite4.Transform.relativePosition = new Vector(canvas.width/2,canvas.height/2);
			this.GameObjects.push(sprite4);
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
			this.AlphaMask.Start();
			Gfx.Filters.Greyscale({
					x:this.GameObjects[0].Transform.position.x,
					y:this.GameObjects[0].Transform.position.y,
					w:this.GameObjects[0].Transform.size.x,
					h:this.GameObjects[0].Transform.size.y
				});
			Gfx.Filters.Sepia({
					x:this.GameObjects[1].Transform.position.x,
					y:this.GameObjects[1].Transform.position.y,
					w:this.GameObjects[1].Transform.size.x,
					h:this.GameObjects[1].Transform.size.y,
				});
			//receive a color with alpha in params.
			Gfx.Filters.Tint({
					x:this.GameObjects[2].Transform.position.x,
					y:this.GameObjects[2].Transform.position.y,
					w:this.GameObjects[2].Transform.size.x,
					h:this.GameObjects[2].Transform.size.y,
				},"rgba(255,0,0,0.3)");
			Gfx.Filters.AlphaMask({
					x:this.GameObjects[3].Transform.position.x,
					y:this.GameObjects[3].Transform.position.y,
					w:this.GameObjects[3].Transform.size.x,
					h:this.GameObjects[3].Transform.size.y,
				});
			for (var i = 0; i < this.Groups.length; i++) {
				this.Groups[i].Start();
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