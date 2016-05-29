angular
.module("myApp")

.factory("ahSearch", ["$http", "$q", ahSearch])
.factory("ahSpotSearch", ["Spotify", ahSpotSearch])

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

function ahSpotSearch(Spotify){
	return function(){
		console.log("spotify search");
		Spotify.search('Nirvana', 'artist')
		.then(function(response){
			console.log(response);
		})
	}
}