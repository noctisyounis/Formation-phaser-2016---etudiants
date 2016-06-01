var Dialogs = {
	font: "Arial",
	fontSize: 12,
	color: "#000000",
	altColor: "#000000",
	text: "",
	destination: new Box(),
	interval: 1,

	colored: false,
	interupted: false,

	currentTime: 0,
	wordCounter: 0,
	letterCounter: 0,

	words : [],
	currentPosition: new Vector(),

	initText: function(text,font,fontSize,color,destination,interval) {
		//console.log('initText');
		this.text = "";
		this.font = font || "Arial";
		this.fontSize = fontSize || 12;
		this.color = color || "#FFF";
		this.baseColor = this.color;
		this.destination = destination || new Box(canvas.width/2 - 250,canvas.height - 250,500,200);
		this.interval = interval || 2;

		ctx.font = this.fontSize+'px '+this.font;
		ctx.fillStyle = this.color;

		this.currentPosition = new Vector(this.fontSize,0);
		this.wordCounter = 0;
		this.letterCounter = 0;
		this.nextTime = Time.Time;
		this.interupted = false;

		this.Begin(text);

	},
	Begin: function(text) {
		//console.log('Begin');
		this.words = text.split(' ');
	},
	Continue: function() {
		//console.log('Continue');
		if (this.wordCounter == this.words.length ) {
			// End of text
			this.Write("");
			//console.log('End of text');
			return;
		}
		if (Time.Time >= this.nextTime + this.interval*125 ) {
			//console.log('ContinueTime');
			
			//console.log(this.words[1]);
			var char = this.words[this.wordCounter][this.letterCounter];
			
			
			this.Write(char);
			this.letterCounter++;
			this.nextTime = Time.Time;


			if (this.letterCounter == this.words[this.wordCounter].length) {
				//var lengthSpace = ctx.measureText(" ").width;
				//console.log("ls",lengthSpace);
				//this.currentPosition.x += lengthSpace;
				this.text += " ";
				this.letterCounter = 0;
				this.wordCounter++;
				this.CheckBalise(this.words[this.wordCounter]);
				this.CheckLineLength(this.words[this.wordCounter]);
			}
		} else {
			this.Write("");
		}

	},
	RapidPlay: function() {
		//console.log('RapidPlay');
		this.interval = 0;
	},
	Interupt: function() {
		if (!this.interupted) {
			//console.log('Interupted');
			this.interupted = true;
			this.text = "";
			this.wordCounter = 0;
			this.letterCounter = 0;
			//var lengthSpace = ctx.measureText(" ").width;
			this.currentPosition = new Vector(this.fontSize,0)
			for (this.wordCounter = 0; this.wordCounter < this.words.length; this.wordCounter++) {
				//this.currentPosition.x += lengthSpace;
				this.CheckBalise(this.words[this.wordCounter]);
				this.CheckLineLength(this.words[this.wordCounter]);
				this.Write(this.words[this.wordCounter]);
				this.text += " ";
				
			}
		}
	},
	Write: function(char) {
		//console.log('Write');
		this.text += char;
		ctx.textAlign = 'start';

		ctx.textBaseline = 'top';
		ctx.font = this.fontSize+'px '+this.font;
		ctx.fillStyle = this.color;

		var array = this.text.split("<br>");
		//console.log(this.text);
		for (index in array) {
			var arrayColor = array[index].split("§");
			console.log(arrayColor);
			if (arrayColor.length == 1) {
				ctx.fillStyle = this.color;
				ctx.fillText(array[index] , this.destination.x, this.destination.y + index*this.fontSize);
			} else {
				var offset = 0;
				for (i in arrayColor) {
					
					ctx.fillText(arrayColor[i] , this.destination.x+offset, this.destination.y + index*this.fontSize);
					offset += ctx.measureText(arrayColor[i]).width;
					if ( i%2 ) {
						ctx.fillStyle = this.color;
					} else {
						ctx.fillStyle = this.altColor;
					}
				}

			}
			
		}



	},
	CheckLineLength: function(word) {
		//debugger;
		//console.log('CheckLineLength',word);
		var lengthWord = ctx.measureText(word).width;
		var lengthSpace = ctx.measureText(" ").width;
		var pos = this.currentPosition.x + lengthWord ;
		//console.log("current",pos);
		//console.log('limit', this.destination.w);
		if ( pos > this.destination.w ) {
			//console.log('return :', word);
			if (this.colored) {
				this.text += "§<br>§";
			} else {this.text += "<br>"}
			
			this.currentPosition.x = 0;
		} 
		this.currentPosition.x += lengthWord + lengthSpace;
		
	},
	CheckBalise: function(word) {
		if (word[0] == '<' && word[word.length-1] == '>') {
			if (word == "<shortPause>" || word == "<pause>") {
				this.nextTime = Time.Time + 1000;
			}
			if (word == "<mediumPause>") {
				this.nextTime = Time.Time + 3000;
			}
			if (word == "<longPause>") {
				this.nextTime = Time.Time + 5000;
			}
			if (word.substr(1,6) == "color:") {
				//console.log('colorChange');
				var c = word.substring(7, word.length - 1);;
				console.log(c);	
				this.altColor = c;
				this.colored = true;
				this.text += "§"; 
			} else if (word == "<color>") {
				this.text += "§";
				this.colored = false;	
			}
			this.wordCounter++;
			this.CheckBalise(this.words[this.wordCounter]);
		}
		
	}

};