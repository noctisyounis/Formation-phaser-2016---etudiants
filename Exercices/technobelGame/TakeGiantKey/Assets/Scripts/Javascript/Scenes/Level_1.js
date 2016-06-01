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
function Level_1() {
	this.name = "Level_1";
	this.GameObjects =[];

	this.started = false;

	this.Awake = function() {
		// console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();

			var Map = 
			[
				[1,1,1,1,1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1,1,1,1,1],
				[0,0,0,0,0,0,7,0,0,1,1],
				[0,3,0,2,0,0,0,2,0,0,1],
				[8,2,0,0,7,6,0,0,0,0,1],
				[1,0,0,6,0,0,0,0,4,0,1],
				[1,0,0,0,2,0,0,0,0,0,1],
				[1,0,0,1,1,0,0,3,0,0,1],
				[1,0,0,1,1,0,0,0,0,2,1],
				[1,6,0,0,1,2,0,4,0,5,1],
				[1,1,1,1,1,1,1,1,1,1,1],
			]

			for (var i = 0; i < Map.length; i++) {
				for (var j = 0; j < Map[i].length; j++) {
					
					if (Map[i][j] == 0) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100 , i * 83));
						// console.log(i * 100);
						// console.log('J = '+(j * 100));
					}

					if (Map[i][j] == 1) 
					{
						this.GameObjects.push(new Tiles(Images["WaterBlock"],j * 100, i * 83));
					}
					
					if (Map[i][j] == 2) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100, i * 83));
						this.GameObjects.push(new Rock(j * 100, (i * 83) - 200));
					}

					if (Map[i][j] == 3) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100, i * 83));
						this.GameObjects.push(new BigArbre(Images["BigArbre"], j * 100, (i * 83) - 200));
					}

					if (Map[i][j] == 4) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100, i * 83));
						this.GameObjects.push(new BigArbre(Images["TreeShort"], j * 100, (i * 83) - 200));
					}

					if (Map[i][j] == 5) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100, i * 83));
						this.GameObjects.push(new Key(j * 100 , (i * 83) - 200));
					}

					if (Map[i][j] == 6) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100, i * 83));
						this.GameObjects.push(new BigArbre(Images["TreeUgly"], j * 100, (i * 83) - 200));
					}

					if (Map[i][j] == 7) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100, i * 83));
						this.GameObjects.push(new Bug(j * 100 , (i * 83) - 200));
					}

					if (Map[i][j] == 8) 
					{
						this.GameObjects.push(new Tiles(Images["GrassBlock"],j * 100, i * 83));
						var start = new Vector(j * 100 ,(i * 83) - 200);
					}
					
				}
			}

			this.GameObjects.push(new MainChara(start.x,start.y));
			// this.GameObjects.push(new Tiles(Images["DirtBlock"],900, 700));

			
			// operation start
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {
			ctx.fillStyle = '#5F71A5';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
			// if (Physics.CheckCollision(this.GameObjects.MainChara.Physics.Collider,this.GameObjects.Rock.Physics.Collider) 
			// {
			// 	console.log("TOUCHER")
			// }
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