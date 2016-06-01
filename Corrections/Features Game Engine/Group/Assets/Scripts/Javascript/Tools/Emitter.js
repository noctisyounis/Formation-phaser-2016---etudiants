function Emitter(position,velocity, spread, rate, max) {
	//console.log(position);
	this.particules = [];
	this.particulesMax = max || 200;
	this.position = position || new Vector();
	this.velocity = velocity || new Vector();
	this.spread = spread ||Math.PI/32; //angles possibles de direction
	this.color = "white";
	this.rate = rate || 5;
	this.AngleNow = 0;
}

Emitter.prototype.emitParticules = function() {
	//console.log('emitting');
	var count = this.rate;
	while (count--) {
		if (this.particules.length < this.particulesMax) {
			var angle = this.velocity.getAngle() + this.spread ;
			var position = new Vector(this.position.x,this.position.y);
			var velocity = this.velocity.fromAngle(angle);
			this.particules.push( new Particles(position,velocity,this.color) );
		} else return;
	}
		
	
};
Emitter.prototype.update = function() {
	this.emitParticules();
	for (index in this.particules) {
		if (this.particules[index].OutOfBounds) {
			this.particules.splice(index,1);
			index--;
		} else {
			this.particules[index].update();
			this.particules[index].render();
		}
	}
};



function Particles(position,velocity,color) {
	this.position = position;
	this.velocity = velocity;
	this.color = color;
	this.acceleration = new Vector(0,0);
	this.OutOfBounds = false;
}

Particles.prototype.update = function() {
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	this.submitToField()

	if (this.position.x < 0 || this.position.x > canvas.width || this.position.y < 0 || this.position.x > canvas.heigth) {
		this.OutOfBounds = true;
	}
	
};
Particles.prototype.render = function() {
	if (!this.OutOfBounds) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x,this.position.y,2,2);
	}
	
};
Particles.prototype.submitToField = function () {
	var Acceleration = new Vector();
	for (var i = 0; i < Application.LoadedScene.GameObjects[0].fields.length; i++) {
		var field = Application.LoadedScene.GameObjects[0].fields[i];
		var vector = new Vector();
		vector.x = Application.LoadedScene.GameObjects[0].fields[i].position.x - this.position.x;
		vector.y = Application.LoadedScene.GameObjects[0].fields[i].position.y - this.position.y;

		var force = field.mass / Math.pow(vector.x*vector.x+vector.y*vector.y,1.5);

		//var force = field.mass / vector.lengthSq();

		Acceleration = vector.mul(force);

	}

	this.acceleration = Acceleration;
}