Math.Random = {};
Math.Random.RangeInt = function(min,max,isInclusive) {
	if (isInclusive) {
		max ++;
	} else {
		min ++;
	}
	return Math.floor(Math.random() * (max - min) + min)  ; 
};
Math.Random.RangeFloat = function(min,max,isInclusive) {
	if (isInclusive) {
		var max = max + Number.EPSILON;
	} else {
		var min = min + Number.EPSILON;
	}
	console.log(max);
	return Math.random() * (max - min) + min;
};
Math.Random.InArray = function(array) {
	var index = Math.Random.RangeInt(0,array.length-1,true);
	return array[index];
};
Math.Random.InScreen = function(screen) {
	var p = new Vector();
	p.x = Math.Random.RangeInt(0,screen.width,true);
	p.y = Math.Random.RangeInt(0,screen.height,true);
	
	return p;
};
Math.Random.InCircle = function(circle) {
	var alpha = Math.Random.RangeFloat(0,2*Math.PI,true);

	var p = new Vector();
	p.x = circle.x + circle.radius*Math.cos(alpha) |0;
	p.y = circle.y + circle.radius*Math.sin(alpha) |0;
	
	return p;
};
Math.Random.InDisk = function(circle) {
	var alpha = Math.Random.RangeFloat(0,2*Math.PI,true);
	var radius = Math.Random.RangeFloat(0,circle.radius,true);
	var p = new Vector();
	p.x = circle.x + radius*Math.cos(alpha) |0;
	p.y = circle.y + radius*Math.sin(alpha) |0;
	
	return p;
};
Math.Random.InArea = function(box) {
	var p = new Vector();
	p.x = Math.Random.RangeInt(box.x,box.x + box.width,true);
	p.y = Math.Random.RangeInt(box.y,box.y + box.height,true);
	return p;
};

Math.Random.ColorRGB = function() {
	var r = Math.Random.RangeInt(0,256,false);
	var g = Math.Random.RangeInt(0,256,false);
	var b = Math.Random.RangeInt(0,256,false);

	return "rgb("+r+","+g+","+b+")";
};
Math.Random.ColorRGBA = function(a = 1) {
	var r = Math.Random.RangeInt(0,256,false);
	var g = Math.Random.RangeInt(0,256,false);
	var b = Math.Random.RangeInt(0,256,false);
	return "rgba("+r+","+g+","+b+","+ a +")";
};
Math.Random.ColorHEX = function() {
	var letters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.Random.RangeInt(0,letters.length,false)];
    }
    return color;
};

Math.Random.AngleDegree = function(min, max) {

	return Math.Random.RangeInt(min,max,true) % 360;
};

Math.Random.AngleDegree = function(min, max) {

	return Math.Random.RangeFloat(min,max,true) % (2*Math.PI);
};

Math.Random.IntPondere = function(min, max) {

	return Math.round( Math.Random.FloatPondere(min,max) );
};
Math.Random.FloatPondere = function(min, max) {
	var a = Math.Random.RangeFloat(min,max,true);
	var b = Math.Random.RangeFloat(min,max,true);
	return (a + b)*0.5;
};

