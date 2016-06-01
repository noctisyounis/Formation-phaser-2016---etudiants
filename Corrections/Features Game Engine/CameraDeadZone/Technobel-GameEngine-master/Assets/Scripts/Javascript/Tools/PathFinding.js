function PathFinding(map, CollumnNb, lineNb) {

	// map
	this.WalkableTiles = [];
	this.map = map;

	// size and dimension
	this.mapDimensions = new Vector(CollumnNb, lineNb);
	this.mapSize = this.mapDimensions.x * this.mapDimensions.y;

	// shortcut
	this.tileCol = Physics.tileCollision;

	// settings
	this.distanceAlgo = Math.ManhattanDistant({x: 0, y: 0}, {x: 9, y: 9});
	this.NeighboursAlgo = function() {};

	this.Neighbours = function(x, y) {
		var N = 1,
			W = 2,
			S = 3,
			E = 4;

		var myN = Physics.TileCollision(this.map, this.mapDimensions, new Vector(x, y),N);
		var myS = Physics.TileCollision(this.map, this.mapDimensions, new Vector(x, y),S);
		var myE = Physics.TileCollision(this.map, this.mapDimensions, new Vector(x, y),E);
		var myW = Physics.TileCollision(this.map, this.mapDimensions, new Vector(x, y),W);

		var result = [];
		if(myN) result.push( {x : x, y : y - 1} );
		if(myS) result.push( {x : x, y : y + 1} );
		if(myE) result.push( {x : x + 1, y : y} );
		if(myW) result.push( {x : x - 1, y : y} );

		return result;

		//this.FindNeighbours();
	};

	this.Node = function(parent, pos, worldWidth) {
		
		var node = {
			parent: parent,

			value: pos.x + pos.y * worldWidth,
			x: pos.x,
			y: pos.y,
			estimateCost: 0,
			goal: 0
		};
		return node;
	};

	this.Process = function() {

		var pathStart = this.Node(null, new Vector(0,0), this.mapDimensions.x);
		var pathEnd = this.Node(null, new Vector(9,9), this.mapDimensions.x);

		var ASTAR = new Array(this.mapSize);

		var Available = [pathStart];
		var Forbidden = [];
		var Results = [];
		var neighbours;
		var node;
		var path;
		var length, max, min, i, j;

		while(length = Available.length){

			max = this.mapSize;
			min = -1;
			for (i = 0; i < length; i++) {
				
				if (Available[i].estimateCost < max) {
					max = Available[i].estimateCost;
					min = i;
				}
			}
			node = Available.splice(min, 1)[0];
			// si le node que je test est ma destination
			if (node.value === pathEnd.value) {

				path = Forbidden[Forbidden.push(node) - 1];
				while(path == path.parent){

					Results.push([path.x, path.y]);
				}

				ASTAR = Forbidden = Available = [];

				Results.reverse();

				return Results;
			} else {

				neighbours = this.Neighbours(node.x, node.y);

				for (i = 0, j = neighbours.length; i < j; i++) {
					
					path = this.Node(node, neighbours[i], this.mapDimension.x);

					if (!ASTAR[path.value]) {
						
						path.goal = node.goal + distanceAlgo(neighbours[i], node);
						path.estimateCost = node.goal + distanceAlgo(neighbours[i], pathEnd);
						Available.push(path);

						ASTAR[path.value] = true;
					}
				}
				Forbidden.push(node);
			}			
		}

		//return this.Process();
	};

	this.FindNeighbours = function() {

	};
}