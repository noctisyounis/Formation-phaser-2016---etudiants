/**
 * Create a new Alpha Mask <br />
 * Upload your image via the LoadImages function in Games/Init.js.
 * 
 * @class
 * 
 * @return {AlphaMaskStruct}
 * */
function AlphaMaskStruct()
{
	this.name = "AlphaMask";
	this.enabled = true;
	this.started = false;
	this.frameHovered = 0;
	this.rendered = false;
	/**
	 * Set the position of the Alpha Mask.
	 * 
	 * */
	this.Transform = {
		Position : new Vector(),
		Size : new Vector(),
		Scale : new Vector(),
		Pivot : new Vector(0,0),
		angle : 0
	}
	/**
	 * Display the AlphaMask, add your image in Material.Source.
	 * */
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

			ctx.drawImage(this.Material.source,
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
	/**
	 * Called at the instruction new AlphaMaskStruct().
	 * */
	this.Awake = function() {
		//console.clear();
		console.log("%c System: AlphaMaskStruct " + this.name + " Created!", 'background:#222; color:#bada55');
	}
	/**
	 * Launch the rendering and show a message in console or launch Update() if already started
	 * */
	this.Start = function() {
		if (!this.started) {
			//To do on start
			this.Renderer.Draw();
			this.started = true;
			console.log("%c System: AlphaMaskStruct " + this.name + " Started!", 'background:#222; color:#bada55');
		}
		this.Update();
	}
	/**
	 * Called each frame.
	 * */
	this.Update = function() {
		
	}

	this.Awake();
}