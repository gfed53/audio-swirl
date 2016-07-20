angular
.module("myApp")

.config(["$compileProvider", "$stateProvider", "$urlRouterProvider", function($compileProvider, $stateProvider, $urlRouterProvider){
	
	$compileProvider.debugInfoEnabled(false);

	$urlRouterProvider.otherwise("directions");
	var myRoot = {
		name: "root",
		url: "/",
		views: {
			"header": {
				templateUrl: "./partials/header/header.html"
			},
			"content": {
				templateUrl: "./partials/directions/directions.html"
			},
			"footer": {
				templateUrl: "./partials/footer/footer.html"
			},
			"menu@root": {
				templateUrl: "./partials/header/header-partials/menu.html",	
			}
		}
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
		parent: "root"
	};

	$stateProvider
	.state(myRoot)
	.state(search)
	.state(history)
	.state(directions);
}]);


