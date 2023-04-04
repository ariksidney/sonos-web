# Sonos Web 🎶

A quickly hacked together webapp to control your Sonos system from anywhere - not just your local network.

![Screenshot](https://user-images.githubusercontent.com/15780097/167259921-83ee4024-ff94-4937-806b-19ba17bd8063.png)

## Features

* Login to your Sonos account
* List your Groups
* Pause/Play existing queue
* Skip to next track
* Change volume
* List and play Sonos favorites

All the rest is (not yet) implemented.

I just tested it with Spotify, Soundcloud and Audible. My System is fairly simple (1x Sonos One, 1x Sonos AMP, but not connected to a TV) so I'm not sure how it scales with more complex systems. If you have problems, feel free to open an issue.

As Firebase Functions are used as a backend and to save some calls, the Sonos Groups are not automatically updated.
