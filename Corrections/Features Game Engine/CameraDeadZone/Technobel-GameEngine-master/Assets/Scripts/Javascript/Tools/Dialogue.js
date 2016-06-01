/*
	- font
	- texte à écrire
	- font size
	- color
	- destination
	- interval (short, medium, long) vitesse d'écriture (compteur)
	- Interrupt / skip
*/

function Dialogue() {
	
	this.font = "";
	this.fontSize = 0;
	this.color = "white";
	this.destination = new Box();
	this.interval = 0;
	this.intervalMax = 1;
	this.canContinue = true;

	this.index = 0;
	this.lineIndex = 0;
	this.lineLength = 0;
	this.linesHeight = 0;

	this.words = [];
	this.letters = [];
	this.linesText = [];

	this.InitText = function(font, fontSize, texte, color, destination, interval) {
		this.font = font;
		this.fontSize = fontSize;
		ctx.font = fontSize + "px " + font;

		this.texte = texte;
		this.color = color;
		this.destination = destination;
		this.intervalMax = interval / 100;

		this.linesText[0] = "";

		this.Begin();
	};

	this.Begin = function() {
		this.words = this.texte.split(" ");
		this.letters = this.texte.split("");
	};

	this.Continue = function() {
		
		this.interval -= Time.DeltaTime;
	};

	this.Interrupt = function() {
		this.canContinue = false;
		this.linesHeight = 0;
		this.lineIndex = 0;
	};

	this.Write = function() {

		ctx.beginPath();

		ctx.font = this.fontSize + "px " + this.font;
		ctx.fillStyle = this.color;
		ctx.textBaseline = "top";

		// affiche le texte
		for (var i = 0; i < this.linesText.length; i++) {
			
			ctx.fillText(this.linesText[i], this.destination.x, this.destination.y + i * this.fontSize);
		}

		// if (Input.KeysDown[32] && this.canContinue) {

		// 	var max = this.intervalMax;
		// 	this.intervalMax = 0;
		// 	this.interval = 0
		// 	this.Writting();
		// 	this.canContinue = false;
		// 	this.intervalMax = max;
		// }

		// si touche espace enfoncé ET que la boite de dialogue est remplie => effacer la boite et canContinuer à écrire
		if (Input.KeysDown[32] && !this.canContinue) {
			this.canContinue = true;
			this.linesText.splice(0, this.linesText.length);
			this.linesText[0] = "";
		}

		this.Writting();

		this.Continue();

		ctx.closePath();
	};

	this.Writting = function() {
		
		// si je n'ai pas tout écrit et que je peux écrire le caractère suivant
		if (this.index < this.letters.length && this.interval < -0.001 && this.canContinue) {
			
			this.interval = this.intervalMax;

			this.CheckLineLength();

			// si mon caractère est un espace => regarde si la longueur de la ligne + le mot suivant dépasse la boite de dialogue
			if (this.letters[this.index] == " ") {

				var word = "";
				var indice = 1;

				while(this.letters[this.index + indice] != " " && this.letters[this.index + indice] != undefined){

					word += this.letters[this.index + indice];
					indice++;
				}

				// si je suis en fin de ligne => passer à la ligne suivante
				if (this.lineLength + ctx.measureText(word).width >= this.destination.w) {
					this.linesHeight += this.fontSize;
					this.lineLength = 0;
					this.lineIndex++;
					this.linesText[this.lineIndex] = "";
					this.index++;

					// si je suis en fin de boite de dialogue => Interrompre
					if (this.linesHeight + this.fontSize >= this.destination.h) {
						this.Interrupt();
						return;
					}
				}
			}

			// écrit le prochain caractère
			ctx.fillText(this.letters[this.index], this.destination.x + this.lineLength, this.destination.y + this.linesHeight);

			// ajout de la lettre au texte afficher
			this.linesText[this.lineIndex] += this.letters[this.index];			

			this.index++;
			
		}
	}

	this.CheckLineLength = function() {
		
		this.lineLength = ctx.measureText(this.linesText[this.lineIndex]).width;
	};
};