/**
 * Create a new Particles System
 * 
 * @class
 * @param {Vector} _position - The position of the ParticlesSystem
 * @return {ParticlesSystem}
 * */
function ParticlesSystemExample(_position)
{
	this.name = "ParticlesSystemExample";
	this.enabled = true;
	this.started = false;
	this.rendered = true;

	this.Parent = null;

	this.Emitters = [];
	this.Fields = [];
	
	this.Transform = {};
	this.Transform.RelativePosition = _position;
	this.Transform.Position = new Vector();
	this.Transform.RelativeScale = new Vector(1, 1);
	this.Transform.Size = new Vector();
	this.Transform.Scale = new Vector(1,1);

	/** 
	* Add a Field or an Emitter to the Particles System
	* @param {Emitter|Field} _element - The vector to add
	*
	* */
	this.AddElement = function(_element)
	{
		if (_element instanceof EmitterExample) 
		{
			_element.Parent = this;
			this.Emitters.push(_element);
		}
		else if (_element instanceof EmitterExample2) 
		{
			_element.Parent = this;
			this.Emitters.push(_element);
		}
		else if (_element instanceof FieldExample) 
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
			// add EmitterExample(_position, _velocity, _spread, _rate, _max, _color) 
			//add FieldExample(_position, _mass)
			this.AddElement(new EmitterExample(
					new Vector(600, 0),
					new Vector(0, 5),
					null,
					1,
					10,
					"black"
				));
			this.AddElement(new EmitterExample2(
					new Vector(window.innerWidth, window.innerHeight),
					new Vector(-5, 0),
					null,
					1,
					10,
					"blue"
				));
			this.AddElement(new FieldExample(
					new Vector(200, 400),
					-2000
				));
			this.AddElement(new FieldExample(
					new Vector(800, 400),
					10
				));
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

			for (var emitter in this.Emitters) 
			{
				this.Emitters[emitter].Update();
			}

			for (var field in this.Fields){
				this.Fields[field].Update();
			}
		}
	};

	this.Awake();

}