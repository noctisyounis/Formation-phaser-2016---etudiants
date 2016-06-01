
function Character() 
{
	this.name = "Character";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.fixedToCamera = true;

	this.Parent = null;

	this.velocity = 10;
	
	this.Transform = {};
	this.Transform.RelativePosition = new Vector();
	this.Transform.Position = this.Transform.RelativePosition;
	this.Transform.Size = new Vector();
	this.Transform.RelativeScale = new Vector(1,1);
	this.Transform.Scale = this.Transform.RelativeScale;
	this.Transform.Pivot = new Vector(0,0);
	this.Transform.angle = 0;

	this.SetPosition = function(_x, _y)
	{
		this.Transform.Position.x = _x;
		this.Transform.Position.y = _y;
	};

	this.SetPositionCollider = function(_x, _y)
	{
		this.Physics.Collider.Position.x = _x;
		this.Physics.Collider.Position.y = _y;
	};

	this.SetSize = function(_x, _y)
	{
		this.Transform.Size.x = _x;
		this.Transform.Size.y = _y;
	};

	this.SetColliderSize = function(_x, _y)
	{
		this.Physics.Collider.Size.x = _x;
		this.Physics.Collider.Size.y = _y;
	};

	this.SetScale = function(_x, _y)
	{
		this.Transform.Scale.x = _x;
		this.Transform.Scale.y = _y;
	};
	
	this.SetPivot = function(_x, _y)
	{
		this.Transform.Pivot.x = _x;
		this.Transform.Pivot.y = _y;
	};

	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.colliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;
	this.Physics.Collider = {
		Position: new Vector(),
		Size: new Vector()
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
			Animations: [],
			current:[],
			countdown:0
		},
		
		Draw: function() {
			var ScaledSizeX = this.that.Size.x*this.that.Scale.x;
			var ScaledSizeY = this.that.Size.y*this.that.Scale.y;

			ctx.save();
			ctx.translate( (this.that.Position.x) , 
							(this.that.Position.y) );
			ctx.rotate( Math.DegreeToRadian(this.that.angle) );
			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated) {	
					
					if (this.AnimationCount > this.Animation.totalAnimationLength/this.Animation.Current.length) {
						this.Animation.currentIndex ++ ;
						this.AnimationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.Current.length-1) {
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.AnimationCount += Time.deltaTime;
					
				}else {
					this.AnimationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.Current[this.Animation.currentIndex];

				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.that.Pivot.x*ScaledSizeX,
								-this.that.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			} 
			else 
			{
				ctx.drawImage(this.Material.Source,
								-this.that.Pivot.x*ScaledSizeX,
								-this.that.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			}
			ctx.restore();
		}				
	};


	this.Awake = function() {
		Print('System:GameObject ' + this.name + " Created !");
	};
	this.Start = function() {
		if (!this.started) {
			// operation start

			this.Renderer.Material.Source = Images["Boy"];
			this.Transform.RelativePosition = new Vector((window.innerWidth / 2), (window.innerHeight / 2));
			this.Transform.Size = new Vector(50, 50);
			this.SetPivot(.5, .5);

			this.started = true;
			Print('System:GameObject ' + this.name + " Started !");
		}
		this.PreUpdate();
	};
	this.PreUpdate = function() {
		if ( this.enabled ) {
			if (this.Parent != null) {
				this.Transform.Position.x = this.Transform.RelativePosition.x + this.Parent.Transform.Position.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y + this.Parent.Transform.Position.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x * this.Parent.Transform.Scale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y * this.Parent.Transform.Scale.y;
			} else {
				this.Transform.Position.x = this.Transform.RelativePosition.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y;
			}
			
			if (!this.fixedToCamera) {
				this.Transform.Position.x -= Application.LoadedScene.CurrentCamera.Transform.Position.x;
				this.Transform.Position.y -= Application.LoadedScene.CurrentCamera.Transform.Position.y;
			}

			this.Update();
		}
			
	};
	this.Update = function() {

		// si la cmaera a une deadzone et que le hero est dans celle-ci il peut bouger
		if (Application.LoadedScene.CurrentCamera.isDeadZone) {
			if (this.Transform.Position.x > Application.LoadedScene.CurrentCamera.Offsets.x) {
				if (Input.KeysDown[37]) this.Transform.RelativePosition.x -= this.velocity;
			}

			if (this.Transform.Position.x < canvas.width - Application.LoadedScene.CurrentCamera.Offsets.x) {
				if (Input.KeysDown[39]) this.Transform.RelativePosition.x += this.velocity;
			}
			
			if (this.Transform.Position.y > Application.LoadedScene.CurrentCamera.Offsets.y) {
				if (Input.KeysDown[38]) this.Transform.RelativePosition.y -= this.velocity;
			}

			if (this.Transform.Position.y < canvas.height - Application.LoadedScene.CurrentCamera.Offsets.y) {
				if (Input.KeysDown[40]) this.Transform.RelativePosition.y += this.velocity;
			}
		}

		this.Renderer.Draw();

		this.PostUpdate();	
	};
	this.PostUpdate = function() {
		


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