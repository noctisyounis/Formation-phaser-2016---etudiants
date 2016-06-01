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
*	@property Transform.RelativePosition																							   {boolean}			 
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

function ReadButton(config) {
	this.name = "ReadButton";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.FixedToCamera = true;

	this.velocity = 5;
	this.box = new Box();
	this.buttonText = "";
	this.displayText = "display stored content";

	this.Parent = null;
	
	this.Transform = {};
	this.Transform.RelativePosition = new Vector();
	this.Transform.Position = this.Transform.RelativePosition;
	this.Transform.Size = new Vector();
	this.Transform.RelativeScale = new Vector(1,1);
	this.Transform.Scale = this.Transform.RelativeScale;
	this.Transform.Pivot = new Vector(0,0);
	this.Transform.angle = 0;

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
		AnimationCount:0,
		Animation:{
			animated: true,
			Animations: [],
			Current:[],
			countdown:0
		},
		
		Draw: function() {
			var scaledSizeX = this.That.Size.x*this.That.scale.x;
			var scaledSizeY = this.That.Size.y*this.That.scale.y;

			ctx.save();
			ctx.translate( (this.That.Position.x) , 
							(this.That.Position.y) );
			ctx.rotate( Math.DegreeToRadian(this.That.angle) );
			if (this.isSpriteSheet) 
			{
				if (this.Animation.animated) {	
					
					if (this.animationCount > this.Animation.totalAnimationLength/this.Animation.Current.length) {
						this.Animation.currentIndex ++ ;
						this.animationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.Current.length-1) {
							this.Animation.currentIndex = 0;
						}
					} 
					
					this.animationCount += Time.deltaTime;
					
				}else {
					this.animationCount = 0;
					this.Animation.currentIndex = 0;
				}
				this.Material.CurrentFrame = this.Animation.Current[this.Animation.currentIndex];

				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								-this.That.Pivot.x*scaledSizeX,
								-this.That.Pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			} 
			else 
			{
				ctx.drawImage(this.Material.Source,
								-this.That.Pivot.x*scaledSizeX,
								-this.That.Pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY);
			}
			ctx.restore();
		}
					

	};


	this.Awake = function() {
		console.log('%c System:GameObject ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.Start = function() {
		if (!this.started) {
			// operation start
			this.Transform.RelativePosition = new Vector(config.x,config.y);
			this.Transform.Size = new Vector(150, 150);
			this.box.x = this.Transform.RelativePosition.x;
			this.box.y = this.Transform.RelativePosition.y;
			this.box.w = this.Transform.Size.x;
			this.box.h = this.Transform.Size.y;


			
			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.PreUpdate();
	};
	this.PreUpdate = function() {
		if ( this.enabled ) {
			if (this.Parent != null) {
				this.Transform.Position.x = this.Transform.RelativePosition.x + this.Parent.Transform.Position.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y + this.Parent.Transform.Position.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x * this.Parent.Transform.Scale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y * this.Parent.Transform.Scale.y;
			} else {
				this.Transform.Position.x = this.Transform.RelativePosition.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y;
			}
			if (!this.FixedToCamera) {
				this.Transform.Position.x -= Application.LoadedScene.CurrentCamera.Transform.Position.x;
				this.Transform.Position.y -= Application.LoadedScene.CurrentCamera.Transform.Position.y;
			}



			this.Update();
		}
			
	};
	this.Update = function() {
		ctx.fillStyle = config.color;		
		ctx.textAlign = 'center';
		this.text = config.text;

		if (Physics.CheckCollision(Input.MousePosition, this.box)) {
			if (Input.mouseClick) {
				var loadedContent = LocalStorage.Load("key1");
				if(loadedContent != null){
					this.displayText = loadedContent;
				}else{
					this.displayText = "no value for key founded mothafucka";
				}
				
			}
			
		}

		/* BUTTON */
		ctx.fillRect(this.Transform.RelativePosition.x, this.Transform.RelativePosition.y, this.Transform.Size.x, this.Transform.Size.y);
		ctx.fillStyle = "black";	
		ctx.font = '25px Arial';
		ctx.fillText( this.text, this.Transform.RelativePosition.x + this.box.w/2
					 ,this.Transform.RelativePosition.y + this.box.h/2 );


		/* DISPLAY STORED VALUE */
		ctx.fillStyle = "lightblue";	
		ctx.fillRect(100, 400, 500, 100);
		ctx.fillStyle = "black";
		ctx.font = '25px Arial';
		ctx.fillText( this.displayText, 350,450 );

		this.PostUpdate();	
	};
	this.PostUpdate = function() {
		


		this.GUI();	
	};
	this.GUI = function() {
		Debug.MousePosition();
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