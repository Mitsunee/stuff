/*
 * Copy the entire line below, then add it as the url to a new bookmark.
 * This bookmarklet rebuilds the url using the video-id from the current url and then redirects to it
 */
 javascript:(()=>{location.href="https://www.youtube.com/watch?"+location.href.match(/v=([A-Za-z0-9_-]{10,13})/g)[0];})();
