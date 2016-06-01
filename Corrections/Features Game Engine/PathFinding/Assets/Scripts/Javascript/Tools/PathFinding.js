function PathFinding(map,columnNb,lineNb) {
	this.walkableTiles = [];
	this.mapDimension = new Vector( columnNb, lineNb );
	this.mapSize = columnNb * lineNb;
	this.map = map;

	//settings
	this.distanceAlgo = Math.ManhattanDistance ;
	this.NeighboursAlgo = function (argument) {
		// body...
	};

	this.Neighbours = function(x,y) {
		var N = 1;
		var S = 3;
		var E = 2;
		var W = 4;

		var myN = Physics.TileCollision(this.map, this.mapDimension, new Vector(x,y),N,this.walkableTiles);
		var myS = Physics.TileCollision(this.map, this.mapDimension, new Vector(x,y),S,this.walkableTiles);
		var myE = Physics.TileCollision(this.map, this.mapDimension, new Vector(x,y),E,this.walkableTiles);
		var myW = Physics.TileCollision(this.map, this.mapDimension, new Vector(x,y),W,this.walkableTiles);

		var result = [];
		if (myN) {
			result.push(new Vector(x, y-1))
		}
		if (myS) {
			result.push(new Vector(x, y+1))
		}
		if (myE) {
			result.push(new Vector(x+1, y))
		}
		if (myW) {
			result.push(new Vector(x-1, y))
		}

		return result;

	}

	this.Node = function(parent, pos, worldWidth) {
		var node = {
			parent: parent,
			value: pos.x + (pos.y*worldWidth),
			x: pos.x,
			y: pos.y,
			estimateCost: 0,
			goal: 0
		}
		return node;
	}

	this.Process = function(startPos,endPos) {
		var pathStart = this.Node(null, startPos,this.mapDimension.x);
		var pathEnd = this.Node(null, endPos,this.mapDimension.x);

		var ASTAR = new Array(this.mapSize);

		var Available = [pathStart];
		var Forbidden = [];
		var Result = [];
		var neighbours;
		var node;
		var path;
		var length, max, min, i,j;

		while (length =  Available.length) {
			max = this.mapSize;
			min = -1;
			for (i = 0; i < length; i++) {
				if (Available[i].estimateCost < max) {
					max = Available[i].estimateCost;
					min = i;
				}
			}
		
			node = Available.splice(min,1)[0];
			if (node.value === pathEnd.value) {
				path = Forbidden[Forbidden.push(node)-1];
				while (path = path.parent) {
					Result.push(new Vector(path.x,path.y));
				}
				
				ASTAR = Forbidden = Available = [];
				Result.reverse();

				return Result;

			} else {
				neighbours = this.Neighbours(node.x,node.y);

				for (i = 0, j = neighbours.length; i < j; i++) {
					path = this.Node(node, neighbours[i], this.mapDimension.x);

					if (!ASTAR[path.value]) {
						path.goal = node.goal + this.distanceAlgo(neighbours[i], node);
						path.estimateCost = node.goal + this.distanceAlgo(neighbours[i],pathEnd);
						Available.push(path);

						ASTAR[path.value] = true;
					}
				}
				Forbidden.push(node);
			}
		}

		return this.Process(startPos,endPos);

	}

}