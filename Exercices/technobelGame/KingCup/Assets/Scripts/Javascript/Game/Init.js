window.RequestAnimationFrame = (function(){
    return  window.requestAnimationFrame         || 
            window.webkitRequestAnimationFrame   || 
            window.mozRequestAnimationFrame      || 
            window.oRequestAnimationFrame        || 
            window.msRequestAnimationFrame       || 
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();



/********************
		Event
*********************/
window.addEventListener("keydown",Input.KeyDown);
window.addEventListener("keyup",Input.KeyUp);
window.addEventListener("mouseup",Input.MouseUp);
window.addEventListener("mousedown",Input.MouseDown);
window.addEventListener("mousemove",Input.MouseMove);


/********************
		Start
*********************/

Time.SetTimeWhenGameBegin();
Scenes["Loader"] = new Loader();
Application.LoadedScene = Scenes["Loader"];

// Image Loader
function LoadImages() {
	//Images[name].src = "Assets/Graphics" + ImagesPath[name].path;
	var count = 0;
	for (var i = 0; i < ImagesPath.length; i++) {
		var name = ImagesPath[i].name;
		Images[name] = new Image();
		Images[name].src = "Assets/Graphics/" + ImagesPath[i].path;
		Images[name].onload = function() {
			count ++;
			Scenes.Loader.imageLoaded = count;
			// Scene.loader.imageLoaded = count
			if (count == ImagesPath.length) {
				// All Image are Loaded
				ImageLoaded(count);
			}
		}
	}
}
function ImageLoaded(imageLoaded) {
	console.log('%c System: ' + imageLoaded + " images Loaded !", 'background:#222; color:#10ADED');
}


Run();