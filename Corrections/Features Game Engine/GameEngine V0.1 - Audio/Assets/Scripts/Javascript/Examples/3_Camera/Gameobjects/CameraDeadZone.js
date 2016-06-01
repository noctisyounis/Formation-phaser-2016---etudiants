
function CameraDeadZone(_name, _Position) 
{
	this.name = _name || "CameraDeadZone";
	this.started = false;
	this.enabled = true;
	this.gfxEnabled = false;

	this.collideWorldBound = true;

	this.isDeadZone = true;
	this.ObjectToFollow = null;
	this.Offsets = new Vector(canvas.width / 6, canvas.height / 6);

	this.speed = 10;

	this.Transform = {};
	this.Transform.Position = _Position || new Vector(0, 0);

	/**
	 * Awake the Camera and show a message in console
	 * */
	this.Awake = function() 
	{
		Print('System:Group ' + this.name + " Created !");
	};
	
	/**
	 * Start the Camera and show a message in console
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
			// operation start

			this.Transform.Position = new Vector(0, 0);

			this.started = true;
			Print('System:Group ' + this.name + " Started !");
		}
		this.Update();
	};
	this.Update = function () 
	{
		ctx.fillStyle = "rgba(255,0,0,.5)";
		ctx.fillRect(this.Offsets.x, this.Offsets.y, canvas.width - this.Offsets.x * 2, canvas.height - this.Offsets.y * 2);

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
			// si le hero atteind nu des bords de la deadzone il bouge la camera
			if (this.ObjectToFollow != null) 
			{
				if (this.ObjectToFollow.Transform.Position.x < this.Offsets.x) 
				{
					if(Input.KeysDown[37]) 
					{
						this.Transform.Position.x -= this.speed;
					}
				}
				if (this.ObjectToFollow.Transform.Position.x > canvas.width - this.Offsets.x) 
				{
					if(Input.KeysDown[39]) 
					{
						this.Transform.Position.x += this.speed;
					}
				}
				if (this.ObjectToFollow.Transform.Position.y < this.Offsets.y) 
				{
					if(Input.KeysDown[38]) 
					{
						this.Transform.Position.y -= this.speed;
					}
				}
				if (this.ObjectToFollow.Transform.Position.y > canvas.height - this.Offsets.y) 
				{
					if(Input.KeysDown[40]) 
					{
						this.Transform.Position.y += this.speed;
					}
				}
			}
		}
			
		if (this.collideWorldBound) 
		{
			this.Transform.Position.x = Math.Clamp(this.Transform.Position.x, 0, Application.LoadedScene.WorldSize.x - canvas.width);
			this.Transform.Position.y = Math.Clamp(this.Transform.Position.y, 0, Application.LoadedScene.WorldSize.y - canvas.height);
		}

	}
	this.GFX = function() 
	{
		if (this.gfxEnabled) 
		{
			Gfx.Filters.Sepia({x: 0, y: 0, w: canvas.width, h: canvas.height});
		}
		
	}
	

	this.Awake();

}