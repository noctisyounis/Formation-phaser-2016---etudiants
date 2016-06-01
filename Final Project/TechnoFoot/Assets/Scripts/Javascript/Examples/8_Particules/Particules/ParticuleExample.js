/* Fonctionne uniquement si le premier GameObject de la scene est le systeme de particules */

/**
*
* Create a particle
* @class
* 
* @param {Number} _position - set a position of particle
* @param {Number} _velocity - set a velocity of particle
* @param {String} _color - set a color of particle
*
**/
function ParticuleExample(_position, _velocity, _color) 
{
	this.Position = _position;
	this.Velocity = _velocity;
	this.color = _color;
	this.Acceleration = new Vector();
	this.outOfBounds = false;
}

/**
*
*Updates the values ​​of the particle. If they are out of the canvas , they are destroying it
*  
*
**/

ParticuleExample.prototype.Update = function()
{
	this.SubmitToFields();
	this.Velocity.Add(this.Acceleration);
	this.Position.Add(this.Velocity);

	if (this.Position.x < 0 || this.Position.x > canvas.width || 
		this.Position.y < 0 || this.Position.x > canvas.heigth) 
	{
		this.outOfBounds = true;
	}
	this.Render();
};

/**
*
*draws the particle with its color and sizes
*  
*
**/

ParticuleExample.prototype.Render = function()
{
	ctx.fillStyle = this.color;
	ctx.fillRect(this.Position.x, this.Position.y, 5, 5);
};

/**
*
*apply a strengh to the particles from Fields
*
**/
ParticuleExample.prototype.SubmitToFields = function()
{
	for (var i = 0; i < Application.LoadedScene.Groups[0].Fields.length; i++) {
		
		var field = Application.LoadedScene.Groups[0].Fields[i];
		var vector = new Vector();
		vector.x = field.Position.x - this.Position.x;
		vector.y = field.Position.y - this.Position.y;

		var strength = field.mass / vector.LengthSq();
		//var strength = field.mass / Math.pow(vector.LengthSq(),1.5);
		this.Acceleration = vector.Multiply(new Vector(strength, strength));
	}
	/*
	var accelerationX = 0;
	var accelerationY = 0;

	for (var i = 0; i < Application.LoadedScene.Groups[0].Fields.length; i++) 
	{
		var field = Application.LoadedScene.Groups[0].Fields[i];
		var vector = new Vector();
			vector.x = field.Position.x - this.Position.x;
			vector.y = field.Position.y - this.Position.y;
		var strength = field.mass / Math.pow(vector.LengthSq(),1.5);

		accelerationX = vector.x * strength;
		accelerationY = vector.y * strength;

	}

	this.Acceleration.x = accelerationX;
	this.Acceleration.y = accelerationY;
	*/
};