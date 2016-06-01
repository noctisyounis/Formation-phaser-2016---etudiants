
function SceneStateMachine() {
	this.name = "SceneStateMachine";
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
			var ennemy = new GoEnnemy();
			this.GameObjects.push(ennemy);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			ctx.fillStyle = "rgb(70, 70, 70)";
			ctx.fillRect(0,0, canvas.width, canvas.height);

			ctx.beginPath();
			ctx.rect(0, 0, 500, 500);
			ctx.fillStyle = "yellow";
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(100, 100, 300, 300);
			ctx.fillStyle = "orange";
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(200, 200, 100, 100);
			ctx.fillStyle = "red";
			ctx.fill();
			ctx.closePath();

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
		}
		this.GUI();
	}
	this.GUI = function() {
		if (!Application.GamePaused) {
			Debug.debugScene();
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}