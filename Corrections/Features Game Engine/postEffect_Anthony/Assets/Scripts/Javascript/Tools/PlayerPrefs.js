var PlayerPrefs = {
	
	Save: function(gameName, obj){
		localStorage.setItem(gameName, obj);
	},

	Load: function(obj){
		localStorage.getItem(obj.name);
	},

	Delete: function(obj){
		localStorage.removeItem(obj.name);
	}
}