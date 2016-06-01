var Physics = {
	PointBoxCollision: function(point, box) {
		return ( (point.x >= box.x && point.x <= box.x + box.w ) && (point.y >= box.y && point.y <= box.y + box.h ) ) ;
	},
	BoxBoxCollision: function(box1,box2) {
		/*if ( box1.x >= box2.x && box1.x <= box2.x + box2.w ) ||
			( box1.x + box1.w >= box2.x && box1.x + box1.w <= box2.x + box2.w ) {
				if ( box1.y >= box2.y && box1.y <= box2.y + box2.h ) ||
					( box1.y + box1.h >= box2.y && box1.y + box1.h <= box2.y + box2.h ) {
					return true
				}	
		}
		if ( box2.x >= box1.x && box2.x <= box1.x + box1.w ) ||
			( box2.x + box2.w >= box1.x && box2.x + box2.w <= box1.x + box1.w ) {
				if ( box2.y >= box1.y && box2.y <= box1.y + box1.h ) ||
					( box2.y + box2.h >= box1.y && box2.y + box2.h <= box1.y + box1.h ) {
					return true
				}
		}
		return false;*/
		if (box2.x >= box1.x + box1.w 
			|| box2.x + box2.w <= box1.x 
			|| box2.y >= box1.y + box1.h 
			|| box2.y + box2.h <= box1.y ) 
		{
			return false;
		}
		return true;

	},
	PointCircleCollision: function(point, circle ) {
		var dist = distPointToPoint( point, circle );
		return dist < circle.radius ;
	},
	CircleCircleCollision: function(circle1, circle2) {
		var dist = distPointToPoint( circle1, circle2 );
		return dist < circle1.radius + circle2.radius ;
	},
	CircleBoxCollision: function(circle, box) {
		var distX = Math.abs( circle.x - box.x - box.w / 2 );
		var distY = Math.abs( circle.y - box.y - box.h / 2 );

		if ( distX > (box.w/2 + circle.radius) ) {return false;}
		if ( distY > (box.h/2 + circle.radius) ) {return false;}
		if (distX <= box.w/2) {return true;}
		if (distY <= box.h/2) {return true;}

		var dx = distX - box.w/2;
		var dy = distY - box.h/2;
		return (dx*dx + dy*dy <= circle.radius * circle.radius);

	},
	TileCollision: function(map, sizeMap, position, direction) {
		if (direction == 1 && position.y == 0) { return false; }
		if (direction == 2 && position.x == sizeMap.x - 1) { return false; }
		if (direction == 3 && position.y == sizeMap.y - 1) { return false; }
		if (direction == 4 && position.x == 0) { return false; }

		var nextIndex = {x:position.x,y:position.y};
		switch(direction) {
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
		//nextIndex = nextIndex.y * sizeMap.x + nextIndex.x;

		for (i in WalkableTiles) {
			if (i == map[nextIndex.y * sizeMap.x + nextIndex.x]) {
			 	return true;
			 } 
		}
		return false;
	},
	CheckCollision: function() {
		//console.log(arguments.length);
		if (arguments.length == 2 ) {
			//console.log( arguments[0] instanceof Vector );
			if (arguments[0] instanceof Vector ) {
				if (arguments[1] instanceof Box) {
					//console.log('PointBoxCollision');
					return Physics.PointBoxCollision(arguments[0],arguments[1])
				} else if (arguments[1] instanceof Circle) {
					//console.log('PointCircleCollision');
					return Physics.PointCircleCollision(arguments[0],arguments[1])
				}
			} else if (arguments[0] instanceof Box) {
				if (arguments[1] instanceof Box) {
					//console.log('BoxBoxCollision');
					return Physics.BoxBoxCollision(arguments[0],arguments[1])
				} else if (arguments[1] instanceof Circle) {
					//console.log('CircleBoxCollision');
					return Physics.CircleBoxCollision(arguments[1],arguments[0])
				} else if (arguments[1] instanceof Vector) {
					//console.log('PointBoxCollision');
					return Physics.PointBoxCollision(arguments[1],arguments[0])
				}
			} else if (arguments[0] instanceof Circle) {
				if (arguments[1] instanceof Box) {
					//console.log('CircleBoxCollision');
					return Physics.CircleBoxCollision(arguments[0],arguments[1])
				} else if (arguments[1] instanceof Circle) {
					//console.log('CircleCircleCollision');
					return Physics.CircleCircleCollision(arguments[1],arguments[0])
				} else if (arguments[1] instanceof Vector) {
					//console.log('PointCircleCollision');
					return Physics.PointBoxCollision(arguments[1],arguments[0])
				}
			}


		} else if (arguments.length == 4 ) {
			return TileCollision(arguments[0],arguments[1],arguments[2],arguments[3])
		}
	},
	CheckClick: function() {
		var GOs = Application.LoadedScene.GameObjects;
		var mPos = new Vector();
		mPos.x = Input.MousePosition.x;
		mPos.y = Input.MousePosition.y;
		for (index in GOs) {
			var go = GOs[index];
			if (go.Physics.Clickable) {
				var hitbox = new Box(go.Physics.Collider.position.x,
									go.Physics.Collider.position.y,
									go.Physics.Collider.size.x,
									go.Physics.Collider.size.y);
				if (go.Physics.countHovered > 0) {
					if (!Physics.CheckCollision(mPos, hitbox)) {
						go.onUnHovered();
					}
				}
				if ( Physics.CheckCollision(mPos, hitbox) ) {		
					if (Input.MouseClick) {
						go.onClicked();
					} else {
						go.onHover();
					}
				}
			}
		}
	}
};

function Box(x,y,w,h) {
	this.x = x ;
	this.y = y ;
	this.w = w ;
	this.h = h ;
}

function Circle(cx,cy,r) {
	this.x = cx ;
	this.y = cy ;
	this.radius = r ;
}