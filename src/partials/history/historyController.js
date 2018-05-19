//jshint esversion: 6

angular

.module('myApp')

.controller('HistoryCtrl', ['$timeout', 'ahResultHistory', 'ahSearchTerm', 'ahSortOrder', 'ahSetIsOpenedProp', HistoryCtrl]);

function HistoryCtrl($timeout, ahResultHistory, ahSearchTerm, ahSortOrder, ahSetIsOpenedProp){
	let vm = this;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();

	// vm.add = add;
	vm.appendToSearchBar = appendToSearchBar;

	// vm.isAdded = isAdded;
	vm.showItemAddedNotification = showItemAddedNotification;

	vm.reverse = ahSortOrder.reverse;
	vm.predicate = ahSortOrder.predicate;
	vm.sort = sort;

	// function add(name){
	// 	vm.searchTerm += (name+', ');
	// 	vm.itemAdded = name;
	// 	ahSearchTerm.set(vm.searchTerm);
	// }

	function appendToSearchBar(name){

		ahSearchTerm.concat(name)
		.then(() => {
			vm.searchTerm = ahSearchTerm.get();
			vm.itemAddedToSearchBar = name;
			$timeout(() => {
				vm.itemAddedToSearchBar = null;
			}, 3000);
		});
	}

	// function isAdded(name){
	// 	return (name === vm.itemAdded);
	// }

	function showItemAddedNotification(name){
		return (name === vm.itemAddedToSearchBar);
	}

	function sort(predicate){
		let sortObj = ahSortOrder.order(vm.predicate, predicate);
		vm.predicate = sortObj.predicate;
		vm.reverse = sortObj.reverse;
	}
}


