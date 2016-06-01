/**
 * Create a new GameObject <br />
 * @namespace GameObjects/GameObjects
 *
 * @tutorial
 * <ul><li>Copy the content of GameObjects file in a new .js document.</li>
 * <li>Save the new file in Assets/Javascript/GameObjects/NameOfYourGameObject.js .</li>
 * <li>In the index.html add below this comment <!-- GameObjects --> the line:<br/>
 * <script type="text/javascript" src="Assets/Scripts/Javascript/GameObjects/NameOfYourGameObject.js"></script></li>
 * <li>For create a new scene, use this instruction: "new GameObject()".</li>
 * </ul>
 * 
 * 
 * @property {String} name - The name of the object.
 * @property {Boolean} enabled - The active state of the GameObject.
 * @property {Boolean} renderer - The active state of Renderer component
 * @property {Boolean} fixedToCamera -  The active state of Camera if is Fixed
 * @property {Vector} MouseOffset  - Position of mouse
 * @property {Group} Parent - A Group which contain several GameObject
 * @property {Object} Transform  
 * @property {Vector} Transform.RelativePosition - the relative position of GameObject inside a Group 
 * @property {Vector} Transform.Size - size of GameObject
 * @property {Vector} Transform.Scale - scale of GameObject 
 * @property {Vector} Transform.Pivot - pivot position of GameObject
 * @property {Number} Transform.angle - angle of GameObject
 *
 *
 * */
function Player(_x, _y, _scaleX, _scaleY, _speed, _grid,_color, _id, _pseudo) 
{
	this.name = "Player";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.fixedToCamera = true;
	this.lastMove = Time.Time;
	this.color = _color;
	this.isMoving = false;
	this.speed = _speed;
	this.score = 0;
	
	this.Grid = _grid;
	this.rank = _id + 1;
	this.pseudo = _pseudo || "Player" + (_id + 1); 
	this.id = _id;
	this.isMyPlayer = false;

	
	this.MouseOffset = new Vector();

	this.Parent = null;
	
	this.Transform = {};
	this.Transform.RelativePosition = new Vector();
	this.Transform.Position = new Vector();
	this.Transform.Size = new Vector(36,45);
	this.Transform.RelativeScale = new Vector(_scaleX,_scaleY);
	this.Transform.Scale = new Vector(_scaleX,_scaleY);
	this.Transform.Pivot = new Vector(.5,.5);
	this.Transform.angle = 0;
	this.Transform.IndexPosition = new Vector(_x,_y);
	this.Transform.direction = null;

	this.BaseScale = new Vector(_scaleX,_scaleY);

	//Tween
	this.StartPosition = new Vector();
	this.EndPosition = new Vector();
	this.nextIndex = new Vector();

	/**
	 * @function SetPosition
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y position(Transform) of game object
	 * */
	this.SetPosition = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPosition Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPosition Go");
		this.Transform.RelativePosition.x = _x;
		this.Transform.RelativePosition.y = _y;
	};

	/**
	 * @function SetPositionCollider
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y position(Physics collider) of game object
	 * */
	this.SetPositionCollider = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPositionCollider Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPositionCollider Go");
		this.Physics.Collider.Position.x = _x;
		this.Physics.Collider.Position.y = _y;
	};

	/**
	 * @function SetSize
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the size of game object
	 * */
	this.SetSize = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetSize Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetSize Go");
		this.Transform.Size.x = _x;
		this.Transform.Size.y = _y;
	};

	/**
	 * @function SetColliderSize
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the collider size of game object
	 * */
	this.SetColliderSize = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetColliderSize Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetColliderSize Go");
		this.Physics.Collider.Size.x = _x;
		this.Physics.Collider.Size.y = _y;
	};

	/**
	 * @function SetScale
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the scale of game object
	 * */
	this.SetScale = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetScale Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetScale Go");
		this.Transform.RelativeScale.x = _x;
		this.Transform.RelativeScale.y = _y;
	};

	/**
	 * @function SetPivot
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {Number} _x
	 * @param {Number} _y
	 * 
	 * @description
	 * set the x and y for the pivot of game object
	 * */
	this.SetPivot = function(_x, _y)
	{
	    if(typeof _x != 'number') PrintErr("Parameter x in SetPivot Go");
	    if(typeof _y != 'number') PrintErr("Parameter y in SetPivot Go");
		this.Transform.Pivot.x = _x;
		this.Transform.Pivot.y = _y;
	};

	/**
	 * The Physics component of the GameObject. <br />
	 * @memberof GameObjects/GameObjects
	 *
	 * @property {Object} Physics  
	 * @property {Boolean} Physics.enabled - The active state of the GameObject.
	 * @property {Boolean} Physics.clickable - is clickable
	 * @property {Boolean} Physics.dragAndDroppable - is draggable
	 * @property {Boolean} Physics.colliderIsSameSizeAsTransform - is has the same size of Tranform size
	 * @property {Number} Physics.countHovered - counter
	 *
	 *
	 * */
	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.colliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;

	this.Physics.Collider = 
	{
		Position: new Vector(),
		Size: new Vector()
	};

	this.Renderer = 
	{
		isVisible: true,
		isSpriteSheet: false,
		That: this.Transform,
		Material: 
		{
			Source: "",
			SizeFrame: new Vector(),
			CurrentFrame: new Vector(),
		},
		animationCount:0,
		Animation:
		{
			animated: true,
			Animations: [],
			Current:[],
			countdown:0,
			currentIndex: 0,
			totalAnimationLength: 0.5
		},
		/**
		 * 
		 * @function Draw
		 * @memberof GameObjects/GameObjects
		 *
		 * @description
		 * Draw the game object component
		 *  
		 * */
		Draw: function() 
		{
			var ScaledSizeX = this.That.Size.x*this.That.Scale.x;
			var ScaledSizeY = this.That.Size.y*this.That.Scale.y;

			ctx.save();
			ctx.translate((this.That.Position.x), (this.That.Position.y));
			ctx.rotate(Math.DegreeToRadian(this.That.angle));
			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated)
				{	
					if (this.animationCount > this.Animation.totalAnimationLength / this.Animation.Current.length) 
					{
						this.Animation.currentIndex ++ ;
						this.animationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.Current.length-1) 
						{
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.animationCount += Time.deltaTime;
					
				}
				else 
				{
					this.animationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.Current[this.Animation.currentIndex];

				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			} 
			else 
			{
				ctx.drawImage(this.Material.Source,
								-this.That.Pivot.x*ScaledSizeX,
								-this.That.Pivot.y*ScaledSizeY,
								ScaledSizeX,
								ScaledSizeY);
			}
			ctx.restore();
		}
					

	};

	/**
	 * @function SetSpriteSheet
	 * @memberof GameObjects/GameObjects
	 *
	 * @param {String} _img - the source image of sprite sheet
	 * @param {Vector} _sizeFrame - the size frame of the sprite
	 * @param {Number} _animationLength - how many frame has the sprite sheet
	 *
	 * @description
	 *
	 * Set the sprite sheet source image, the size of one frame and the number of frame the sprite sheet has.
	 * */
	this.SetSpriteSheet = function(_img, _sizeFrame, _animationLength) 
	{
	    //if(typeof _img != 'string') PrintErr("Parameter img in SetSpriteSheet");
		if(!(_sizeFrame instanceof(Vector))) PrintErr("Parameter sizeFrame in SetSpriteSheet");
	    if(typeof _animationLength != 'number') PrintErr("Parameter animationLength in SetSpriteSheet");
		this.Renderer.isSpriteSheet = true;
		this.Renderer.Animation.totalAnimationLength = _animationLength || 0.5;
		this.Renderer.Material.SizeFrame = _sizeFrame;
 		this.Renderer.Material.Source = _img;
 		this.Renderer.Material.CurrentFrame = new Vector(0,0);
 		for (var i = 0; i < _img.height; i += this.Renderer.Material.SizeFrame.y) 
 		{
 			var array = [];
 			for (var j = 0; j < _img.width; j += this.Renderer.Material.SizeFrame.x) 
 			{
 				array.push(new Vector(j, i));
 			}
 			this.Renderer.Animation.Animations.push(array);
 		}
 		this.Renderer.Animation.Current = this.Renderer.Animation.Animations[0];
	}

	/**
	 * @function Awake
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Called at the instruction new GameObject()
	 * */
	this.Awake = function() 
	{
		Print('System:GameObject ' + this.name + " Created !");
		var v = this.IndexToPixel(this.Transform.IndexPosition) 
		this.StartPosition = new Vector(v.x,v.y);
		this.EndPosition = new Vector(v.x,v.y);
		this.nextIndex = new Vector(_x,_y);
	};

	/**
	 * @function Start
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Start the GameObject and show a message in console or launch Update() if already started <br/>
	 * Set the transform component to the physics collider
	 * */
	this.Start = function() 
	{
		var _self = this;
		if (!this.started) {
			// operation start
			this.Renderer.Material.Source = Images["Player"];

			if (this.Physics.colliderIsSameSizeAsTransform) 
			{
				this.Physics.Collider = this.Transform;
			}


			socket.on('MoveOther', function (data) 
			{
				//console.log(data);
				 if (data.id == _self.id ) 
				 {
				 	//console.log("self",_self);
				 	//finish animation
				 	_self.Transform.Position.x = _self.EndPosition.x;
				 	_self.Transform.Position.y = _self.EndPosition.y;
				 	_self.ApplyTween();

				 	// next animation
				 	_self.StartPosition = _self.IndexToPixel(_self.Transform.IndexPosition);
					_self.nextIndex = new Vector(data.x, data.y);
					_self.EndPosition = _self.IndexToPixel(_self.nextIndex);
					_self.isMoving = true;
					_self.Transform.direction = data.direction;
				 }
			})

			this.started = true;
			Print('System:GameObject ' + this.name + " Started !");
		}
		this.PreUpdate();
	};

	/**
	 * @function PreUpdate
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * If GameObject in group (parent), take relative position from parent position <br/>
	 * If not, set GameObject own position <br/>
	 *
	 * Start the camera if exist and set position if fixed
	 *
	 * */
	this.PreUpdate = function() 
	{
		if (this.enabled) 
		{
			if (!this.isMoving) 
			{
				if( Application.LoadedScene.name == "MultiGrid")
				{
					this.Transform.Position.x = this.Transform.IndexPosition.x * this.Grid.caseLength + this.Grid.caseLength / 2 + Application.LoadedScene.offsetGrid.x; 
					this.Transform.Position.y = this.Transform.IndexPosition.y * this.Grid.caseLength + this.Grid.caseLength / 2 + Application.LoadedScene.offsetGrid.y; 
				}
			}	
			this.Update();
		}
			
	};
	/**
	 * @function Update
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Call postUpdate function (each frame)
	 * */
	this.Update = function() 
	{
		var _self = this;
		//refresh
		if (Input.KeysDown[9]) 
		{
			location.reload();
		}

		if(this.isMyPlayer)
		{
			if (!this.isMoving) 
			{
				this.Renderer.Material.Source = Images["Player"];
				//left
				if (Input.KeysDown[37] && Physics.TileCollision(this.Grid.Tiles, [0], new Vector(this.Grid.cases,this.Grid.cases), this.Transform.IndexPosition, 4)) 
				{
					this.StartPosition = this.IndexToPixel(this.Transform.IndexPosition);
					this.nextIndex = new Vector(this.Transform.IndexPosition.x - 1, this.Transform.IndexPosition.y);
					this.EndPosition = this.IndexToPixel(this.nextIndex);
					this.isMoving = true;
					this.Transform.direction = "Left";
					socket.emit('Move', 
					{
						id : _self.id,
						x : _self.nextIndex.x,
						y : _self.nextIndex.y,
						direction: "Left"
					})

				}
				//right
				else if (Input.KeysDown[39] && Physics.TileCollision(this.Grid.Tiles, [0], new Vector(this.Grid.cases,this.Grid.cases), this.Transform.IndexPosition, 2)) 
				{
					this.StartPosition = this.IndexToPixel(this.Transform.IndexPosition);
					this.nextIndex = new Vector(this.Transform.IndexPosition.x + 1, this.Transform.IndexPosition.y);
					this.EndPosition = this.IndexToPixel(this.nextIndex);
					this.isMoving = true;
					this.Transform.direction = "Right";
					socket.emit('Move', 
					{
						id : _self.id,
						x : _self.nextIndex.x,
						y : _self.nextIndex.y,
						direction : "Right"
					})

				}
				//up
				else if (Input.KeysDown[38] && Physics.TileCollision(this.Grid.Tiles, [0], new Vector(this.Grid.cases,this.Grid.cases), this.Transform.IndexPosition, 1)) 
				{
					this.StartPosition = this.IndexToPixel(this.Transform.IndexPosition);
					this.nextIndex = new Vector(this.Transform.IndexPosition.x, this.Transform.IndexPosition.y - 1);
					this.EndPosition = this.IndexToPixel(this.nextIndex);
					this.isMoving = true;
					this.Transform.direction = "Up";
					socket.emit('Move', 
					{
						id : _self.id,
						x : _self.nextIndex.x,
						y : _self.nextIndex.y,
						direction : "Up"
					})

				}
				//down
				else if (Input.KeysDown[40] && Physics.TileCollision(this.Grid.Tiles, [0], new Vector(this.Grid.cases,this.Grid.cases), this.Transform.IndexPosition, 3)) 
				{
					this.StartPosition = this.IndexToPixel(this.Transform.IndexPosition);
					this.nextIndex = new Vector(this.Transform.IndexPosition.x, this.Transform.IndexPosition.y + 1);
					this.EndPosition = this.IndexToPixel(this.nextIndex);
					this.isMoving = true;
					this.Transform.direction = "Down";
					socket.emit('Move', 
					{
						id : _self.id,
						x : _self.nextIndex.x,
						y : _self.nextIndex.y,
						direction : "Down"
					})

				}
			}
			
		}
		if (this.isMoving) this.ApplyTween();
		
		this.PostUpdate();	
	};


	

	/**
	 * @function PostUpdate
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Execute PostUpdate. If DebugMode is active, diplay GameObject in debug mode
	 *
	 * */
	this.PostUpdate = function() 
	{
		this.Renderer.Draw();

		if (Application.debugMode) {
			Debug.DebugObject(this);
		}
		this.GUI();	
	};

	/**
	 * @function GUI
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Display the GUI of GameObject
	 * */
	this.GUI = function() 
	{
		
	}

	/**
	 * @function onHover
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Counter on hover the GameObject
	 * */
	this.onHover = function() 
	{
		this.Physics.countHovered ++;	
	}

	/**
	 * @function onClicked
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Set the MouseOffset with mouse position <br/>
	 * Increment the countHovered
	 * */
	this.onClicked = function() 
	{
		this.MouseOffset.x = Input.MousePosition.x - this.Transform.Position.x;
		this.MouseOffset.y = Input.MousePosition.y - this.Transform.Position.y;
		this.Physics.countHovered ++;
	}
	/**
	 * @function onUnHovered
	 * @memberof GameObjects/GameObjects
	 * @description
	 *
	 * Reinitialize the countHovered to 0
	 * */
	this.onUnHovered = function() 
	{
		this.Physics.countHovered = 0;
	}
	this.IndexToPixel = function (_position) 
	{
		var v = new Vector();
		if( Application.LoadedScene.name == "MultiGrid")
		{
			v.x = _position.x * this.Grid.caseLength + this.Grid.caseLength / 2 + Application.LoadedScene.offsetGrid.x; 
			v.y = _position.y * this.Grid.caseLength + this.Grid.caseLength / 2 + Application.LoadedScene.offsetGrid.y; 
		}
		return v;
	}
	this.ApplyTween = function () 
	{
		this.Renderer.Material.Source = Images["PlayerJump" + this.Transform.direction];

		this.Transform.Position.x = Tween.TweenGrid(this.Transform.Position.x, this.StartPosition.x, this.EndPosition.x, this.speed*Time.deltaTime, this.Grid.caseLength * 0.01 )
		this.Transform.Position.y = Tween.TweenGrid(this.Transform.Position.y, this.StartPosition.y, this.EndPosition.y, this.speed*Time.deltaTime, this.Grid.caseLength * 0.01 )
		
		var middle = Math.abs( (this.EndPosition.x - this.StartPosition.x) / 2 + ( (this.EndPosition.y - this.StartPosition.y) / 2 ));
		var pos = Math.abs(this.Transform.Position.x - this.StartPosition.x + this.Transform.Position.y - this.StartPosition.y )
		if ( pos < middle ) 
		{
			var t = Tween.TweenGrid(this.Transform.Scale.x, this.BaseScale.x, this.BaseScale.x * 1.75, 2 *1.75 *Time.deltaTime,0.01);
			this.Transform.Scale.x = t;
			this.Transform.Scale.y = t;
		}
		else
		{
			var t = Tween.TweenGrid(this.Transform.Scale.x, this.BaseScale.x * 1.75, this.BaseScale.x, 2 * 1.75 * Time.deltaTime,0.01);	
			this.Transform.Scale.x = t;
			this.Transform.Scale.y = t;
		}
		if (this.Transform.Position.x == this.EndPosition.x && this.Transform.Position.y == this.EndPosition.y  ) 
		{
			this.isMoving = false;
			this.Transform.IndexPosition = this.nextIndex;
			var index = IndexFromCoord(this.Transform.IndexPosition.x, this.Transform.IndexPosition.y, this.Grid.cases)
			if (this.Grid.Color[index] != this.color) 
			{
				this.Grid.Color[index] = this.color;
				this.Grid.ColorSize[index] = 0;
			}
		}
	}

	this.Awake();
}

