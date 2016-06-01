function Run(argument) {
	canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
	Time.SetTimeValues();
	ctx.clearRect(0,0,canvas.width,canvas.height);

	//console.log('working');
	//console.log(Math.Random.RangeFloat(0,1,true) == 0);
	if (Application.LoadedScene != null) {
		Application.LoadedScene.Start();
	}

	Physics.CheckClick();
	if(Input.MouseReload > 0) Input.MouseClick = false;

	RequestAnimationFrame(Run);
}