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
function SceneTest() {
	this.name = "Test";
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

			//var ps = new ParticulesSystem();
			//this.GameObjects.push(ps);

			var d = "Now that we know who <pause> you are, <mediumPause> <color:red> I know who I am. I'm not a mistake! It all makes sense! <color> In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.";


			//initText: function(text,font,fontSize,color,destination,interval)
			Dialogs.initText( d,"Arial",25,"white",new Box(canvas.width/2 - 250,canvas.height - 250,500,200),2 );

			this.GameObjects.push(new Items(630,50,50,50));
			this.GameObjects.push(new Items(210,200,50,50));
			this.GameObjects.push(new Items(400,640,50,50));
			this.GameObjects.push(new Player(500,350));

			//console.log(ps);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {
			ctx.fillStyle = '#B5B6B7';
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}

			if (Input.KeysDown[32]) {
				Dialogs.Interupt();
			}

			//Gfx.Filters.AlphaMask(AlphaMasks["alphaMask2"]);
			//Gfx.Filters.Grayscale({x:0,y:0,w:1000,h:1000});
			//Gfx.Filters.Flash({x:0,y:0,w:canvas.width,h:canvas.height},1,"#FFFFFF");
		}

		this.GUI();
	}
	this.GUI = function() {
		if (!Application.GamePaused) {
			ctx.fillStyle = '#0762F5';
			ctx.fillRect(canvas.width/2 - 250,canvas.height - 250,500,200);
			Dialogs.Continue();
		} else {
			// Show pause menu
		}
		if(Application.debugMode)
		{
			Debug.debugScene();
		}
	}

	this.Awake()
}