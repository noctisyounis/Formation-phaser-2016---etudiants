function GameObject1() 
{
	this.name = "GameObject1";
	this.enabled = true;
	this.started = false;
	this.frameHovered = 0;

	this.Transform = {
		position : new Vector(),
		size : new Vector()
	}

	this.Physics = {
		enabled: true,
		clickable : true,
		dragAndDroppable : true,
		colliderIsSameSizeAsTransform : true,
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
			this.Transform.position.x = 0;
			this.Transform.position.y = 0;
			this.Transform.size.x = 50;
			this.Transform.size.y = 50;
			if (this.Physics.colliderIsSameSizeAsTransform) {
				this.Physics.boxCollider = this.Transform;
			}
			this.started = true;
			console.log(this.Physics.boxCollider.position)
			console.log(this.Physics.boxCollider.size)
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#222; color:#bada55');

		}
		this.Update();
	}

	this.Update = function() {
		if (this.enabled) {
			ctx.fillStyle = "red";
			ctx.fillRect(this.Transform.position.x,this.Transform.position.y,
					this.Transform.size.x,this.Transform.size.y);
		}
		this.GUI();
	}

	this.GUI = function() {

	}

	this.OnClicked = function() {
		this.frameHovered++;
		if (this.Physics.dragAndDroppable) {
			Input.MouseDraging = true;
			Input.DraggedElement = this;
			this.Drag();
		}
	}

	this.OnHovered = function() {
		this.frameHovered++;
		if (this.Physics.dragAndDroppable && Input.MouseClick) {
			this.Drag();
		}
	}

	this.UnHovered = function () {
		this.frameHovered = 0;
		if (this.Physics.dragAndDroppable && Input.MouseClick) {
			this.Drag();
		}
	}

	this.Drag = function() {
		this.Transform.position.x = Input.MousePosition.x;
		this.Transform.position.y = Input.MousePosition.y;
	}

	this.Awake();
}