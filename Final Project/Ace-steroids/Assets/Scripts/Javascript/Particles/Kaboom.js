/**
 * Create a new Particles System
 * 
 * @class
 * @param {Vector} _position - The position of the ParticlesSystem
 * @return {ParticlesSystem}
 * */
function Kaboom(_position)
{
	this.name = "Kaboom";
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.Parent = null;

	this.Emitters = [];
	this.Fields = [];
	
	this.Transform = {};
	console.log(_position);
	this.Transform.RelativePosition = _position;
	this.Transform.Position = _position;
	this.Transform.RelativeScale = new Vector(1, 1);
	this.Transform.Size = new Vector(1,1);
	this.Transform.Scale = new Vector(1,1);
	this.time = Time.Time;

	/** 
	* Add a Field or an Emitter to the Particles System
	* @param {Emitter|Field} _element - The vector to add
	*
	* */
	this.AddElement = function(_element)
	{
		if (_element instanceof Emitter) 
		{
			_element.SetParent(this);
			this.Emitters.push(_element);
		}
		else if (_element instanceof Field) 
		{
			_element.Parent = this;
			this.Fields.push(_element);
		}
		else 
		{
			PrintErr("Particule System " + this.name + " can only add Emitters or Fields");
		}
	}

	/** 
	* Create the Particles System, log a message in the console
	*
	* */
	this.Awake = function()
	{
		Print('System: Particle System ' + this.name + " Created !");
		this.Start();
	};

	/** 
	* Start the Particles System, launch Update() if already started
	*
	* */
	this.Start = function() 
	{
		if (!this.started) 
		{
			// operation start
			// add Emitter
				console.log('ici');
				//for (var i = 1; i < Application.LoadedScene.GameObjects.length; i++) 
				//{
					this.AddElement( new Emitter(
					new Vector(0,0),
					new Vector(1,1),
					15,
					10,
					30))
				//}
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
			//add Fiels
			this.started = true;
			Print('System: Particle System ' + this.name + " Started !");
		}
		this.Update();
	};

	/** 
	* Update every values of the Particles System
	*
	* */
	this.Update = function() 
	{
		
		if ( this.enabled ) 
		{
			/*if (this.Parent != null)
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
			}*/
			var el;
			for (var emitter in this.Emitters) 
			{
				el = this.Emitters[emitter];
				//this.Emitters[emitter].Update();
				el.Update();
			}

			for (var field in this.Fields){
				this.Fields[field].Update();
			}

		}
	};

	this.Awake();

}