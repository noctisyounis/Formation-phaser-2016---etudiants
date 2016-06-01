
function ScenePhysics_Debug() {
	this.name = "ScenePhysics_Debug";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;

	this.started = false;

	this.WorldSize = new Vector(4096,4096);


	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start

			Application.debugMode = true;

			var Square = new SquarePhysics1();
			var Circle = new CirclePhysics1();
			var Square2 = new SquarePhysics2();
			var Circle2 = new CirclePhysics2();
			this.GameObjects.push(Square, Circle, Square2, Circle2);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			ctx.fillStyle = "rgb(70,70,70)";
			ctx.fillRect(0,0,window.innerWidth,window.innerHeight);

			ctx.font = '20px Arial';
			ctx.fillStyle = 'white';
			ctx.fillText('Move Square with arrows', 500, 100);
			ctx.fillText('Move Circle with ZQSD', 500, 200);

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();		
			}
			
			for (var i = 0; i < this.Groups.length; i++) {
				this.Groups[i].Start();
			}
		}
		this.GUI();
	}
	this.GUI = function() {
		if (!Application.GamePaused) {
			Application.debugMode = true;
			Debug.DebugScene();
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}