/**
 * 
 * is a collection of utilitarian function 
 * @namespace Tools/Utils
 * */


/**
*
*Applies the mouse position to gameobject
*
*@function UpdateForDragAndDrop
*@param {GameObject} _go - Add the GameObject that Drag and Dropp
*
*@memberof Tools/Utils
*
**/
function UpdateForDragAndDrop(_go)
{
    var gameObject = _go;
    if (Input.mouseDraging)
    {
		gameObject.Transform.Position.x = Input.MousePosition.x + gameObject.MousePositionOffset.x;
		gameObject.Transform.Position.y = Input.MousePosition.y + gameObject.MousePositionOffset.y;
		gameObject.Physics.Collider.Position = gameObject.Transform.Position;
	}
}

/**
*
* Calculates the coordinates from the index of an array
*
* @function IndexFromCoord
* @param {Number} _x - coordinates x
* @param {Number} _y - coordinates y
* @param {Number} _col - number of Column
* 
* @return {Number}
*
*@memberof Tools/Utils 
**/
function IndexFromCoord(_x, _y, _col)
{
    if(typeof _x != 'number') PrintErr("Parameter x in IndexFromCoord");
    if(typeof _y != 'number') PrintErr("Parameter y in IndexFromCoord");
    if(typeof _col != 'number') PrintErr("Parameter number of column in IndexFromCoord");
    return _x + _y * _col;
}

/**
*
* Calculates the index of an array from the coordinates 
*
* @function CoordFromIndex
* @param {Number} _index - the index of an array
* @param {Number} _col - the number of column
* 
* @return {Vector}
*
*@memberof Tools/Utils 
**/

function CoordFromIndex(_index, _col)
{
    if(typeof _index != 'number') PrintErr("Parameter index in CoordFromIndex");
    if(typeof _col != 'number') PrintErr("Parameter number of column in CoordFromIndex");
    var x = _index % _col;
    var y = (_index - x) / _col;
    return new Vector(x, y);
}

/**
*
* Draw an Rounded Box 
*
* @function RoundedBox
* @param {Number} _x - the position x of the box
* @param {Number} _y - the position y of the box
* @param {Number} _w - the width of the box
* @param {Number} _h - the height of the box
* @param {Number} _r - the border radius of the box
* 
* 
*
*@memberof Tools/Utils 
**/
CanvasRenderingContext2D.prototype.RoundedBox = function(_x, _y, _w, _h, _r) 
{

    if(typeof _x != 'number') PrintErr("Parameter x in RoundedBox");
    if(typeof _y != 'number') PrintErr("Parameter y in RoundedBox");
    if(typeof _w != 'number') PrintErr("Parameter width in RoundedBox");
    if(typeof _h != 'number') PrintErr("Parameter height in RoundedBox");
    if(typeof _r === "undefined" && typeof _r != 'number') _r = 2;
    this.beginPath();
    this.moveTo(_x + _r, _y);
    this.lineTo(_x + _w - _r, _y);
    this.quadraticCurveTo(_x + _w, _y, _x + _w, _y + _r);
    this.lineTo(_x + _w, _y + _h - _r);
    this.quadraticCurveTo(_x + _w, _y + _h, _x + _w - _r, _y + _h);
    this.lineTo(_x + _r, _y + _h);
    this.quadraticCurveTo(_x, _y + _h, _x, _y + _h - _r);
    this.lineTo(_x, _y + _r);
    this.quadraticCurveTo(_x, _y, _x + _r, _y);
    this.closePath();
    this.fill();
};
