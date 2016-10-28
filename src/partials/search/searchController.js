angular

.module("myApp")

.controller("SearchCtrl", ["$scope", "ahSearch", "ahSpotSearch", "ahResultHistory", "ahSearchTerm", SearchCtrl]);

function SearchCtrl($scope, ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm){
	var vm = this;
	vm.submit = submit;
	vm.add = add;
	vm.isAdded = isAdded;
	vm.spotSearch = spotSearch;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();

	$scope.$watch("search.searchTerm", function(newVal){
		//Watches for changes in the search bar, so if the user switches over to a different tab and then return to it, they won't lose what they inputed.
		ahSearchTerm.set(newVal);
	});


	function submit(){
		vm.searchTermNew = "music:"+vm.searchTerm;

		ahSearch(vm.searchTermNew).getResults()
		.then(function(response){
			var obj = ahSearch().checkValid(response);
			vm.info = obj.info;
			vm.results = obj.results;
			vm.searchTerm = obj.searchTerm;
			ahSearchTerm.set(vm.searchTerm);

		});
	}

	function add(name){
		vm.searchTerm += (name+", ");
		ahSearchTerm.set(vm.searchTerm);
		vm.itemAdded = name;
	}

	function isAdded(name){
		return (name === vm.itemAdded);
	}

	function spotSearch(item){
		vm.link = "";
		ahSpotSearch(item)
		.then(function(response){
			var link = response.artists.items[0].external_urls.spotify;
			vm.item = item;
			vm.link = link;
		});
	}
}



