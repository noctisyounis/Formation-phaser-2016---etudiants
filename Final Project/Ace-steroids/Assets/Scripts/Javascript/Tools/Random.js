/**
 * Extend Math Random 
 * @namespace Tools/Random
 * 
 * */
Math.Random = {};

/**
 * 
 * @function RangeInt
 * @memberof Tools/Random
 * 
 * @param {Number} _min 
 * @param {Number} _max
 * @param {Boolean} _isInclusive
 * 
 * @return {Number} 
 *
 * @description
 * Return a random number (only integer) between min and max, the number may be inclusive or exclusive
 *  
 * */
Math.Random.RangeInt = function(_min, _max, _isInclusive)
{
	if(typeof _min != 'number') PrintErr("Parameter minimum in RangeInt");
    if(typeof _max != 'number') PrintErr("Parameter maximum in RangeInt");
    if(typeof _isInclusive != 'boolean') PrintErr("Parameter isInclusive in RangeInt");
	_isInclusive ? _max++ : _min++;
	return Math.floor(Math.random() * (_max - _min) + _min); 
};

/**
 * 
 * @function RangeFloat
 * @memberof Tools/Random
 * 
 * @param {Number} _min 
 * @param {Number} _max
 * @param {Boolean} _isInclusive
 * 
 * @return {Number} 
 *
 * @description
 * Return a random number (may be a float) min and max, the number may be inclusive or exclusive
 *  
 * */
Math.Random.RangeFloat = function(_min, _max, _isInclusive)
{
	if(typeof _min != 'number') PrintErr("Parameter minimum in RangeInt");
    if(typeof _max != 'number') PrintErr("Parameter maximum in RangeInt");
    if(typeof _isInclusive != 'boolean') PrintErr("Parameter isInclusive in RangeInt");
	_isInclusive ? _max+= Number.EPSILON : _min+=Number.EPSILON;
	return Math.random() * (_max - _min) + _min;
};

/**
 * 
 * @function InArray
 * @memberof Tools/Random
 * 
 * @param {Array} _array 
 * 
 * @return {Number} 
 *
 * @description
 * Return an random index from an array
 *  
 * */
Math.Random.InArray = function(_array)
{
	if(!(_array instanceof(Array))) PrintErr("Parameter array in InArray");
	var index = Math.Random.RangeInt(0, _array.length - 1, true);
	return _array[index];
};

/**
 * 
 * @function InScreen
 * @memberof Tools/Random
 * 
 * @param {Canvas} _screen - The canvas
 * 
 * @return {Vector} 
 *
 * @description
 * Return a random Vector from selected screen
 *  
 * */
Math.Random.InScreen = function(_screen)
{
	var p = new Vector();
	p.x = Math.Random.RangeInt(0, _screen.width, true);
	p.y = Math.Random.RangeInt(0, _screen.height, true);
	return p;
};

/**
 * 
 * @function InCircle
 * @memberof Tools/Random
 * 
 * @param {Circle} _circle
 * 
 * @return {Vector} 
 *
 * @description
 * Return a random Vector inside the circle
 *  
 * */
Math.Random.InCircle = function(_circle)
{
	if(!(_circle instanceof(Circle))) PrintErr("Parameter circle in InCircle");
	var alpha = Math.Random.RangeFloat(0, 2 * Math.PI, true);
	var p = new Vector();
	p.x = _circle.x + _circle.radius*Math.cos(alpha) |0;
	p.y = _circle.y + _circle.radius*Math.sin(alpha) |0;	
	return p;
};
/**
 * 
 * @function InDisk
 * @memberof Tools/Random
 * 
 * @param {Circle} _circle
 * 
 * @return {Vector} 
 *
 * @description
 * Return a random Vector on the area of circle
 *  
 * */
Math.Random.InDisk = function(_circle)
{
	if(!(_circle instanceof(Circle))) PrintErr("Parameter circle in InDisk");
	var alpha = Math.Random.RangeFloat(0, 2 * Math.PI, true);
	var radius = Math.Random.RangeFloat(0, _circle.radius, true);
	var p = new Vector();
	p.x = _circle.x + radius * Math.cos(alpha) |0;
	p.y = _circle.y + radius * Math.sin(alpha) |0;
	
	return p;
};

/**
 * 
 * @function InArea
 * @memberof Tools/Random
 * 
 * @param {Box} _box
 * 
 * @return {Vector} 
 *
 * @description
 * Return a random Vector on the area of box
 *  
 * */
Math.Random.InArea = function(_box)
{
	if(!(_box instanceof(Box))) PrintErr("Parameter _box in InArea");
	var p = new Vector();
	p.x = Math.Random.RangeInt(_box.x, _box.x + _box.width, true);
	p.y = Math.Random.RangeInt(_box.y, _box.y + _box.height, true);
	return p;
};

/**
 * 
 * @function ColorRGB
 * @memberof Tools/Random
 * 
 * @return {Color} - RGB
 *
 * @description
 * Return a random color in RGB format - rgb(r,g,b)
 *  
 * */
Math.Random.ColorRGB = function() 
{
	var r = Math.Random.RangeInt(0,256,false);
	var g = Math.Random.RangeInt(0,256,false);
	var b = Math.Random.RangeInt(0,256,false);

	return "rgb(" + r + "," + g + "," + b + ")";
};

/**
 * 
 * @function ColorRGBA
 * @memberof Tools/Random
 * 
 * @return {Color} - RGBA
 *
 * @description
 * Return a random color in RGBA format - rgb(r,g,b,a)
 *  
 * */
Math.Random.ColorRGBA = function(_a = 1) 
{
	if(typeof _a != 'number') PrintErr("Parameter alpha in ColorRGBA");
	var r = Math.Random.RangeInt(0, 256, false);
	var g = Math.Random.RangeInt(0, 256, false);
	var b = Math.Random.RangeInt(0, 256, false);
	return "rgba(" + r + "," + g + "," + b + "," + _a + ")";
};

/**
 * 
 * @function ColorHEX
 * @memberof Tools/Random
 * 
 * @return {Color} - HEX
 *
 * @description
 * Return a random color in HEX format - #00FF00
 *  
 * */
Math.Random.ColorHEX = function() 
{
	var letters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    var color = '#';
    for (var i = 0; i < 6; i++ )
    {
        color += letters[Math.Random.RangeInt(0,letters.length,false)];
    }
    return color;
};

/**
 * 
 * @function AngleDegree
 * @memberof Tools/Random
 *
 * @param {Number} _min 
 * @param {Number} _max 
 *
 * @return {Integer}
 *
 * @description
 * Return a random number in degree between a min and max (already inclusive)
 *  
 * */
Math.Random.AngleDegree = function(_min, _max)
{
	if(typeof _min != 'number') PrintErr("Parameter minimum in AngleDegree");
    if(typeof _max != 'number') PrintErr("Parameter maximum in AngleDegree");
	return Math.Random.RangeInt(_min, _max, true) % 360;
};

/**
 * 
 * @function AngleRadian
 * @memberof Tools/Random
 *
 * @param {Number} _min 
 * @param {Number} _max 
 *
 * @return {Float}
 *
 * @description
 * Return a random in number radian between a min and max (already inclusive)
 *  
 * */
Math.Random.AngleRadian = function(_min, _max)
{	
	if(typeof _min != 'number') PrintErr("Parameter minimum in AngleRadian");
    if(typeof _max != 'number') PrintErr("Parameter maximum in AngleRadian");
	return Math.Random.RangeFloat(_min, _max, true) % (2 * Math.PI);
};

/**
 * 
 * @function IntPondere
 * @memberof Tools/Random
 *
 * @param {Number} _min 
 * @param {Number} _max 
 *
 * @return {Integer}
 *
 * @description
 * Return a number (integer) between min and max where returned number probability to be selected is highest from other number.
 *  
 * */
Math.Random.IntPondere = function(_min, _max)
{	
	if(typeof _min != 'number') PrintErr("Parameter minimum in IntPondere");
    if(typeof _max != 'number') PrintErr("Parameter maximum in IntPondere");
	return Math.round(Math.Random.FloatPondere(_min, _max));
};

/**
 * 
 * @function FloatPondere
 * @memberof Tools/Random
 *
 * @param {Number} _min 
 * @param {Number} _max
 *
 * @return {Float}
 *
 * @description
 * Return a number (float) between min and max where returned number probability to be selected is highest from other number.
 *  
 * */
Math.Random.FloatPondere = function(_min, _max)
{	
	if(typeof _min != 'number') PrintErr("Parameter minimum in FloatPondere");
    if(typeof _max != 'number') PrintErr("Parameter maximum in FloatPondere");
	var a = Math.Random.RangeFloat(_min, _max, true);
	var b = Math.Random.RangeFloat(_min, _max, true);
	return (a + b) * 0.5;
};

