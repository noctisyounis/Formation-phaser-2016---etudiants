function Vector(x ,y ) {
	this.x = x ;
	this.y = y ;

	this.add = function(vector) {
		this.x += vector.x;
		this.y += vector.y;

		return this;
	}
	this.sub = function(vector) {
		this.x -= vector.x;
		this.y -= vector.y;

		return this;
	}
	this.length = function() {
		var l = Math.sqrt( this.x * this.x + this.y * this.y );
		return l;
	}
	this.lengthSq = function() {
		var l = this.x * this.x + this.y * this.y ;
		return l;
	}
	this.mul = function(number) {
		this.x *= number;
		this.y *= number;

		return this;
	}
	this.div = function(number) {
		this.x /= number;
		this.y /= number;

		return this;
	}
	this.normalize = function() {
		var v = new Vector();
		v.x = this.x;
		v.y = this.y;
		v.div( this.length() );
		return v;
	}
}

