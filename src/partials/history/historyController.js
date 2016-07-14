angular

.module("myApp")

.controller("HistoryCtrl", ["ahSearch", "ahSpotSearch", "ahSearchHistory", "ahResultHistory", "ahSearchTerm", HistoryCtrl]);

function HistoryCtrl(ahSearch, ahSpotSearch, ahSearchHistory, ahResultHistory, ahSearchTerm){
	console.log("history");
	var vm = this;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();
	vm.add = add;
	vm.spotSearch = spotSearch;
	console.log(vm.pastSearches);

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