
/**
*
* Create a Field
* @class
* 
* @param {Number} _position - set a position to the field
* @param {Number} _mass - set a mass to the field
*
**/

function Field(_position, _mass) 
{
	this.Parent = null;
	this.RelativePosition = _position;
	this.Position = _position;
	this.SetMass(_mass);
}

/**
*Apply a Mass to the field
**/

Field.prototype.SetMass = function(_mass) 
{
	this.mass = _mass || 50;
	this.drawColor = this.mass < 0 ? "#f00": "#0f0";
};

/**
*
* Updates he values of the field
*
**/

Field.prototype.Update = function() 
{
	if (this.Parent != null) 
	{
		this.Position.x = this.RelativePosition.x + this.Parent.Transform.Position.x;
		this.Position.y = this.RelativePosition.y + this.Parent.Transform.Position.y;
	}
	this.Render();
}

/**
*
* display the field
*
**/

Field.prototype.Render = function()
{
	ctx.fillStyle = this.drawColor;
	ctx.fillRect(this.Position.x, this.Position.y, 10, 10);  
};