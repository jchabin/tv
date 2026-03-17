# Random TV Shows

[Try it here.](https://jchabin.github.io/tv)

Watch random TV shows from around the world with your friends. Click the remote
to change the channel.

When you start watching, the URL will be populated with a room code (something
like `?r=...-...-...-...-...`). Copy and send this URL to others to watch TV
with them, but keep in mind that there may be issues with syncing, and some
channels may be unavailable in some regions. You can type on your keyboard to
add captions to the shows, which will be visible to everyone else in the room.

This website can also connect to twitch chat. Fill in a twitch username in the
URL below:
```
https://jchabin.github.io/tv/?c=TWITCH_USERNAME
```
This will create a session which can be added as an OBS browser source, and will
allow your chat to change the channel by typing `!remote`.

Some additional query params can be added as well:

* `hint` - Can be used to disable the hint on the bottom of the screen with `hint=0`
* `muted` - Can be used to re-add the "click to unmute" dialogue even when in
OBS, which can be useful if having issues getting audio to work from OBS with `muted=1`
* `guide` - Setting `guide=1` adds a QR code to a channel guide, and lets
chatters use the command `!channel N` to change to a specific channel. It is
*highly* recommended that this is only when running the proxy locally, as most
of the channels will fail to load due to CORS issues without a proxy.

## Running locally

Run the server and proxy locally with
```
npm install && node server
```
Then the website can be accessed at `localhost`, and OBS sources should point to
`localhost?c=...`. Running it locally will give access to a much greater number
of channels, and is recommended when using the TV guide through twitch chat.
