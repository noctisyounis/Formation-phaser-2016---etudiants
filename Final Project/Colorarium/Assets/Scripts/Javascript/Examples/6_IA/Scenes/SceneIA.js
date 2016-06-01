/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * 
 * @class
 * 
 * @return {Scene}
 * */
function SceneIA() 
{
	this.name = "SceneIA";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.WorldSize = new Vector(4096,4096);

	/* FINITE STATE MACHINE */
	this.StateMachine = new StateMachine();

	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	
	/**
	 * Start the Scene and show a message in console or launch Update() if already started
	 * Called at the first use of scene in game.
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
			Time.SetTimeWhenSceneBegin();
			// operation start
			var buttonClear = new GameObjectButton("Clear");
			buttonClear.SetPosition(30,50);
			buttonClear.Physics.clickable = false;
			this.GameObjects.push(buttonClear);

			var buttonCalm = new GameObjectButton("Calm");
			buttonCalm.SetPosition(160,50);
			buttonCalm.Physics.clickable = false;
			this.GameObjects.push(buttonCalm);

			var buttonWarn = new GameObjectButton("Warn");
			buttonWarn.SetPosition(290,50);
			this.GameObjects.push(buttonWarn);

			var buttonPanic = new GameObjectButton("Panic!");
			buttonPanic.SetPosition(420,50);
			this.GameObjects.push(buttonPanic);

			var panicT = new Transition("red", function() { return panic }),
				clearT = new Transition("green", function () { return clear }),
				calmT = new Transition("orange", function () { return calm }),
				warnT = new Transition("orange", function () { return warn });

			var green = new State("green", [panicT, warnT]);
			var red = new State("red", [calmT, clearT]);
			var orange = new State("orange", [panicT, clearT]);

			this.StateMachine.AddState(green);
			this.StateMachine.AddState(red);
			this.StateMachine.AddState(orange);
			this.StateMachine.Current = green;

			this.started = true;
			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	/**
	 * Start every GameObject, Group and apply the debug mode if asked
	 * Called each frame,code game is here.
	 * */
	this.Update = function() 
	{
		if (!Application.GamePaused) 
		{
			/* STATE MACHINE UPDATE */
			this.StateMachine.Update();

			/* START GAMEOBJECTS */
			for (var i = 0; i < this.GameObjects.length; i++) 
			{
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) 
			{
				this.Groups[i].Start();
			}
		}
		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}
		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		if (!Application.GamePaused) 
		{
			//Show UI
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.Awake()
}