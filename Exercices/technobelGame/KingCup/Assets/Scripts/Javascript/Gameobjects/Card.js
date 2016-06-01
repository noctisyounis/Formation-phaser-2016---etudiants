function Card(Color,id) {
	this.name = "Cards";
	this.enabled = true;
	this.started = false;
	this.rendered = true;
	this.color=Color;
	this.id=id;
	this.isReturned = false;
	this.Transform = {};
	this.Transform.position = new Vector();
	this.Transform.size = new Vector();
	this.Transform.scale = new Vector(1,1);
	this.Transform.pivot = new Vector(0,0);

	this.Physics = {};
	this.Physics.enabled = true;
	this.Physics.Clickable = true;
	this.Physics.dragAndDroppable = false;
	this.Physics.ColliderIsSameSizeAsTransform = true;
	this.Physics.countHovered = 0;
	this.Physics.Collider = {
		position: new Vector(),
		size: new Vector()
	};

	this.Renderer = {
		isVisible: true,
		isSpriteSheet: false,
		that: this.Transform,
		Material: {
			Source: "",
			SizeFrame: new Vector(),
			CurrentFrame: new Vector()
		},

		Animation:{
			animated: true,
			animations: [],
			current:[],
			countdown:0
		},
		
		Draw : function(id)
		{
			if (this.isSpriteSheet)
			{
				
				ctx.drawImage(this.Material.Source,
							this.Animation.current[id].sX,
							this.Animation.current[id].sY,
							this.Material.SizeFrame.x,
							this.Material.SizeFrame.y,
							this.that.position.x - this.that.pivot.x*this.that.scale.x*this.that.size.x,
							this.that.position.y - this.that.pivot.y*this.that.scale.y*this.that.size.y,
							this.that.size.x*this.that.scale.x,
							this.that.size.y*this.that.scale.y);
				
			}else{
				ctx.drawImage(Images["cardBack"],
						this.that.position.x - this.that.pivot.x*this.that.scale.x*this.that.size.x
						,this.that.position.y - this.that.pivot.y*this.that.scale.y*this.that.size.y
						,this.that.size.x*this.that.scale.x
						,this.that.size.y*this.that.scale.y);
			}
			
		}			

	};


	this.Awake = function() {
		console.log('%c System:GameObject ' + this.name + " Created !", 'background:#222; color:#b00b55');
	};
	this.SetPosition = function(x,y){
		this.Transform.position.x = x;
		this.Transform.position.y = y;
	};
	this.SetPositionCollider = function(x,y){
		this.Physics.Collider.position.x = x;
		this.Physics.Collider.position.y = y;
	};
	this.SetSize = function(x,y){
		this.Transform.size.x = x;
		this.Transform.size.y = y;
	};
	this.SetColliderSize = function(x,y){
		this.Physics.Collider.size.x = x;
		this.Physics.Collider.size.y = y;
	};
	this.SetScale = function(x,y){
		this.Transform.scale.x =x;
		this.Transform.scale.y =y;
	};
	this.SetPivot = function(x,y){
		this.Transform.pivot.x = x;
		this.Transform.pivot.y = y;
	};
	this.Start = function() {
		if (!this.started) {
			this.SetPosition(100,100);
			this.SetSize(70,120);
			this.SetColliderSize(70,120);
			this.SetPositionCollider(100,100);
				this.Renderer.Material.CurrentFrame.x=0;
				this.Renderer.Material.CurrentFrame.y=0;
				this.Renderer.Material.SizeFrame.x=80;
				this.Renderer.Material.SizeFrame.y=120;
			this.Renderer.Material.Source = Images["cards"];
			for (var i = 0; i < 4; i++) {
				var tabTemp = [];
				for (var j = 0; j < 13; j++) {
					tabTemp.push({
							sY : (this.Renderer.Material.CurrentFrame.y+i)*this.Renderer.Material.SizeFrame.y,
							sX : (this.Renderer.Material.CurrentFrame.x+j)*this.Renderer.Material.SizeFrame.x,
						});		
				}
				this.Renderer.Animation.animations.push(tabTemp);
			}
			this.Renderer.Animation.current = this.Renderer.Animation.animations[3];
			this.started = true;
			console.log('%c System:GameObject ' + this.name + " Started !", 'background:#222; color:#bada55');
		}
		this.Update();
	};
	this.Update = function() {
		if ( this.enabled ) {
			if(this.isReturned){
				switch(this.color)
				{
					case "pic":this.Renderer.Animation.current = this.Renderer.Animation.animations[3];
					break;
					case"carreau":this.Renderer.Animation.current = this.Renderer.Animation.animations[1];
					break;
					case"coeur":this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
					break;
					case"trefle":this.Renderer.Animation.current = this.Renderer.Animation.animations[2];
					break;
					
				};
				this.Renderer.Draw(this.id-1);	
			}else{
				this.Renderer.Draw();
			}
			

		}
		Physics.CheckClick();
		this.GUI();	
	};
	this.GUI = function() {
		
	}
	this.onHover = function() {
		this.Physics.countHovered ++;
		
	}
	this.onClicked = function() {
		this.Physics.countHovered ++;
		
		this.Renderer.isSpriteSheet= true;
		if(!this.isReturned){
			this.isReturned=true;
			this.ReturnCard();
		}
			
	}
	this.onUnHovered = function() {
		this.Physics.countHovered = 0;
	}
	this.ReturnCard= function()
	{	
		var text ="";
			console.log("click");
			switch(this.id){
				case 1 :
				case 2 :
				case 3 :
				case 4 :
				case 5 :if(this.color==="pic"||this.color==="trefle"){
							text = "le joueur qui a retourner la carte doit boire "+(this.id+1)+" gorgées!";
						}else{
							text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
						}
				break;
				case 6 :text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
				break;
				case 7 :text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
				break;
				case 8 :text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
				break;
				case 9 :text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
				break;
				case 10 :text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
				break;
				case 11 :text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
				break;
				case 12 :text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
				break;
				case 13 : if(this.color==="pic"||this.color==="trefle"){
							text = "le joueur qui a retourner la carte doit boire "+(this.id+1)+" gorgées!";
						}else{
							text = "le joueur qui a retourner la carte fait boire "+(this.id+1)+" gorgées a un autre joueur!";
						}
				break;
			}
		
		Application.LoadedScene.text = text;	
	}
	this.Awake();

}