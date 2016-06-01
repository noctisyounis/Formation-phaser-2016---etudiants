/**
 * Allow to <ul>   <li> Debug a Scene </li> <li> Debug a GameObject </li> 
 * 				   <li> Show FPS </li> <li> Show the Time </li>  
 * 				   <li> Give the mouse position </li> <li> Everything at once </li>
 * 			</ul>
 *
 * @namespace Tools/Debug 
 * 
 * */

var Debug = 
{
	spriteOutlineColor: "grey",
	colliderColor: "green",

	Break: function() { debugger; },
	Log: function(logMsg)	{console.log(logMsg);},
	
	/**
	 * 
	 * @function DebugScene
	 * 
	 * @memberof Tools/Debug
	 * 
	 *  
	 * @description
	 * Show <ul> <li> The Fps </li> <li> The name of the scene </li> <li> The mouse position </li> <li> The Time </li> </ul>
	 * */

	DebugScene : function() 
	{
		if (Application.debugMode) 
		{
			this.ShowFPS();
			this.SceneName();
			this.MousePosition();
			this.ShowTime();
		}
	},
	
	/**
	 * 
	 * @function ShowFPS
	 * 
	 * @memberof Tools/Debug
	 * 
	 *  
	 * @description
	 * Show the FPS ( Frame per Second )
	 * */

	ShowFPS : function()
	{
		ctx.fillStyle = "rgba(122,122,122, 0.4)";
		ctx.RoundedBox(4, 4, 120, 70, 20);
	
		ctx.fillStyle = "rgba(122,122,122, 0.4)";
		ctx.RoundedBox(canvas.width - 130, 4, 125, 30, 20);

		if (Time.FPS > 40) 
		{
			ctx.fillStyle = "#65C065";
		} 
		else if (Time.FPS < 20) 
		{
			ctx.fillStyle = "red";
		}
		else 
		{
			ctx.fillStyle = "orange";
		}
		ctx.fillRect(15,15,20,20);
		ctx.fillText("FPS: " + Time.FPS, 38, 30);
		ctx.fillStyle = "black";
	},
	
	/**
	 * 
	 * @function SceneName
	 * 
	 * @memberof Tools/Debug
	 * 
	 *  
	 * @description
	 * Show the name of the scene
	 * */

	SceneName : function() 
	{
		ctx.font = '15px Arial';
		ctx.fillStyle = 'black';
		ctx.fillText(Application.LoadedScene.name, canvas.width - 100, 20);
	},
	
	/**
	 * 
	 * @function MousePosition
	 * 
	 * @memberof Tools/Debug
	 * 
	 *  
	 * @description
	 * Show the mouse position
	 * */

	MousePosition : function() 
	{
		ctx.font = '10px Arial';
		if (Input.mouseClick) 
		{
			ctx.fillStyle = '#65C065';
		}
		else 
		{
			ctx.fillStyle = 'white';
		}
		ctx.fillText(Input.MousePosition.x+" "+Input.MousePosition.y, Input.MousePosition.x-10, Input.MousePosition.y-2);
	},
	
	/**
	 * 
	 * @function ShowTime
	 * 
	 * @memberof Tools/Debug
	 * 
	 *  
	 * @description
	 * Show the Time since the game is started and since the scene is started
	 * */

	ShowTime : function() 
	{
		ctx.font = '10px Arial';
		ctx.fillStyle = 'white';
		var timeGame = Time.GetTimeSinceGameBegin()/1000 |0;
		var timeScene = Time.GetTimeSinceSceneBegin()/1000 |0;
		ctx.fillText("Game: " + timeGame.toString().toHHMMSS(), 10, 50);
		ctx.fillText("Scene: " + timeScene.toString().toHHMMSS(), 10, 60);
	},


	/**
	 * 
	 * @function DebugObject
	 * 
	 * @memberof Tools/Debug
	 * @param {GameObject} _go - The GameObject who will be debugged
	 * 
	 *  
	 * @description
	 * Show <ul> <li> The name </li> <li> The position </li> <li> The scale </li> <li> The collider </li> <li> The pivot point (little red circle) </li> </ul> of the GameObject
	 * */
	DebugObject : function(_go) 
	{
		if (Application.debugMode ) 
		{

			var scaledW =_go.Transform.Size.x * _go.Transform.Scale.x;
			var scaledH = _go.Transform.Size.y * _go.Transform.Scale.y;
			var posX = _go.Transform.Position.x - scaledW*_go.Transform.Pivot.x;
			var posY = _go.Transform.Position.y - scaledH*_go.Transform.Pivot.y;

			ctx.fillStyle= "rgba(80,250,80,0.3)";
			if (_go.Physics.Collider.Size != undefined && _go.Physics.Collider.Position != undefined ) 
			{
				var colW = _go.Physics.Collider.Size.x * _go.Transform.Scale.x;
	   			var colH = _go.Physics.Collider.Size.y * _go.Transform.Scale.y;
	   			var colX = _go.Physics.Collider.Position.x - scaledW*_go.Transform.Pivot.x;
	   			var colY = _go.Physics.Collider.Position.y - scaledH*_go.Transform.Pivot.y;

				ctx.fillRect(colX,colY,colW,colH);
				ctx.textBaseline = 'top';
				ctx.fillStyle= "darkgreen";
				ctx.fillText(colX + " " + colY + " " + colW + " " + colH, posX, posY+scaledH+20);
			} 
			else if (_go.Physics.Collider instanceof Box) 
			{
				var colW = _go.Physics.Collider.w * _go.Transform.Scale.x;
	   			var colH = _go.Physics.Collider.h * _go.Transform.Scale.y;
	   			var colX = _go.Physics.Collider.x - scaledW*_go.Transform.Pivot.x;
	   			var colY = _go.Physics.Collider.y - scaledH*_go.Transform.Pivot.y;

				ctx.fillRect(colX,colY,colW,colH);
				ctx.textBaseline = 'top';
				ctx.fillStyle= "darkgreen";
				ctx.fillText(colX + " " + colY + " " + colW + " " + colH, posX, posY+scaledH+20);
			} 
			else if (_go.Physics.Collider instanceof Circle) 
			{
				var x = _go.Physics.Collider.x - scaledW*_go.Transform.Pivot.x;
				var y = _go.Physics.Collider.y - scaledH*_go.Transform.Pivot.y;
				var radius = _go.Physics.Collider.radius * _go.Transform.Scale.x;

				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				ctx.textBaseline = 'top';
				ctx.fillStyle= "darkgreen";
				ctx.fillText(x + " " + y+ " " + radius, posX, posY+scaledH+20);
			}

			ctx.strokeStyle= "gray";
			if (_go.Renderer.Material) 
			{
				ctx.strokeRect(posX,posY,scaledW,scaledH);
			}

			ctx.font = '13px Arial';
			ctx.fillStyle = 'white';
			ctx.textBaseline = 'top';
			ctx.fillText(_go.name, posX, posY+scaledH+3);

			ctx.font = '9px Arial';
			ctx.fillStyle = 'white';
			ctx.textBaseline = 'bottom';
			ctx.fillText(posX+" "+posY+" "+scaledW+" "+scaledH, posX, posY-2);

			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.arc(_go.Transform.Position.x , _go.Transform.Position.y , 1, 0, Math.PI * 2);
			ctx.closePath();

			ctx.fill();
		}
		else
		{
			PrintErr("Debug.debugObject doesn't receive an object");
		}
	}
	
}