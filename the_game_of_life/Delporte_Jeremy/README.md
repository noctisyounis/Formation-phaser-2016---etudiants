# CANVAS

<!-- 
http://www.html5canvastutorials.com/ 
https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
-->

```
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

// fill a rectangle
context.fillStyle = '#333';
context.fillRect(0, 0, 640, 640);

// draw lines
context.strokeStyle = 'red';
context.lineWidth = 20;
context.lineCap = 'round';
context.lineJoin = 'round';
context.moveTo(40, 40);
context.lineTo(80, 100);
context.lineTo(40, 160);
context.stroke();

// draw a circle
context.fillStyle = 'blue';
context.beginPath();
context.arc(210, 100, 30, 0, Math.PI * 2, true);
context.closePath();
context.fill();

// draw text
context.fillStyle = 'darkGreen';
context.font = 'bold 36px sans-serif';
context.fillText('It\'s simpl!', 310, 112);

// draw image
var image = new Image();
image.src = 'images/eye.png';
image.onload = function() {
  context.drawImage(image, 540, 80);
};
```



1 : Dessiner sur la canvas un des héros dans le dossier image
2 : aténuer l'opacité de cette image 
3 : Dessiner par dessus avec les formes 
4 : Remplir les formes de couleur
5 : Ajouter un dégradé dans une partie du corp ou plus si vous avez le temps
