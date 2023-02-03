/**
 * Copy the entire line below, then add it as the url to a new bookmark (rightclick into bookmarks bar and select paste)
 * 
 * This bookmarklet attempts to redirect a Mastodon profile to the follow screen on your mastodon instance
 * 
 * Simply edit the bookmark created when pasting, probably change the title and replace "ieji.de" with the domain
 * name of the instance you are on, then click the bookmark whenever you are on a profile on a different instance
 * that you wish to interact with.
 */

/* Copy this:

javascript:(()=>{let t=new URL(window.location),i=t.pathname.match(/^\/(@[^\/@]*)/);i&&(window.location="https://ieji.de/authorize_interaction?uri="+i[1]+"@"+t.host)})();

*/

// readable version:

(() => {
  let url = new URL(window.location),
    match = url.pathname.match(/^\/(@[^\/@]*)/);
  if (!match) return;
  window.location = "https://ieji.de/authorize_interaction?uri=" + match[1] + "@" + url.host;
})();