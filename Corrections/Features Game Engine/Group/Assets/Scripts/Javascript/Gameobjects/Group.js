function Group(name, position) {
	this.name = name || "Model";
	this.started = false;
	this.enabled = true;

	this.Parent = null

	this.GameObjects =[];
	
	this.Transform = {};
	this.Transform.relativePosition = position;
	this.Transform.position = new Vector(0,0);
	this.Transform.relativeScale = new Vector(1,1);
	this.Transform.scale = new Vector(1,1);


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