/**
*
*Displays the dialogue in the scene<br />
*@namespace Tools/Dialogue
*
**/
function Dialogs() 
{
	this.font = "Arial";
	this.fontSize = 12;
	this.color = "#000000";
	this.altColor = "#000000";
	this.text = "";
	this.Destination = new Box();
	//smaller value = faster text
	this.textSpeed = 1;

	this.colored = false;
	this.interupted = false;

	this.currentTime = 0;
	this.wordCounter = 1;
	this.letterCounter = 0;

	this.startLine = 0;
	this.currentLine = 0;
	this.maxLine = 0;

	this.Words = [];
	this.CurrentPosition = new Vector();
/**
*
*@function InitText
*@description 
*Applies the settings of the displayed text , position, content, color , display speed

*@param {String} _text - The text to be displayed.
*@param {String} _font - applies font wanted or Arial default.
*@param {Number} _fontSize - applies font size wanted or 12 default.
*@param {String} _color - applies Color wanted or White default.
*@poram {Box} _Destination - desired position for the text box.
*@param {Number} _textSpeed - scrolling speed of your text.
*
*
*@memberof Tools/Dialogue
**/

	this.InitText = function(_text, _font, _fontSize, _color, _Destination, _textSpeed) 
	{
		this.text = "";
		this.font = _font || "Arial";
		this.fontSize = _fontSize || 12;
		this.color = _color || "#FFF";
		this.baseColor = this.color;
		this.Destination = _Destination || new Box(canvas.width / 2 - 250, canvas.height - 250, 500, 200);
		this.textSpeed = _textSpeed || 2;

		ctx.font = this.fontSize + 'px ' + this.font;
		ctx.fillStyle = this.color;

		this.CurrentPosition = new Vector(0, 0);
		this.wordCounter = 0;
		this.letterCounter = 0;
		this.nextTime = Time.Time;
		this.interupted = false;

		this.Begin(_text);
	};
/**
*
*Start the text.<br />
*The starting line and the number of maximum line.<br />
*this.maxLine = Math.floor().The height of the textbox divided by the size of the font Writing
*
*@function Begin
*
*@param {String} _text - takes the text initialized early in parameter
*@memberof Tools/Dialogue
*
*
**/
	this.Begin = function(_text) 
	{
		this.Words = _text.split(' ');
		this.startLine = 0;
		this.maxLine = Math.floor(this.Destination.h / this.fontSize);
	};
/**
*
* 
*Function to see if the text has finished scrolling or continues<br/>
*
*If the word count is equal to the length of the word, the text is finished.<br />
*Otherwise, he continued
*@function Continue
*@memberof Tools/Dialogue
*
*
**/
	this.Continue = function() 
	{
		if (this.wordCounter == this.Words.length) 
		{
			// End of text
			this.interupted = true;
			this.Write("");
			return;
		}
		if (Time.Time >= this.nextTime + this.textSpeed * 125) 
		{
			var char = this.Words[this.wordCounter][this.letterCounter];
			this.Write(char);
			this.letterCounter++;
			this.nextTime = Time.Time;

			if (this.letterCounter == this.Words[this.wordCounter].length) 
			{
				this.text += " ";
				this.letterCounter = 0;
				this.wordCounter++;
				this.CheckBalise(this.Words[this.wordCounter]);
				this.CheckLineLength(this.Words[this.wordCounter]);
			}
		} 
		else 
		{
			this.Write("");
		}
	};
/**
*
*manage the speed of text
*@function RapidPlay
*
*@memberof Tools/Dialogue
*
**/
	this.RapidPlay = function() 
	{
		this.textSpeed = 0;
	};
/**
*Display all the text instead of character by character<br/>
*Reset every variables.
*
*@function Interupt
*@memberof Tools/Dialogue
*
**/
	this.Interupt = function() 
	{
		if (!this.interupted) 
		{
			this.interupted = true;
			this.text = "";
			this.wordCounter = 0;
			this.letterCounter = 0;
			this.CurrentPosition = new Vector(0, 0)
			for (this.wordCounter = 0; this.wordCounter < this.Words.length; this.wordCounter++) 
			{
				this.CheckBalise(this.Words[this.wordCounter]);
				this.CheckLineLength(this.Words[this.wordCounter]);
				this.Write(this.Words[this.wordCounter]);
				this.text += " ";
			}
		}
	};
/**
*
*
*Displays the text letter by letter
*
*@function Write
*@param {String} _char - the text adds the params _char
*
*@memberof Tools/Dialogue
**/
	this.Write = function(_char) 
	{
		this.text += _char;
		ctx.textAlign = 'start';

		ctx.textBaseline = 'top';
		ctx.font = this.fontSize + 'px ' + this.font;
		ctx.fillStyle = this.color;

		var array = this.text.split("<br>");
		
		for (var index = this.startLine; index < array.length; index++) 
		{

			if (index >= this.startLine + this.maxLine) return;

			var arrayColor = array[index].split("§");
			if (arrayColor.length == 1) 
			{
				ctx.fillStyle = this.color;
				ctx.fillText(array[index], this.Destination.x, this.Destination.y + (index - this.startLine) * this.fontSize);
			} 
			else 
			{
				var offset = 0;
				for (i in arrayColor) 
				{
					ctx.fillText(arrayColor[i], this.Destination.x+offset, this.Destination.y + (index - this.startLine) * this.fontSize);
					offset += ctx.measureText(arrayColor[i]).width;
					if (i % 2) 
					{
						ctx.fillStyle = this.color;
					} 
					else 
					{
						ctx.fillStyle = this.altColor;
					}
				}
			}	
		}
	};
/**
*
*
*Add the tag < br > when the text comes to the length of the box for the Write function detect a return line
*
*@function CheckLineLength
*@param {String} _word - Set on params the word to be display
*
*@memberof Tools/Dialogue
*
**/
	this.CheckLineLength = function(_word) 
	{
		var lengthWord = ctx.measureText(_word).width;
		var lengthSpace = ctx.measureText(" ").width;
		var pos = this.CurrentPosition.x + lengthWord;
		if (pos >= this.Destination.w) 
		{
			if (this.colored) 
			{
				this.text += "§<br>§";
			} 
			else 
			{
				this.text += "<br>"
			}
			this.currentLine++;
			if (this.currentLine >= this.startLine + this.maxLine) 
			{
				this.startLine++;
			}
			this.CurrentPosition.x = 0;
		} 
		this.CurrentPosition.x += lengthWord + lengthSpace;	
	};
/**
*
*
*@function CheckBalise
*@param {String} _word - adds a word parameter checked and if it is marked to act on time or the color of the word
*
*@memberof Tools/Dialogue
*
*
**/
	this.CheckBalise = function(_word) 
	{
		if (_word != undefined && _word[0] == '<' && _word[_word.length-1] == '>') 
		{
			if (_word == "<shortPause>" || _word == "<pause>") 
			{
				this.nextTime = Time.Time + 1000;
			}
			if (_word == "<mediumPause>") 
			{
				this.nextTime = Time.Time + 3000;
			}
			if (_word == "<longPause>") 
			{
				this.nextTime = Time.Time + 5000;
			}
			if (_word.substr(1,6) == "color:") 
			{
				var c = _word.substring(7, _word.length - 1);
				this.altColor = c;
				this.colored = true;
				this.text += "§"; 
			} 
			else if (_word == "<color>") 
			{
				this.text += "§";
				this.colored = false;	
			}
			this.wordCounter++;
			if (this.wordCounter < this.Words.length-1) {
				//console.log(this.Words[this.wordCounter]);
				this.CheckBalise(this.Words[this.wordCounter]);
			}
			
		}
	};
/**
*
*scrolls up the text on the y axis in the box
*
*@function LineUp
*@param {Number} _int - number of line scrolling
*
*@memberof Tools/Dialogue
**/
	this.LineUp = function (_int = 1) 
	{
		if (this.interupted) 
		{
			this.startLine -= _int;
			if (this.startLine < 0) this.startLine = 0;
		}
		 
	}
/**
*
*scrolls down the text on the y axis in the box
*
*@function LineDown
*@param {Number} _int - number of line scrolling
*
*@memberof Tools/Dialogue
**/	
	this.LineDown = function (_int = 1) 
	{
		if (this.interupted) 
		{
			this.startLine += _int;
			if (this.startLine + this.maxLine > this.currentLine) 
			{
				this.startLine = this.currentLine - this.maxLine + 1;
			}
		}
	}
};