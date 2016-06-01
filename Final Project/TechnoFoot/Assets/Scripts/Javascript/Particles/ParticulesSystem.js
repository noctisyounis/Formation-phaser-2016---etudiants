/**
 * Create a new Particles System
 * 
 * @class
 * @param {Vector} _position - The position of the ParticlesSystem
 * @return {ParticlesSystem}
 * */
function ParticlesSystem(_position)
{
	this.name = "ParticlesSystem";
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
		if (_element instanceof Emitter) 
		{
			_element.Parent = this;
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
			//add Fiels
			//	_position, _velocity, _spread, _rate, _max, _color
			var random1 = Math.Random.RangeInt(canvas.width/2 - 200, canvas.width/2 + 200, true);
			this.AddElement(new Emitter(new Vector(random1,80),
							new Vector(0, 2),
							null,
							10,
							200,
							null));
			var random2 = Math.Random.RangeInt(20, 280, true);
			this.AddElement(new Emitter(new Vector(random2,160),
							new Vector(0, 5),
							null,
							40,
							250,
							null));
			var random3 = Math.Random.RangeInt(400, 600, true);
			this.AddElement(new Emitter(new Vector(random3,250),
							new Vector(0, 7),
							null,
							20,
							200,
							null));
			// _position, _mass
			var posX = Scenes["Loader"].track.Transform.RelativePosition.x 
						+ Scenes["Loader"].track.Transform.Size.x/2;
			var posY = Scenes["Loader"].track.Transform.RelativePosition.y;
			this.AddElement(new Field(new Vector(posX, posY), -10));
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

			// _position, _mass
			var posX = Scenes["Loader"].track.Transform.RelativePosition.x 
						+ Scenes["Loader"].track.Transform.Size.x/2;
			var posY = Scenes["Loader"].track.Transform.RelativePosition.y;
			this.Fields[0].Position.x = posX;
			this.Fields[0].Position.y = posY;

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