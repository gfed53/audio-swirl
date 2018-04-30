//jshint esversion: 6

angular

.module('myApp')

.controller('SearchCtrl', ['$scope', 'ahSearch', 'ahSpotSearch', 'ahResultHistory', 'ahSearchTerm', 'ahAPIKeys', 'ahGetToken', 'ahSetIsOpenedProp', SearchCtrl]);

function SearchCtrl($scope, ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm, ahAPIKeys, ahGetToken, ahSetIsOpenedProp){
	let vm = this;
	vm.submit = submit;
	vm.appendToSeachBar = appendToSeachBar;
	vm.isAddedToSearchBar = isAddedToSearchBar;
	vm.spotSearch = spotSearch;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();

	vm.test = test;

	vm.artistsOpened = {

	};

	// Prob not even needed, since injecting ahGetToken service instantiates it, which does what we need to do.
	vm.auth = ahGetToken.auth;

	vm.apisObj = ahAPIKeys.apisObj;
	vm.userName = ahAPIKeys.apisObj.id;

	$scope.$watch('search.searchTerm', (newVal) => {
		// Watches for changes in the search bar, so if the user switches over to a different tab and then return to it, they won't lose what they inputed.
		ahSearchTerm.set(newVal);
	});

	$scope.$watch('search.status.isOpen', (newVal) => {
		console.log()
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

			// Testing
			// vm.results.forEach(function(item) {
			// 	var isOpened = false;
			// 	Object.defineProperty(item, "isOpened", {
			// 		get: function() {
			// 			return isOpened;
			// 		},
			// 		set: function(newValue) {
			// 			isOpened = newValue;
			// 			if (isOpened) {
			// 				console.log(item); // do something...
			// 				spotSearch(item.Name);
			// 			}
			// 		}
			// 	});
			// });
			vm.results = ahSetIsOpenedProp(vm.results, (item) => {
				// console.log(item); // do something...
				spotSearch(item.Name);
			});

			//


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

	function spotSearch(artistName){
		vm.link = '';
		// console.log('$event',$event);
		ahSpotSearch(artistName)
		.then((response) => {
			let link = response.data.artists.items[0].external_urls.spotify;
			vm.link = link;
		});
	}

	function test(e){
		console.log('e',e);
	}
}



