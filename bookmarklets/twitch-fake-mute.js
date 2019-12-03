/*
 * Copy the entire line below, then add it as the url to a new bookmark (rightclick into bookmarks bar and select paste)
 *
 * This bookmarklet sets the volume of the player to 0.0001% so you still count as a viewer,
 * while not being able to hear the stream, as if it was muted. Twitch stats are stupid btw.
 */
javascript:(function(){document.querySelector("video").volume=0.000001;})();
