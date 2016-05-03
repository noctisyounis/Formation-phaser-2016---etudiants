// v1n, v2n are normalized vector
function DotProduct(v1n,v2n) {
	return v1n.x * v2n.x + v1n.y * v2n.y;
}

function distPointToPoint(p1,p2) {
	return Math.sqrt( (p1.x - p2.x)*(p1.x - p2.x)+(p1.y - p2.y)*(p1.y - p2.y) );
}

function updateForDragAndDrop(go) {
	var gameObject = go;
	if (Input.MouseDraging) {
		gameObject.Transform.position.x = Input.MousePosition.x + gameObject.mousePositionOffset.x;
		gameObject.Transform.position.y = Input.MousePosition.y + gameObject.mousePositionOffset.y;
		
		gameObject.Physics.Collider.position = gameObject.Transform.position;
	}
}


CanvasRenderingContext2D.prototype.RoundedBox = function(x,y,w,h,r) 
{
    if (typeof r === "undefined") {
        r = 2;
    }
    this.beginPath();
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    this.fill();
};

function Shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}