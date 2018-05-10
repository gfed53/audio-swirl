exports.PORT = process.env.PORT || 8080;

exports.KEYS = {
	tastekidKey: 'TASTEKiD-API-KEY',
	spotID: 'SPOTIFY-CLIENT-ID'
};

/*

REDIRECT URIs

If you're building your own version of this app, you will need a Spotify client key (inserted above in 'spotID') which you will get when creating a Spotify app.(https://beta.developer.spotify.com/documentation/web-api/quick-start/)

After doing so, you will need to navigate to your app via the dashboard, go to 'Edit Settings', and add your production redirect URIs where it requests them, and save your changes.

	./src/oauth-callback.html
		Dev: http://localhost:8080
		Prod: eg. http://my-app123.herokuapp.com

	./src/components/library.js
		Dev: http://localhost:8080/oauth-callback.html
		Prod: eg. http://my-app123.herokuapp.com/oauth-callback.html
*/

