//jshint esversion: 6

angular

.module('myApp')

.controller('SearchCtrl', ['$scope', '$timeout', 'ahSearch', 'ahGetSpotLink', 'ahResultHistory', 'ahSearchTerm', 'ahAPIKeys', 'ahGetToken', 'ahSetIsOpenedProp', 'ahFocus', SearchCtrl]);

function SearchCtrl($scope, $timeout, ahSearch, ahGetSpotLink, ahResultHistory, ahSearchTerm, ahAPIKeys, ahGetToken, ahSetIsOpenedProp, ahFocus){
	let vm = this;
	vm.submit = submit;
	vm.appendToSearchBar = appendToSearchBar;
	vm.showItemAddedNotification = showItemAddedNotification;

	// vm.pastSearches = ahResultHistory.getSearched();
	// vm.pastResults = ahResultHistory.getResults();
	
	vm.searchBarContents = ahSearchTerm.getSearchBarContents();

	$timeout(() => { ahFocus('query'); }, 0);

	// Prob not even needed, since injecting ahGetToken service instantiates it, which does what we need to do.
	vm.auth = ahGetToken.auth;

	vm.apisObj = ahAPIKeys.apisObj;
	vm.userName = ahAPIKeys.apisObj.id;

	$scope.$watch('search.searchBarContents.fullQuery', (newVal) => {
		// Watches for changes in the search bar, so if the user switches over to a different tab and then return to it, they won't lose what they inputed.
		ahSearchTerm.setFull(newVal);
	});

	function submit(){
		vm.searchTermNew = 'music:'+vm.searchBarContents.fullQuery;

		ahSearch(vm.searchTermNew).getResults()
		.then((response) => {
			let obj = ahSearch().checkValid(response);
			vm.info = obj.info;
			vm.results = [...obj.results];
			vm.searchBarContents.fullQuery = obj.searchTerm;
			ahSearchTerm.setFull(vm.searchBarContents.fullQuery);

			vm.info = ahSetIsOpenedProp(vm.info, (item) => { ahGetSpotLink(item); });
			vm.results = ahSetIsOpenedProp(vm.results, (item) => { ahGetSpotLink(item); });
		});
	}

	function appendToSearchBar(name){
		ahSearchTerm.concat(name);
	}

	function showItemAddedNotification(name){
		return (name === vm.searchBarContents.lastAddedArtist);
	}
}



