var Time = {
	Time : 0,
	DeltaTime : 0,
	TimeScale : 0,
	FPS : 0,

	TimeOfLastFrame : 0,

	GetTimeWhenGameBegin : function() {
		return this.TimeWhenGameBegin;
	},
	SetTimeWhenGameBegin : function() {
		this.TimeWhenGameBegin = this.Time;
	},

	GetTimeWhenGameLoaded : function() {
		return this.TimeWhenGameLoaded;
	},
	SetTimeWhenGameLoaded : function() {
		this.TimeWhenGameLoaded = this.Time;
	},

	//current scene
	GetTimeWhenSceneBegin : function() {
		return this.TimeWhenSceneBegin;
	},
	SetTimeWhenSceneBegin : function() {
		this.TimeWhenSceneBegin = this.Time;
	},

	//current scene
	GetTimeWhenSceneLoaded : function() {
		return this.TimeWhenSceneLoaded;
	},
	SetTimeWhenSceneLoaded : function() {
		this.TimeWhenSceneLoaded = this.Time;
	},
	
	SetTimeValues : function() {
		this.Time = Date.now();
		this.DeltaTime = (this.Time - this.TimeOfLastFrame) / 1000;
		this.averageDelay += ((this.Time - this.TimeOfLastFrame) - this.averageDelay) / 10;
		this.FPS = (1000 / this.averageDelay).toFixed(1);
		this.TimeOfLastFrame = this.Time;
	}

}