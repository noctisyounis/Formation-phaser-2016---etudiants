/**
 * Handle the Time of the Game Engine
 * @namespace Tools/Time
 * 
 * */
var Time = 
{
	Time: 0,
	deltaTime: 0,
	timeScale: 1,
	FPS: 0,
	TimeOfLastFrame: 0,
	averageDelay: 0,

	GameStart:0,
	GameLoaded:0,
	SceneStart:0,
	SceneLoaded:0,
	Timers : [],
	/**
	 * 
	 * @function GetTimeWhenGameBegin
	 * @memberof Tools/Time
	 * 
	 * @return {Time}
	 *
	 * @description
	 * - return the time when game begin
	 *  
	 * */
	GetTimeWhenGameBegin : function() 
	{
		return this.GameStart;
	},
	/**
	 * 
	 * @function SetTimeWhenGameBegin
	 * @memberof Tools/Time
	 * 
	 * @description
	 * Set the time to GameStart when game begin
	 *  
	 * */
	SetTimeWhenGameBegin : function() 
	{
		this.GameStart = this.Time;
	},
	/**
	 * 
	 * @function GetTimeWhenGameLoaded
	 * @memberof Tools/Time
	 * 
	 * @return {Time}
	 *
	 * @description
	 * return the time when game load
	 *  
	 * */
	GetTimeWhenGameLoaded : function()
	{
		return this.GameLoaded;
	},
	/**
	 * 
	 * @function SetTimeWhenGameLoaded
	 * @memberof Tools/Time
	 * 
	 * @description
	 * Set the time to GameLoaded when game load
	 *  
	 * */
	SetTimeWhenGameLoaded : function()
	{
		this.GameLoaded = this.Time;
	},
	/**
	 * 
	 * @function GetTimeWhenSceneBegin
	 * @memberof Tools/Time
	 * 
	 * @return {Time}
	 *
	 * @description
	 * return the time when scene begin
	 *  
	 * */
	GetTimeWhenSceneBegin : function()
	{
		return this.SceneStart;
	},
	/**
	 * 
	 * @function SetTimeWhenSceneBegin
	 * @memberof Tools/Time
	 * 
	 * @description
	 * Set the time to SceneStart when scene begin
	 *  
	 * */
	SetTimeWhenSceneBegin : function()
	{
		this.SceneStart = this.Time;
	},
	/**
	 * 
	 * @function GetTimeWhenSceneLoaded
	 * @memberof Tools/Time
	 * 
	 * @return {Time}
	 *
	 * @description
	 * return the time when scene load
	 *  
	 * */
	GetTimeWhenSceneLoaded : function()
	{
		return this.SceneLoaded;
	},
	/**
	 * 
	 * @function SetTimeWhenSceneLoaded
	 * @memberof Tools/Time
	 * 
	 * @description
	 * Set the time to SceneLoaded when scene load
	 *  
	 * */
	SetTimeWhenSceneLoaded : function()
	{
		this.SceneLoaded = this.Time;
	},
	/**
	 * 
	 * @function GetTimeSinceGameBegin
	 * @memberof Tools/Time
	 * 
	 * @return {Time}
	 *
	 * @description
	 * return the time since the game begin
	 *  
	 * */
	GetTimeSinceGameBegin: function()
	{
		return new Date().getTime() - this.GetTimeWhenGameBegin();
	},
	/**
	 * 
	 * @function GetTimeSinceSceneBegin
	 * @memberof Tools/Time
	 * 
	 * @return {Time}
	 *
	 * @description
	 * return the time since the scene begin
	 *  
	 * */
	GetTimeSinceSceneBegin: function()
	{
		return new Date().getTime() - this.GetTimeWhenSceneBegin();
	},
	/**
	 * 
	 * @function SetTimeValues
	 * @memberof Tools/Time
	 * 
	 * @description
	 * Set all values in each game loop
	 *  
	 * */
	SetTimeValues: function()
	{
		this.Time = Date.now();
		this.deltaTime = (this.Time - this.TimeOfLastFrame) / 1000;
		
		this.averageDelay += ((this.Time - this.TimeOfLastFrame) - this.averageDelay) / 10;
		this.FPS = (1000 / this.averageDelay).toFixed(1);

		this.TimeOfLastFrame = this.Time;

		for (var i = 0; i < this.Timers.length; i++) {
			this.Timers[i].Update();
		}
	}
}
/**
 * 
 * Extend the String class.
 * @memberof Tools/Time
 * 
 * @description
 * Extend the String class - Add a readable format time (HHMMSS)
 *  
 * */
String.prototype.toHHMMSS = function() 
{
	var sec_num = parseInt(this,10);
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours < 10 ) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return hours + " : " + minutes + " : " + seconds;
}