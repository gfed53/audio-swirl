angular

.module("myApp")

.controller("SearchCtrl", ["$scope", "ahSearch", "ahSpotSearch", "ahResultHistory", "ahSearchTerm", SearchCtrl]);

function SearchCtrl($scope, ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm){
	var vm = this;
	vm.submit = submit;
	vm.add = add;
	vm.spotSearch = spotSearch;
	vm.toggleHistory = toggleHistory;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.items = [];
	vm.searchTerm = ahSearchTerm.get();

	$scope.$watch("search.searchTerm", function(newVal, oldVal){
		ahSearchTerm.set(newVal);
	});


	function submit(){
		$(".output h3").show();

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

	function toggleHistory(){
		$("#history-contents").slideToggle();
	}
}



