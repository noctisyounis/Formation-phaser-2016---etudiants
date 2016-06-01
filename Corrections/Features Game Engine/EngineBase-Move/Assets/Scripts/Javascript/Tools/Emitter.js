function Emitter(position,velocity,rate,spread,max)
{	
	this.particles = [];
	this.position = position || new Vector();
	this.velocity = velocity || new Vector();
	this.spread = spread || Math.PI /32;
	this.color = "red";
	this.rate = rate || 5;
	this.particlesMax = max ||2000;
}

Emitter.prototype.emitParticles = function()
{
	var count = this.rate;
	while(count--)
	{
		if(this.particles.length< this.particlesMax)
		{
			var angle = (this.velocity.getAngle() + this.spread) * Math.random();
			//var position = new Vector(this.position.x + 10 * Math.random(), this.position.y + 10 * Math.random());
			//var velocity = this.velocity.fromAngle(angle);
			//velocity.x *= Math.random();
			//velocity.y *= Math.random();

			var position = new Vector(this.position.x,this.position.y);

			var velocity = this.velocity.fromAngle(angle);	
			this.particles.push(new Particles(position,velocity,this.color));
		}
		else return;
	}
	
}
Emitter.prototype.update = function()
{	

	this.emitParticles();

	for (var i = 0; i<this.particles.length;i++)
	{
		this.particles[i].update();
		this.particles[i].render();
		if(this.particles[i].position.x<0 ||
			this.particles[i].position.y<0 ||
			this.particles[i].position.x>canvas.width ||
			this.particles[i].position.y>canvas.height )
		{
			this.particles.splice(i,1);
		}
	}
}
function Particles(position,velocity,color)
{
	this.position = position;
	this.velocity = velocity;
	this.color = color;
	this.acceleration = new Vector();
}


Particles.prototype.update = function()
{
	this.submitToField();
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	
}

Particles.prototype.render = function()
{
	ctx.fillStyle = this.color;
	ctx.fillRect(this.position.x,this.position.y,2,2);

}
Particles.prototype.submitToField = function()
{
	//var Acceleration= new Vector();

	for (var i = 0; i < Application.LoadedScene.GameObjects[0].fields.length; i++) {
		var field = Application.LoadedScene.GameObjects[0].fields[i];
		var vector = new Vector();
		vector.x= field.position.x-this.position.x;
		vector.y = field.position.y-this.position.y;

		var strength = field.mass / vector.lengthSq();
		this.acceleration = vector.mul(strength);
		//Acceleration = vector.mul(strength);
	}
	//this.acceleration= Acceleration;
}

