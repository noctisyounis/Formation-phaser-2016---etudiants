
function SceneTest() {
	this.name = "SceneTest";
	this.GameObjects =[];

	this.img = Images["mask"];
	this.oldPixels;
	this.pixels;

	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();

			// operation start
			this.dialogue = new Dialogue();

			this.dialogue.InitText("Arial", 60,
				"Hello World ! Je suis Seb et je suis un game developer en formation au centre de Technobel et j'essaye d'aligner du texte dans une boite de dialogue",
				"red", {x: 50, y: 200, w: 500, h: 200}, 2);

			var hero = new goHero();
			this.GameObjects.push(hero);

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
			ctx.rect(50, 50, 50, 50);
			ctx.fillStyle = "green";
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.strokeStyle = 'blue';
			ctx.rect(50, 200, 500, 200);
			ctx.stroke();
			ctx.closePath();

			this.dialogue.Write();

			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
		}
		this.GUI();
	}
	this.GUI = function() {
		if (!Application.GamePaused) {
			//Show UI
			Debug.debugScene();
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}