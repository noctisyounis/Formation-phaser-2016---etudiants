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

function Star(x, y) {
	this.name = "star";
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.hitbox = {};
	
	this.Transform = {};
	this.Transform.position = new Vector();
	this.Transform.size = new Vector();
	this.Transform.scale = new Vector(1,1);
	this.Transform.pivot = new Vector(0,0);

	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.Clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.ColliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;
	this.Physics.Collider = {
		position: new Vector(),
		size: new Vector()
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
			this.Renderer.Material.Source = Images["Star"];
			this.Transform.position = {x: x, y: y};
			this.Transform.size = {x: 101 ,y: 171};
			this.Transform.scale = {x: .5, y: .5};
			this.Physics.Collider.position = {x: this.Transform.position.x + 10, y: this.Transform.position.y + 35};
			this.Physics.Collider.size = {x: 31, y: 31};
			this.hitbox = new Box(this.Physics.Collider.position.x, this.Physics.Collider.position.y, this.Physics.Collider.size.x, this.Physics.Collider.size.y);
			console.log(this.hitbox);
			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.Update = function() {
		if ( this.enabled ) {

			this.Transform.position.y -= 10;
			this.Physics.Collider.position.y -= 10;
			this.hitbox.y -= 10;

			// collide with bug
			for (var i = 0; i < Application.LoadedScene.GameObjects.length; i++) {

				if (Application.LoadedScene.GameObjects[i].name == "bug" &&
						Application.LoadedScene.GameObjects[i].hitbox.x != undefined &&
						Application.LoadedScene.GameObjects[i].hitbox.y != undefined &&
						Application.LoadedScene.GameObjects[i].hitbox.w != undefined &&
						Application.LoadedScene.GameObjects[i].hitbox.h != undefined) {

					if ( Physics.BoxBoxCollision(this.hitbox, Application.LoadedScene.GameObjects[i].hitbox) ) {						

						Application.LoadedScene.GameObjects.splice(i,1);
						Application.LoadedScene.GameObjects.splice(Application.LoadedScene.GameObjects.indexOf(this),1);
					}
				}
			}

			// out of range
			if (this.Physics.Collider.position.x > canvas.width ||
				this.Physics.Collider.position.y > canvas.height || this.Physics.Collider.position.x < 0 ||
				this.Physics.Collider.position.y < 0 ) {
				Application.LoadedScene.GameObjects.splice(Application.LoadedScene.GameObjects.indexOf(this),1);
			}

			this.Renderer.Draw();
		}

		this.GUI();	
	};
	this.GUI = function() {
		if (Application.debugMode) {
			// box collider
			ctx.beginPath();
			ctx.rect(this.Physics.Collider.position.x, this.Physics.Collider.position.y, this.Physics.Collider.size.x, this.Physics.Collider.size.y);
			ctx.fillStyle = Debug.ColliderColor;
			ctx.fill();
			ctx.closePath();

			//sprite size
			ctx.beginPath();
			ctx.rect(this.Transform.position.x, this.Transform.position.y, this.Transform.size.x * this.Transform.scale.x, this.Transform.size.y * this.Transform.scale.y);
			ctx.strokeStyle = Debug.SpriteOutlineColor;
			ctx.stroke();
			ctx.closePath();			
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