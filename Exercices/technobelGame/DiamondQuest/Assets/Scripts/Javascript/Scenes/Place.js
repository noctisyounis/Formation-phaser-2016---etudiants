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
function Place() {
	this.name = "Place";
	this.GameObjects =[];

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


var Map = 
			[
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
				[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,5,1],
				[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
				[0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
				[0,0,0,1,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
				[0,0,0,1,0,0,0,1,0,1,1,1,1,1,0,0,0,1,1,1,1,0],
				[0,0,0,1,0,0,0,1,0,1,1,2,1,1,0,0,0,2,0,0,1,0],
				[0,0,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,1,0],
				[0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
				[0,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			]

			for (var i = 0; i < Map.length; i++) {
				for (var j = 0; j < Map[i].length; j++) {
					if (Map[i][j] == 0){
						this.GameObjects.push(new Environment(
						{
							name:'Dirt Block',position:{x:j*100/2,y:i*100/2},
							size:{x:100,y:120},
							scale:{x:.5,y:.5},
							id:1
						}
						));
					}
					if (Map[i][j] == 2){
						this.GameObjects.push(new Environment(
						{
							name:'Gem Green',position:{x:j*100/2+15,y:i*100/2+15},
							size:{x:20,y:20},
							scale:{x:1,y:1},
							id:2
						}
						));
					}
					if (Map[i][j] == 3){
						this.GameObjects.push(new Environment(
						{
							name:'Hole Block',position:{x:j*100/2,y:i*100/2},
							size:{x:100,y:120},
							scale:{x:.5,y:.5},
							id:3
						}
						));
					}
					if (Map[i][j] == 4){
						this.GameObjects.push(new Environment(
						{
							name:'Gem Blue',position:{x:j*100/2+15,y:i*100/2+15},
							size:{x:20,y:20},
							scale:{x:1,y:1},
							id:4
						}
						));
					}
					if (Map[i][j] == 5){
						this.GameObjects.push(new Environment(
						{
							name:'Chest Closed',position:{x:j*100/2,y:i*100/2},
							size:{x:50,y:50},
							scale:{x:1,y:1},
							id:4
						}
						));
					}
				}
			}

			this.GameObjects.push(new Character());

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