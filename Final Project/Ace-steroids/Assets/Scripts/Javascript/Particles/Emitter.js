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
	this.color = "rgba(0,140,255,1)";
	this.rate = _rate || 5;
	this.angleNow = 0;
	this.rnd = 0;
	this.emit = true;
}

Emitter.prototype.SetParent = function(_parent){
	this.Parent = _parent;
	
	this.Position.x = this.RelativePosition.x + this.Parent.Transform.Position.x;
	this.Position.y = this.RelativePosition.y + this.Parent.Transform.Position.y;
	console.log(this.Position)
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
			// var angle = this.Velocity.GetAngle() + this.spread ;
			var angle = this.Velocity.GetAngle() + this.spread - (Math.random() * this.spread * 2) + ++this.rnd;
			var position = new Vector(this.Position.x,this.Position.y);
			var velocity = this.Velocity.FromAngle(angle);
			this.Particules.push(new Particle(position,velocity,this.color));
		}
		else 
		{
			emit = false;
			return;
		}
	}
};
/**
*
* Update the Particles movement
*
* */
Emitter.prototype.Update = function() 
{
/*	if (this.Parent != null)
	{
		this.Position.x = this.RelativePosition.x + this.Parent.Transform.Position.x;
		this.Position.y = this.RelativePosition.y + this.Parent.Transform.Position.y;
	}*/

/*	
	ctx.fillStyle = "green";
	ctx.fillRect(this.Position.x,this.Position.y,10,10);
	*/
	if (this.emit) {
		this.EmitParticules();
	}
	
	for (index in this.Particules) 
	{
		
		/*if (this.Particules[index].outOfBounds) 
		{
			this.Particules.splice(index,1);
			index--;
		} 
		else 
		{*/
			this.Particules[index].Update();
			this.Particules[index].Render();
		//}
	}
};

function DrawRect(_x,_y)
{
	this.name = "debugRect",
	this.Position = 
	{
		"x" : _x,
		"y" : _y
	},
	this.size = 5,
	this.color = "green";


	this.Awake = function()
	{

	};

	this.Start = function()
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.Position.x,this.Position.y,this.size,this.size);
	};

	return this;
}
