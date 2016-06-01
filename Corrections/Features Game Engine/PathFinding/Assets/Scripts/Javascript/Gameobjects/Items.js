/*	**** Create a new GameObject **** 
*
*	@step 1							Copy the content of this file in a new .js document.
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 2							Save the new file in Assets/Javascript/GameObjects/NameOfYourGameObject.js .
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 3                      	In the index.html add below this comment <!-- GameObjects --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"
*	----------------------------------------------------------------------------------------------------------------------------
*	@step 4						    To make a new instance of GameObject, use this instruction: "new NameOfGameObject();"
*/


/*	**** How to make the setup of a GameObject ****
*	
*	@property name 																											{string} 			 
*	The name of the object.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@property enabled 																									   {boolean} 			 
*	The active state of the GameObject.
*   --------------------------------------------------------------------------------------------------------------------------------
*	@property physics    																							       {boolean}			 
*	The active state of Physics component
*	--------------------------------------------------------------------------------------------------------------------------------
*	@property renderer    																								   {boolean}			 
*	The active state of Renderer component
*	--------------------------------------------------------------------------------------------------------------------------------
*	@prefix transform                	    																			 {structure}			 
*	Position,size, scale and rotation of the GameObject.
*
*		
*	@property position 																							{x: float, y: float} 
*	Position of the GameObject.
*
*	@property size
*	Size in pixel of the GameObject.
*
*	@property scale
*	Scale multiplier of the GameObject.
*
*	@pivot
*	Define the center of draw/rotation of the object.
*
*	@property rotation																							{x: float, y: float} 
*	Rotation of the GameObject. (not yet)
*
*	@property scale																								{x: float, y: float} 
*	Scale of the GameObject.	
*	--------------------------------------------------------------------------------------------------------------------------------     					 
*	@prefix Physics                   																					 {structure}			 
*	The Physics component of the GameObject.
*
*			
*	@property BoxCollider 																								   {boolean}			 
*	If true, call OnTriggerEnter() when colide other box collider.
*
*	@property clickable         																						   {boolean}			 
*	If true, call OnCicked() when click is detected.	
*
*	@property RelativePosition																							   {boolean}			 
*	If true, the collider will follow the transform.
*
*	@property ColliderIsSameSizeAsTransform    																		   	   {boolean}			 
*	If true, the collider take the transform value.	
*	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  		
*	@prefix Physics.BoxColliderSize          																			 {structure}			 
*	Position, rotation and scale of the box collider.
*	
*			
*	@property position 																							{x: float, y: float} 
*	Position of the box collider.
*
*	@property rotation																							{x: float, y: float} 
*	Rotation of the box collider. (don't use)
*
*	@property scale																								{x: float, y: float} 
*	Scale of the box collider.	
*	--------------------------------------------------------------------------------------------------------------------------------
* 	@prefix   Renderer 																									 {structure}			 
*	The renderer component of the GameObject.
*
*	
*	@property isVisible																									   {boolean}			 
*	If true, the GameObject will be visible.
*	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -	
*	@prefix Renderer.Material																							 {structure}			 
*	The material part of the renderer component.
*
*
*	@property Source																										 {image}				 
*	The image drawed if no animation.
*	 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
*	@prefix Renderer.Animation 																							 {structure}			 
*	The animation part of the renderer component.
*
*
*	@property animated																									   {boolean}			 
*	If true, the image drawed will be animated.
*	
*	@property current 															 {array[image,totalDuration: float,nbFrames: float]}
*	The current animation that will be played  
*
*	@proprety Animations																					   		  {array[[],[]]}
*	Contain all the animations of the gameObject.
*	________________________________________________________________________________________________________________________________
*/

/*	**** GameObject's Methods ****
*
*	@method SetPosition (): Set position of gameObject.
*   @param1 {structure} {x: float, y:float}.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Awake (): Called at the instruction new GameObject().									
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Start (): Called at the first use of the GameObejct in scene.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Update (): Called each frame, all the system is coded here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method GUI (): Called each frame, code all UI Here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnTriggerEnter(): Called each frame when an other box collider is in contact with the GameObject.
*	@param1 {object} : other. // Not implemented yet
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnClicked(): Called each frame when user click on the collider.
* 	--------------------------------------------------------------------------------------------------------------------------------
*	@method OnHovered(): Called each frame when user mouse is over the collider and don't click.
*   --------------------------------------------------------------------------------------------------------------------------------
*	@method OnUnhovered(): Called each frame when user mouse is not over the collider.
*/

/* **** For running GameObject ****
*
*	Add NameOfYourGameObject.Start() in your scene.
*/

function Items(x,y,w,h,imgName) {
	this.name = imgName;
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.TimeBeforeMoving = 0.5;
	
	this.Transform = {};
	this.Transform.position = new Vector(x,y);
	//this.Transform.mapPosition = new Vector(x,y);
	this.Transform.size = new Vector(w,h);
	this.Transform.scale = new Vector(0.5,0.5);
	this.Transform.pivot = new Vector(0,0);

	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.Clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.ColliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;
	this.Physics.Collider = {
		position: new Vector(x+0.25*w,y+0.4*h),
		size: new Vector(w,0.5*h)
	};

	this.Renderer = {
		isVisible: true,
		isSpriteSheet: false,
		that: this.Transform,
		Material: {
			Source: "",
			SizeFrame: new Vector(),
			CurrentFrame: new Vector(),
		},

		Animation:{
			animated: true,
			animations: [],
			current:[],
			countdown:0
		},
		
		Draw: function() {
			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated) {	
					
					if (this.AnimationCount > this.Animation.totalAnimationLength/this.Animation.current.length) {
						this.Animation.currentIndex ++ ;
						this.AnimationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.current.length-1) {
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.AnimationCount += Time.DeltaTime;
					
				}else {
					this.AnimationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.current[this.Animation.currentIndex];

				var scaledSizeX = this.that.size.x*this.that.scale.x;
				var scaledSizeY = this.that.size.y*this.that.scale.y;
				//console.log(this);
				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								this.that.position.x-this.that.pivot.x*scaledSizeX,
								this.that.position.y-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			} 
			else 
			{
				var scaledSizeX = this.that.size.x*this.that.scale.x;
				var scaledSizeY = this.that.size.y*this.that.scale.y;
				ctx.drawImage(this.Material.Source,
								this.that.position.x-this.that.pivot.x*scaledSizeX,
								this.that.position.y-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			}
		}			

	};


	this.Awake = function() {
		console.log('%c System:GameObject ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.Start = function() {
		if (!this.started) {
			// operation start
			var img = Images[imgName];
			this.Renderer.Material.Source = img;
			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.HitPlayer = function() {
		switch(this.name) {
			case ItemType[1]:
				this.enabled = false;
				Application.Player.Key = 0;
				Application.Level++;
				Application.LoadedScene = new Level(LevelData[Application.Level].map,LevelData[Application.Level].items)
				break;
			case ItemType[2]:
				this.enabled = false;
				Application.Player.Hitted();
				break;
			case ItemType[3]:
				this.enabled = false;
				Application.Player.addScore(1000);
				break;
			case ItemType[4]:
				this.enabled = false;
				Application.Player.addScore(500);
				break;
			case ItemType[5]:
				this.enabled = false;
				Application.Player.addScore(100);
				break;
			case ItemType[6]:
				this.enabled = false;
				Application.Player.Key++;
				break;
		}
	}

	this.move = function(dir) {
		// dir haut = 1
		var bool = Physics.TileCollision(Application.LevelMap,new Vector(10,8),this.Transform.mapPosition,dir)
		if (bool) {
			if ( dir == 4 ) {
				this.Transform.mapPosition.x--;
				this.Transform.mapPosition.y;
			}
			else if ( dir == 1 ) {
				this.Transform.mapPosition.x;
				this.Transform.mapPosition.y--;
			}
			else if ( dir == 2 ) {
				this.Transform.mapPosition.x++;
				this.Transform.mapPosition.y;
			}
			else if ( dir == 3 ) {
				this.Transform.mapPosition.x;
				this.Transform.mapPosition.y++;
			}		
		}		
		
		
	}
	this.openChest = function () {
		Application.Player.Key--;
		Application.Player.addScore(5000);
		Application.LevelItemMap[this.Transform.mapPosition.x+this.Transform.mapPosition.y*10] = 11;
		this.name = ItemType[11];
		var img = Images[ItemType[11]];
		this.Renderer.Material.Source = img;
	}
	this.refreshPosition = function() {
		var v = new Vector(this.Transform.mapPosition.x*101+6+0.25*this.Transform.size.x,this.Transform.mapPosition.y*81-40+0.37*this.Transform.size.y)
		this.Transform.position.x = v.x;
		this.Transform.position.y = v.y;
		this.setCollider();

	}
	this.setCollider = function() {
		this.Physics.Collider.position.x = this.Transform.position.x + 20;
		this.Physics.Collider.position.y = this.Transform.position.y + 90;
		this.Physics.Collider.size.x = 60;
		this.Physics.Collider.size.y = 60;
	}
	this.Update = function() {
		if ( this.enabled ) {
			ctx.fillStyle = "#00B51A";
			ctx.fillRect(this.Transform.position.x, this.Transform.position.y, 50, 50);
		}
		this.GUI();	
	};
	this.GUI = function() {
		if (Application.debugMode) {
			Debug.debugObject(this);
		}
	}
	this.onHover = function() {
		this.Physics.countHovered ++;
		
	}
	this.onClicked = function() {
		this.Physics.countHovered ++;
	}
	this.onUnHovered = function() {
		this.Physics.countHovered = 0;
	}

	this.Awake();

}