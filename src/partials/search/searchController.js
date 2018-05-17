//jshint esversion: 6

angular

.module('myApp')

.controller('SearchCtrl', ['$scope', '$timeout', 'ahSearch', 'ahGetSpotLink', 'ahResultHistory', 'ahSearchTerm', 'ahAPIKeys', 'ahGetToken', 'ahSetIsOpenedProp', 'ahFocus', SearchCtrl]);

function SearchCtrl($scope, $timeout, ahSearch, ahGetSpotLink, ahResultHistory, ahSearchTerm, ahAPIKeys, ahGetToken, ahSetIsOpenedProp, ahFocus){
	let vm = this;
	vm.submit = submit;
	vm.appendToSeachBar = appendToSeachBar;
	vm.showItemAddedNotification = showItemAddedNotification;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();

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

			vm.info = ahSetIsOpenedProp(vm.info, (item) => { ahGetSpotLink(item); });
			vm.results = ahSetIsOpenedProp(vm.results, (item) => { ahGetSpotLink(item); });
		});
	}

	function appendToSeachBar(name){
		vm.searchTerm += (name+', ');
		ahSearchTerm.set(vm.searchTerm);
		vm.itemAddedToSearchBar = name;

		$timeout(() => {
			vm.itemAddedToSearchBar = null;
		}, 3000);
	}

	function showItemAddedNotification(name){
		return (name === vm.itemAddedToSearchBar);
	}
}



