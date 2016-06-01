/**
 * Create a new Camera. <br />
 * Can have a dead zone, collide world bounds and follow an object
 * 
 * @class
 * @param {string} _name - The cameras's name.
 * @param {Vector} _position - The camera's position
 * 
 * @return {Camera} Camera - A new Camera
 * */
function Camera(_name, _position) 
{
	this.name = _name || "CameraModel";
	this.started = false;
	this.enabled = true;
	this.gfxEnabled = false;

	this.collideWorldBound = true;

	this.isDeadZone = false;
	this.ObjectToFollow = null;
	this.Offsets = new Vector(canvas.width / 6, canvas.height / 6);

	this.speed = 150;

	this.Transform = {};
	this.Transform.Position = _position || new Vector(0, 0);

	if(typeof this.name != 'string' ) PrintErr("Parameter name in Camera constructor");
	if(!(this.position instanceof(Vector))) PrintErr("Parameter position in Camera constructor");
	/**
	 * Awake the Camera and show a message in console
	 * */
	this.Awake = function() 
	{
		Print('System:Group ' + this.name + " Created !");
	};
	
	/**
	 * Start the Camera and show a message in console or launch Update() if already started
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
			// operation start
			this.started = true;
			Print('System:Group ' + this.name + " Started !");
		}
		this.Update();
	};
	/**
	 * Update the speed of the camera when arrows keys are pushed.
	 * */
	this.Update = function () 
	{
		if (!this.isDeadZone) 
		{
			if(Input.KeysDown[37]) 
			{
				this.Transform.Position.x -= this.speed;
			}
			if(Input.KeysDown[38]) 
			{
				this.Transform.Position.y -= this.speed;
			}
			if(Input.KeysDown[39]) 
			{
				this.Transform.Position.x += this.speed;
			}
			if(Input.KeysDown[40]) 
			{
				this.Transform.Position.y += this.speed;
			}
		} 
		else 
		{
			if (this.ObjectToFollow != null) 
			{
				if (this.ObjectToFollow.Transform.Position.x < this.Transform.Position.x + this.Offsets.x) 
				{
					this.Transform.Position.x = this.ObjectToFollow.Transform.Position.x - this.Offsets.x;
				}
				if (this.ObjectToFollow.Transform.Position.x > this.Transform.Position.x + canvas.width - this.Offsets.x) 
				{
					this.Transform.Position.x = this.ObjectToFollow.Transform.Position.x + this.Offsets.x - canvas.width;
				}
				if (this.ObjectToFollow.Transform.Position.y < this.Transform.Position.y + this.Offsets.y) 
				{
					this.Transform.Position.y = this.ObjectToFollow.Transform.Position.y - this.Offsets.y;
				}
				if (this.ObjectToFollow.Transform.Position.y > this.Transform.Position.y + canvas.height - this.Offsets.y) 
				{
					this.Transform.Position.y = this.ObjectToFollow.Transform.Position.y + this.Offsets.y - canvas.height;
				}
			}
		}
			
		if (this.collideWorldBound) 
		{
			this.Transform.Position.x = Math.Clamp(this.Transform.Position.x, 0, Application.LoadedScene.WorldSize.x - canvas.width);
			this.Transform.Position.y = Math.Clamp(this.Transform.Position.y, 0, Application.LoadedScene.WorldSize.y - canvas.height);
		}

	}
	/**
	 * Apply the Sepia filters from the Gfx Files
	 * */
	this.GFX = function() 
	{
		if (this.gfxEnabled) 
		{
			Gfx.Filters.Sepia({x: 0, y: 0, w: canvas.width, h: canvas.height});
		}
		
	}
	

	this.Awake();

}