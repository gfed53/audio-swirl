//jshint esversion: 6

angular

.module('myApp')

.controller('HistoryCtrl', ['$timeout', 'ahResultHistory', 'ahSearchTerm', 'ahSortOrder', 'ahSetIsOpenedProp', HistoryCtrl]);

function HistoryCtrl($timeout, ahResultHistory, ahSearchTerm, ahSortOrder, ahSetIsOpenedProp){
	let vm = this;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchBarContents = ahSearchTerm.getSearchBarContents();
	vm.appendToSearchBar = appendToSearchBar;
	vm.showItemAddedNotification = showItemAddedNotification;
	vm.reverse = ahSortOrder.reverse;
	vm.predicate = ahSortOrder.predicate;
	vm.sort = sort;

	function appendToSearchBar(name){
		ahSearchTerm.concat(name);
	}

	function showItemAddedNotification(name){
		return (name === vm.searchBarContents.lastAddedArtist);
	}

	function sort(predicate){
		let sortObj = ahSortOrder.order(vm.predicate, predicate);
		vm.predicate = sortObj.predicate;
		vm.reverse = sortObj.reverse;
	}
}


