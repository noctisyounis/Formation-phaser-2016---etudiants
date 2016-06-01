function Emitter(position, velocity, spread, rate, max, image) {
	this.image = image;
	this.particles = [];
	this.position = position || new Vector(); // Position
	this.velocity = velocity || new Vector(); //accelleration
	this.spread = spread || Math.PI / 32; // angle possible de direction
	this.color = "red"; // couleur particule
	this.rate = rate || 5;
	this.particlesMax = max || 2000000;
	this.i = 0;
}

Emitter.prototype.emitParticles = function() {
	var count = this.rate;
	while(count--){ // si count == 0 => false
		if (this.particles.length < this.particlesMax) {
			var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread) + ++this.i;
			var position = new Vector(this.position.x, this.position.y);
			var velocity = this.velocity.fromAngle(angle);
			this.particles.push( new Particles(position, velocity, this.color, this.image) );
			return new Particles( position, velocity, this.color, this.image );		
		} else return;
	}
};

Emitter.prototype.update = function() {
	this.emitParticles();
	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].update();
		this.particles[i].render();

		if (this.particles[i].position.x > canvas.width ||
			this.particles[i].position.x < 0 ||
			this.particles[i].position.y > canvas.height ||
			this.particles[i].position.y < 0) {

			this.particles.splice(i,1);
		}
	}
};


function Particles(position, velocity, color, image) {
	this.position = position;
	this.velocity = velocity;
	this.color = color;
	this.image = image;
	this.acceleration = new Vector()
}

Particles.prototype.update = function() {

	this.submitToField();
	this.position.add(this.velocity);
	this.velocity.add(this.acceleration);
};

Particles.prototype.render = function() {
	ctx.drawImage(this.image, this.position.x, this.position.y, 101/5, 171/5);

	/*ctx.fillStyle = this.color;
	ctx.fillRect(this.position.x, this.position.y, 3, 3);*/
};

Particles.prototype.submitToField = function() {
	var Acceleration = new Vector();

	for (var i = 0; i < Application.LoadedScene.GameObjects[0].fields.length; i++) {
		var field = Application.LoadedScene.GameObjects[0].fields[i];
		var vector = new Vector();
		vector.x = field.position.x - this.position.x;
		vector.y = field.position.y - this.position.y;

		var strength = field.mass / vector.lengthSq();

		Acceleration = vector.mul(strength);
	}

	this.acceleration = Acceleration;
};