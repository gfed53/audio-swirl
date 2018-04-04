//jshint esversion: 6

angular

.module('myApp')

.controller('SearchCtrl', ['$scope', 'ahSearch', 'ahSpotSearch', 'ahResultHistory', 'ahSearchTerm', 'ahAPIKeys', 'ahGetToken', SearchCtrl]);

function SearchCtrl($scope, ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm, ahAPIKeys, ahGetToken){
	let vm = this;
	vm.submit = submit;
	vm.add = add;
	vm.isAdded = isAdded;
	vm.spotSearch = spotSearch;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();
	// vm.auth = ahGetToken.auth;

	vm.apisObj = ahAPIKeys.apisObj;
	vm.userName = ahAPIKeys.apisObj.id;

	$scope.$watch('search.searchTerm', (newVal) => {
		//Watches for changes in the search bar, so if the user switches over to a different tab and then return to it, they won't lose what they inputed.
		ahSearchTerm.set(newVal);
	});


	function submit(){
		vm.searchTermNew = 'music:'+vm.searchTerm;

		ahSearch(vm.searchTermNew).getResults()
		.then((response) => {
			let obj = ahSearch().checkValid(response);
			vm.info = obj.info;
			vm.results = obj.results;
			vm.searchTerm = obj.searchTerm;
			ahSearchTerm.set(vm.searchTerm);

		});
	}

	function add(name){
		vm.searchTerm += (name+', ');
		ahSearchTerm.set(vm.searchTerm);
		vm.itemAdded = name;
	}

	function isAdded(name){
		return (name === vm.itemAdded);
	}

	function spotSearch(item){
		vm.link = '';
		ahSpotSearch(item)
		.then((response) => {
			let link = response.data.artists.items[0].external_urls.spotify;
			/*
			We set the name of the artist, passed as a param in spotSearch function, to a controller variable 'item' after the Spotify search is successful. This div below will check that condition and only render if it's true 
								
			TODO: find better logic, or at least rename. This is confusing.

			*/
			vm.item = item;
			vm.link = link;
		});
	}
}



