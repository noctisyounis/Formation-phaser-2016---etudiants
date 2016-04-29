window.RequestAnimationFrame = (function(){
    return  window.requestAnimationFrame           ||
            window.webkitRequestAnimationFrame     ||
            window.mozRequestAnimationFrame        ||
            window.oRequestAnimationFrame          ||
            window.msRequestAnimationFrame         ||
    function(callback, element){
        window.setTimeout(callback, 1000 / 60);
    };
})();

Scenes["Loader"] = new Loader();
Application.LoadedScene = Scenes["Loader"];


document.addEventListener("keydown", Input.KeyDown);
document.addEventListener("keyup", Input.KeyUp);

document.addEventListener("mousedown", Input.MouseDown);
document.addEventListener("mouseup", Input.MouseUp);
document.addEventListener("mousemove", Input.MouseMove);

//Image Loader
function LoadImages() {
    var count = 0;
    for (var i = 0; i < ImagesPath.length; i++) {
        var name = ImagesPath[i].name;
        var content = ImagesPath[i].path;

        Images[name] = new Image();
        Images[name].src = "Assets/Graphics/" + content;

        Images[name].onload = function() {
            count++;
            //Scene.loader.imageLoaded = count;
            if (count == ImagesPath.length) {
                ImageLoaded(count);
            }
        }
    }
}

function ImageLoaded(imageLoaded) {
    console.log("%c System: " + imageLoaded + " images loaded!", 'background:#222; color:#bada55');

}

/*//Tests RangeFloat
console.log("START EXCLUSIVE TEST");
var count = 0;
for (var i = 0; i < 100000000; i++) {
    var rand = Math.Random.RangeFloat(0,1,false);
    if( rand == 0 || rand == 1){
        count++;
        console.log("exclusif marche pas");
    }
}
console.log(count);
count = 0;
console.log("START INCLUSIVE TEST");
for (var i = 0; i < 10000000; i++) {
    var rand = Math.Random.RangeFloat(0,0.1,true);
    if( rand == 0 || rand == 0.1){
        count++;
        console.log("inclusif marche ");
    }
}
console.log(count);*/

Run();

var btn = document.getElementById("test");
btn.addEventListener('click', function() {
	if (Application.LoadedScene == Scenes["Scene1"]) {
		Application.LoadedScene = Scenes["Scene2"];
	} else {
		Application.LoadedScene = Scenes["Scene1"];
	}
})
