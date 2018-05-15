//jshint esversion: 6

(function(){
	angular
	.module('myApp')

	.factory('ahSearch', ['$http', '$q', 'ahResultHistory', 'ahModals', 'ahAPIKeys', ahSearch])
	.factory('ahGetSpotLink', ['$http', '$q', 'ahGetToken', 'ahModals', ahGetSpotLink])
	.factory('ahModals', ['$q', '$uibModal', ahModals])
	.factory('ahSetIsOpenedProp', [ahSetIsOpenedProp])
	.factory('ahFocus', ['$timeout', '$window', ahFocus])
	.service('ahSearchTerm', ahSearchTerm)
	.service('ahResultHistory', [ahResultHistory])
	.service('ahSortOrder', [ahSortOrder])
	.service('ahAPIKeys', ['$http', '$q', '$state', 'ahModals', ahAPIKeys])
	.service('ahGetToken', ['ahAPIKeys', 'ahModals', ahGetToken]);

	function ahSearch($http, $q, ahResultHistory, ahModals, ahAPIKeys){
		return (searchTerm) => {
			let getErrorTemp = {
				templateUrl: './partials/search/modals/get-error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			};
			let validErrorTemp = {
				templateUrl: './partials/search/modals/valid-error-modal.html',
				controller: 'ErrorModalController',
				controllerAs: 'errorModal'
			};
			let services = {
				getResults: getResults,
				checkValid: checkValid
			};
			return services;

			function getResults(){
				//*** Note: JSON_CALLBACK doesn't work in newer versions of Angular 1.x
				let url = 'http://www.tastekid.com/api/similar?callback=JSON_CALLBACK';
				let key = ahAPIKeys.apisObj.tastekidKey;
				let request = {
					q: searchTerm,
					k: key,
					info: 1
				};
				return $http({
					method: 'JSONP',
					url: url,
					params: request
				})
				.then((response) => {
					if(response.data.error){
						console.error(response.data.error);
					} else {
						return $q.when(response);
					}
				},
				(response) => {
					ahModals().create(getErrorTemp);
				});
			}

			function checkValid(response){
				let obj;
				if(response.data.Similar.Info[0].Type === 'unknown'){
					ahModals().create(validErrorTemp);
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
						searchTerm: ''
					};
				}
				return obj;
			}
		};
	}

	function ahGetSpotLink($http, $q, ahGetToken, ahModals){
		return (item) => {
			if(!item.spotLink){
				spotApiCall(item.Name)
				.then((response) => {
					// Mutates the item object..
					item.spotLink = response.data.artists.items[0].external_urls.spotify;
				});
			}
		};

		function spotApiCall(q){
			let spotRefreshTemp = ahModals().getTemp('spotRefreshTemp');
			
				let token = ahGetToken.token;
				if(token){
					let url = 'https://api.spotify.com/v1/search';
					let params = {
						q,
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
						let link = response.data.artists.items[0].external_urls.spotify;
						return $q.when(response);
					}, (err)=>{
						/* 
							Below should be kept in case the user's token expires while in an open session.
						*/
						if(err.status === 401 && ahGetToken.token){
							ahModals().create(spotRefreshTemp)
							.then(()=>{
								ahGetToken.auth();
							}, ()=> {
								// declined
							});
						}
					});
				} else {
					return null;
				}
		}
	}

	function ahModals($q, $uibModal){
		let initTemp = {
			templateUrl: './partials/search/modals/init-modal.html',
			controller: 'InitModalController',
			controllerAs: 'initModal'
		};

		let updateTemp = {
			templateUrl: './partials/search/modals/update-modal.html',
			controller: 'UpdateModalController',
			controllerAs: 'updateModal'
		};

		let spotAuthTemp = {
			templateUrl: './partials/search/modals/spot-auth-modal.html',
			controller: 'SpotAuthModalController',
			controllerAs: 'spotModal'
		};

		let spotRefreshTemp = {
			templateUrl: './partials/search/modals/spot-refresh-modal.html',
			controller: 'SpotAuthModalController',
			controllerAs: 'spotModal'
		};

		let getErrorTemp = {
			templateUrl: './partials/search/modals/get-error-modal.html',
			controller: 'ErrorModalController',
			controllerAs: 'errorModal'
		};

		let validErrorTemp = {
			templateUrl: './partials/search/modals/valid-error-modal.html',
			controller: 'ErrorModalController',
			controllerAs: 'errorModal'
		};

		

		return () => {
			let temps = {
				initTemp,
				updateTemp,
				spotAuthTemp,
				spotRefreshTemp,
				getErrorTemp,
				validErrorTemp
			};
			let services = {
				create,
				getTemp
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

			function getTemp(temp){
				return temps[temp];
			}

			return services;
		};
	}

	function ahSearchTerm(){
		this.searchTerm = '';
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

		// Could just use lodash uniqBy?
		function add(array, newArray){
			array.forEach((value,index,array) => {
				if(getIndexIfObjWithAttr(newArray, 'yID', value.yID) === -1){
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
		this.predicate = '$$hashKey';
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

	function ahAPIKeys($http, $q, $state, ahModals){
		
		this.get = get;
		this.update = update;
		this.init = init;
		this.initKeys = initKeys;

		let initTemp = {
			templateUrl: './partials/search/modals/init-modal.html',
			controller: 'InitModalController',
			controllerAs: 'initModal'
		};

		let updateTemp = {
			templateUrl: './partials/search/modals/update-modal.html',
			controller: 'UpdateModalController',
			controllerAs: 'updateModal'
		};

		function init(){
			let deferred = $q.defer();
			initKeys()
			.then((data)=> {
				this.apisObj = data;
				deferred.resolve();
			});

			return deferred.promise;
		}

		function initKeys(){
			return $http.get('/access')
					.then((res) => {
						return res.data;
					});
		}

		function get(){
			return this.apisObj;
		}

		function update(obj){
			localStorage.setItem('ah-log-info', JSON.stringify(obj));
			this.apisObj = obj;
			$state.reload();
		}
	}

	function ahGetToken(ahAPIKeys, ahModals){
		let obj = JSON.parse(localStorage.getItem('spotOAuth'));

		let spotAuthTemp = ahModals().getTemp('spotAuthTemp');
		let spotRefreshTemp = ahModals().getTemp('spotRefreshTemp');

		this.token = get();

		this.get = get;
		this.auth = auth;

		function isExpired(authObj){
			return authObj.oauth.time_stamp + (parseInt(authObj.oauth.expires_in)*1000) < Date.now();
		}

		function auth(){
			let url = 'https://accounts.spotify.com/authorize';
			let obj = ahAPIKeys.get();
			let client_id = ahAPIKeys.get().spotID;

			// Will be different for production version. See ./config.js for URI info.
			let redirect_uri = 'http://localhost:8080/oauth-callback.html';
			
			window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + client_id + '&response_type=token&redirect_uri='+redirect_uri;
		}

		function get(){	
			if(obj === null || obj === undefined){
				ahModals().create(spotAuthTemp)
				.then(()=>{
					auth();
				}, ()=>{
					return null;
				});
			} else if(isExpired(obj)){
				ahModals().create(spotRefreshTemp)
				.then(()=>{
					auth();
				}, ()=> {
					return null;
				});
			} else {
				return obj.oauth.access_token;
			}
		}
	}

	function ahSetIsOpenedProp(){
		return (list, onIsOpened) => {
			let updated = [...list];

			updated.forEach(function(item) {
				var isOpened = false;
				Object.defineProperty(item, "isOpened", {
					get: function() {
						return isOpened;
					},
					set: function(newValue) {
						isOpened = newValue;
						if (isOpened) {
							onIsOpened(item);
						}
					}
				});
			});

			return updated;			

		}
	}

	function ahFocus($timeout, $window) {
		return function(id) {
			/*
      	timeout makes sure that it is invoked after any other event has been triggered.
      	e.g. click events that need to run before the focus or
      	inputs elements that are in a disabled state but are enabled when those events
				are triggered.
			*/
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
	}
})();





