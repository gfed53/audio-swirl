# Audio Swirl

## Live Demo

Here is a [live demo version](http://audio-swirl-123.herokuapp.com/) that you can jump right into and use. If you want to create your own build and/or learn more about the process, continue reading.


## Introduction

Introducing Audio Swirl, a spinoff to my previously-created Media Swirl focused on just music-searching with added features. It involves integration of both the TASTEKiD and Spotify APIs.

## Directions

(Taken from the "directions" section of the app)

Enter an artist in the search bar, and hit "Go!" to find other similar artists to the one searched.

Click the "Add" button on any single result to automatically add it to the search bar. You can search multiple artists at a time if you want to get a broader blend of results, or just keep it simple and search one at a time.

Click the Spotify link to access the artist's Spotify page. **Note that using the Spotify API requires authentication. You need to have an account with Spotify to use its features.** From there, you have access to all of the Spotify features. With most artists you'll get a more in-depth biography, possibly find more related artists, and be able to listen to their music.
Enjoy!

## Known Bugs/Issues

* Although you may find certain, not-as-well-known artists within your results, their info may not be 100% complete, or the APIs may mistake the artist for a more well-known one. This is simply due to limitations of either API, but I may find a way around this issue in a future version. 

To keep in mind:

* One of the last ammendments I made was implementing an OAuth2 implicit grant flow into the app since Spotify's API currently requires authorization tokens. Things should be working okay now, but keep in mind that it may still be a relatively new fix.

* When a user clicks the "Add" button, the artist's name will be added to the search bar, as mentioned in the directions. However, a comma is also automatically added in case the user wants to add more artists to a single search. Because of this, **if you enter an artist manually (typing it in), then use the "Add" feature, there will be issues.** Not serious issues though, just a matter of adjusting what's in the search bar. 

## Build Instructions

1. Make sure npm is installed, then in the terminal, run `npm i` to install all dependencies.

2. Before you start using the app, you will need to supply the app with API keys.

  * Navigate to config.js.

  * You should find the places where the API keys are needed. For Spotify, only the client ID is required, not the secret key.

  	* [Spotify key link](https://developer.spotify.com/web-api/)
  	* [TASTEKiD key link](https://www.tastekid.com/read/api)

3. Once all dependencies are installed and everything is in place, you can run `gulp build` in the command line to create a build version.

4. You can serve the app locally by running `npm start`. The app listens at port 8080.

## The Process

Like Media Swirl, this app demonstrates AJAX requests (JSONP in this case) for the TASTEKiD API, and also makes use of the Spotify API. Formerly using solely jQuery and core JS, the app has been refactored as an AngularJS app to display the awesomeness and power of AngularJS as well as AngularUI router to create the same app with great ease.


