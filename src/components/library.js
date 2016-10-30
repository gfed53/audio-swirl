angular
.module("myApp")

.factory("ahSearch", ["$http", "$q", "ahResultHistory", 'ahModals', ahSearch])
.factory("ahSpotSearch", ["Spotify", "$q", ahSpotSearch])
.factory("ahModals", ['$uibModal', ahModals])
.service("ahSearchTerm", ahSearchTerm)
.service("ahResultHistory", [ahResultHistory])
.service("ahSortOrder", [ahSortOrder])

function ahSearch($http, $q, ahResultHistory, ahModals){
	return function(searchTerm){
		var url = "http://www.tastekid.com/api/similar?callback=JSON_CALLBACK";
		var getErrorUrl = "./partials/search/modals/get-error-modal.html";
		var validErrorUrl = "./partials/search/modals/valid-error-modal.html";
		var request = {
			q: searchTerm,
			k: "179625-Educatio-EE7ZUYWY",
			info: 1
		};
		var services = {
			getResults: getResults,
			checkValid: checkValid
		};
		return services;

		function getResults(){
			return $http({
				method: "JSONP",
				url: url,
				params: request
			})
			.then(function(response){
				var results = response;
				return $q.when(response);
			},
			function(response){
				// alert("Sorry, an error occurred. Please try again later");
				ahModals().create(getErrorUrl);
			});
		}

		function checkValid(response){
			var obj;
			if(response.data.Similar.Info[0].Type === "unknown"){
				// alert("Sorry, the API had trouble finding what you were looking for. Please make sure the spelling is correct. Note that TasteKid's queries are very precise, and what you are looking for may be phrased differently.");
				ahModals().create(validErrorUrl);
				obj = {
					info: [],
					results: []
				};
			} else {
				ahResultHistory.add(response.data.Similar.Info, ahResultHistory.searched);
				ahResultHistory.add(response.data.Similar.Results, ahResultHistory.results);
				obj = {
					info: response.data.Similar.Info,
					results: response.data.Similar.Results,
					searchTerm: ""
				};
			}
			return obj;
		}
	};
}

function ahSpotSearch(Spotify, $q){
	return function(item){
		if(typeof item === "undefined"){
			item = "Nirvana";
		}
		return Spotify.search(item, "artist")
		.then(function(response){
			var link = response.artists.items[0].external_urls.spotify;
			return $q.when(response);
		});
	};
}

function ahModals($uibModal){
	return function(){
		var services = {
			create: create
		}

		function create(_templateUrl){
			var modalInstance = $uibModal.open({
				templateUrl: _templateUrl,
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			});
		}

		return services;
	}
}

function ahSearchTerm(){
	this.searchTerm = "";
	this.get = get;
	this.set = set;

	function get(){
		return this.searchTerm;
	}

	function set(_searchTerm_){
		this.searchTerm = _searchTerm_;
	}
}

function ahResultHistory(){
	this.searched = [];
	this.results = [];
	this.getSearched = getSearched;
	this.getResults = getResults;
	this.add = add;

	function getSearched() {
		return this.searched;
	}

	function getResults(){
		return this.results;
	}

	function add(array, newArray){
		array.forEach(function(value,index,array){
			if(getIndexIfObjWithAttr(newArray, "yID", value.yID) === -1){
				newArray.push(array[index]);
			}
		});
	}


	function getIndexIfObjWithAttr(array, attr, value) {
		for(var i = 0; i < array.length; i++) {
			if(array[i][attr] === value) {
				return i;
			}
		}
		return -1;
	}
}

function ahSortOrder(){

	this.reverse = false;
	this.predicate = '$$hashKey';
	//Name
	this.order = order;
	this.get = get;

	function order(current, _predicate) {
		this.reverse = (_predicate === current) ? !this.reverse : false;
		this.predicate = _predicate;
		var sortObj = {
			reverse: this.reverse,
			predicate: this.predicate
		}
		return sortObj;
	}

	function get(){
		return sortObj;
	}
}





