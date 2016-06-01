// v1n, v2n are normalized vector
Math.DotProduct = function(v1n,v2n) {
	return v1n.x * v2n.x + v1n.y * v2n.y;
}
//Math.Distance > Math.EuclidianDistance
Math.EuclidianDistance = function(start,goal) {
	return Math.sqrt( (start.x - goal.x)*(start.x - goal.x)+(start.y - goal.y)*(start.y - goal.y) );
}
Math.ManhattanDistant = function(start, goal){
	return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
}
Math.DiagonalDistance = function(start,goal) {
	return Math.max(
			Math.abs(start.x - goal.x),
			Math.abs(start.y - goal.y)
		);
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