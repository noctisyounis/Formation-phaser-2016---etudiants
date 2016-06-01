/**
 * Create a new Group of GameObjects. <br />
 * 
 * @class
 * @param {String} _name - The group name
 * @param {Vector} _position - The group position
 * 
 * @return {Group} Group - A new Group
 * */
function ScoreGroup(_position, _size) 
{
	this.name = "ScoreGroup";
	this.started = false;
	this.enabled = true;
	this.Parent = null;
	this.GameObjects =[];
	this.Transform = {};

	this.Transform.RelativePosition = _position;
	this.Transform.Position = new Vector(0, 0);
	this.Transform.RelativeScale = new Vector(1, 1);
	this.Transform.Scale = new Vector(1, 1);
	this.Transform.Size = _size;

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
			for (var i = 0; i < this.GameObjects.length; i++)
			{
				this.GameObjects[i].Start();
			}
			ctx.fillStyle = "rgba(133,133,133,0.5)"
			ctx.fillRect(this.Transform.Position.x, this.Transform.Position.y, this.Transform.Size.x, this.Transform.Size.y);
			this.Scoring();
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

	this.Scoring = function()
	{
		ctx.font = '40px Arial';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'black';
		ctx.fillText('Scoring', this.Transform.Position.x + this.Transform.Size.x * 0.5, 50);
	};
	this.Awake();
}