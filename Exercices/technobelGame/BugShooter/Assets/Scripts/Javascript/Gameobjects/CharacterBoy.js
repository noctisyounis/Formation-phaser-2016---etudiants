function CharacterBoy() {
	this.name = "Boy";
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.rateFire = 0;
	this.velocity = 5;
	
	this.Transform = {};
	this.Transform.position = new Vector();
	this.Transform.size = new Vector();
	this.Transform.scale = new Vector(1,1);
	this.Transform.pivot = new Vector(0,0);

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
								this.that.position.x-this.that.pivot.x*scaledSizeX,
								this.that.position.y-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			} 
			else 
			{
				var scaledSizeX = this.that.size.x*this.that.scale.x;
				var scaledSizeY = this.that.size.y*this.that.scale.y;
				ctx.drawImage(this.Material.Source,
								this.that.position.x-this.that.pivot.x*scaledSizeX,
								this.that.position.y-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			}
		}			

	};


	this.Awake = function() {
		console.log('%c System:GameObject ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.Start = function() {
		if (!this.started) {

			// operation start
			this.Renderer.Material.Source = Images["Character Boy"];
			this.Transform.position = {x: canvas.width/2, y: 600};
			this.Transform.size = {x: 101 ,y: 171};
			this.Transform.scale = {x: .5, y: .5};
			this.Physics.Collider.position = {x: this.Transform.position.x + 18, y: this.Transform.position.y + 40};
			this.Physics.Collider.size = {x: 15, y: 28};

			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.Update = function() {
		if ( this.enabled ) {

			// left
			if (Input.KeysDown[37]){
				this.Transform.position.x -= this.velocity;
				this.Physics.Collider.position.x -= this.velocity;
			}

			// up
			if (Input.KeysDown[38]){
				this.Transform.position.y -= this.velocity;
				this.Physics.Collider.position.y -= this.velocity;
			}

			// right
			if (Input.KeysDown[39]){
				this.Transform.position.x += this.velocity;
				this.Physics.Collider.position.x += this.velocity;
			}

			// down
			if (Input.KeysDown[40]){
				this.Transform.position.y += this.velocity;
				this.Physics.Collider.position.y += this.velocity;
			}

			// space shoot
			if (Input.KeysDown[32] && this.rateFire <= 0) {				
				var star = new Star(this.Transform.position.x, this.Transform.position.y);
				Application.LoadedScene.GameObjects.push(star);
				this.rateFire = 15;
			}

			this.rateFire--;
			this.Renderer.Draw();
		}

		this.GUI();	
	};
	this.GUI = function() {
		if (Application.debugMode) {
			// box collider
			ctx.beginPath();
			ctx.rect(this.Physics.Collider.position.x, this.Physics.Collider.position.y, this.Physics.Collider.size.x, this.Physics.Collider.size.y);
			ctx.fillStyle = Debug.ColliderColor;
			ctx.fill();
			ctx.closePath();

			//sprite size
			ctx.beginPath();
			ctx.rect(this.Transform.position.x, this.Transform.position.y, this.Transform.size.x * this.Transform.scale.x, this.Transform.size.y * this.Transform.scale.y);
			ctx.strokeStyle = Debug.SpriteOutlineColor;
			ctx.stroke();
			ctx.closePath();			
		}
	}
	this.onHover = function() {
		this.Physics.countHovered ++;
		
	}
	this.onClicked = function() {
		this.Physics.countHovered ++;
	}
	this.onUnHovered = function() {
		this.Physics.countHovered = 0;
	}

	this.Awake();

}