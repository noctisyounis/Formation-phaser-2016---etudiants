function GameObject() 
{
	this.name = "Model";
	this.enabled = true;
	this.started = false;
	this.frameHovered = 0;

	this.Transform = {
		position : new Vector(),
		size : new Vector()
	}
	this.Physics = {
		enabled: true,
		clickable : false,
		dragAndDroppable : false,
		colliderIsSameSizeAsTransform : false,
		boxCollider : {
			position : new Vector(),
			size : new Vector()
		}
	}

	this.Awake = function() {
		console.clear();
		console.log("%c System:GameObject " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started) {
			//To do on start
			if (this.colliderIsSameSizeAsTransform) {
				this.Transform.size = this.boxCollider.size;
			}
			this.started = true;
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#222; color:#bada55');

		}
		this.Update();
	}

	this.Update = function() {
		if (this.enabled) {

		}
		this.GUI();
	}

	this.GUI = function() {

	}

	this.OnClicked = function() {
		this.frameHovered++;
	}

	this.OnHovered = function() {
		this.frameHovered++;
	}

	this.UnHovered = function () {
		this.frameHovered = 0;
	}

	this.Awake();
}