function Sprite() {
	this.name = "Sprite";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.FixedToCamera = true;

	this.Parent = null;
	
	this.Transform = {};
	this.Transform.relativePosition = new Vector(0,0);
	this.Transform.position = this.Transform.relativePosition;
	this.Transform.size = new Vector(canvas.width/2,canvas.height/2);
	this.Transform.relativeScale = new Vector(1,1);
	this.Transform.scale = this.Transform.relativeScale;
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
		AnimationCount:0,
		Animation:{
			animated: true,
			animations: [],
			current:[],
			countdown:0
		},
		
		Draw: function() {
			var scaledSizeX = this.that.size.x*this.that.scale.x;
			var scaledSizeY = this.that.size.y*this.that.scale.y;

			ctx.save();
			ctx.translate( (this.that.position.x) , 
							(this.that.position.y) );
			ctx.rotate( Math.DegreeToRadian(this.that.angle) );
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
					
					this.AnimationCount += Time.deltaTime;
					
				}else {
					this.AnimationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.current[this.Animation.currentIndex];

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
			this.Renderer.Material.Source = Images["Fond"];
			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.PreUpdate();
	};
	this.PreUpdate = function() {
		if ( this.enabled ) {
			if (this.Parent != null) {
				this.Transform.position.x = this.Transform.relativePosition.x + this.Parent.Transform.position.x;
				this.Transform.position.y = this.Transform.relativePosition.y + this.Parent.Transform.position.y;

				this.Transform.scale.x = this.Transform.relativeScale.x * this.Parent.Transform.scale.x;
				this.Transform.scale.y = this.Transform.relativeScale.y * this.Parent.Transform.scale.y;
			} else {
				this.Transform.position.x = this.Transform.relativePosition.x;
				this.Transform.position.y = this.Transform.relativePosition.y;

				this.Transform.scale.x = this.Transform.relativeScale.x;
				this.Transform.scale.y = this.Transform.relativeScale.y;
			}
			if (!this.FixedToCamera) {
				this.Transform.position.x -= Application.LoadedScene.CurrentCamera.Transform.position.x;
				this.Transform.position.y -= Application.LoadedScene.CurrentCamera.Transform.position.y;
			}



			this.Update();
		}
			
	};
	this.Update = function() {
		
		this.Renderer.Draw();

		this.PosUpdate();	
	};
	this.PosUpdate = function() {
		


		this.GUI();	
	};
	this.GUI = function() {
		
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