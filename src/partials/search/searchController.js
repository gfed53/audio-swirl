//jshint esversion: 6

angular

.module("myApp")

.controller("SearchCtrl", ["$scope", "ahSearch", "ahSpotSearch", "ahSpotSearch2", "ahSpotTest", "ahGetToken", "ahResultHistory", "ahSearchTerm", "ahAPIKeys", SearchCtrl]);

function SearchCtrl($scope, ahSearch, ahSpotSearch, ahSpotSearch2, ahSpotTest, ahGetToken, ahResultHistory, ahSearchTerm, ahAPIKeys){
	let vm = this;
	vm.submit = submit;
	vm.add = add;
	vm.isAdded = isAdded;
	vm.spotSearch = spotSearch;
	vm.pastSearches = ahResultHistory.getSearched();
	vm.pastResults = ahResultHistory.getResults();
	vm.searchTerm = ahSearchTerm.get();
	vm.submitLogInfo = submitLogInfo;
	vm.resetLogInfo = resetLogInfo;
	vm.cancelReset = cancelReset;

	vm.needsAuth = ahAPIKeys.check();

	vm.apisObj = ahAPIKeys.apisObj;
	vm.userName = ahAPIKeys.apisObj.id;

	vm.spotTest = spotTest;

	//Testing
	ahGetToken.get();
	// console.log(JSON.parse(localStorage.getItem('spotOAuth')));

	$scope.$watch("search.searchTerm", (newVal) => {
		//Watches for changes in the search bar, so if the user switches over to a different tab and then return to it, they won't lose what they inputed.
		ahSearchTerm.set(newVal);
	});


	function submit(){
		vm.searchTermNew = "music:"+vm.searchTerm;

		ahSearch(vm.searchTermNew).getResults()
		.then((response) => {
			let obj = ahSearch().checkValid(response);
			vm.info = obj.info;
			vm.results = obj.results;
			vm.searchTerm = obj.searchTerm;
			ahSearchTerm.set(vm.searchTerm);

		});
	}

	function add(name){
		vm.searchTerm += (name+", ");
		ahSearchTerm.set(vm.searchTerm);
		vm.itemAdded = name;
	}

	function isAdded(name){
		return (name === vm.itemAdded);
	}

	function spotSearch(item){
		vm.link = "";
		ahSpotSearch2(item)
		.then((response) => {
			console.log('response in controller:',response);
			let link = response.data.artists.items[0].external_urls.spotify;
			vm.item = item;
			vm.link = link;
		});
	}

	function spotTest(){
		// vm.link = "";
		ahSpotTest();
	}

	function submitLogInfo(obj){
		ahAPIKeys.update(obj);
	}

	function resetLogInfo(){
		vm.needsAuth = true;
		vm.reqReset = true;
	}

	function cancelReset(){
		vm.needsAuth = false;
		vm.reqReset = false;
	}
}



