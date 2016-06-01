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

function TweenObjectFall() {
	this.name = "TweenObjectFall";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.FixedToCamera = true;

	this.velocity = 6;
	this.box = new Box();
	this.text = "";

	this.Parent = null;
	
	this.Transform = {};
	this.Transform.relativePosition = new Vector();
	this.Transform.position = this.Transform.relativePosition;
	this.Transform.size = new Vector();
	this.Transform.relativeScale = new Vector(1,1);
	this.Transform.scale = this.Transform.relativeScale;
	this.Transform.pivot = new Vector(0,0);
	this.Transform.angle = 0;

	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.Clickable = false;
	this.Physics.dragAndDroppable = false;
	this.Physics.ColliderIsSameSizeAsTransform = false;
	this.Physics.countHovered = 0;
	this.Move = {
		duration: 3000,
		start: false,
		pause: false,
		end: false,
		round: 0,
		final: {x: 0, y: 0}, 
		startTime: 0,
		velocityOrientation: 1,
		maxHeight: 50

	};
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
		AnimationCount:0,
		Animation:{
			animated: true,
			animations: [],
			current:[],
			countdown:0
		},
		
		Draw: function() {
			var scaledSizeX = this.that.size.x*this.that.scale.x;
			var scaledSizeY = this.that.size.y*this.that.scale.y;

			ctx.save();
			ctx.translate( (this.that.position.x) , 
							(this.that.position.y) );
			ctx.rotate( Math.DegreeToRadian(this.that.angle) );
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

				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.that.pivot.x*scaledSizeX,
								-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			} 
			else 
			{
				ctx.drawImage(this.Material.Source,
								-this.that.pivot.x*scaledSizeX,
								-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			}
			ctx.restore();
		}
					

	};


	this.Awake = function() {
		console.log('%c System:TweenObjectFall ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.Start = function() {
		if (!this.started) {
			// operation start
			this.Transform.relativePosition = new Vector(canvas.width/2, 50);
			this.Transform.size = new Vector(50, 50);
			this.box.x = this.Transform.relativePosition.x;
			this.box.y = this.Transform.relativePosition.y;
			this.box.w = this.Transform.size.x;
			this.box.h = this.Transform.size.y;

			this.Move.final.y = canvas.height - this.Move.maxHeight;
			this.Move.startTime = Date.now()
			this.Move.final.y = this.Transform.relativePosition.y;
			
			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.PreUpdate();
	};
	this.PreUpdate = function() {
		if ( this.enabled ) {
			if (this.Parent != null) {
				this.Transform.position.x = this.Transform.relativePosition.x + this.Parent.Transform.position.x;
				this.Transform.position.y = this.Transform.relativePosition.y + this.Parent.Transform.position.y;

				this.Transform.scale.x = this.Transform.relativeScale.x * this.Parent.Transform.scale.x;
				this.Transform.scale.y = this.Transform.relativeScale.y * this.Parent.Transform.scale.y;
			} else {
				this.Transform.position.x = this.Transform.relativePosition.x;
				this.Transform.position.y = this.Transform.relativePosition.y;

				this.Transform.scale.x = this.Transform.relativeScale.x;
				this.Transform.scale.y = this.Transform.relativeScale.y;
			}
			if (!this.FixedToCamera) {
				this.Transform.position.x -= Application.LoadedScene.currentCamera.Transform.position.x;
				this.Transform.position.y -= Application.LoadedScene.currentCamera.Transform.position.y;
			}



			this.Update();
		}
			
	};
	var i = 0;
	this.Update = function() {
		i += 0.1;
		//console.log(Tween.Linear(Time.GetTimeWhenSceneBegin(), 3, 4, 5))
		ctx.fillStyle = "red";
		if(Input.mouseClick){
			this.Move.start = true;
		}
		// if(this.Transform.relativePosition.x == this.Move.final.x) {
		// 	this.Move.pause = true;
		// 	//this.Move.start = false;
		// 	i = 0;
		// }
		if(this.Move.start && !this.Move.pause ) {
			// if(Date.now() > (this.Move.startTime + this.Move.duration)) {

			this.Transform.relativePosition.y += this.velocity * this.Move.velocityOrientation;
			if(this.Transform.relativePosition.y > (canvas.height - 50)  || this.Transform.relativePosition.y < this.Move.maxHeight ) {
				this.Move.velocityOrientation *= -1;
				if(this.Transform.relativePosition.y > (canvas.height - this.Move.maxHeight)) {
						this.Move.maxHeight += this.Move.maxHeight;
						if(this.Move.maxHeight > (canvas.height - 50) ) {
							this.velocity = 0;
						}
				}
			}
			// this.Transform.relativePosition.y = 300 + (5 * Math.sin(i) * i);
			// }
		}
	//	console.log(this.Transform.relativePosition.x)
			ctx.beginPath();
			// ctx.fillStyle = "blue";
			ctx.fill;
			ctx.arc(this.Transform.relativePosition.x,
				this.Transform.relativePosition.y,
				20,0,2*Math.PI);
			ctx.stroke();
		// ctx.fillRect(this.Transform.relativePosition.x, this.Transform.relativePosition.y,
		// 			 this.Transform.size.x, this.Transform.size.y);


		this.PostUpdate();	
	};
	this.PostUpdate = function() {
		
		this.GUI();	
	};
	this.GUI = function() {
		// Debug.MousePosition();
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