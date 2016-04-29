function Run() {
	Time.SetTimeValues();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	console.log("it work");

	if (Application.LoadedScene != null) {
		Application.LoadedScene.Start();
	}
	
	RequestAnimationFrame(Run);
}