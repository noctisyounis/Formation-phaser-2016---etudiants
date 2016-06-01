function ParticleSystem() {
	this.name = "particleSystem";
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.emitters = [];
	this.fields = [];
	
	this.Transform = {};
	this.Transform.position = new Vector(100,100);
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
		},
	};


	this.Awake = function() {
		console.log('%c System:GameObject ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};

	this.Start = function() {
		if (!this.started) {

			// operation start
			this.Renderer.Material.Source = Images["Star"];
			var positionEmitter = new Vector(canvas.width/2, canvas.height/2);

			this.emitters.push( new Emitter(positionEmitter, new Vector(2,2), 10, 10, 200000, this.Renderer.Material.Source) );

			this.fields.push( new Field(new Vector(100, 100), -50) );

			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};

	this.Update = function() {
		if ( this.enabled ) {

			for (var i = 0; i < this.fields.length; i++) {
				this.fields[i].position.x = Input.MousePosition.x;
				this.fields[i].position.y = Input.MousePosition.y;
			}

			for (var i = 0; i < this.emitters.length; i++) {
				this.emitters[i].update();
			}
		}
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