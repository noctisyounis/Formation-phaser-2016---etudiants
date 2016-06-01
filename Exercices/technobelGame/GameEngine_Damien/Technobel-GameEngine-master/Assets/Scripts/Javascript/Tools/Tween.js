var Tween = {
	Approach : function(goal, current, delta){
		console.log(goal);
		var dif = goal - current;
		if (dif > delta) {
			
			return current + delta;
		} 
		if (dif < delta){
			
			return current - delta;
		} 
		// dif == delta
		return goal;
		}
}	
/*		with vector
	Approach : function( goal, current, delta ){

		var dif = goal.sub(current);
		if (dif > delta) {
			return current.add(new Vector(delta, delta));
		} 
		if (dif < delta){
			return current.sub(new Vector(delta, delta));
		} 
		// dif == delta

		return goal;
	}
*/
