var Time = {
	Time: 0,
	DeltaTime: 0,
	TimeScale: 1,
	FPS: 0,
	TimeOfLastFrame: 0,
	averageDelay: 0,

	GameStart:0,
	GameLoaded:0,
	SceneStart:0,
	SceneLoaded:0,

	GetTimeWhenGameBegin : function() {
		return this.GameStart;
	},
	SetTimeWhenGameBegin : function() {
		this.GameStart = this.Time;
	},
	GetTimeWhenGameLoaded : function() {
		return this.GameLoaded;
	},
	SetTimeWhenGameLoaded : function() {
		this.GameLoaded = this.Time;
	},
	GetTimeWhenSceneBegin : function() {
		return this.SceneStart;
	},
	SetTimeWhenSceneBegin : function() {
		this.SceneStart = this.Time;
	},
	GetTimeWhenSceneLoaded : function() {
		return this.SceneLoaded;
	},
	SetTimeWhenSceneLoaded : function() {
		this.SceneLoaded = this.Time;
	},

	GetTimeSinceGameBegin: function() {
		return new Date().getTime() - this.GetTimeWhenGameBegin();
	},
	GetTimeSinceSceneBegin: function() {
		return new Date().getTime() - this.GetTimeWhenSceneBegin();
	},

	SetTimeValues: function() {
		this.Time = Date.now();
		this.DeltaTime = (this.Time - this.TimeOfLastFrame) / 1000;
		
		this.averageDelay += ((this.Time - this.TimeOfLastFrame) - this.averageDelay) / 10;
		this.FPS = (1000 / this.averageDelay ).toFixed(1);

		this.TimeOfLastFrame = this.Time;
	}
}

String.prototype.toHHMMSS = function() {
	var sec_num = parseInt(this,10);
	var hours = Math.floor(sec_num/3600);
	var minutes = Math.floor( (sec_num - (hours*3600)) / 60 );
	var seconds = sec_num - (hours*3600) - (minutes*60);

	if (hours < 10 ) {
		hours = "0"+hours;
	}
	if (minutes < 10) {
		minutes = "0"+minutes;
	}
	if (seconds < 10) {
		seconds = "0"+seconds;
	}
	var time = hours+" : "+minutes+" : "+seconds;
	return time;
}