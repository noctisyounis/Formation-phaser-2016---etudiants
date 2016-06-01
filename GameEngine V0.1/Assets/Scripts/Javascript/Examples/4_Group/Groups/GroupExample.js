/**
 * Create a new Group of GameObjects. <br />
 * 
 * @class
 * @param {string} _name - The group name
 * @param {Vector} _position - The group position
 * 
 * @return {Group} Group - A new Group
 * */
function GroupExample(_name, _position) 
{
	this.name = _name || "GroupExample";
	this.started = false;
	this.enabled = true;
	this.Parent = null;
	this.GameObjects =[];

	this.MouseOffset = new Vector();

	this.Transform = {};
	this.Transform.RelativePosition = _position;
	this.Transform.Position = new Vector(0, 0);
	this.Transform.Size = new Vector(0, 0);						// Rect : collider
	this.Transform.RelativeScale = new Vector(1, 1);
	this.Transform.Scale = new Vector(1, 1);

	this.SetPosition = function(_x, _y)
	{
		this.Transform.RelativePosition.x = _x;
		this.Transform.RelativePosition.y = _y;
	};

	this.SetPositionCollider = function(_x, _y)
	{
		this.Physics.Collider.x = _x;
		this.Physics.Collider.y = _y;
	};

	this.SetSize = function(_x, _y)
	{
		this.Transform.Size.x = _x;
		this.Transform.Size.y = _y;
	};

	this.SetColliderSize = function(_w, _h)
	{
		this.Physics.Collider.w = _w;
		this.Physics.Collider.h = _h;
	};

	this.SetScale = function(_x, _y)
	{
		this.Transform.Scale.x = _x;
		this.Transform.Scale.y = _y;
	};

	this.Physics = {};											// D & D
	this.Physics.enabled = true;
	this.Physics.isClicked = false;
	this.Physics.clickable = true;
	this.Physics.dragAndDroppable = true;
	this.Physics.colliderIsSameSizeAsTransform = true;
	this.Physics.countHovered = 0;

	// can be a Transform, Circle, Box
	this.Physics.Collider = new Box();

	this.Renderer = 											// Visu
	{
		That: this.Transform,
		
		Draw: function() 
		{
			ctx.fillStyle = "rgba(21, 73, 73, .5)";
			ctx.fillRect(this.That.Position.x,
							this.That.Position.y,
							this.That.Size.x,
							this.That.Size.y);
		}
	};
	/**
	 * Called at the instruction new Group().
	 * */
	this.Awake = function() 
	{
		Print('System:Group ' + this.name + " Created !");
	};
	/**
	 * Start the Group and show a message in console or launch Update() if already started
	 * Called at the first use of group in game.
	 * */
	this.Start = function()
	{
		if (!this.started)
		{
			this.SetPosition(200, 200);
			this.SetSize(400, 200);
			this.Physics.Collider = new Box(this.Transform.RelativePosition.x, 
												this.Transform.RelativePosition.y,
												this.Transform.Size.x,
												this.Transform.Size.y);

			console.log(this.Physics.Collider);
			this.AddGameObject(new GOGroup1());
			this.AddGameObject(new GOGroup2());
			this.AddGameObject(new GOGroup3());
			this.started = true;
			Print('System:Group ' + this.name + " Started !");
		}
		this.Update();
	};
	/**
	 * Update the position and the scale and start the GameObjects
	 * Called each frame,code game is here.
	 * */
	this.Update = function()
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

			this.Physics.Collider = new Box(this.Transform.RelativePosition.x, 
												this.Transform.RelativePosition.y,
												this.Transform.Size.x,
												this.Transform.Size.y);

			if (Input.mouseLongClick && Physics.CheckCollision(Input.MousePosition, this.Physics.Collider)) {
				for (var i = this.GameObjects.length - 1; i >= 0; i--) {
					if(this.GameObjects[i].Physics.isClicked == true) {
						this.Physics.isClicked = false;
					} else this.Physics.isClicked = true;
				}
				if (this.Physics.isClicked) {
					this.onClicked();
				}
			} else {
				this.Physics.isClicked = false;
				this.Physics.countHovered = 0;

			}

			this.Renderer.Draw();

			for (var i = 0; i < this.GameObjects.length; i++)
			{
				this.GameObjects[i].Start();
			}
		}
	};
	/**
	 * Add a GameObject to the Group
	 * @param {GameObjects} _go - The GameObject
	 * */
	this.AddGameObject = function(_go)
	{
		_go.Parent = this;
		this.GameObjects.push(_go);
	};
	/**
	 * Remove a GameObject to the Group
	 * @param {GameObjects} _go - The GameObject
	 * */
	this.RemoveGameObject = function(_go)
	{
		_go.Parent = null;
		var index = this.GameObjects.indexOf(_go);
		return this.GameObjects.splice(index, 1)[0];
	};
	this.onClicked = function() 
	{
		if (this.Physics.countHovered == 0) {
			this.MouseOffset.x = Input.MousePosition.x - this.Transform.Position.x;
			this.MouseOffset.y = Input.MousePosition.y - this.Transform.Position.y;
		}
		this.Physics.countHovered ++;

		this.Transform.RelativePosition.x = Input.MousePosition.x - this.MouseOffset.x;
		this.Transform.RelativePosition.y = Input.MousePosition.y - this.MouseOffset.y;
	};
	this.Awake();
}