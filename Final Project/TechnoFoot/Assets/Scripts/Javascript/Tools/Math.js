/**
 * Extend the Math class.
 * 
 * @namespace Tools/Math
 * */


/**
* 
* @function DotProduct
* @memberof  Tools/Math
* 
* @param {Vector} _v1n - The first normalized vector
*
* @param {Vector} _v2n - The second normalized vector 
* @return {Vector} new Vector
*  
* @description
* Square the x and the y of _v1n & _v2n.
* */
Math.DotProduct = function(_v1n, _v2n) 
{
	if(!(_v1n instanceof(Vector))) PrintErr("Parameter NormalizedVector in DotProduct");
	if(!(_v2n instanceof(Vector))) PrintErr("Parameter NormalizedVector in DotProduct");
	return _v1n.x * _v2n.x + _v1n.y * _v2n.y;
}

/**
* 
* @function EuclidianDistance
* @memberof  Tools/Math
* 
* @param {Vector} _p1 - The goal point
* @param {Vector} _p2 - The beginning point
* @return {Vector} 
*  
* @description
* Calculate the Euclidian Distance between two points.
*
* */
Math.EuclidianDistance = function(_p1, _p2) 
{
	if(!(_p1 instanceof(Vector))) PrintErr("Parameter p1 in EuclidianDistance");
	if(!(_p2 instanceof(Vector))) PrintErr("Parameter p2 in EuclidianDistance");
	return Math.sqrt((_p1.x - _p2.x) * (_p1.x - _p2.x) + (_p1.y - _p2.y) * (_p1.y - _p2.y));
}

/**
* 
* @function Clamp
* @memberof  Tools/Math
* 
* @param {Number} _number - The number who will be clamped
* @param {Number} _min - The minimal value
* @param {Number} _max - The maximal value
*
* @return {Number} 
*  
* @description
* Restrict _number between _min and _max
*
* */
Math.Clamp = function(_number, _min, _max) 
{
	if(typeof _number != 'number') PrintErr("Parameter number in Clamp");
    if(typeof _min != 'number') PrintErr("Parameter minimum in Clamp");
    if(typeof _max != 'number') PrintErr("Parameter maximum in Clamp");
	return Math.min(Math.max(_number, _min), _max);
};
/**
* 
* @function DegreeToRadian
* @memberof  Tools/Math
* 
* @param {Number} _angle - The angle in Degree
*
* @return {Number} 
*  
* @description
* Return _angle in Radian.
*
* */
Math.DegreeToRadian = function(_angle) 
{
    if(typeof _angle != 'number') PrintErr("Parameter angle in DegreeToRadian");
	return _angle * Math.PI / 180;
}
/**
* 
* @function RadianToDegree
* @memberof  Tools/Math
* 
* @param {Number} _angle - The angle in Radian
*
* @return {Number} 
*  
* @description
* Return _angle in Degree.
*
* */
Math.RadianToDegree = function(_angle) 
{
    if(typeof _angle != 'number') PrintErr("Parameter angle in RadianToDegree");
	return _angle * 180 / Math.PI;
}

/**
* 
* @function RadianToDegree
* @memberof  Tools/Math
* 
* @param {Vector} _start - The start point
* @param {Vector} _goal - The end point
*
* @return {Number} 
*  
* @description
* Calculate the Manhattan distance between the _start and the _goal.
*
* */
Math.ManhattanDistance = function(_start, _goal) 
{
	if(!(_start instanceof(Vector))) PrintErr("Parameter start in ManhattanDistance");
	if(!(_goal instanceof(Vector))) PrintErr("Parameter goal in ManhattanDistance");
	return Math.abs(_goal.x - _start.x) + Math.abs(_goal.y - _start.y);
}
/**
* 
* @function DiagonaleDistance
* @memberof  Tools/Math
* 
* @param {Vector} _start - The start point
* @param {Vector} _goal - The end point
*
* @return {Number} 
*  
* @description
* The maximum value between the difference of the x's and y's of _start and _goal.
*
* */
Math.DiagonaleDistance = function (_start, _goal) 
{
	if(!(_start instanceof(Vector))) PrintErr("Parameter start in DiagonaleDistance");
	if(!(_goal instanceof(Vector))) PrintErr("Parameter goal in DiagonaleDistance");
	return Math.max(Math.abs(_start.x - _goal.x), Math.abs(_start.y - _goal.y));
}