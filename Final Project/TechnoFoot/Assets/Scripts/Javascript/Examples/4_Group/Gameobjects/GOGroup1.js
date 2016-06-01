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
*	Position,Size, Scale and rotation of the GameObject.
*
*		
*	@property Position 																							{x: float, y: float} 
*	Position of the GameObject.
*
*	@property Size
*	Size in pixel of the GameObject.
*
*	@property Scale
*	Scale multiplier of the GameObject.
*
*	@Pivot
*	Define the center of draw/rotation of the object.
*
*	@property rotation																							{x: float, y: float} 
*	Rotation of the GameObject. (not yet)
*
*	@property Scale																								{x: float, y: float} 
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
*	Position, rotation and Scale of the box collider.
*	
*			
*	@property Position 																							{x: float, y: float} 
*	Position of the box collider.
*
*	@property rotation																							{x: float, y: float} 
*	Rotation of the box collider. (don't use)
*
*	@property Scale																								{x: float, y: float} 
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
*	@method SetPosition (): Set Position of gameObject.
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

function GOGroup1() 
{
	this.name = "GOGroup1";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.fixedToCamera = true;

	this.MouseOffset = new Vector();

	this.Parent = null;
	
	this.Transform = {};
	this.Transform.RelativePosition = new Vector();
	this.Transform.Position = new Vector();
	this.Transform.Size = new Vector();
	this.Transform.RelativeScale = new Vector(1,1);
	this.Transform.Scale = new Vector(1,1);
	this.Transform.Pivot = new Vector(0,0);
	this.Transform.angle = 0;

	this.SetPosition = function(_x, _y)
	{
		this.Transform.RelativePosition.x = _x;
		this.Transform.RelativePosition.y = _y;
	};

	this.SetPositionCollider = function(_x, _y)
	{
		this.Physics.Collider.Position.x = _x;
		this.Physics.Collider.Position.y = _y;
	};

	this.SetSize = function(_x, _y)
	{
		this.Transform.Size.x = _x;
		this.Transform.Size.y = _y;
	};

	this.SetColliderSize = function(_x, _y)
	{
		this.Physics.Collider.Size.x = _x;
		this.Physics.Collider.Size.y = _y;
	};

	this.SetScale = function(_x, _y)
	{
		this.Transform.Scale.x = _x;
		this.Transform.Scale.y = _y;
	};
	
	this.SetPivot = function(_x, _y)
	{
		this.Transform.Pivot.x = _x;
		this.Transform.Pivot.y = _y;
	};

	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.isClicked = false;
	this.Physics.clickable = true;								// Useless?
	this.Physics.dragAndDroppable = true;						// Useless?
	this.Physics.colliderIsSameSizeAsTransform = true;
	this.Physics.countHovered = 0;

	// can be a Transform, Circle, Box
	this.Physics.Collider = new Box();

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
		
		Draw: function()
		{
			ctx.fillStyle = "rgba(211, 73, 73, 1)";
			ctx.fillRect(this.That.Position.x,
							this.That.Position.y,
							this.That.Size.x,
							this.That.Size.y);
		}
	};

	this.Awake = function() 
	{
		Print('System:GameObject ' + this.name + " Created !");
	};
	this.Start = function() 
	{
		if (!this.started) {
			// operation start
			this.SetPosition(20, 20);
			this.SetSize(this.Parent.Transform.Size.x/10, this.Parent.Transform.Size.y/10);

			this.started = true;
			Print('System:GameObject ' + this.name + " Started !");
		}
		this.PreUpdate();
	};
	this.PreUpdate = function() 
	{
		if (this.enabled) 
		{
			if (this.Parent != null) 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x + this.Parent.Transform.Position.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y + this.Parent.Transform.Position.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x * this.Parent.Transform.Scale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y * this.Parent.Transform.Scale.y;

			} 
			else 
			{
				this.Transform.Position.x = this.Transform.RelativePosition.x;
				this.Transform.Position.y = this.Transform.RelativePosition.y;

				this.Transform.Scale.x = this.Transform.RelativeScale.x;
				this.Transform.Scale.y = this.Transform.RelativeScale.y;
			}
			if (Application.LoadedScene.CurrentCamera != null) 
			{
				Application.LoadedScene.CurrentCamera.Start();
				if (!this.fixedToCamera) 
				{
					this.Transform.Position.x -= Application.LoadedScene.CurrentCamera.Transform.Position.x;
					this.Transform.Position.y -= Application.LoadedScene.CurrentCamera.Transform.Position.y;
				}
			}
			if (this.Physics.colliderIsSameSizeAsTransform) {
				this.Physics.Collider = new Box(this.Transform.Position.x,
												this.Transform.Position.y,
												this.Transform.Size.x,
												this.Transform.Size.y
												);
			}
			this.Update();
		}
			
	};
	this.Update = function()
	{
		this.Renderer.Draw();
		this.PostUpdate();	
	};
	this.PostUpdate = function() 
	{
		if (Application.debugMode) {
			Debug.DebugObject(this);
		}
		


		this.GUI();	
	};
	this.GUI = function() 
	{
		
	}
	this.onHover = function() 
	{
		this.Physics.countHovered ++;	
	}
	this.onClicked = function() 
	{

	}
	this.onUnHovered = function() 
	{
		this.Physics.countHovered = 0;
	}

	this.Awake();

}