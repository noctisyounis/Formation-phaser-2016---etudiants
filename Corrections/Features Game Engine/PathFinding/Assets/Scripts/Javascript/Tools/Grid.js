function Grid(length, cases) {
	this.l = length;
	this.c = cases;
	this.cl = this.l/this.c
	this.obstacle = new Array(this.c*this.c).fill(2);
	for (e in this.obstacle) {
		this.obstacle[e] = Math.Random.RangeInt(1,4,true);
	}

	this.draw = function() {
		ctx.strokeStyle = '#000000';
		ctx.fillStyle = '#000000';
		for (var i = 0; i*this.cl < this.l; i++) {
			for (var j = 0; j*this.cl < this.l; j++) {
				ctx.strokeRect(i*this.cl,j*this.cl,this.cl,this.cl);
				if (this.obstacle[j*this.c + i] == 1) {
					ctx.fillStyle = '#000000';
					ctx.fillRect(i*this.cl,j*this.cl,this.cl,this.cl);
				}
				if (this.obstacle[j*this.c + i] == 0) {
					ctx.fillStyle = 'lightblue';
					ctx.fillRect(i*this.cl,j*this.cl,this.cl,this.cl);
				}
				if (this.obstacle[j*this.c + i] == -1) {
					ctx.fillStyle = 'green';
					ctx.fillRect(i*this.cl,j*this.cl,this.cl,this.cl);
				}
				if (this.obstacle[j*this.c + i] == 8) {
					ctx.fillStyle = 'yellow';
					ctx.fillRect(i*this.cl,j*this.cl,this.cl,this.cl);
				}
			}
			
		}
	}

	this.getMousePosition = function () {
		
		var x = Input.MousePosition.x / this.cl |0;
		var y = Input.MousePosition.y / this.cl |0;

		console.log(x,y);
		return new Vector(x,y);
			
	}
}