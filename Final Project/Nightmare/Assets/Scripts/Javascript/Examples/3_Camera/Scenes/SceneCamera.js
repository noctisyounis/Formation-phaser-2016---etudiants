
function SceneCamera() {
	this.name = "SceneCamera";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;

	this.spaceIsDown = false;

	this.started = false;

	this.WorldSize = new Vector(4096, 4096);


	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start

			var hero = new Character();

			var fond = new Fond();

			var camera = new Camera();
			var cameraDeadZone = new CameraDeadZone();
			cameraDeadZone.ObjectToFollow = hero;

			this.Cameras.push(camera, cameraDeadZone);
			this.CurrentCamera = this.Cameras[0];
			this.GameObjects.push(fond, hero);

			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}

		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			ctx.fillStyle = "rgb(70,70,70)";
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

			if (Input.KeysDown[32] && !this.spaceIsDown) {
				this.spaceIsDown = true;

				if (this.CurrentCamera == this.Cameras[1]) {
					this.CurrentCamera = this.Cameras[0];
					this.GameObjects[1].Transform.RelativePosition.x = window.innerWidth / 2;
					this.GameObjects[1].Transform.RelativePosition.y = window.innerHeight / 2
				} else {
					this.CurrentCamera = this.Cameras[1];
				}
			}

			if (!Input.KeysDown[32]) {
				this.spaceIsDown = false;
			}

			for (var i = 0; i < this.Groups.length; i++) {
				this.Groups[i].Start();
			}
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
			if (this.CurrentCamera != null) {
				this.CurrentCamera.Start();
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