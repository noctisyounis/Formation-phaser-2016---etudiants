/**
* The State Machine class manages states and transitions 
* @class
*
**/


function StateMachine() 
{
	this.States = {};
	this.Current = null;
	this.Update = function() 
	{
		for (var i = 0; i < this.Current.Transitions.length; i++) {
			if(this.Current.Transitions[i].Call())
			{
				this.Current = this.States[this.Current.Transitions[i].ToState];
				return;
			}
		}
	}
	/**
	* Add a state
	* @param {State} _state - this is the state
	**/
	this.AddState = function(_state)
	{
		this.States[_state.name] = _state;
	}
}

/**
* Create a State
*
* @class
* @param {String} _name - The state name
* @param {Array} _transitions - An array of Transition objects.
*
**/
function State(_name, _transitions) 
{
	if (typeof _name != String) PrintErr("StateMachine.js : Type of _name is incorrect. String is required !");
	if (typeof _transitions != Array) PrintErr("StateMachine.js : Type of _transitions is incorrect. Array is required !")
	this.name = _name;
	this.Transitions = _transitions;
}

/**
* Make a Transition state
*
* @class
* @param {State} _toState - The goal state
* @param {Function} _callback - Executed function to make the transition
*
**/
function Transition(_toState, _callback) 
{
	this.ToState = _toState;
	this.Call = _callback;
}