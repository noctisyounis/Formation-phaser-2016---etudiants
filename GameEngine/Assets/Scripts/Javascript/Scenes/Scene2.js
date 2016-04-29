function Scene2() {

	this.name = "Scene2";
	this.GameObjects = [];

	this.started = false;

	this.Awake = function() {
		console.clear();
		console.log("%c System:Scene " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			//First Frame
			this.GameObjects.push(new GameObject1());
			this.GameObjects.push(new GameObject2());

			this.started = true;
			console.log("%c System:Scene " + this.name + " Started!", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}

	this.Update = function() {
		if (!Application.GamePaused) {
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}	

		}
		this.GUI();
	}

	this.GUI = function () {
		if (!Application.GamePaused) {
			// SHOW UI
		} else {
			// SHOW PAUSE MENU
		}  
	}
	this.Awake();
}