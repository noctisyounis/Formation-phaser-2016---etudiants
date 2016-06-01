function FiniteStateMachine() {
	this.StateMachine = [];
	this.StateMachine["Neutral"] = 0;
	this.StateMachine["Alert"] = 1;
	this.StateMachine["Run"] = 2;
	this.StateMachine["Fight"] = 3;

	this.currentState = this.StateMachine["Neutral"];

	// Set boolean for all transitions
	// Neutral - Alert
	this.isStealth = true;
	// Alert - Run
	this.isStayingInVision = false;
	// Neutral - Fight
	this.isRestrictedZone = false;
	// Run - Fight
	this.isStartFight = false;

	this.ChangeState = function() {

		switch(this.currentState){

			// check all transitions for Neutral
			case this.StateMachine["Neutral"]:
				if ( !this.isStealth ) this.currentState = this.StateMachine["Alert"];
				if ( this.isRestrictedZone ) this.currentState = this.StateMachine["Run"];
				break;
			// check all transitions for Alert
			case this.StateMachine["Alert"] :
				if( this.isStealth) this.currentState = this.StateMachine["Neutral"];
				if ( this.isStayingInVision ) this.currentState = this.StateMachine["Run"];
			break;
			// check all transitions for Run
			case this.StateMachine["Run"] :
				if ( !this.isStayingInVision ) this.currentState = this.StateMachine["Alert"];
				if ( this.isStartFight ) this.currentState = this.StateMachine["Fight"];
			break;
			// check all transitions for Fight
			case this.StateMachine["Fight"] :
				if ( !this.isRestrictedZone ) this.currentState = this.StateMachine["Neutral"];
				if ( !this.isStartFight ) this.currentState = this.StateMachine["Fight"];
			break;
		}
	}
}