var State = [];
State["Neutral"] = 0;
State["Alert"] = 1;
State["Fight"] = 2;
State["Run"] = 3;

var stateMachine = function() {
	status: State["Neutral"],
	isForbiddenArea : false,
	seePlayer : false,
	seeSuspiciousActivity : false,
	isAttacked : false,
	playerIsInRange : false,
	counter : 30,
	update : function() {
		switch(this.status) {
			case State["Neutral"]:
				if (this.isForbiddenArea && this.seePlayer) {
					this.status = State["Fight"];
				} else if (this.seeSuspiciousActivity ) {
					this.status = State["Alert"];
				}
				break;
			case State["Alert"]:
				if (this.seePlayer) {
					this.status = State["Run"];
					this.counter = 30000;
				} else if (!this.counter) {
					this.status = State["Neutral"];
					this.counter = 30000;
				}
				this.counter --;
				break;
			case State["Fight"]:
				if (this.isAttacked || this.playerIsInRange) {
					this.status = State["Fight"];
				} else if (!this.seePlayer) {
					this.status = State["Alert"];
				}
				break;
			case State["Run"]:
				if (!this.playerIsInRange) {
					this.status = State["Run"];
				}
				break;
		}
		console.log(this.status);
	}
}