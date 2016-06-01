
function SquarePhysics1() 
{
	this.name = "SquarePhysics1";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.fixedToCamera = true;

	this.MouseOffset = new Vector();

	this.Parent = null;

	this.velocity = 10;
	this.color = "";
	
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

	// can be a Transform, Circle, Box
	this.Physics.Collider = 
	{
		Position: new Vector(),
		Size: new Vector()
	};

	this.Renderer = 
	{
		isVisible: true,
		isSpriteSheet: false,
		That: this.Transform,
		Material: 
		{
			Source: "",
			SizeFrame: new Vector(),
			CurrentFrame: new Vector(),
		},
		animationCount:0,
		Animation:
		{
			animated: true,
			Animations: [],
			Current:[],
			countdown:0,
			currentIndex: 0,
			totalAnimationLength: 0.5
		},
		
		Draw: function() 
		{
			var ScaledSizeX = this.That.Size.x*this.That.Scale.x;
			var ScaledSizeY = this.That.Size.y*this.That.Scale.y;

			ctx.save();
			ctx.translate((this.That.Position.x), (this.That.Position.y));
			ctx.rotate(Math.DegreeToRadian(this.That.angle));
			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated)
				{	
					if (this.animationCount > this.Animation.totalAnimationLength / this.Animation.Current.length) 
					{
						this.Animation.currentIndex ++ ;
						this.animationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.Current.length-1) 
						{
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.animationCount += Time.deltaTime;
					
				}
				else 
				{
					this.animationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.Current[this.Animation.currentIndex];

				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			} 
			else 
			{
				ctx.drawImage(this.Material.Source,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			}
			ctx.restore();
		}
	};


	this.SetSpriteSheet = function(_img, _sizeFrame, _animationLength) 
	{
		this.Renderer.isSpriteSheet = true;
		this.Animation.totalAnimationLength = _animationLength || 0.5;
		this.Renderer.Material.SizeFrame = _sizeFrame;
 		this.Renderer.Material.Source = _img;
 		this.Renderer.Material.CurrentFrame = new Vector(0,0);
 		for (var i = 0; i < _img.height; i += this.Renderer.Material.SizeFrame.y) 
 		{
 			var array = [];
 			for (var j = 0; j < _img.width; j += this.Renderer.Material.SizeFrame.x) 
 			{
 				array.push(new Vector(j, i));
 			}
 			this.Renderer.Animation.Animations.push(array);
 		}
 		this.Renderer.Animation.Current = this.Renderer.Animation.Animations[0];
	}

	this.Awake = function() 
	{
		Print('System:GameObject ' + this.name + " Created !");
	};
	this.Start = function() 
	{
		if (!this.started) {
			// operation start

			this.Physics.Collider = new Box(90,90,70,70);
			this.SetPosition(100,100);
			this.SetSize(50,50);
			this.SetPivot(.5,.5);
			this.SetScale(1,1);

			this.color = "blue";

			if (this.ColliderIsSameSizeAsTransform) {
				this.Physics.Collider = this.Transform;
			}

			this.started = true;
			Print('System:GameObject ' + this.name + " Started !");
		}
		this.PreUpdate();
	};
	this.PreUpdate = function() 
	{
		if (this.enabled) 
		{
			if (this.Parent != null) 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x + this.Parent.Transform.Position.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y + this.Parent.Transform.Position.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x * this.Parent.Transform.Scale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y * this.Parent.Transform.Scale.y;
			} 
			else 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y;
			}
			if (Application.LoadedScene.CurrentCamera != null) 
			{
				Application.LoadedScene.CurrentCamera.Start();
				if (!this.fixedToCamera) 
				{
					this.Transform.Position.x -= Application.LoadedScene.CurrentCamera.Transform.Position.x;
					this.Transform.Position.y -= Application.LoadedScene.CurrentCamera.Transform.Position.y;
				}
			}
			
			this.Update();
		}
			
	};
	this.Update = function() 
	{

		// Left
		if (Input.KeysDown[37]) {
			this.Transform.Position.x -= this.velocity;	
			this.Physics.Collider.x -= this.velocity;
		}
		// Top
		if (Input.KeysDown[38]) {
			this.Transform.Position.y -= this.velocity;
			this.Physics.Collider.y -= this.velocity;
		}
		// Right
		if (Input.KeysDown[39]) {
			this.Transform.Position.x += this.velocity;
			this.Physics.Collider.x += this.velocity;
		}
		// Bottom
		if (Input.KeysDown[40]) {
			this.Transform.Position.y += this.velocity;
			this.Physics.Collider.y += this.velocity;
		}

		for (var i = 0; i < Application.LoadedScene.GameObjects.length; i++) {
			// si le gameobject courrant n'est pas le même que le gameobject visé dans la scene
			if (this != Application.LoadedScene.GameObjects[i]) {

				// si il y a collision avec un autre gameobject ou avec la souris => color = red
				if ( Physics.CheckCollision(this.Physics.Collider,
					Application.LoadedScene.GameObjects[i].Physics.Collider) ||
					Physics.CheckCollision(Input.MousePosition, this.Physics.Collider) ){
						this.color = "red";
						i = Application.LoadedScene.GameObjects.length;
				} else {
					this.color = "blue";
				}
			}

		}	

		ctx.fillStyle = this.color;

		ctx.fillRect(	this.Transform.Position.x - (this.Transform.Size.x * this.Transform.Scale.x) * this.Transform.Pivot.x,
						this.Transform.Position.y - (this.Transform.Size.y * this.Transform.Scale.y) * this.Transform.Pivot.y,
						this.Transform.Size.x * this.Transform.Scale.x,
						this.Transform.Size.y * this.Transform.Scale.y);

		this.PostUpdate();
	};
	this.PostUpdate = function() 
	{
		if (Application.debugMode) {
			Debug.DebugObject(this);
		}
		


		this.GUI();	
	};
	this.GUI = function() 
	{
		Debug.DebugObject(this);
	}
	this.onHover = function() 
	{
		this.Physics.countHovered ++;	
	}
	this.onClicked = function() 
	{
		this.MouseOffset.x = Input.MousePosition.x - this.Transform.Position.x;
		this.MouseOffset.y = Input.MousePosition.y - this.Transform.Position.y;
		this.Physics.countHovered ++;
	}
	this.onUnHovered = function() 
	{
		this.Physics.countHovered = 0;
	}

	this.Awake();

}