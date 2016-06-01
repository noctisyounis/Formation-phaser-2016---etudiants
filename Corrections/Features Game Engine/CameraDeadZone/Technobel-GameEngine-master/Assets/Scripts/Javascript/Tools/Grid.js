function Grid(row, column, celluleSize, offset) {
	this.gridWidth = column * celluleSize;
	this.gridHeight = row * celluleSize;
	this.celluleSize = celluleSize;
	this.offset = offset;

	this.CellulesIsObstacle = [];
	this.map = [];

	this.row = row;
	this.column = column;

	this.SetGrid = function() {

		for (var i = 0; i <= this.row; i++) {
			ctx.beginPath();
			ctx.moveTo(this.offset, this.offset + this.celluleSize * i);
			ctx.lineTo(this.offset + this.gridWidth, this.offset + this.celluleSize * i);
			ctx.stroke();
		}

		for (var i = 0; i <= this.column; i++) {
			ctx.beginPath();
			ctx.moveTo(this.offset + this.celluleSize * i, this.offset);
			ctx.lineTo(this.offset + this.celluleSize * i, this.offset + this.gridHeight);
			ctx.stroke();
		}
	};

	this.SetRandomObstacle = function(pourcent) {
		var chance = 100 / pourcent;

		for (var i = 0; i < this.row * this.column; i++) {

			if (Math.Random.RangeInt(1, chance, true) == 1) {
				
				this.CellulesIsObstacle[i] = true;
			} else {

				this.CellulesIsObstacle[i] = false;
			}

			var coord = CoordFromIndex(i, this.column);
			this.map.push(coord);
		}
		return this.map;
	};

	this.DrawObstacles = function() {
		
		for (var i = 0; i < this.row * this.column; i++) {
			
			if (this.CellulesIsObstacle[i]) {
				
				var coord = CoordFromIndex(i, this.column);

				ctx.fillStyle = "black";
				ctx.fillRect(this.offset + coord.x * celluleSize, this.offset + coord.y * celluleSize, this.celluleSize, this.celluleSize);	
			}
		}
	};

	this.GetCellulePosition = function() {
		
		if (Input.MouseClick) {

			var coord = Input.MousePosition;
			coord.x -= this.offset;
			coord.y -= this.offset;

			var reste = coord.x % this.celluleSize;
			coord.x -= reste;

			reste = coord.y % this.celluleSize;
			coord.y -= reste;

			//console.clear();		

			console.log( "x: " + (coord.x / this.celluleSize) );
			console.log( "y: " + (coord.y / this.celluleSize) );
		}
	};
}


