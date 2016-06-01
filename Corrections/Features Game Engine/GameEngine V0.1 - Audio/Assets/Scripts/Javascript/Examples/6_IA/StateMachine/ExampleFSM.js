/* Exemple
var clear = false,
	panic = false,
	calm = false,
	warn = false;

var panicT = new Transition("red", function() { return panic }),
	clearT = new Transition("green", function () { return clear }),
	calmT = new Transition("orange", function () { return calm }),
	warnT = new Transition("orange", function () { return warn });

var green = new State("green", [panicT, warnT]);
var red = new State("red", [calmT, clearT]);
var orange = new State("orange", [panicT, clearT]);

var fsm = new StateMachine();
	fsm.AddState(green);
	fsm.AddState(red);
	fsm.AddState(orange);
	fsm.Current = green;

console.log(fsm.Current.name);
panic = true;
fsm.Update();
console.log(fsm.Current.name);
panic = false;
clear = true;
fsm.Update();
console.log(fsm.Current.name);
warn = true;
clear = false;
fsm.Update();
console.log(fsm.Current.name);
warn = false;
panic = true;
fsm.Update();
console.log(fsm.Current.name);
*/