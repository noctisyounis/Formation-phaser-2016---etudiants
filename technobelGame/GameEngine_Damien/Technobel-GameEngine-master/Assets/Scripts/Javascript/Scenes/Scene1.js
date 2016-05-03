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

	/*	*** TEST *** 
			create grid : level 1
	*/
	this.column = 11;
	this.line = 9;
	this.level1 = [];
	this.offsetImgX = 2;
	this.offsetImgY = 85;

	/* *** END TEST *** */

	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();

		/***	TEST	***/
			/*
			// fill tab
			for (var i = 0; i < this.column*this.line; i++) {
				this.level1[i] = {
					// 0 = green
					type : 0,
					// position X and Y, in level1
					x : i % this.column,
					y : (i - i % this.column ) / this.column
				}
			}
			// foreach level1 -> create new GO
			for (var i = 0; i < this.level1.length; i++) {
				switch(this.level1[i].type){
					case 0:
						// 											BUG X AND Y IS NEGATIVE
						var goGrassBlock = new GOGrassBlock(this.level1[i].x * (Images.GrassBlock.width - this.offsetImgX),
															this.level1[i].y * (Images.GrassBlock.height - this.offsetImgY));
						this.GameObjects.push(goGrassBlock);
					break;
				}
			}
			*/
		var goCharacterBoy = new GOCharacterBoy();
		var goStar = new GOStar();
		this.GameObjects.push(goCharacterBoy, goStar);

		/******/


			// operation start
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {
			
			// draw GrassBlock
			
			for(var i = 0; i < this.column * this.line; i++)
			{
				var x = i % this.column;
				var y = (i - x ) / this.column;
				// 2 offset 85 offset
				ctx.drawImage(Images.GrassBlock, x * (Images.GrassBlock.width - this.offsetImgX), 
												 y * (Images.GrassBlock.height - this.offsetImgY));
			}

			
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
			
		
		}

		this.GUI();
	}
	this.GUI = function() {
		for (var i = 0; i < this.GameObjects.length; i++) {
				Debug.debugObject(this.GameObjects[i]);
			}
		if (!Application.GamePaused) {
			//Show UI
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}