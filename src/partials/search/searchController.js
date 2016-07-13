angular

.module("myApp")

.controller("SearchCtrl", ["$scope", "ahSearch", "ahSpotSearch", "ahSearchHistory", "ahResultHistory", "ahSearchTerm", SearchCtrl]);

function SearchCtrl($scope, ahSearch, ahSpotSearch, ahSearchHistory, ahResultHistory, ahSearchTerm){
	var vm = this;
	vm.submit = submit;
	vm.add = add;
	vm.spotSearch = spotSearch;
	vm.toggleHistory = toggleHistory;
	vm.pastSearches = ahSearchHistory.get();
	vm.pastResults = ahResultHistory.get();
	vm.items = [];
	vm.searchTerm = ahSearchTerm.get();

	$scope.$watch("search.searchTerm", function(newVal, oldVal){
		ahSearchTerm.set(newVal);
	});


	function submit(){
		//Refactor(no jQuery & move to directive)
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
		//Prob move to service/factory
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

	//Should move to directive
	function toggleHistory(){
		$("#history-contents").slideToggle();
	}
}



