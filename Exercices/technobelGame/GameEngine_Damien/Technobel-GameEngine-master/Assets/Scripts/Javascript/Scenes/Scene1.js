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
function Scene1() {
	this.name = "Scene 1";
	this.GameObjects =[];
	var count = 0;

	this.column = 11;
	this.line = 9;
	this.offsetImgX = 2;
	this.offsetImgY = 85;

	this.speedPopStar = 80;

	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();

		var goCharacterBoy = new GOCharacterBoy();
		this.GameObjects.push(goCharacterBoy);

			// operation start
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}

		this.Update();
	}

	this.Update = function() {
		if (!Application.GamePaused) {
			
			/***	Create Random Star 		***/
			if (count % this.speedPopStar == 0) {
				this.createStar();
			}
			// draw Background
			for(var i = 0; i < this.column * this.line; i++) {
				var x = i % this.column;
				var y = (i - x ) / this.column;
				ctx.drawImage(Images.GrassBlock, x * (Images.GrassBlock.width - this.offsetImgX), 
												 y * (Images.GrassBlock.height - this.offsetImgY));
			}
			// When GameObjects > 11 -> reset the game
			if (this.GameObjects.length > 11) {
					Scenes['Scene1'] = new Scene1();
					Application.LoadedScene = Scenes["Scene1"];
			}

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
				if(Physics.CheckCollision(this.GameObjects[0].Physics.Collider, this.GameObjects[i].Physics.Collider) 
					&& this.GameObjects[i] != this.GameObjects[0]){
						this.GameObjects[0].speed++;
						this.speedPopStar--;
						this.GameObjects.splice(i,1);
				}
			}
		count++;
		}

		this.GUI();
	}
	this.createStar = function(){
		var star = new GOStar(Math.Random.RangeInt(80,canvas.width - 80,false), Math.Random.RangeInt(80,canvas.height - 80,true));
		this.GameObjects.push( star );
	}
	this.GUI = function() {
		for (var i = 0; i < this.GameObjects.length; i++) {
				//Debug.debugObject(this.GameObjects[i]);
			}
		if (!Application.GamePaused) {
			//Show UI
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}