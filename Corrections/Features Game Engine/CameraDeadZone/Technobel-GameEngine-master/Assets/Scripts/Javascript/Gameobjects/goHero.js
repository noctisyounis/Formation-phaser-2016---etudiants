function goHero() {
	this.name = "hero";
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.walkSpeed = 5;
	this.goalSpeed = new Vector(0,0);
	this.currentSpeed = new Vector(0,0);
	
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
			this.Renderer.Material.Source = Images["Character Boy"];
			this.Transform.size = {x: 50 ,y: 50};

			this.Transform.position = {x: 50, y: 50};

			this.goalSpeed = new Vector(0,0);

			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.Update = function() {
		if ( this.enabled ) {
		}
		this.GUI();	
	};
	this.GUI = function() {
		if (Application.debugMode) {
			Debug.debugObject(this);		
		}
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