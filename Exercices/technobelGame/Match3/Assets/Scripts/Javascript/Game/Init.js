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

Scenes["Loader"] = new Loader();
Application.LoadedScene = Scenes["Loader"];

// Image Loader
function LoadImages() {
	//Images[name].src = "Assets/Graphics" + ImagesPath[name].path;
	var ImagesLoaded = 0;
	for (var i = 0; i < ImagesPath.length; i++) {
		var name = ImagesPath[i].name;
		Images[name] = new Image();
		Images[name].src = "Assets/Graphics/" + ImagesPath[i].path;
		Images[name].onload = function() {
			ImagesLoaded ++;
			Scenes.Loader.imageLoaded = ImagesLoaded;
			// Scene.loader.imageLoaded = count
			if (ImagesLoaded == ImagesPath.length) {
				// All Image are Loaded
				ImageLoaded(ImagesLoaded);
			}
		}
	}
}
function ImageLoaded(imageLoaded) {
	console.log('%c System: ' + imageLoaded + " images loaded !", 'background:#222; color:#10ADED');
}


Run();