function GameObject1() {
	this.name = "GameObject1";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	
	this.Transform = {};
	this.Transform.position = new Vector();
	this.Transform.size = new Vector();
	this.Transform.scale = new Vector(1,1);
	this.Transform.pivot = new Vector(0,0);
	this.Transform.angle = 45;

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
		
		Draw : function(id)
		{
			ctx.save();
			ctx.translate(this.that.position.x,this.that.position.y);
			ctx.rotate(Math.DegreeToRadian(this.that.angle));
			if (this.isSpriteSheet)
			{
				
				ctx.drawImage(this.Material.Source,
							this.Animation.current[id].sX,
							this.Animation.current[id].sY,
							this.Material.SizeFrame.x,
							this.Material.SizeFrame.y,
							/*this.that.position.x*/ - this.that.pivot.x*this.that.scale.x*this.that.size.x,
							/*this.that.position.y*/ - this.that.pivot.y*this.that.scale.y*this.that.size.y,
							this.that.size.x*this.that.scale.x,
							this.that.size.y*this.that.scale.y);
				
			}else{
				ctx.drawImage(Images["cardBack"],
						/*this.that.position.x*/ - this.that.pivot.x*this.that.scale.x*this.that.size.x
						,/*this.that.position.y*/ - this.that.pivot.y*this.that.scale.y*this.that.size.y
						,this.that.size.x*this.that.scale.x
						,this.that.size.y*this.that.scale.y);
			}
			
		ctx.restore();
		}
	};


	this.Awake = function() {
		console.log('%c System:GameObject ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.SetPosition = function(x,y){
		this.Transform.position.x = x;
		this.Transform.position.y = y;
	};
	this.SetPositionCollider = function(x,y){
		this.Physics.Collider.position.x = x;
		this.Physics.Collider.position.y = y;
	};
	this.SetSize = function(x,y){
		this.Transform.size.x = x;
		this.Transform.size.y = y;
	};
	this.SetColliderSize = function(x,y){
		this.Physics.Collider.size.x = x;
		this.Physics.Collider.size.y = y;
	};
	this.SetScale = function(x,y){
		this.Transform.scale.x =x;
		this.Transform.scale.y =y;
	};
	this.SetPivot = function(x,y){
		this.Transform.pivot.x = x;
		this.Transform.pivot.y = y;
	};
	this.Start = function() {
		if (!this.started) {
			// operation start
			this.SetPosition(100,400);
			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.Update = function() {
		if ( this.enabled ) {
			ctx.fillStyle = "red";
			ctx.fillRect(100,canvas.height/2,50,50);
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