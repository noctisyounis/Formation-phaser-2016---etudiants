/**
 * Handle Physics of the Game Engine
 * @namespace Tools/Physics
 * 
 * */
var Physics = 
{
	/**
	 * 
	 * @function PointBoxCollision
	 * @memberof Tools/Physics
	 * 
	 * @param {Vector} _point - Position (x,y) of the point on screen 
	 * @param {Box} _box - Position of the box on screen 
	 * @return {Boolean} bool - if point hit the box or not
	 * 
	 * @description
	 * Check the collision between a point and a box
	 *  
	 * */
	PointBoxCollision: function(_point, _box) 
	{
		if (_point instanceof Vector && _box instanceof Box) 
		{
			return ( (_point.x >= _box.x && _point.x <= _box.x + _box.w ) && (_point.y >= _box.y && _point.y <= _box.y + _box.h ) ) ;
		} else { PrintErr("Invalid Parameter(s) in PointBoxCollision"); }
	},
	/**
	 * 
	 * @function BoxBoxCollision
	 * @memberof Tools/Physics
	 *
	 * @param {Box} _box1 - Position of the box1 on screen 
	 * @param {Box} _box2 - Position of the box2 on screen 
	 * @return {Boolean} Boolean - if one of the box hit the other box
	 * 
	 * @description
	 * Check the collision between two box
	 *  
	 * */
	BoxBoxCollision: function(_box1,_box2) 
	{
		if ( _box1 instanceof Box && _box2 instanceof Box) 
		{
			if (_box2.x >= _box1.x + _box1.w 
				|| _box2.x + _box2.w <= _box1.x 
				|| _box2.y >= _box1.y + _box1.h 
				|| _box2.y + _box2.h <= _box1.y ) 
			{
				return false;
			}
			return true;
		} else { PrintErr("Invalid Parameter(s) in BoxBoxCollision"); }
	},
	/**
	 * 
	 * @function PointCircleCollision
	 * @memberof Tools/Physics
	 * 
	 * @param {Vector} _point - Position of the point on screen 
	 * @param {Circle} _circle - Position of the circle on screen 
	 * @return {Boolean} - if point hit the circle or not
	 * 
	 * @description
	 * Check the collision between a point and a circle
	 *  
	 * */
	PointCircleCollision: function(_point, _circle) 
	{
		if ( _point instanceof Vector && _circle instanceof Circle)
		{
			var vCircle = new Vector(_circle.x,_circle.y);
			var dist = Math.EuclidianDistance( _point, vCircle );
			return dist < _circle.radius ;
		} else { PrintErr("Invalid Parameter(s) in PointCircleCollision");}
	},
	/**
	 * 
	 * @function CircleCircleCollision
	 * @memberof Tools/Physics

	 * @param {Circle} _circle1 - Position of the Circle1 on screen 
	 * @param {Circle} _circle2 - Position of the Circle2 on screen 
	 * @return {Boolean} - if the circle hit the other circle
	 * 
	 * @description
	 * Check the collision between two circles
	 *  
	 * */ 
	CircleCircleCollision: function(_circle1, _circle2) 
	{
		if(_circle1 instanceof Circle && _circle2 instanceof Circle)
		{
			var v1 = new Vector(_circle1.x,_circle1.y);
			var v2 = new Vector(_circle2.x,_circle2.y);
			var dist = Math.EuclidianDistance( v1, v2 );
			return dist < _circle1.radius + _circle2.radius ;
		} else { PrintErr("Invalid Parameter(s) in CircleCircleCollision");}
	},
	/**
	 * 
	 * @function CircleBoxCollision
	 * @memberof Tools/Physics
	 *
	 * @param {Circle} _circle - Position of the Circle on screen 
	 * @param {Box} _box - Position of the Box on screen 
	 * @return {Boolean} Boolean - if one of the Element hit the other
	 * 
	 * @description
	 * Check the collision between a cricle and a box
	 *  
	 * */ 
	CircleBoxCollision: function(_circle, _box) 
	{
		if(_circle instanceof Circle && _box instanceof Box)
		{
			var distX = Math.abs( _circle.x - _box.x - _box.w / 2 );
			var distY = Math.abs( _circle.y - _box.y - _box.h / 2 );

			if ( distX > (_box.w/2 + _circle.radius) ) {return false;}
			if ( distY > (_box.h/2 + _circle.radius) ) {return false;}
			if ( distX <= _box.w/2 ) {return true;}
			if ( distY <= _box.h/2 ) {return true;}

			var dx = distX - _box.w/2;
			var dy = distY - _box.h/2;
			return (dx*dx + dy*dy <= _circle.radius * _circle.radius);
		} else { PrintErr("Invalid Parameter(s) in CircleBoxCollision");}

	},
	/**
	 * 
	 * @function TileCollision
	 * @memberof Tools/Physics
	 *
	 * @param {Array} _map - Array of integer of all element on the map
	 * @param {Array} _walkableTiles - Array of integer of which one is walkable
	 * @param {Vector} _sizeMap - nombre de case en x et nombre de case en y
	 * @param {Vector} _position - Position of the Element (Character) which move
	 * @param {Number} _direction - Direction of the Element (Character) on the map
	 * @return {Boolean} bool - boolean on walkable tile
	 * 
	 * @description
	 * Check the next position on the map if it's walkable
	 *  
	 * */ 
	TileCollision: function(_map, _walkableTiles, _sizeMap, _position, _direction) 
	{

		if( !(_map instanceof(Array))) PrintErr("Parameter Map array in TileCollision");
		if( !(_walkableTiles instanceof(Array))) PrintErr("Parameter WalkableTiles array in TileCollision");
		if( !(_sizeMap instanceof(Vector))) PrintErr("Parameter sizeMap in TileCollision");
		if( !(_position instanceof(Vector))) PrintErr("Parameter Position in TileCollision");
		if( typeof _direction != 'number') PrintErr("Parameter Direction in TileCollision");

		if (_direction == 1 && _position.y == 0) { return false; }
		if (_direction == 2 && _position.x == _sizeMap.x - 1) { return false; }
		if (_direction == 3 && _position.y == _sizeMap.y - 1) { return false; }
		if (_direction == 4 && _position.x == 0) { return false; }

		var nextIndex = new Vector(_position.x,_position.y);
		switch(_direction) 
		{
			case 1:
				nextIndex.y--;
				break;
			case 2:
				nextIndex.x++;
				break;
			case 3:
				nextIndex.y++;
				break;
			case 4:
				nextIndex.x--;
				break;
		}

		for (i in _walkableTiles) 
		{
			if (_walkableTiles[i] == _map[nextIndex.y * _sizeMap.x + nextIndex.x]) 
			{
			 	return true;
			} 
		}
		return false;
	},
	/**
	 * 
	 * @function CheckCollision
	 * @memberof Tools/Physics
	 * 
	 * @description
	 * Select the collision function according the argument sended
	 *  
	 * */ 
	CheckCollision: function() 
	{
		if (arguments.length == 2 ) 
		{
			if (arguments[0] instanceof Vector) 
			{
				if (arguments[1] instanceof Box) 
				{
					return Physics.PointBoxCollision(arguments[0],arguments[1]);
				} 
				else if (arguments[1] instanceof Circle) 
				{
					return Physics.PointCircleCollision(arguments[0],arguments[1]);
				}
			} 
			else if (arguments[0] instanceof Box) 
			{
				if (arguments[1] instanceof Box) 
				{
					return Physics.BoxBoxCollision(arguments[0],arguments[1]);
				} 
				else if (arguments[1] instanceof Circle) 
				{
					return Physics.CircleBoxCollision(arguments[1],arguments[0]);
				} 
				else if (arguments[1] instanceof Vector) 
				{
					return Physics.PointBoxCollision(arguments[1],arguments[0]);
				}
			} 
			else if (arguments[0] instanceof Circle) 
			{
				if (arguments[1] instanceof Box) 
				{
					return Physics.CircleBoxCollision(arguments[0],arguments[1]);
				} else if (arguments[1] instanceof Circle) 
				{
					return Physics.CircleCircleCollision(arguments[1],arguments[0]);
				} else if (arguments[1] instanceof Vector) 
				{
					return Physics.PointBoxCollision(arguments[1],arguments[0]);
				}
			}
		} else if (arguments.length == 4 ) 
		{
			return TileCollision(arguments[0],arguments[1],arguments[2],arguments[3]);
		}
	},
	/**
	 * 
	 * @function CheckClick
	 * @memberof Tools/Physics
	 * 
	 * @description
	 * - set unhovered (Boolean) if mouse is outside of the box <br/>
	 * - set clicked (Boolean) if mouse click on the box <br/>
	 * - set hover (Boolean) if mouse is hover the box <br/>
	 *  
	 * */ 
	CheckClick: function() {
		var GOs = Application.LoadedScene.GameObjects/*.slice(0)*/;
/*		if (Application.LoadedScene.Groups != null) {
			var GRs = Application.LoadedScene.Groups.slice(0);
			for (gr of GRs) 
			{
				GOs = GOs.concat(gr.GameObjects);
			}
		}*/
		var mPos = new Vector();
		mPos.x = Input.MousePosition.x;
		mPos.y = Input.MousePosition.y;
		for (index in GOs) 
		{
			var go = GOs[index];
			if (go.Physics.clickable)
			{
				var hitbox;

				var hitbox = go.Physics.Collider;
				if (go.Physics.Collider.Size != undefined) {
					hitbox = new Box(go.Physics.Collider.Position.x,
									go.Physics.Collider.Position.y,
									go.Physics.Collider.Size.x,
									go.Physics.Collider.Size.y);
				} 
				else 
				{
					hitbox = go.Physics.Collider;
				}


				if (go.Physics.countHovered > 0) 
				{
					if (!Physics.CheckCollision(mPos, hitbox)) 
					{
						go.onUnHovered();
					}
				}
				if ( Physics.CheckCollision(mPos, hitbox) ) 
				{		
					if (Input.mouseClick) 
					{
						go.onClicked();
					} else 
					{
						go.onHover();
					}
				}
			}
		}
	}
};
/**
 * 
 * @constructs Box
 * @memberof Tools/Physics
 *
 * @param {Number} _x
 * @param {Number} _y
 * @param {Number} _width
 * @param {Number} _height
 *
 * @description
 * - set Position on X of the Box <br/>
 * - set Position on Y of the Box <br/>
 * - set Width of the Box <br/>
 * - set Height of the Box <br/>
 *
 * */ 
function Box(_x, _y, _width, _height) 
{

	this.x = _x || 0;
	this.y = _y || 0;
	this.w = _width || 0;
	this.h = _height || 0;
	if(typeof this.x != 'number') PrintErr("Parameter x in Box");
    if(typeof this.y != 'number') PrintErr("Parameter y in Box");
    if(typeof this.w != 'number') PrintErr("Parameter width in Box");
    if(typeof this.h != 'number') PrintErr("Parameter height in Box");
}
/**
 * 
 * @constructs Circle
 * @memberof Tools/Physics
 *
 * @param {Number} _centerX
 * @param {Number} _centerY
 * @param {Number} _radius
 *
 * @description
 * - set center on X of the Circle <br/>
 * - set center on Y of the Circle <br/>
 * - set radius of the Circle <br/>
 *
 * */ 
function Circle(_centerX, _centerY, _radius) 
{
	this.x = _centerX || 0;
	this.y = _centerY || 0;
	this.radius = _radius || 0;
	if(typeof this.x != 'number') PrintErr("Parameter centerX in Circle");
    if(typeof this.y != 'number') PrintErr("Parameter centerY in Circle");
    if(typeof this.radius != 'number') PrintErr("Parameter radius in Circle");
}