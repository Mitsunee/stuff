/**
 * Copy the entire line below, then add it as the url to a new bookmark (rightclick into bookmarks bar and select paste)
 * 
 * This bookmarklet attempts to redirect a Mastodon profile to a customizable target instance
 * 
 * Simply edit the bookmark created when pasting, probably change the title and replace "ieji.de" with the domain
 * name of the instance you are on, then click the bookmark whenever you are on a profile on a different instance
 * that you wish to interact with.
 */

/* Copy this:

javascript:(()=>{let t="ieji.de",o=new URL(window.location),i=o.pathname.match(/^(\/@[^\/@]*)/);i&&o.host!=t&&(window.location="https://"+t+i[1]+"@"+o.host)})()

*/

// readable version:

(() => {
  let targetInstance = "ieji.de",
    url = new URL(window.location),
    match = url.pathname.match(/^(\/@[^\/@]*)/);
  if (!match || url.host == targetInstance) return;
  window.location = "https://" + targetInstance + match[1] + "@" + url.host;
})();