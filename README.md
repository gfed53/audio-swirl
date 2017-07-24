# Audio Swirl

## Introduction

Introducing Audio Swirl, a spinoff to my previously-created Media Swirl focused on just music-searching with added features. It involves integration of both the TASTEKiD and Spotify APIs.

## Build Instructions

1. Make sure npm is installed, then in the terminal, run 'npm i' to install all dependencies.

2. Before you start using the app, you will need to supply the app with API keys.

  * Navigate to src/components/library.js.

  * Search for 'XXXXXX' using CMD+F (or whatever search command you can use) within that file. You should find the places where the API keys are needed.

A demo version is currently being created - with no API key insertion required - and a link will be supplied right here when it's usable.

## Directions

(Taken from the "directions" section of the app)

Enter an artist in the search bar, and hit "Go!" to find other similar artists to the one searched.

Click the "Add" button on any single result to automatically add it to the search bar. You can search multiple artists at a time if you want to get a broader blend of results, or just keep it simple and search one at a time.

Click the Spotify link to access the artist's Spotify page. From there, you have access to all of the Spotify features. With most artists you'll get a more in-depth biography, possibly find more related artists, and be able to listen to their music.
Enjoy!

## Known Bugs/Issues

* What was once available without even the need for an API key now apparently requires not only this but also an access token. For the time being, the Spotify part of the app isn't functional, but I'll be working to change that soon.

* Although you may find certain, not-as-well-known artists within your results, their info may not be 100% complete, or the APIs may mistake the artist for a more well-known one. This is simply due to limitations of either API, but I'll probably find a way around this issue in a future version. 

Something to keep in mind:

* When a user clicks the "Add" button, the artist's name will be added to the search bar, as mentioned in the directions. However, a comma is also automatically added in case the user wants to add more artists to a single search. Because of this, **if you enter an artist manually (typing it in), then use the "Add" feature, there will be issues.** Not serious issues though, just a matter of adjusting what's in the search bar. 

## The Process

Like Media Swirl, this app demonstrates AJAX requests (JSONP in this case) for the TASTEKiD API, and also the angular-spotify service to handle the Spotify API functionality. Formerly using solely jQuery and core JS, the app has been refactored as an AngularJS app to display the awesomeness and power of AngularJS as well as AngularUI router to create the same app with great ease.


