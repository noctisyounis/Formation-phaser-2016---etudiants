function Vector() {

	this.x = 0;
	this.y = 0;

	//Vector de direction
	this.add = function (vector) {
		this.x += vector.x;
		this.y += vector.y;

		return this;
	}

	//Vector entre deux positions
	this.sub = function (vector) {
		this.x -= vector.x;
		this.y -= vector.y;

		return this;
	}

	//Distance 
	this.lengthSq = function(vector) {
		return this.x * this.x + this.y * this.y;
	}

	//Magnitude
	this.length = function(vector) {
		//return Math.sqrt(this.x * this.x + this.y * this.y);
		return Math.sqrt(this.lengthSq());
	}

	//Multiplicate
	this.mul = function(factor) {
		this.x *= factor;
		this.y *= factor;

		return this;	
	}

	this.div = function(factor) {
		this.x /= factor;
		this.y /= factor;

		return this;	
	}

	this.normalize = function() {
		var vector = new Vector();
		vector.x = this.x;
		vector.y = this.y;
		vector.div(this.length());
		return Vector;
	}

}

