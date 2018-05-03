//jshint esversion: 6

angular

.module('myApp')

.controller('SearchCtrl', ['$scope', '$timeout', 'ahSearch', 'ahSpotSearch', 'ahResultHistory', 'ahSearchTerm', 'ahAPIKeys', 'ahGetToken', 'ahSetIsOpenedProp', 'ahFocus', SearchCtrl]);

function SearchCtrl($scope, $timeout, ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm, ahAPIKeys, ahGetToken, ahSetIsOpenedProp, ahFocus){
	let vm = this;
	vm.submit = submit;
	vm.appendToSeachBar = appendToSeachBar;
	vm.isAddedToSearchBar = isAddedToSearchBar;
	vm.spotSearch = spotSearch;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();

	vm.test = test;

	$timeout(() => { ahFocus('query'); }, 0);

	// Prob not even needed, since injecting ahGetToken service instantiates it, which does what we need to do.
	vm.auth = ahGetToken.auth;

	vm.apisObj = ahAPIKeys.apisObj;
	vm.userName = ahAPIKeys.apisObj.id;

	$scope.$watch('search.searchTerm', (newVal) => {
		// Watches for changes in the search bar, so if the user switches over to a different tab and then return to it, they won't lose what they inputed.
		ahSearchTerm.set(newVal);
	});

	function submit(){
		vm.searchTermNew = 'music:'+vm.searchTerm;

		ahSearch(vm.searchTermNew).getResults()
		.then((response) => {
			let obj = ahSearch().checkValid(response);
			vm.info = obj.info;
			vm.results = [...obj.results];
			vm.searchTerm = obj.searchTerm;
			ahSearchTerm.set(vm.searchTerm);

			vm.info = ahSetIsOpenedProp(vm.info, (item) => { spotSearch(item); });
			vm.results = ahSetIsOpenedProp(vm.results, (item) => { spotSearch(item); });
		});
	}

	function appendToSeachBar(name){
		vm.searchTerm += (name+', ');
		ahSearchTerm.set(vm.searchTerm);
		vm.itemAddedToSearchBar = name;
	}

	function isAddedToSearchBar(name){
		return (name === vm.itemAddedToSearchBar);
	}

	function spotSearch(artist){

		vm.link = '';

		ahSpotSearch(artist.Name)
		.then((response) => {
			// Mutates the artist object..
			artist.spotLink = response.data.artists.items[0].external_urls.spotify;
		});
	}

	function test(e){
		console.log('e',e);
	}
}



