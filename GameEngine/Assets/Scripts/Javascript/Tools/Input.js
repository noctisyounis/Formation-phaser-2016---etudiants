var Input = {

	KeysDown : [],
	MousePosition : {
		x : 0,
		y : 0
	},
	MouseClickPosition : {
		x : 0,
		y : 0
	},
	KeyDown : function(event) {
		Input.KeysDown[event.keyCode] = true;
	},

	KeyUp : function(event) {
		delete Input.KeysDown[event.keyCode];
	},

	MouseMove : function(event) {
		var rect = canvas.getBoundingClientRect();
		Input.MousePosition.x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width | 0;
		Input.MousePosition.y = (event.clientY - canvas.offsetTop) / (rect.bottom - rect.top) * canvas.height | 0;
	},

	MouseDown : function(event) {
		if (!Input.MouseClick) {
			Input.MouseClickPosition.x = Input.MousePosition.x;
			Input.MouseClickPosition.y = Input.MousePosition.y;
		}
		Input.MouseClick = true;
		Input.MouseLongClick = true;
		Input.MouseReload = 0;
	},

	MouseUp : function(event) {
		Input.MouseClick = false;
		Input.MouseLongClick = false;
		Input.MouseReload = 0;
		Input.MouseDraging = false;
		Input.DraggedElement = null;
	}
}