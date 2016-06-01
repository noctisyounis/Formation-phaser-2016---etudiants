function Scene1() {
	this.name = "Scene1";
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
			var hero = new goHero();
			var particle = new ParticleSystem();
			var star1 = new GoStar();
			var star2 = new GoStar();

			star1.Transform.position.x = 50;
			star2.Transform.position.x = 100;

			var group = new Group(star1, star2);

			this.GameObjects.push(group);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			ctx.fillStyle = "rgb(50, 50, 50)";
			ctx.fillRect(0,0, canvas.width, canvas.height);

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