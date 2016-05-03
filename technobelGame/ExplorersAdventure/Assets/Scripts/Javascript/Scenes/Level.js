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
function Level(lvlMap,lvlItems) {
	this.name = "Level";
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

			var map = lvlMap;
			var items = lvlItems;

			Application.LevelMap = map;
			Application.LevelItemMap = items;

			var playerMapPos;
			var mapCounter = 0;
			for (var j = 0; j < 8; j++) {
				for (var i = 0; i < 10; i++) {
					var x = 7+i*101;
					var y = j*81-30;
					this.GameObjects.push(new Tile(x,y,101,171,TileType[map[mapCounter]]));
					if (items[mapCounter] != 0 ) {
						if (items[mapCounter] == -1) {
							playerMapPos = new Vector(i,j)
						} else {
							this.GameObjects.push(new Items(i,j,x,y,101,171,ItemType[items[mapCounter]]));
						}
					}
					mapCounter++;
				}
				
			}
			if (Application.Player == null) {
				Application.Player = new Player(playerMapPos.x,playerMapPos.y,101,171)
			}
			else {
				Application.Player.Transform.mapPosition.x = playerMapPos.x;
				Application.Player.Transform.mapPosition.y = playerMapPos.y;
			}
			
			this.GameObjects.push(Application.Player);
			
			window.addEventListener('keydown',function(e) {
				if (!e.repeat) {
					Application.Player.moveEvent(e.keyCode);
				}	
			});
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {
			ctx.fillStyle = 'lightblue';
			ctx.fillRect(0, 0, 1024, 728);
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
		}
		this.GUI();
	}
	this.GUI = function() {
		if (!Application.GamePaused) {
			for (var i = 0; i < Application.Player.Life; i++) {
				ctx.drawImage(Images["Heart"],i*50,0,50,75);
			}
			ctx.font = '40px Consolas';
			ctx.fillStyle = 'white';
			ctx.textAlign = 'end';
			ctx.textBaseline = 'top';
			ctx.fillText(Application.Player.Score, 1000, 20);
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}