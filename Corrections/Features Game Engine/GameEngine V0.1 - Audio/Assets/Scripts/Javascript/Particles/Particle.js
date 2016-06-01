/* Fonctionne uniquement si le premier GameObject de la scene est le systeme de particules */

/**
*
* Create a particle
* @class
* 
* @param {Vector} _position - set a position of particle
* @param {Number} _velocity - set a velocity of particle
* @param {String} _color - set a color of particle
*
**/
function Particle(_position, _velocity, _color) 
{
	this.Position = _position;
	this.Velocity = _velocity;
	this.color = _color;
	this.Acceleration = new Vector();
	this.outOfBounds = false;
}

/**
*
*Updates the values ​​of the particles. If they are out of the canvas , they are destroying it
*  
**/

Particle.prototype.Update = function()
{
	this.Velocity.Add(this.acceleration);
	this.Position.Add(this.velocity);
	this.SubmitToFields();

	if (this.Position.x < 0 || this.Position.x > canvas.width || 
		this.Position.y < 0 || this.Position.x > canvas.heigth) 
	{
		this.outOfBounds = true;
	}
};

/**
*
*draws the particle with its color and sizes
*  
**/

Particle.prototype.Render = function()
{
	ctx.fillStyle = this.color;
	ctx.fillRect(this.Position.x, this.Position.y, 1, 1);
};

/**
*
*apply a strengh to the particles from Fields
*
**/
Particle.prototype.SubmitToFields = function()
{
	var accelerationX = 0;
	var accelerationY = 0;

	for (var i = 0; i < Application.LoadedScene.GameObjects[0].fields.length; i++) 
	{
		var field = Application.LoadedScene.GameObjects[0].fields[i];
		var vector = new Vector();
			vector.x = field.Position.x - this.Position.x;
			vector.y = field.Position.y - this.Position.y;
		var strength = field.mass / Math.pow(vector.LengthSq(),1.5);

		accelerationX = vector.x * strength;
		accelerationY = vector.y * strength;

	}

	this.acceleration.x = accelerationX;
	this.acceleration.y = accelerationY;
};