//jshint esversion: 6

angular
.module("myApp", ["ui.bootstrap", "ui.router", "spotify"])

.config(['$httpProvider', '$compileProvider', ($httpProvider, $compileProvider) => {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$compileProvider.debugInfoEnabled(false);
}]);
