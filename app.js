angular
.module("myApp", ["ui.bootstrap", "ui.router", "spotify"])

.config(['$httpProvider', 'SpotifyProvider', function($httpProvider, SpotifyProvider){
	SpotifyProvider.setClientId('e481fce87cb54eeaac46da111d587036');
	// $httpProvider.defaults.useXDomain = true;
	// delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.run(["ahSpotSearch", function(ahSpotSearch){
	console.log("running?");
	// ahSpotSearch();
}])