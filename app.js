angular
.module("myApp", ["ui.bootstrap", "ui.router", "spotify"])

.config(['$httpProvider', 'SpotifyProvider', function($httpProvider, SpotifyProvider){
	SpotifyProvider.setClientId('e481fce87cb54eeaac46da111d587036');
}])
