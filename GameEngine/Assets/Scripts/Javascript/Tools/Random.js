Math.Random = {

	RangeFloat : function(min,max,isInclusive = true){
		var step = Number.EPSILON;
		if (isInclusive) {
			return Math.min(min + (Math.random() * (max + step - min)),max);
		} else {
			return min + step + (Math.random() * (max - min + step));
		}
	},

	RangeInt : function(min,max,isInclusive = true){
		if (isInclusive) {
			max ++;
		} else {
			min ++;
		}
		return Math.floor(Math.random() * (max - min) + min);
	},

	InArray : function(array){
		return array[this.RangeInt(0,array.length-1,true)];
	},

	InCircle : function(circle){
		var randomAngle = this.RangeFloat(0,2*Math.PI,true);
		var vector = new Vector();
		vector.x = (circle.x + circle.radius * Math.cos(randomAngle)) | 0;
		vector.y = (circle.y + circle.radius * Math.sin(randomAngle)) | 0;
		return vector;
	},

	InDisk : function(circle){
		return this.InCircle.mul(this.RangeFloat(0,1,true));
	},

	InScreen : function(screen){
		var vector = new Vector();
		vector.x = this.RangeInt(0,screen.width,true);
		vector.y = this.RangeInt(0,screen.height,true);
		return vector;
	},

	InArea : function(box){
		var vector = new Vector();
		vector.x = box.x + this.RangeInt(0,box.w,true);
		vector.y = box.y + this.RangeInt(0,box.h,true);
		return vector;
	},

	ColorRGB : function(){
		return "rgb(" + this.RangeInt(0,255,true) 
				+ "," + this.RangeInt(0,255,true) 
				+ "," + this.RangeInt(0,255,true) + ")";
	},

	ColorRGBA : function(a = 1){
		return "rgba(" + this.RangeInt(0,255,true)
				 + "," + this.RangeInt(0,255,true)
				 + "," + this.RangeInt(0,255,true) 
				 + "," + a + ")"; 
	},

	ColorHex : function(){
		var letters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.Random.RangeInt(0,letters.length,false)];
	    }
	    return color;
	},

	AngleDegree : function(min,max) {
		return this.RangeInt(min,max,true) % 360;
	},

	AngleRadian : function(min,max) {
		return this.RangeFloat(min,max,true) % (2*Math.PI);
	},

	IntPondere : function(min,max) {
		return this.FloatPondere() | 0;
	},

	FloatPondere : function(min,max) {
		var a = this.RangeFloat(min, max,false);
		var b = this.RangeFloat(min, max,false);
		return (a + b) * 0.5;
	},



}