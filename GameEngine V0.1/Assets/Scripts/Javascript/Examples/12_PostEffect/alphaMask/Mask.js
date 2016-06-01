function Mask()
{
	this.name = "Mask";
	this.enabled = true;
	this.started = false;
	this.frameHovered = 0;
	this.rendered = false;

	this.Transform = {
		Position : new Vector(0,0),
		Size : new Vector(canvas.width/2,canvas.height/2),
		Scale : new Vector(1,1),
		Pivot : new Vector(0,0),
		angle : 0
	}

	this.Renderer = {
		That : this.Transform,
		Material : {
			Source : ""
		},
		Pixels : null,

		Draw : function() {
			ctx.save();
			ctx.translate(this.That.Position.x , this.That.Position.y);
			ctx.rotate(Math.DegreeToRadian(this.That.angle));

			ctx.drawImage(this.Material.Source,
						- this.That.Pivot.x * this.That.Size.x * this.That.Scale.x,
						- this.That.Pivot.y * this.That.Size.y * this.That.Scale.y,
						this.That.Size.x * this.That.Scale.x,
						this.That.Size.y * this.That.Scale.x);	
			
			this.Pixels = ctx.getImageData(- this.That.Pivot.x * this.That.Size.x * this.That.Scale.x,
											- this.That.Pivot.y * this.That.Size.y * this.That.Scale.y,
											this.That.Size.x * this.That.Scale.x,
											this.That.Size.y * this.That.Scale.x);

			ctx.restore();
			ctx.clearRect(0,0,canvas.width,canvas.height);
		}
	}

	this.Awake = function() {
		//console.clear();
		this.Renderer.Material.Source = Images["alphaMask3"];
		
		console.log("%c System: AlphaMaskStruct " + this.name + " Created!", 'background:#222; color:#bada55');
	}

	this.Start = function() {
		if (!this.started) {
			//To do on start
			this.Renderer.Draw();
			this.started = true;
			console.log("%c System: AlphaMaskStruct " + this.name + " Started!", 'background:#222; color:#bada55');
		}
		this.Update();
	}

	this.Update = function() {
	}

	this.Awake();
}