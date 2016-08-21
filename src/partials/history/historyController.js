angular

.module("myApp")

.controller("HistoryCtrl", ["ahSearch", "ahSpotSearch", "ahResultHistory", "ahSearchTerm", "ahSortOrder", HistoryCtrl]);

function HistoryCtrl(ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm, ahSortOrder){
	var vm = this;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();
	vm.add = add;
	vm.spotSearch = spotSearch;
	vm.reverse = ahSortOrder.reverse;
	vm.predicate = ahSortOrder.predicate;
	vm.sort = sort;
	console.log(vm.pastResults);

	function add(name){
		vm.searchTerm += (name+", ");
		ahSearchTerm.set(vm.searchTerm);
		alert("Artist added to search bar!");
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

	function sort(predicate){
		var sortObj = ahSortOrder.order(vm.predicate, predicate);
		vm.predicate = sortObj.predicate;
		vm.reverse = sortObj.reverse;
		console.log(vm.predicate);
		console.log(vm.reverse);
	}
}


