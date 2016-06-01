function Group(_name, _position) 
{
	this.name = _name || "Model";
	this.started = false;
	this.enabled = true;
	this.Parent = null;
	this.GameObjects =[];
	this.Transform = {};
	this.Transform.relativePosition = _position;
	this.Transform.position = new Vector(0, 0);
	this.Transform.relativeScale = new Vector(1, 1);
	this.Transform.scale = new Vector(1, 1);
	this.Awake = function() 
	{
		Print('System:Group ' + this.name + " Created !");
	};
	this.Start = function()
	{
		if (!this.started)
		{
			this.started = true;
			Print('System:Group ' + this.name + " Started !");
		}
		this.Update();
	};
	this.Update = function()
	{
		if (this.enabled)
		{
			if (this.Parent != null)
			{
				this.Transform.position.x = this.Transform.relativePosition.x + this.Parent.Transform.position.x;
				this.Transform.position.y = this.Transform.relativePosition.y + this.Parent.Transform.position.y;
				this.Transform.scale.x = this.Transform.relativeScale.x * this.Parent.Transform.scale.x;
				this.Transform.scale.y = this.Transform.relativeScale.y * this.Parent.Transform.scale.y;
			}
			else
			{
				this.Transform.position.x = this.Transform.relativePosition.x;
				this.Transform.position.y = this.Transform.relativePosition.y;
				this.Transform.scale.x = this.Transform.relativeScale.x;
				this.Transform.scale.y = this.Transform.relativeScale.y;
			}
			for (var i = 0; i < this.GameObjects.length; i++)
			{
				this.GameObjects[i].Start();
			}
		}
	};
	this.AddGameObject = function(_go)
	{
		_go.Parent = this;
		this.GameObjects.push(_go);
	};
	this.RemoveGameObject = function(_go)
	{
		_go.Parent = null;
		var index = this.GameObjects.indexOf(_go);
		return this.GameObjects.splice(index, 1)[0];
	};
	this.Awake();
}