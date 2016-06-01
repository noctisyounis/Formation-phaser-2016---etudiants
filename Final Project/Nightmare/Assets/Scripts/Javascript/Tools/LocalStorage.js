/**
 * Handle the storage data of the Game Engine
 * @namespace Tools/LocalStorage
 * 
 * */
var LocalStorage = 
{
	/**
	 * 
	 * @function Save
	 * @memberof Tools/LocalStorage
	 * 
	 * @param {String} _key 
	 * @param {Data} _value
	 * 
	 * @description
	 * Store data defined with a key
	 *  
	 * */
	Save: function(_key, _value) 
	{	
		if (typeof _key == "string") 
		{
			localStorage.setItem(_key, _value);
		} 
		else
		{
			PrintErr("Invalid key for saving in localStorage");
		}
	},
	/**
	 * 
	 * @function Load
	 * @memberof Tools/LocalStorage
	 * 
	 * @param {String} _key
	 * @return {Item} 
	 * 
	 * @description
	 * Get the item defined by his key
	 *  
	 * */
	Load: function(_key) 
	{
		if (typeof _key == "string") 
		{
			return localStorage.getItem(_key);
		}
		else 
		{
			PrintErr("Invalid key for loading in localStorage");
		}
	},
	/**
	 * 
	 * @function Delete
	 * @memberof Tools/LocalStorage
	 * 
	 * @param {String} _key
	 * 
	 * @description
	 * Delete the item defined by his key
	 *  
	 * */
	Delete: function(_key) 
	{
		if (typeof _key == "string") 
		{
			localStorage.removeItem(_key);
		}
		else
		{
			PrintErr("Invalid key for deleting in localStorage");
		}
	}
}