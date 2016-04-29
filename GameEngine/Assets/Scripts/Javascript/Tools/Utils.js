function dotProduct(vector1, vector2) {
	return vector1.x * vector2.x + vector1.y * vector2.y;
}

Math.Clamp = function (number, min, max) {
	return Math.min(Math.max(number, min), max);
}

Math.DegreeToRadian = function(deg) {
	// 2*PI = 360
	// x = deg
	// Regle de 3
	return deg * Math.PI / 180;
}

Math.RadianToDegree = function(rad) {
	return rad * 180 / Math.PI;
}