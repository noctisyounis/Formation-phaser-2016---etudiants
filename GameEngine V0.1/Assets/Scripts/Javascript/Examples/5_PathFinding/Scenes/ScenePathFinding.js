
function ScenePathFinding() {
	this.name = "ScenePathFinding";
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
			this.Grid = new Grid(0,0,500,10);	
			
			this.Grid.Tiles = [0,0,0,0,0,0,0,0,0,0,
								0,0,0,0,0,0,0,0,0,0,
								0,0,1,0,0,0,1,0,0,0,
								1,0,1,0,0,0,0,0,0,0,
								0,0,0,0,0,1,0,0,0,0,
								0,1,0,0,0,0,0,0,0,0,
								0,0,0,0,0,0,0,0,1,0,
								0,0,0,0,0,0,0,0,0,0,
								0,0,0,1,0,0,0,0,0,0,
								0,0,0,0,0,0,0,0,0,0,
								];
			var p = new PathFinding(this.Grid);
			p.WalkableTiles = [0];
			var v1 = new Vector(0,0);
			var v2 = new Vector(6,8);
			p.Process(v1,v2);
			// operation start
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		this.Grid.Draw();
		if (!Application.GamePaused) {
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
			this.Grid.ShowPathDebug();
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}