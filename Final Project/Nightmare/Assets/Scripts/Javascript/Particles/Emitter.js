/**
 * Create a new Emiiter
 * 
 * @class
 * @param {Vector} _position - The position of the Emitter
 * @param {Vector} _velocity - The position of the Emitter
 * @param {Number} _spread - The amplitude
 * @param {Number} _rate - The speedrate 
 * @param {Number} _max - The maximum number of particles
 * 
 * @return {Emitter}
 * */
function Emitter(_position, _velocity, _spread, _rate, _max) 
{
	this.Parent = null;
	this.Particules = [];
	this.particulesMax = _max || 200;
	this.RelativePosition = _position;
	this.Position = _position;
	this.Velocity = _velocity || new Vector();
	this.spread = _spread || Math.PI/32; //angles possibles de direction
	this.color = "white";
	this.rate = _rate || 5;
	this.angleNow = 0;
}
/**
*
* Launch the Particles
*
* */
Emitter.prototype.EmitParticules = function() 
{
	var count = this.rate;
	while (count--) 
	{
		if (this.Particules.length < this.particulesMax) 
		{
			var angle = this.velocity.GetAngle() + this.spread ;
			var position = new Vector(this.Position.x,this.Position.y);
			var velocity = this.Velocity.FromAngle(angle);
			this.Particules.push(new Particle(position,velocity,this.color));
		} 
		else return;
	}
};
/**
*
* Update the Particles movement
*
* */
Emitter.prototype.Update = function() 
{
	if (this.Parent != null)
	{
		this.Position.x = this.RelativePosition.x + this.Parent.Transform.Position.x;
		this.Position.y = this.RelativePosition.y + this.Parent.Transform.Position.y;
	}
	this.EmitParticules();
	for (index in this.Particules) 
	{
		if (this.Particules[index].outOfBounds) 
		{
			this.Particules.splice(index,1);
			index--;
		} 
		else 
		{
			this.Particules[index].Update();
			this.Particules[index].Render();
		}
	}
};