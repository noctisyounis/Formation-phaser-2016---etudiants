/**
 * Create a new Vector
 * 
 * @class
 * @param {Number} _x - The horizontal position
 * @param {Number} _y - The vertical position
 * 
 * @return {Vector}
 * */
function Vector(_x, _y) 
{
	this.x = _x || 0;
	this.y = _y || 0;

	if(typeof this.x != 'number' ) PrintErr("Parameter x in Vector constructor");
	if(typeof this.y != 'number') PrintErr("Parameter y in Vector constructor");

	this.Copy = function () 
	{
		return new Vector(this.x,this.y);
	}

	/** 
	* Add two Vectors
	* @param {Vector} _vector - The vector to add
	*
	* @return {Vector}
	* */
	this.Add = function(_vector) 
	{
		if (_vector instanceof Vector) 
		{
			this.x += _vector.x;
			this.y += _vector.y;

			return this;
		} else { PrintErr("Invalid Parameter(s) in Vector.Add"); }
		
	}
	/**
	*
	* Substract a vector to another one
	*
	* @param {Vector} _vector - The vector to substract
	*
	* @return {Vector}
	*
	* */
	this.Sub = function(_vector) 
	{
		if (_vector instanceof Vector) 
		{
			this.x -= _vector.x;
			this.y -= _vector.y;

			return this;
		} else { PrintErr("Invalid Parameter(s) in Vector.Sub"); }
	}

    /**
	*
	* Give the length of a vector
	*
	* @return {Number}
	*
	* */
	this.Length = function() 
	{
		var l = Math.sqrt(this.x * this.x + this.y * this.y);
		return l;
	}
	/**
	*
	* Give the length of a vector, use for comparison between two vectors.
	*
	* @return {Number}
	*
	* */

	this.LengthSq = function() 
	{
		var l = this.x * this.x + this.y * this.y;
		return l;
	}
	/**
	*
	* Multiply a vector to a number <br />
	* this.x * number, this.y * number.
	*
	* @param {Number} _number - The number to Multiply
	*
	* @return {Vector}
	*
	* */
	
	this.Mul = function(_number) 
	{
		if (typeof _number == 'number') 
		{
			this.x *= _number;
			this.y *= _number;

			return this;
		} else { PrintErr("Invalid Parameter(s) in Vector.Mul"); }
	}
	/**
	*
	* Multiply a vector to a vector <br />
	* this.x * _vector.x, this.y * _vector.y.
	*
	* @param {Vector} _vector - The vector to Multiply
	*
	* @return {Vector}
	*
	* */
	this.Multiply = function(_vector) 
	{
		if (_vector instanceof Vector) 
		{
			this.x *= _vector.x;
			this.y *= _vector.y;

			return this;
		} else { PrintErr("Invalid Parameter(s) in Vector.Multiply"); }
	}
	/**
	*
	* Divide a vector by a number <br />
	* this.x / _number , this.y / _number
	*
	* @param {Number} _number - The number to divide
	*
	* @return {Vector}
	*
	* */
	this.Div = function(_number) 
	{
		if (typeof _number == 'number') 
		{
			this.x /= _number;
			this.y /= _number;

			return this;
		} else { PrintErr("Invalid Parameter(s) in Vector.Div"); }
	}
    /**
	* 
	* Normalize the vector
	*
	* @return {Vector}
	*
	* */
	this.Normalize = function() 
	{
		var v = new Vector();
		v.x = this.x;
		v.y = this.y;
		v.Div(this.Length());
		return v;
	}
	/**
	* 
	* Give the angle from the vector
	* @memberof Tools/Vector
	* @function GetAngle
	*
	* @return {Vector}
	*
	* */
	this.GetAngle = function() 
	{
		return Math.atan2(this.y, this.x);
	}
    /**
	* 
	* Create a vector from the _angle.
	*
	* @param {Number} _angle - The angle to start from
	*
	* @return {Vector}
	*
	* */
	
	this.FromAngle = function(_angle) 
	{
		if (typeof _angle == "number") 
		{
			return new Vector(this.Length() * Math.cos(_angle), this.Length() * Math.sin(_angle));
		} else { PrintErr("Invalid Parameter(s) in Vector.FromAngle"); }
	}
}

