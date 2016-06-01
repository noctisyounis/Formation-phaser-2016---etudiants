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
function SceneHub() {
	this.name = "SceneHub";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
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
			// operation start
			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			ctx.fillStyle = "black";
			ctx.font = "20px Arial";
			ctx.fillText("A Animation", 10, 20);
			ctx.fillText("Z Input", 10, 50);
			ctx.fillText("E Camera", 10, 80);
			ctx.fillText("R Group", 10, 110);
			ctx.fillText("T PathFinding", 10, 140);
			ctx.fillText("Y IA", 10, 170);
			ctx.fillText("U Dialogue", 10, 200);
			ctx.fillText("I Particules", 10, 230);
			ctx.fillText("O Physics Debug", 10, 260);
			ctx.fillText("P Vector", 10, 290);
			ctx.fillText("Q Tween", 10, 320);
			ctx.fillText("S Post Effect", 10, 350);
			ctx.fillText("D Save", 10, 380);

			switch(Input.KeysDown.indexOf(true)){
				case 65:Application.LoadedScene = Scenes["SceneAnim"];
				break;

				case 90:
					Application.LoadedScene = Scenes["SceneInput"];
				break;

				case 69:
					Application.LoadedScene = Scenes["SceneCamera"];
				break;

				case 82:
					Application.LoadedScene = Scenes["SceneGroup"];
				break;

				case 84:
					Application.LoadedScene = Scenes["ScenePathFinding"];
				break;

				case 89:
					Application.LoadedScene = Scenes["SceneIA"];
					break;

				case 85:
					Application.LoadedScene = Scenes["SceneDialogue"];
				break;

				case 73:
					Application.LoadedScene = Scenes["SceneParticules"];
				break;

				case 79:
					Application.LoadedScene = Scenes["ScenePhysics_Debug"];
				break;

				case 80:
					Application.LoadedScene = Scenes["SceneVector"];
				break;

				case 81:
					Application.LoadedScene = Scenes["SceneTween"];
				break;

				case 83:
					Application.LoadedScene = Scenes["ScenePostEffect"];
				break;

				case 68:
					Application.LoadedScene = Scenes["SceneSave"];
				break;

				default :
				break;
			}
			

			// for (var i = 0; i < this.GameObjects.length; i++) {
			// 	this.GameObjects[i].Start();
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