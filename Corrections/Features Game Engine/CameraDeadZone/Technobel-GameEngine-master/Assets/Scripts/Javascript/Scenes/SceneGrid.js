
function SceneGrid() {
	this.name = "SceneGrid";
	this.GameObjects =[];

	this.started = false;

	this.grid;
	this.wallsCoord = [];
	this.offset = 50;
	this.map = [];
	this.ways = [];

	this.pathFinding;
	this.start;
	this.end;
	this.position = new Vector(0,0);
	this.Coordsparcours = [];
	this.results = [];

	this.celluleSize = 30;

	this.cellulesCoordX = [];
	this.cellulesCoordY = [];

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start

			this.grid = new Grid(10, 10, this.celluleSize, this.offset);
			this.map = this.grid.SetRandomObstacle(25);
			this.pathFinding = new PathFinding( this.map, 10, 10 );
			this.start = new Vector(0,0);
			this.end = new Vector (9,9);
			this.position = this.start;
			this.Coordsparcours.push(this.position);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			ctx.fillStyle = "rgb(150, 150, 150)";
			ctx.fillRect(0,0, canvas.width, canvas.height);

			this.grid.SetGrid();
			this.grid.DrawObstacles();
			this.grid.GetCellulePosition();

			ctx.fillStyle = "green";
			ctx.fillRect(this.offset + this.start.x * this.celluleSize, this.offset + this.start.y * this.celluleSize, this.celluleSize, this.celluleSize);

			ctx.fillStyle = "red";
			ctx.fillRect(this.offset + this.end.x * this.celluleSize, this.offset + this.end.y * this.celluleSize, this.celluleSize, this.celluleSize);

			this.ways = this.pathFinding.Neighbours(this.position.x, this.position.y);

			this.results = this.pathFinding.Process();


			if (Input.MouseClick) {
				console.log(this.results);
			}

			for (var i = 0; i < this.GameObjects.length; i++) {
				//this.GameObjects[i].Start();
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