angular
.module("myApp")

.factory("ahSearch", ["$http", "$q", ahSearch])
.factory("ahSpotSearch", ["Spotify", "$q", ahSpotSearch])
.service("ahSearchHistory", [ahSearchHistory])
.service("ahResultHistory", [ahResultHistory])

function ahSearch($http, $q){
	return function(searchTerm){
	    var url = "http://www.tastekid.com/api/similar?callback=JSON_CALLBACK";
	    var request = {
			q: searchTerm,
			k: "179625-Educatio-EE7ZUYWY",
			info: 1
	    };
	    var services = {
	    	getResults: getResults
	    };
	    return services;

	    function getResults(){
	    	return $http({
	    		method: 'JSONP',
	    		url: url,
	    		params: request
	    	})
	    	.then(function(response){
	    		var results = response;
	    		return $q.when(response);
	    	},
	    	function(response){
	    		alert("Sorry, an error occurred. Please try again later");
	    	});
	    }
	}
}

function ahSpotSearch(Spotify, $q){
	return function(item){
		if(typeof item === "undefined"){
			item = "Nirvana";
		}
		console.log("spotify search");
		return Spotify.search(item, 'artist')
		.then(function(response){
			console.log(response.artists);
			var link = response.artists.items[0].external_urls.spotify;
			console.log(link);
			return $q.when(response);
		})
	}
}


function ahSearchHistory(){
	this.tKid = [];
	this.get = get;
	this.add = add;

	function get(){
		return this.tKid;
	}

	function add(item){
		if(this.tKid.indexOf(item) === -1){
			this.tKid.push(item);
		}
		console.log(this.tKid);
	}
}

function ahResultHistory(){
	this.tKid = [];
	this.get = get;
	this.add = add;

	function get(){
		return this.tKid;
	}

	function add(item){
		if(this.tKid.indexOf(item) === -1){
			this.tKid.push(item);
		}
		console.log(this.tKid);
	}
}




