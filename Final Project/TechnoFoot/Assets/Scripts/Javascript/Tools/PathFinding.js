/**
*
* Initiate a PathFinding 
* @class
* 
* @param {Grid} _grid - Set Grid for the pathfinding
*
**/

function PathFinding(_grid)
{
	this.WalkableTiles = [];
	this.Grid = _grid;
	this.MapDimension = new Vector( _grid.cases,  _grid.cases);
	this.MapSize = _grid.cases * _grid.cases;
	this.Map = _grid.Tiles;
	this.DistanceAlgo = Math.ManhattanDistance;

/**
*
* Check if neighbours is walkable 
*
* 
* @param {Number} _x - Set a Vector position x
* @param {Number} _y - Set a Vector position y
*
* @return {Array} Walkable tile around current tiles 
**/

	this.Neighbours = function(_x, _y)
	{
		if(typeof _x != 'number') PrintErr("Parameter x in PathFinding.Neighbours");
    	if(typeof _y != 'number') PrintErr("Parameter y in PathFinding.Neighbours");
		var N = 1;
		var S = 3;
		var E = 2;
		var W = 4;
		
		var myN = Physics.TileCollision(this.Map, this.WalkableTiles, this.MapDimension, new Vector(_x,_y), N);
		var myS = Physics.TileCollision(this.Map, this.WalkableTiles, this.MapDimension, new Vector(_x,_y), S);
		var myE = Physics.TileCollision(this.Map, this.WalkableTiles, this.MapDimension, new Vector(_x,_y), E);
		var myW = Physics.TileCollision(this.Map, this.WalkableTiles, this.MapDimension, new Vector(_x,_y), W);
		var result = [];
		if (myN)
		{
			result.push(new Vector(_x, _y - 1))
		}
		if (myS)
		{
			result.push(new Vector(_x, _y + 1))
		}
		if (myE)
		{
			result.push(new Vector(_x + 1, _y))
		}
		if (myW)
		{
			result.push(new Vector(_x - 1, _y))
		}
		return result;
	};
/**
* 
* Create the Node
*
* @param {Object} _parent - This is a checkpoint
* @param {Vector} _pos - Position x & y of the node
* @param {Number} _worldWidth - The size of the map in width
*
* @return {Node} 
**/

	this.Node = function(_parent, _pos, _worldWidth)
	{
		if(!(_pos instanceof(Vector))) PrintErr("Parameter _pos in InArea");
		var node =
		{
			parent: _parent,
			value: _pos.x + (_pos.y * _worldWidth),
			x: _pos.x,
			y: _pos.y,
			estimateCost: 0,
			goal: 0
		}
		return node;
	};

/**
*
* Find the right path between the starting point (_startPos) and the arrival (_endPos)  
*
* @param {Vector} _startPos - The starting point in vector 
* @param {Vector} _endPos - The ending point in vector
*
* @return {Array} 
**/

	this.Process = function(_startPos, _endPos)
	{

		if(!(_startPos instanceof(Vector))) PrintErr("Parameter _startPos in PathFinding.Process");
		if(!(_endPos instanceof(Vector))) PrintErr("Parameter _endPos in PathFinding.Process");

		var pathStart = this.Node(null, _startPos, this.MapDimension.x);
		
		var pathEnd = this.Node(null, _endPos, this.MapDimension.x);
		var ASTAR = new Array(this.MapSize);
		var Available = [pathStart];
		var Forbidden = [];
		var Result = [];
		var neighbours;
		var node;
		var path;
		var length, max, min, i, j;
		while (length = Available.length)
		{
			max = this.MapSize;
			min = -1;
			for (i = 0; i < length; i++)
			{
				if (Available[i].estimateCost < max)
				{
					max = Available[i].estimateCost;
					min = i;
				}
			}
			node = Available.splice(min, 1)[0];
			if (node.value === pathEnd.value)
			{
				path = Forbidden[Forbidden.push(node) - 1];
				while (path = path.parent)
				{
					Result.push(new Vector(path.x, path.y));
				}
				ASTAR = Forbidden = Available = [];
				Result.reverse();
				
				this.Grid.BestPath = Result;
				return Result;
			} 
			else
			{
				neighbours = this.Neighbours(node.x, node.y);
				for (i = 0, j = neighbours.length; i < j; i++)
				{
					path = this.Node(node, neighbours[i], this.MapDimension.x)
					if (!ASTAR[path.value])
					{
						var nodeVector = new Vector(node.x,node.y);
						var pathEndVector = new Vector(pathEnd.x,pathEnd.y);
						path.goal = node.goal + this.DistanceAlgo(neighbours[i], nodeVector);
						path.estimateCost = node.goal + this.DistanceAlgo(neighbours[i], pathEndVector);
						Available.push(path);
						ASTAR[path.value] = true;
					}
				}
				Forbidden.push(node);
			}
		}
	}
}