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

	function submit(){
		$(".output h3").show();

		vm.searchTermNew = "music:"+vm.searchTerm;

		ahSearch(vm.searchTermNew).getResults()
		.then(function(response){
			if(vm.info = response.data.Similar.Info[0].Type === "unknown"){
				alert("Sorry, the API had trouble finding what you were looking for. Please make sure the spelling is correct. Note that TasteKid's queries are very precise, and what you are looking for may be phrased differently.");
			} else {
				ahSearchHistory.add(response.data.Similar.Info[0]);
				ahResultHistory.add(response.data.Similar.Results, ahResultHistory.tKid);
				vm.info = response.data.Similar.Info;
				vm.results = response.data.Similar.Results;
				vm.searchTerm = "";
			}

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
		$("#history").slideToggle();
	}
}



