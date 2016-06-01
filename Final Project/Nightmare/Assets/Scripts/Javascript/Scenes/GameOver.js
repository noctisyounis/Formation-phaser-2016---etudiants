/**
 * Create a new Scene
 * <ul><li>Copy the content of this file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .</li>
 * <li>In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"</li>
 * <li>For create a new scene, use this instruction: "new Scene()".</li>
 * </ul>
 * <strong>To load your scene, use this instruction: "Application.LoadLevel(LevelName)".</strong>
 * 
 * @class
 * 
 * @return {Scene}
 * */
function GameOver(_score) 
{
	this.name = "GameOver";
	this.GameObjects =[];
	this.Groups = [];
	this.Cameras = [];
	this.CurrentCamera = null;
	this.AlphaMask = null;
	this.started = false;

	this.title1;
	this.title2;
	this.HighScores;

	this.previousKey = []

	this.canChange = false;
	this.highScoreNumber = -1;
	this.name = "AAAAAA";
	this.charPosition = 0;
	this.alphabetPositionPosition = 0;
	this.Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ @_";

	this.score = _score || 0;

	this.WorldSize = new Vector(4096,4096);

	/**
	 * Called at the instruction new Scene().
	 * */
	this.Awake = function() 
	{
		console.clear();
		Print('System:Scene ' + this.name + " Created !");
	}
	
	/**
	 * Start the Scene and show a message in console or launch Update() if already started
	 * Called at the first use of scene in game.
	 * */
	this.Start = function() 
	{
		if (!this.started) 
		{
			Time.SetTimeWhenSceneBegin();
			// operation start
			this.started = true;
			Audios["Run"].volume = 0;
			this.title1 = new Dialogs();
			this.title1.InitText("GAME OVER", "Consolas", 60, "white", new Box(2*canvas.width/5, 100,canvas.width/2,100 ), 4) ;
			this.title2 = new Dialogs();
			this.title2.InitText("Your score : " + this.score, "Consolas", 38, "white", new Box(2*canvas.width/5, 165,canvas.width/2,100 ), 2) ;

			this.HighScores = JSON.parse(LocalStorage.Load("HighScores"));

			//check if HighScore
			for (var i = 0; i < this.HighScores.length; i++) 
			{
				if (this.score > this.HighScores[i].score) 
				{
					this.highScoreNumber = i;
					this.HighScores.splice(i,0,{name: this.name,score: this.score});
					this.HighScores.splice(this.HighScores.length-1,1);
					//console.log(this.HighScores);
					break;
				}
			}

			Print('System:Scene ' + this.name + " Started !");
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	/**
	 * Start every GameObject, Group and apply the debug mode if asked
	 * Called each frame,code game is here.
	 * */
	this.Update = function() 
	{
		if (Input.KeysDown[32] == undefined && this.previousKey[32]  ) 
		{
			LocalStorage.Save("HighScores",JSON.stringify(this.HighScores));
			/*Scenes["Level"] = new Level();
			Application.LoadedScene = Scenes["Level"];
			Scenes["Title"] = new Title();*/
			for (index in Audios) 
			{
				Audios[index].volume = 0;	
			}

			Application.LoadedScene = Scenes["Title"];
			Application.LoadedScene.Music.play();

		}
		
		if (this.highScoreNumber != -1) 
		{
			if (Input.KeysDown[37] == undefined && this.previousKey[37] ) 
			{
				this.alphabetPositionPosition = this.Alphabet.indexOf(this.HighScores[this.highScoreNumber].name[this.charPosition]);
				this.charPosition --;
				if (this.charPosition < 0) 
				{
					this.charPosition = 5;
				}
			}
			if (Input.KeysDown[38] == undefined && this.previousKey[38] ) 
			{
				this.alphabetPositionPosition ++;
				if (this.alphabetPositionPosition == this.Alphabet.length) 
				{
					this.alphabetPositionPosition = 0;
				}
			}
			if (Input.KeysDown[39] == undefined && this.previousKey[39] ) 
			{
				console.log(this.HighScores[this.highScoreNumber].name[this.charPosition]);
				this.alphabetPositionPosition = this.Alphabet.indexOf(this.HighScores[this.highScoreNumber].name[this.charPosition]);
				this.charPosition ++;
				if (this.charPosition == 6) 
				{
					this.charPosition = 0;
				}
			}
			if (Input.KeysDown[40] == undefined && this.previousKey[40] ) 
			{
				this.alphabetPositionPosition --;
				if (this.alphabetPositionPosition < 0) 
				{
					this.alphabetPositionPosition = this.Alphabet.length-1;
				}
			}
			this.HighScores[this.highScoreNumber].name = setCharAt(this.HighScores[this.highScoreNumber].name,this.charPosition,this.Alphabet[this.alphabetPositionPosition]);

		}
		this.previousKey[32] = Input.KeysDown[32];
		this.previousKey[37] = Input.KeysDown[37];
		this.previousKey[38] = Input.KeysDown[38];
		this.previousKey[39] = Input.KeysDown[39];
		this.previousKey[40] = Input.KeysDown[40];

		ctx.drawImage(Images["Ending"],
				0, 0, Images["Ending"].width, Images["Ending"].height,
				0, 0, canvas.width, canvas.height);
		/*for (var i = 0; i < canvas.width; i+=92) 
		{
			for (var j = 0; j < canvas.height; j+=62) 
			{
				ctx.drawImage(Images["grassTile"],i,j);
			}	
		}*/
		//Gfx.Filters.Tint(new Box(0,0,canvas.width,canvas.height), "rgba(255,0,0,0.6)");
		if (!Application.GamePaused) 
		{
			
		}
		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}
		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		/*ctx.drawImage(Images["mask"],
				0, 0, Images["mask"].width, Images["mask"].height,
				0, 0, canvas.width, canvas.height);*/

		this.title1.Continue();
		var t = Math.floor(Time.Time / 500);
		if (this.title1.text.length == 10)
		{
			this.title2.Continue();
			
		}
		if (this.title2.text.length == 14 + this.score.toString().length)
		{
			ctx.font = '40px Consolas';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = 'white';
			
			if (t % 3 != 0) 
			{
				ctx.fillText('Press Space to play again',canvas.width / 2, canvas.height - 50);
			}
			ctx.font = '30px Consolas';
			for (var i = 0; i < this.HighScores.length; i++) 
			{
				if (i != this.highScoreNumber) 
				{
					ctx.fillStyle = 'white';
				} 
				else 
				{
					ctx.fillStyle = 'gray';
				}
				var name = this.HighScores[i].name;
				var score = this.HighScores[i].score;
				ctx.textAlign = 'left';
				ctx.fillText(name, canvas.width / 3 , canvas.height / 3 + 45 * i);
				ctx.textAlign = 'right';
				ctx.fillText(score, canvas.width / 3 * 2, canvas.height / 3 + 45 * i);

			}

		}

		if (this.highScoreNumber != -1 && t % 2 == 0) 
		{
			LocalStorage.Save("HighScores",JSON.stringify(this.HighScores));
		}


	}

	this.Awake()
}