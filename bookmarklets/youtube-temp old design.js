/*
 * Copy the entire line below, then add it as the url to a new bookmark (rightclick into bookmarks bar and select paste)
 * This bookmarklet adds the variable to disable polymer (the new design) to the url to temporarily switch to the old design.
 */
 javascript:(()=>{location.href+=(location.href.indexOf("?")!=-1?"&":"?")+"disable_polymer=true";})();
