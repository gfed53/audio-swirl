angular

.module("myApp")

.controller("HistoryCtrl", ["ahSearch", "ahSpotSearch", "ahResultHistory", "ahSearchTerm", HistoryCtrl]);

function HistoryCtrl(ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm){
	var vm = this;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();
	vm.add = add;
	vm.spotSearch = spotSearch;

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
}