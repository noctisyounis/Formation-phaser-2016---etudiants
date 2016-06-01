function Group(name, position) {
	this.name = name || "Model";
	this.started = false;
	this.enabled = true;

	this.Parent = null

	this.GameObjects =[];
	
	this.Transform = {};
	this.Transform.RelativePosition = position;
	this.Transform.Position = new Vector(0,0);
	this.Transform.RelativeScale = new Vector(1,1);
	this.Transform.Scale = new Vector(1,1);


	this.Awake = function() {
		console.log('%c System:Group ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.Start = function() {
		if (!this.started) {
			// operation start

			this.started = true;
			console.log('%c System:Group ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.Update = function() {
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
			


			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}

		}
	};
	this.AddGameObject = function(go) {
		go.Parent = this;
		this.GameObjects.push(go);
	};
	this.RemoveGameObject = function(go) {
		go.Parent = null;

		var index = this.GameObjects.indexOf(go);

		return this.GameObjects.splice(index,1)[0];
	};

	

	this.Awake();

}