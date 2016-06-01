<h1> Getting Started </h1>

<ul>
    <li> <a href="#firstSteps">First Steps</a> </li>
    <li> <a href="../index.html">Examples </a></li>
</ul>

<br />
<hr>

<h1 id="firstSteps"> First Steps </h1>
    <ol>
        <li><a href="#createEnvironment"> Create the environment </a></li>
        <li><a href="#loadImages">Load Images</a> </li>
        <li><a href="#createScene"> Create a Scene </a></li>
        <li><a href="#createGameObject"> Create a GameObject </a></li>
    </ol>

<br />
<hr>
<br />

<h3 id="createEnvironment"> Create the environment </h3>

<h6> Create the canvas </h6>

<p> First of all you need to create a canvas in your HTML file. </p>
    
    <canvas id="canvas"> </canvas>

<p> You can now close your HTML file. </p>

<h6> Set size of your canvas  </h6>

<p> In the file Assets/Scripts/Javascript/Game/Init.js, you can set the width and the height of the canvas </p>

    // Set the canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
<h6> Get the context of the canvas </h6>

<p> In Assets/Scripts/Javascript/Game/Config.js, we get the context with this line </p>

    var ctx = canvas.getContext("2d");
    
<br />
<hr>
<br />    
    
<h3 id="loadImages"> Load Images </h3>

<p> In order to load all your images, put them in Assets/Graphics. You now have to call them in Assets/Scripts/Javascript/Game/Config.js under ImagePath. </p>

    var ImagePath = [{ name:"Boy", path:"Boy.jpg" }];
    
<p> We'll see in the <a href="createGameObject"> GameObjects </a> section how to use it. </p>

<br />
<hr>
<br />

<h3 id="createScene"> Create a Scene </a> </h3>

<p> A Scene is one of the most important part of the engine since it represents a stage. </p>

<h6> Duplicate the SceneModel </h6>

<p> Go to Assets/Scripts/Javascript/Scenes/SceneModel.js, duplicate all the code in a new file which will be your scene. <br />
    Rename the function Scene to the name of your choice, change `this.name` to the name of your choice </p>
    
<h6> Add the scene on the Loader </h6>

<p> In the Start function add your scene to the array Scenes </p>

    this.Start = function()
	{
		if (!this.started)
		{
			Scenes["SceneName"] = new SceneName();
		}
	}
    
<p> Then go to Assets/Scripts/Javascript/Game/Init.js, in ImageLoaded function set the Application.LoadedScene to Scenes["SceneName"] </p>
    
    function ImageLoaded(_imageLoaded) 
    {
        Application.LoadedScene = Scenes["SceneHub"];
    }

    
<br />
<hr>
<br />
    
<h3 id="createGameObject"> Create a GameObject </a> </h3>

<p> A GameObject represent every element of interaction in your game. A character, a rock, ...</p>

<h6> Duplicate the GameObjects Model </h6>

<p> Go to Assets/Scripts/Javascript/GameObjects/GameObjects.js,  duplicate all the code in a new file which will be your gameObject. <br />
    Rename the function GameObject to the name of your choice, change `this.name` to the name of your choice</p>

<h6> Add the GameObject to the Scene </h6>

<p> Go to your Scene file and in the Start function, add your GameObject like this </p>

    this.Start = function() 
	{
		if (!this.started) 
		{
            var gameObject = new NameOfYourGameObject();
            this.GameObjects.push(gameObject);
		}
	}

<p> They'll be automatically started in the Update function of the Scene. </p>

<h6> Handle Inputs </h6>

<p> To act with your GameObject, you can use either your keyboard or the mouse.<br /> 
    In the Update function of your scene, add this : </p>
    
    this.Update = function() 
	{
		if (!Application.GamePaused) 
		{
			if(Input.KeysDown[32])
            {
                this.GameObjects[0].Transform.Position.y -= 10;
            }
		}
	}
    
<p> This code will make your GameObject 'jump'. </p>