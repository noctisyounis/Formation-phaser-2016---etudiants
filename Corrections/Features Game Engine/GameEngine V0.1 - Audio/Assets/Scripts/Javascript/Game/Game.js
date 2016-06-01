/** 
 * @function Run
 *  
 * @description
 * Core of the Game Engine<br/>
 * <br/>
 * Each Game loop:<br/>
 * - set the timeValues with new values<br/>
 * - clear the canvas<br/>
 * - if scene exist, start it<br/>
 * - Handle the mouse<br/>
 * - Call RequestAnimationFrame (recursive)
 *
 * */

function Run() 
{
	Time.SetTimeValues();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (Application.LoadedScene != null) Application.LoadedScene.Start();

	Physics.CheckClick();
	if(Input.mouseReload > 0) Input.mouseClick = false;

	RequestAnimationFrame(Run);
}