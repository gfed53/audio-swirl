//jshint esversion: 6

angular
.module("myApp")

.config(["$compileProvider", "$stateProvider", "$locationProvider", "$urlRouterProvider", ($compileProvider, $stateProvider, $locationProvider, $urlRouterProvider) => {
	
	$compileProvider.debugInfoEnabled(false);

	$urlRouterProvider.otherwise("search");
	let myRoot = {
		name: "root",
		url: "/",
		views: {
			"header": {
				templateUrl: "./partials/header/header.html"
			},
			"content": {
				templateUrl: "./partials/search/search.html",
				controller: "SearchCtrl",
				controllerAs: "search"
			},
			"footer": {
				templateUrl: "./partials/footer/footer.html"
			},
			"menu@root": {
				templateUrl: "./partials/header/header-partials/menu.html",
				controller: "MenuController",
				controllerAs: "menu"
			}
		},
		redirectTo: "search"
	},
	search = {
		name: "search",
		url: "search",
		parent: "root",
		views: {
			"content@": {
				templateUrl: "./partials/search/search.html",
				controller: "SearchCtrl",
				controllerAs: "search"
			},
			"auth@search": {
				templateUrl: "./partials/search/search-partials/auth/auth.html"
			}
		}
	},
	history = {
		name: "history",
		url: "history",
		parent: "root",
		views: {
			"content@": {
				templateUrl: "./partials/history/history.html",
				controller: "HistoryCtrl",
				controllerAs: "history"
			}
		}
	},
	directions = {
		name: "directions",
		url: "directions",
		parent: "root",
		views: {
			"content@": {
				templateUrl: "./partials/directions/directions.html"
			}
		}
	};

	$stateProvider
	.state(myRoot)
	.state(search)
	.state(history)
	.state(directions);
	
}]);


