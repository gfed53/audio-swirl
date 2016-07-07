angular

.module("myApp")

.controller("SearchCtrl", ["ahSearch", "ahSpotSearch", "ahSearchHistory", "ahResultHistory", SearchCtrl])

function SearchCtrl(ahSearch, ahSpotSearch, ahSearchHistory, ahResultHistory){
	var vm = this;
	vm.submit = submit;
	vm.add = add;
	vm.spotSearch = spotSearch;
	vm.toggleHistory = toggleHistory;
	vm.pastSearches = ahSearchHistory.get();
	vm.pastResults = ahResultHistory.get();
	vm.link;
	vm.items = [];
	vm.searchTerm = "";

	function submit(){
		$(".output h3").show();

		vm.searchTermNew = "music:"+vm.searchTerm;

		ahSearch(vm.searchTermNew).getResults()
		.then(function(response){
			// console.log(response);
			var obj = ahSearch().checkValid(response);
			// console.log(obj);
			vm.info = obj.info;
			vm.results = obj.results;
			vm.searchTerm = obj.searchTerm;

		})
	}

	function add(name){
		vm.searchTerm += (name+", ");
	}

	function spotSearch(item){
		vm.link = "";
		ahSpotSearch(item)
		.then(function(response){
			var link = response.artists.items[0].external_urls.spotify;
				vm.item = item;
				vm.link = link;
		})
	}

	function toggleHistory(){
		$("#history-contents").slideToggle();
	}
}



