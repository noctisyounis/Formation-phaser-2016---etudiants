// v1n, v2n are normalized vector
Math.DotProduct = function(v1n,v2n) {
	return v1n.x * v2n.x + v1n.y * v2n.y;
}
// Distance between two dots
Math.Distance = function(p1,p2) {
	return Math.sqrt( (p1.x - p2.x)*(p1.x - p2.x)+(p1.y - p2.y)*(p1.y - p2.y) );
}
// restrict number between min and max
Math.Clamp = function(number,min,max) {
	return Math.min(Math.max(number, min), max);
};
Math.DegreeToRadian = function(angle) {
	return angle * Math.PI / 180 ;
}
Math.RadianToDegree = function(angle) {
	return angle * 180 / Math.PI ;
}