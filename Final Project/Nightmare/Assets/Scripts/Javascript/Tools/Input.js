/**
 * Handle Input from Keyboard and Mouse<br />
 *
 * - Create an array of pushed keys <br />
 * - Set variables of mouse position once clicked <br />
 * - Set a draggable element <br />
 * @namespace Tools/Input 
 * 
 * */
var Input = 
{
	KeysDown: [],
	KeysDownRepeat: [],
	MousePosition: new Vector(),
	mouseClick: false,
	mouseLongClick: false,
	mouseReload: 0,
	mouseDraging: false,
	MouseDraggedElement: null,
	
	/**
	 * 
	 * @function KeyDown
	 * 
	 * @memberof Tools/Input
	 * 
	 * @param {Event} e - The event of a pushed keys -> document.addEventListener('keyDown', function(){}); 
	 * @return {Array} Input.KeysDown - Array of pushed keys, the keyCode is the index of the keys -> Input.KeysDown[32] = space bar<br />
	 * If the key is repeated, Input.KeysDownRepeat[keyCode] is set to true.
	 *  
	 * @description
	 * e.preventDefault() -> Prevent the default behavior of keys -> JS basic function.<br />
	 * e.stopPropagation() -> Stop the scrolling event for mobile -> JS basic function.
	 * */
	KeyDown: function(e) 
	{
		e.preventDefault();
		e.stopPropagation();
		Input.KeysDown[e.keyCode] = true;
		Input.KeysDownRepeat[e.keyCode] = e.repeat;
	},
	/**
	 * 
	 * @function KeyUp
	 * @memberof Tools/Input
	 * 
	 * @param {Event} e - The event of a pushed keys -> document.addEventListener('keyUp', function(){}); 
	 *  
	 * @description
	 * Delete the Input from the array Input.KeysDown. 
	 * */
	KeyUp: function(e) 
	{
		delete Input.KeysDown[e.keyCode];
		delete Input.KeysDownRepeat[e.keyCode];
	},
	/**
	 * 
	 * @function MouseDown
	 * @memberof Tools/Input
	 * 
	 * @param {Event} e - The event of a pushed keys -> document.addEventListener('mouseDown', function(){}); 
	 *  
	 * @description
	 * 
	 * Handle the click, check if it's a simple, a multiple or a long click.
	 * 
	 * Set the boolean Input.mouseClick to true <br />
	 * Set the boolean Input.mouseLongClick to true <br />
	 * Set the integer Input.mouseReload to '1'
	 * */
	MouseDown: function(e) 
	{
		Input.mouseClick = true;
		Input.mouseLongClick = true;
		Input.mouseReload = 1;		
	},
	/**
	 * 
	 * @function MouseMove
	 * @memberof Tools/Input
	 * 
	 * @param {Event} e - The event of a pushed keys -> document.addEventListener('mouseMove', function(){}); 
	 *  
	 * @description
	 * 
	 * Handle the move of the mouse <br />
	 * 
	 * - Create Input.MousePosition <br />
	 * - Input.MousePosition.x = the x position of the mouse at this exact moment.<br /> 
	 * - Input.MousePosition.y = the y position of the mouse at this exact moment.
	 * 
	 * */
	MouseMove: function(e) 
	{
		var Rect = canvas.getBoundingClientRect();
		Input.MousePosition.x = (e.clientX - Rect.left) / (Rect.right - Rect.left) * canvas.width |0;
		Input.MousePosition.y = (e.clientY - canvas.offsetTop) / (Rect.bottom - Rect.top) * canvas.height |0;
	},
	/**
	 * 
	 * @function MouseUp
	 * @memberof Tools/Input
	 * 
	 * @param {Event} e - The event of a pushed keys -> document.addEventListener('mouseUp', function(){}); 
	 *  
	 * @description
	 * 
	 * Unset every boolean <br />  
	 * Set Input.mouseReload to 0.
	 * 
	 * */
	MouseUp: function(e) 
	{
		Input.mouseClick = false;
		Input.mouseLongClick = false;
		Input.mouseReload = 0;
		Input.mouseDraging = false;
		Input.MouseDraggedElement = null;
	}
}