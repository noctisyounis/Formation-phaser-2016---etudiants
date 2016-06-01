function Emitter(position, velocity, spread, rate, max){

	this.particles = [];
	this.position = position || new Vector(); // POSITION
	this.velocity = velocity || new Vector(); // ACCELERATION
	this.spread = spread || Math.PI / 32; // ANGLES POSSIBLE DE DIRECTION
	this.color = 'white'; // COULEUR DES PARTICULES
	this.rate = rate || 5; // NOMBRE PARTICULE PAR FRAME
	this.particlesMax = max || 200000000; // NOMBRE MAX DE PARTICULES
}

Emitter.prototype.emitParticles = function(){
	
	var count = this.rate;
	
	while(count--){

		if (this.particles.length < this.particlesMax) {
			var angle = this.velocity.getAngle() + this.spread;
			var position = new Vector(this.position.x, this.position.y);
			var velocity = this.velocity.fromAngle(angle);	

			this.particles.push(new Particles(position, velocity, this.color));
		} else {
			return;
		}
	}
}

Emitter.prototype.update = function(){

	this.emitParticles();

	for(var particle in this.particles){
		this.particles[particle].update();
		this.particles[particle].render();
	}
}

function Particles(position, velocity, color){
	this.position = position;
	this.velocity = velocity;
	this.color = color;
	this.acceleration = new Vector();
}

Particles.prototype.update = function(){
	 
	 this.velocity.add(this.acceleration);
	 this.position.add(this.velocity);
	 this.submitToField()
};

Particles.prototype.render = function(){
	ctx.fillStyle = this.color;
	ctx.fillRect(this.position.x, this.position.y, 1, 1);
}

Particles.prototype.submitToField = function(){
	
	var acceleration = new Vector();

	for(var i = 0; i < Application.LoadedScene.GameObjects.fields.length; i++){
		var field = Application.LoadedScene.GameObjects.fields[i];

		var vector = new Vector();

		vector.x = field.position.x - this.position.x;
		vector.y = field.position.y - this.position.y;

		var strength = field.mass / vector.lengthSq();

		Acceleration = vector.mul(strength);
		// Acceleration.y = vector.y * strength;
	}

	this.acceleration = Acceleration;
}