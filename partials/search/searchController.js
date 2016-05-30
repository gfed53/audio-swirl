angular

.module("myApp")

.controller("SearchCtrl", ["ahSearch", "ahSpotSearch", "ahSearchHistory", SearchCtrl])

function SearchCtrl(ahSearch, ahSpotSearch, ahSearchHistory){
	var vm = this;
	vm.submit = submit;
	vm.add = add;
	vm.spotSearch = spotSearch;
	vm.pastSearches = ahSearchHistory.get();
	vm.link;
	vm.items = [];
	console.log(vm.pastSearches);
	// spotSearch();

	function submit(){
		$(".output h3").show();
		// vm.category = document.getElementById("select-cat").value;
		// if(vm.category !== "everything"){
		// 	vm.searchTermNew = vm.category+":"+vm.searchTerm;
		// } else {
		// 	vm.searchTermNew = vm.searchTerm;
		// }

		vm.searchTermNew = "music:"+vm.searchTerm;

		ahSearch(vm.searchTermNew).getResults()
		.then(function(response){
			if(vm.info = response.data.Similar.Info[0].Type === "unknown"){
				alert("Sorry, the API had trouble finding what you were looking for. Please make sure the spelling is correct. Note that TasteKid's queries are very precise, and what you are looking for may be phrased differently. ex: 'Street Fighter IV' is recognized, but not 'Street Fighter 4'.");
			} else {
				ahSearchHistory.add(response.data.Similar.Info[0]);
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
				console.log(typeof link);
				console.log(link);
				// return link;
				// vm.items.push({
				// 	item: item,
				// 	link: link
				// });
				vm.item = item;
				vm.link = link;
				console.log(vm.link);
		})
		
		// function match(item){
		// 	return item.name = item;
		// }
	}
}



