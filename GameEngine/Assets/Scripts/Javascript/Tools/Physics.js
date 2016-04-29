var Physics = {

	typeOfStruct : function(struct) {
		if (struct.x != undefined && typeof struct.x == "number" &&
				struct.y != undefined && typeof struct.y == "number") 
		{
			if (struct.radius != undefined && typeof struct.radius == "number") {
				return "Circle";
			}
			if (struct.w != undefined && typeof struct.w == "number" &&
				struct.h != undefined && typeof struct.h == "number") 
			{
				return "Box";
			}
			return "Point";
		}
	},

	CheckCollision : function() {
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}

		if (arguments.length == 2) {
			var point = args.find(x => this.typeOfStruct(x) == "Point");
			var boxs = args.filter(x => this.typeOfStruct(x) == "Box");
			var circles = args.filter(x => this.typeOfStruct(x) == "Circle");

			if (point != undefined) {
				if (boxs.length) {
					return this.PointBoxCollision(point, boxs[0]);
				} else if (circles.length) {
					return this.PointCircleCollision(point, circles[0]);
				}
			} else if (boxs.length) {
				if (boxs.length == 2) {
					return this.BoxBoxCollision(boxs[0], boxs[1]);
				} else {
					if (circles.length) {
						return this.CircleBoxCollision(circles[0], boxs[0]);
					}
				}
			} else if (circles.length == 2) {
				return this.CircleCircleCollision(circles[0], circles[1]);
			}
		} else if (arguments.length == 4) {
			return this.TileCollision(arguments[0], arguments[1], arguments[2], arguments[3]);
		}

		console.log("Error : CheckCollision doesn't accept your arguments");
		return false;
	},

	CheckClick : function() {
		for (var i = 0; i < Application.LoadedScene.GameObjects.length; i++) {
			var go = Application.LoadedScene.GameObjects[i];
			if (go.Physics.clickable) {
				if (this.CheckCollision(Input.MousePosition,{
					x : go.Physics.boxCollider.position.x,
					y : go.Physics.boxCollider.position.y,
					w : go.Physics.boxCollider.size.x,
					h : go.Physics.boxCollider.size.y
				})) 
				{
					if (!Input.MouseClick) go.OnHovered();
						else go.OnClicked();
				} else {
						go.UnHovered();
				}
			}
		}
	},

	PointBoxCollision : function(point, box) {
		if (point.x >= box.x && point.x <= box.x + box.w) {
			if (point.y >= box.y && point.y <= box.y + box.h) {
				return true;
			}
		}
		return false;
	},

	BoxBoxCollision : function(box1, box2) {
/*		if (box1.x >= box2.x && box1.x <= box2.x + box.w ||
			 box1.x + box1.w >= box2.x && box1.x + box1.w <= box2.x + box2.w) {
			if (box1.y >= box2.y && box1.y <= box2.y + box2.h ||
				 box1.y + box1.w >= box2.y && box1.y + box1.w <= box2.y + box2.h) {
				return true;
			}
		}*/
/*		if (box1.x + box1.w >= box2.x) {
			if (box1.x <= box2.x + box2.w) {
				if (box1.y + box1.h >= box2.y) {
					if (box1.y <= box2.y + box2.h) {
						return true;
					}
				}
			}
		}
		return false;*/
		if (box2.x >= box1.x + box1.w 
			|| box2.x + box2.w <= box1.x
			|| box2.y >= box1.y + box1.head
			|| box2.y + box2.h <= box1.y) {
			return false;
		}
		return true;
	},

	PointCircleCollision : function(point, circle) {
		//Il faut que point soit une instance de Vector
		var dist = point.sub(circle);
		if (dist.length < circle.radius) {
			return true;
		}
		return false;
	},

	CircleCircleCollision : function(circle1, circle2) {
		var dist = circle1.sub(circle2);
		if (dist.length > circle1.radius + circle2.radius) {
			return true;
		}
		return false;
	},

	CircleBoxCollision : function(circle, box) {
		var distX = Math.abs(circle.x - box.x - box.w / 2);
		var distY = Math.abs(circle.y - box.y - box.h / 2);

		if (distX > (box.w/2 + circle.radius)) return false;
		if (distY > (box.h/2 + circle.radius)) return false;

		if (distX <= box.w/2) return true;
		if (distY <= box.h/2) return true;

		var dx = distX - box.w/2;
		var dy = distY - box.h/2;

		return ( dx * dx + dy * dy <= circle.radius * circle.radius );
	},

	TileCollision : function(map, sizeMap, position, direction) {
		var nextPosition = { x : position.x, y : position.y }

		function TileisWalkable() {
			var index = sizeMap.y * nextPosition.y + nextPosition.x;
			return TilesWalkable.indexOf(map[index]) != -1;
		}

		if (TilesWalkable.indexOf(map[index]) != -1) {
			switch (direction) {
			case 1: // HAUT
				nextPosition.y--;
				return position.y > 0 && TileisWalkable();
				break;
			case 2: //DROITE
				nextPosition.x++;
				return position.x < sizemap.x && TileisWalkable();
				break;
			case 3: //BAS
				nextPosition.y++;
				return position.y < sizemap.y && TileisWalkable();
				break;
			case 4: //GAUCHE
				nextPosition.x--;
				return position.x > 0 && TileisWalkable();
				break;
			default:
				break;
			}
		}
		
	}
}

function Box(x,y,width, height) {
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
}

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
}