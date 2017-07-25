//jshint esversion: 6

(function(){
	angular
	.module("myApp")

	.factory("ahSearch", ["$http", "$q", "ahResultHistory", "ahModals", "ahAPIKeys", ahSearch])
	.factory("ahSpotSearch", ["Spotify", "$q", ahSpotSearch])
	.factory("ahSpotSearch2", ["$http", "$q", "ahGetToken", ahSpotSearch2])
	.factory("ahSpotTest", ["$http", "$q", "ahAPIKeys", ahSpotTest])
	.factory("ahModals", ["$q", "$uibModal", ahModals])
	.service("ahGetToken", [ahGetToken])
	.service("ahSearchTerm", ahSearchTerm)
	.service("ahResultHistory", [ahResultHistory])
	.service("ahSortOrder", [ahSortOrder])
	.service("ahAPIKeys", ["$q", "$state", "ahModals", ahAPIKeys]);

	// function ahTrustSrc(){

	// }

	function ahSearch($http, $q, ahResultHistory, ahModals, ahAPIKeys){
		return (searchTerm) => {
			let getErrorTemp = {
				templateUrl: "./partials/search/modals/get-error-modal.html",
				controller: "ErrorModalController",
				controllerAs: "errorModal"
			};
			let validErrorTemp = {
				templateUrl: "./partials/search/modals/valid-error-modal.html",
				controller: "ErrorModalController",
				controllerAs: "errorModal"
			};
			let services = {
				getResults: getResults,
				checkValid: checkValid
			};
			return services;

			function getResults(){
				//## Note: JSON_CALLBACK doesn't work in newer versions of Angular 1.x
				let url = "http://www.tastekid.com/api/similar?callback=JSON_CALLBACK";
				let key = ahAPIKeys.apisObj.tastekidKey;
				let request = {
					q: searchTerm,
					k: key,
					info: 1
				};
				return $http({
					method: "JSONP",
					url: url,
					params: request
				})
				.then((response) => {
					let results = response;
					return $q.when(response);
				},
				(response) => {
					ahModals().create(getErrorTemp);
				});
			}

			function checkValid(response){
				let obj;
				if(response.data.Similar.Info[0].Type === "unknown"){
					ahModals().create(validErrorUrl);
					obj = {
						info: undefined,
						results: undefined
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
		return (item) => {
			if(typeof item === "undefined"){
				item = "Nirvana";
			}
			return Spotify.search(item, "artist")
			.then((response) => {
				let link = response.artists.items[0].external_urls.spotify;
				return $q.when(response);
			});
		};
	}

	function ahSpotSearch2($http, $q, ahGetToken){



		return (item) => {
			let token = ahGetToken.token;
			console.log('token before search:',token);
			if(typeof item === "undefined"){
				item = "Nirvana";
			}
			let url = 'https://api.spotify.com/v1/search';
			let params = {
				q: item,
				type: 'artist'
			};

			let headers = {
				"Authorization": `Bearer ${token}`
			};
			return $http.get(url,{
				headers,
				params
			})
			.then((response) => {
				console.log('response is:',response);
				let link = response.data.artists.items[0].external_urls.spotify;
				console.log('link is:',link);
				return $q.when(response);
			});
		};
	}

	function ahSpotTest($http, $q, ahAPIKeys){
		return () => {
			let url = 'https://accounts.spotify.com/authorize';
			let client_id = ahAPIKeys.apisObj.spotID;
			let redirect_uri = 'http://localhost/src/oauth-callback.html';

			window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + client_id + '&response_type=token&redirect_uri='+redirect_uri;

			// console.log();
		};
			
	}

	function ahGetToken(){

		this.token = null;
		this.get = get;

		function get(){
			let obj = JSON.parse(localStorage.getItem('spotOAuth'));
			if(obj !== null && obj !== undefined){
				console.log('obj is:',obj);
				this.token = obj.oauth.access_token;
			}
		}
	}

	function ahModals($q, $uibModal){
		return () => {
			let services = {
				create: create
			};

			function create(modalObj){
				let deferred = $q.defer();
				let modalInstance = $uibModal.open({
					templateUrl: modalObj.templateUrl,
					controller: modalObj.controller,
					controllerAs: modalObj.controllerAs
				});

				modalInstance.result.then((result) => {
					deferred.resolve(result);
				}, (error) => {
					deferred.reject(error);
				});

				return deferred.promise;
			}

			return services;
		};
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
			array.forEach((value,index,array) => {
				if(getIndexIfObjWithAttr(newArray, "yID", value.yID) === -1){
					newArray.push(array[index]);
				}
			});
		}


		function getIndexIfObjWithAttr(array, attr, value) {
			for(let i = 0; i < array.length; i++) {
				if(array[i][attr] === value) {
					return i;
				}
			}
			return -1;
		}
	}

	function ahSortOrder(){

		this.reverse = false;
		this.predicate = "$$hashKey";
		//Name
		this.order = order;
		this.get = get;

		function order(current, _predicate) {
			this.reverse = (_predicate === current) ? !this.reverse : false;
			this.predicate = _predicate;
			let sortObj = {
				reverse: this.reverse,
				predicate: this.predicate
			};
			return sortObj;
		}

		function get(){
			return sortObj;
		}
	}

	function ahAPIKeys($q, $state, ahModals){
		//Local Storage key name: "ah-log-info"
		this.check = check;
		this.update = update;
		this.apisObj = {
			id: "New User"
		};

		let initTemp = {
			templateUrl: "./partials/search/modals/init-modal.html",
			controller: "InitModalController",
			controllerAs: "initModal"
		};

		let updateTemp = {
			templateUrl: "./partials/search/modals/update-modal.html",
			controller: "UpdateModalController",
			controllerAs: "updateModal"
		};


		function check(){
			//Checking localStorage to see if user has an id with saved API keys
			if(localStorage["ah-log-info"]){
				let obj = JSON.parse(localStorage["ah-log-info"]);
				this.apisObj = obj;
				console.log('apisObj:',this.apisObj);
				return false;
			} else {
				return true;
			}
		}

		function update(obj){
			localStorage.setItem("ah-log-info", JSON.stringify(obj));
			this.apisObj = obj;
			$state.reload();
		}
	}
})();





