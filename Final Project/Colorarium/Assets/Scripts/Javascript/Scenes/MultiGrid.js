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
function MultiGrid(_parameters) 
{
	this.name = "MultiGrid";
	//this.GameObjects =[];
	this.started = false;
	this.offsetGrid = new Vector(0,0);
	this.scaling = 1;

	this.Players = [];
	this.Items = [];
	this.Scores =  [];
	this.newScore = null;

	this.timer = new Timer(_parameters.Timer);

	this.MyPlayer = null;

	this.Parameters = {};
	this.Parameters.id = _parameters.id;
	this.Parameters.StartPos = _parameters.StartPos;
	this.Parameters.Colors = _parameters.Colors;

	var bigger = canvas.width > canvas.height ? canvas.width : canvas.height;
	var smaller = canvas.width < canvas.height ? canvas.width : canvas.height;
	if(canvas.width > canvas.height)
	{
		this.offsetGrid.x = (bigger - smaller) / 2;
	}
	else
	{	
		this.offsetGrid.y = (bigger - smaller) / 2;
	}
	this.Grid = new Grid(this.offsetGrid.x, this.offsetGrid.y, smaller, 4);


	//this.WorldSize = new Vector(4096,4096);

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
		var _self = this;
		if (!this.started) 
		{
			Time.SetTimeWhenSceneBegin();

			//console.log(socket);
			socket.on('SetItemPoint', function (_data) 
			{
				//console.log("item",_self.scaling)
				 var item = new ItemPoint(_data.x, _data.y, _self.scaling);
				 _self.Items.push(item);
			});
			socket.on('UpdateScore', function (_data) 
			{
				_self.Players[_data.id].score = _data.score;
			});

			// operation start
			 
			this.AddPlayer();

			this.started = true;


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
		if (!Application.gamePaused) 
		{
			if (this.newScore != null) 
			{
				this.Scores = this.newScore;
				this.newScore = null;
			}
			this.Grid.Draw();

			

			for (var i = 0; i < this.Items.length; i++) 
			{
				this.Items[i].Start();
			}
			for (var i = 0; i < this.Players.length; i++) 
			{
				this.Players[i].Start();
			}
			this.Scores[0].Start();
			for (var i = this.Scores.length-1; i > 0; i--) 
			{
				this.Scores[i].Start();
			}
			
			this.CheckCollisionItems();
		}

		if (Application.debugMode) 
		{
			Debug.DebugScene();
		}

		this.ShowTimer();

		this.GUI();
	}
	/**
	 * Called each frame, code all the GUI here.
	 * */
	this.GUI = function() 
	{
		if (!Application.GamePaused) 
		{
			//Show UI
		} 
		else 
		{
			// Show pause menu
		}
	}

	this.CheckCollisionItems = function()
	{
		var _self = this;
		for (var i = 0; i < this.Players.length; i++) 
		{
			for (var j = 0; j < this.Items.length; j++) 
			{
				if (this.Players[i].Transform.IndexPosition.x == this.Items[j].Transform.IndexPosition.x && this.Players[i].Transform.IndexPosition.y == this.Items[j].Transform.IndexPosition.y ) 
				{
					this.Items.splice(j,1);
					j--;
					for (var k = 0; k < this.Grid.Color.length; k++) 
					{
						if (this.Grid.Color[k] == this.Players[i].color) 
						{
							delete this.Grid.Color[k];
							this.Players[i].score ++;
						}
					}
					this.SortScore(this.Players[i]);
					socket.emit('SetScore', 
					{
						id: _self.Players[i],
						score: _self.Players[i].score
					});
				}
			}
		}
	}

	this.AddPlayer = function()
	{	
		this.Grid.ChangeSize(this.Parameters.StartPos.length * 2);
		this.scaling = (this.Grid.caseLength / Images["Player"].width) * 0.45;

		var posX = canvas.width - (canvas.width - canvas.height) * 0.5;
		var scoreGroup = new ScoreGroup(new Vector(posX * 1.05, 10), new Vector((canvas.width - canvas.height) * 0.45, canvas.height));
		this.Scores.push(scoreGroup);

		for (var i = 0; i < this.Parameters.StartPos.length; i++)
		{	
			var player = new Player(this.Parameters.StartPos[i].x, this.Parameters.StartPos[i].y, this.scaling, this.scaling, 2 * this.Grid.caseLength, this.Grid, this.Parameters.Colors[i], i);
			this.Players.push(player);
			var score = new ScorePanel(player, scoreGroup.Transform.Size.x * 0.5, 100);
			this.Scores.push(score);
			var index = IndexFromCoord(this.Parameters.StartPos[i].x, this.Parameters.StartPos[i].y,this.Grid.cases)
			this.Grid.Color[index] = this.Parameters.Colors[i]
		}
		this.SetAllScorePosition();

		this.MyPlayer = this.Players[this.Parameters.id];
		this.MyPlayer.isMyPlayer = true;
	}

	this.SortScore = function(_player)
	{	
		if(Application.LoadedScene.name == "MultiGrid")
		{
			//console.log('sorting', _player.id);
			var changingRank = false;
			var arrayCopy = this.Scores.splice(0);
			for(var i = 1; i < arrayCopy.length; i++)
			{

				if (i == _player.rank) 
				{
					break;
				}
				if (changingRank) 
				{
					arrayCopy[i].Player.rank = i;
					arrayCopy[i].StartPosition = arrayCopy[i].Transform.RelativePosition.Copy();
					arrayCopy[i].EndPosition = new Vector(arrayCopy[i].Transform.RelativePosition.x, 40 + arrayCopy[i].Transform.Size.y * arrayCopy[i].Transform.RelativeScale.y * i * 1.1);
				}
				else if (arrayCopy[i].Player.score < _player.score) 
				{
					var myscore = arrayCopy.splice(_player.rank,1)[0];
					_player.rank = i;
					arrayCopy.splice(i,0,myscore);
					arrayCopy[i].StartPosition = arrayCopy[i].Transform.RelativePosition.Copy();
					arrayCopy[i].EndPosition = new Vector(arrayCopy[i].Transform.RelativePosition.x, 40 + arrayCopy[i].Transform.Size.y * arrayCopy[i].Transform.RelativeScale.y * i * 1.1);
					changingRank = true;

				}
			}
			this.newScore = arrayCopy;
		}
	}
	this.SetAllScorePosition = function()
	{

		for(var i = 1; i < this.Scores.length; i++)
		{
			this.Scores[i].StartPosition = this.Scores[i].Transform.RelativePosition.Copy();
			this.Scores[i].EndPosition = new Vector(this.Scores[i].Transform.RelativePosition.x, 40 + this.Scores[i].Transform.Size.y * this.Scores[i].Transform.RelativeScale.y * i * 1.1);
		}
	}

	this.ShowTimer = function()
	{
		var t = this.timer.duration - this.timer.currentTime;
		var sec = t.toFixed(0) % 60;
		var min;

		(sec == 0) ? min = Math.round(t / 60) : min = Math.floor(t / 60);
		if(sec < 10) sec = "0"  + sec;
		if(t < 60 && sec != 0)	min = 0;
		if(t < 1) 
		{
			this.Items = [];
		}
		if(t == 0)
		{
			//alert(this.Scores)
			Scenes["Ending"] = new Ending(this.Scores);
			Application.LoadedScene = Scenes["Ending"]; 
		}
		

		ctx.font = '40px Arial';
		ctx.textAlign = 'center';
		ctx.fillStyle = 'black';
		ctx.fillText('Timer :', (canvas.width - this.Grid.length) * .25, 50);
		ctx.fillText(min + " : " + sec, (canvas.width - this.Grid.length) * .25, 100);
	}

	this.Awake()
}