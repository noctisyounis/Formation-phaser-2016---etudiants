
function GoEnnemy() {
	this.name = "Ennemy";
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.state;
	this.states = [];

	this.SeePlayer = false;
	this.escapeSuccess = false;
	this.isZoneInterdite = false;
	this.recognizePlayer = false;
	this.lostView = false;
	this.playerFight = false;
	this.playerEscapeFight = false;
	this.playerWinFight = false;
	
	this.Transform = {};
	this.Transform.position = new Vector();
	this.Transform.size = new Vector();
	this.Transform.scale = new Vector(1,1);
	this.Transform.pivot = new Vector(0,0);
	this.Transform.angle = 0;

	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.Clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.ColliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;
	this.Physics.Collider = {
		position: new Vector(),
		size: new Vector()
	};

	this.Renderer = {
		isVisible: true,
		isSpriteSheet: false,
		that: this.Transform,
		Material: {
			Source: "",
			SizeFrame: new Vector(),
			CurrentFrame: new Vector(),
		},

		Animation:{
			animated: true,
			animations: [],
			current:[],
			countdown:0
		},
		
		Draw: function() {

			ctx.save(); 
		    ctx.translate(this.that.position.x, this.that.position.y);
		    ctx.rotate(Math.DegreeToRadian(this.that.angle));

			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated) {	
					
					if (this.AnimationCount > this.Animation.totalAnimationLength/this.Animation.current.length) {
						this.Animation.currentIndex ++ ;
						this.AnimationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.current.length-1) {
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.AnimationCount += Time.DeltaTime;
					
				}else {
					this.AnimationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.current[this.Animation.currentIndex];

				var scaledSizeX = this.that.size.x*this.that.scale.x;
				var scaledSizeY = this.that.size.y*this.that.scale.y;
				//console.log(this);
				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.that.pivot.x*scaledSizeX,
								-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			} 
			else 
			{
				var scaledSizeX = this.that.size.x*this.that.scale.x;
				var scaledSizeY = this.that.size.y*this.that.scale.y;
				ctx.drawImage(this.Material.Source,
								-this.that.pivot.x*scaledSizeX,
								-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			}
			ctx.restore();
		}	

	};


	this.Awake = function() {
		console.log('%c System:GameObject ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.Start = function() {
		if (!this.started) {
			// operation start
			this.states["Neutral"] = "blue";
			this.states["Alert"] = "yellow";
			this.states["Search"] = "orange";
			this.states["fight"] = "red";

			this.state = this.states["Neutral"];

			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.Update = function() {
		if ( this.enabled ) {

			/*
				Condition d'alerte
			*/

			if (Physics.PointBoxCollision(Input.MousePosition, {x:0, y:0, w: 500, h: 500})) {

				this.SeePlayer = true;

				if (Physics.PointBoxCollision(Input.MousePosition, {x:100, y:100, w: 300, h: 300})) {

					this.recognizePlayer = true;

					if (Physics.PointBoxCollision(Input.MousePosition, {x:200, y:200, w: 100, h: 100})) {

						this.playerFight = true;
					} else {
						this.playerFight = false;
					}

				} else {
					this.recognizePlayer = false;
				}

			} else {

				this.SeePlayer = false;
				this.escapeSuccess = true;				
			}

			/*
				State Change
			*/

			// si zone interdite
			if (this.isZoneInterdite) {

				// si player vus
				if (this.SeePlayer) {
					this.state = this.states["fight"];
				}

			// zone normale
			} else {

				// si player vus
				if (this.SeePlayer) {
					this.state = this.states["Alert"];

					// si 
					if (this.recognizePlayer) {
						this.state = this.states["Search"];

						if (this.playerFight) {
							this.state = this.states["fight"];

							if (this.playerEscapeFight || this.playerWinFight) {
								this.state = this.states["Search"];
								this.playerFight = false;
							}
						} else if (this.lostView) {
							this.state = this.states["Alert"];
							this.recognizePlayer = false;
							this.lostView = false;
						}
					} 
				} else if (this.escapeSuccess) {
					this.state = this.states["Neutral"];
					this.SeePlayer = false;
				}
			}							

			ctx.beginPath();
			ctx.rect(800, 50, 50, 50);
			ctx.fillStyle = this.state;
			ctx.fill();
			ctx.closePath();
		}
		this.GUI();	
	};
	this.GUI = function() {
		
	};
	this.onHover = function() {
		this.Physics.countHovered ++;
		
	};
	this.onClicked = function() {
		this.Physics.countHovered ++;
	};
	this.onUnHovered = function() {
		this.Physics.countHovered = 0;
	};

	this.Awake();

}