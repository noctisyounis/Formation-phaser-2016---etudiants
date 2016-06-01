function Game() {
	this.name = "Game";
	this.GameObjects =[];
	this.background = new Image();
	this.background.src = "Assets/Graphics/Background/green_felt.jpg";
	this.started = false;
	this.text = "coucou";
	this.isPlayerTurn=true;
	this.Awake = function() {
		console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start
			for (var i = 0; i < 13; i++) {
				this.GameObjects.push(new Card("pic",i+1));
			}
			for (var i = 0; i < 13; i++) {
				this.GameObjects.push(new Card("carreau",i+1));
			}
			for (var i = 0; i < 13; i++) {
				this.GameObjects.push(new Card("coeur",i+1));
			}
			for (var i = 0; i < 13; i++) {
				this.GameObjects.push(new Card("trefle",i+1));
			}
			this.GameObjects=Shuffle(this.GameObjects);
			console.log(this.GameObjects);
			this.started = true;
			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		ctx.drawImage(this.background,0,0, canvas.width , canvas.height );
		ctx.fillStyle= "white";
		ctx.textAlign= "center";
		ctx.font ="20px Georgia";
		ctx.fillText(this.text,canvas.width*.5,50);

		if (!Application.GamePaused) {
			var x=8;
			var stepX=70;
			var y=120;
			var count = 0;
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].SetPosition(x,y);
				this.GameObjects[i].SetPositionCollider(x,y);
				this.GameObjects[i].Start();
				x+=78;
				count++;
				if(count ==13){
					count=0;
					x=8;
					y+=140;
				}
			}
		}
		this.GUI();
	}
	this.GUI = function() {
		/*for (var i = 0; i < this.GameObjects.length; i++) {
				Debug.debugObject(this.GameObjects[i]);
				
				
			}*/
		if (!Application.GamePaused) {
			//Show UI
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}