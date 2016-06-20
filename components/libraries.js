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
				method: "JSONP",
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
		return Spotify.search(item, "artist")
		.then(function(response){
			var link = response.artists.items[0].external_urls.spotify;
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
	}
}

function ahResultHistory(){
	this.tKid = [];
	this.get = get;
	this.add = add;

	function get(){
		return this.tKid;
	}

	function add(array, newArray){
		array.forEach(function(value,index,array){
			if(getIndexIfObjWithAttr(newArray, "yID", value.yID) === -1){
				newArray.push(array[index]);
			}
		})
	}


	function getIndexIfObjWithAttr(array, attr, value) {
		for(var i = 0; i < array.length; i++) {
			if(array[i][attr] === value) {
				return i;
			}
		}
		return -1;
	}
}





