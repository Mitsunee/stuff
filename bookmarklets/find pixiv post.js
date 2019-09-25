/*
 * Copy the entire line below, then add it as the url to a new bookmark (rightclick into bookmarks bar and select paste)
 * Works with every url that has a pixiv-formatted name like "30874165_p0.jpg" or "30874165_p0_master1200.jpg" in it.
 */
javascript:(()=>{m=location.href.match(/\/([0-9]+)_p[0-9]+[\._]{1}/);if(m!=null)location.href="https://www.pixiv.net/en/artworks/"+m[1];})();
