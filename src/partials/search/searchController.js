//jshint esversion: 6

angular

.module('myApp')

.controller('SearchCtrl', ['$scope', '$timeout', 'ahSearch', 'ahGetSpotLink', 'ahResultHistory', 'ahSearchTerm', 'ahAPIKeys', 'ahGetToken', 'ahSetIsOpenedProp', 'ahFocus', SearchCtrl]);

function SearchCtrl($scope, $timeout, ahSearch, ahGetSpotLink, ahResultHistory, ahSearchTerm, ahAPIKeys, ahGetToken, ahSetIsOpenedProp, ahFocus){
	let vm = this;
	vm.submit = submit;
	vm.appendToSearchBar = appendToSearchBar;
	vm.showItemAddedNotification = showItemAddedNotification;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	// vm.searchTerm = ahSearchTerm.get();
	vm.searchBarContents = ahSearchTerm.getSearchBarContents();

	// vm.itemAddedToSearchBar = ahSearchTerm;

	console.log('vm.searchBarContents',vm.searchBarContents);

	$timeout(() => { ahFocus('query'); }, 0);

	// Prob not even needed, since injecting ahGetToken service instantiates it, which does what we need to do.
	vm.auth = ahGetToken.auth;

	vm.apisObj = ahAPIKeys.apisObj;
	vm.userName = ahAPIKeys.apisObj.id;

	$scope.$watch('search.searchBarContents.fullQuery', (newVal) => {
		// Watches for changes in the search bar, so if the user switches over to a different tab and then return to it, they won't lose what they inputed.
		ahSearchTerm.setFull(newVal);
		console.log('vm.searchBarContents',vm.searchBarContents);
	});

	function submit(){
		vm.searchTermNew = 'music:'+vm.searchBarContents.fullQuery;

		ahSearch(vm.searchTermNew).getResults()
		.then((response) => {
			let obj = ahSearch().checkValid(response);

			console.log('obj',obj);
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
		// .then(() => {
		// 	vm.searchTerm = ahSearchTerm.get();
		// 	vm.itemAddedToSearchBar = name;
		// 	$timeout(() => {
		// 		vm.itemAddedToSearchBar = null;
		// 	}, 3000);
		// });

		console.log('vm.searchBarContents',vm.searchBarContents);
	}

	function showItemAddedNotification(name){
		return (name === vm.searchBarContents.lastAddedArtist);
	}
}



