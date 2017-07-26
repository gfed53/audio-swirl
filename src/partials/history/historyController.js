//jshint esversion: 6

angular

.module('myApp')

.controller('HistoryCtrl', ['ahSearch', 'ahSpotSearch', 'ahResultHistory', 'ahSearchTerm', 'ahSortOrder', HistoryCtrl]);

function HistoryCtrl(ahSearch, ahSpotSearch, ahResultHistory, ahSearchTerm, ahSortOrder){
	let vm = this;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();
	vm.add = add;
	vm.isAdded = isAdded;
	vm.spotSearch = spotSearch;
	vm.reverse = ahSortOrder.reverse;
	vm.predicate = ahSortOrder.predicate;
	vm.sort = sort;

	function add(name){
		vm.searchTerm += (name+', ');
		vm.itemAdded = name;
		ahSearchTerm.set(vm.searchTerm);
	}

	function isAdded(name){
		return (name === vm.itemAdded);
	}

	function spotSearch(item){
		vm.link = '';
		ahSpotSearch(item)
		.then((response) => {
			let link = response.data.artists.items[0].external_urls.spotify;
			vm.item = item;
			vm.link = link;
		});
	}

	function sort(predicate){
		let sortObj = ahSortOrder.order(vm.predicate, predicate);
		vm.predicate = sortObj.predicate;
		vm.reverse = sortObj.reverse;
	}
}


