PlayerPrefs = {
	Save: function(key,value) {
		
		localStorage.setItem(key, value);
	},
	Load: function(key) {
		return localStorage.getItem(key);
		
		
	},
	Delete: function(key) {
		localStorage.removeItem(key);
	}


}