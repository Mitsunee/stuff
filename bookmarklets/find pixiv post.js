/*
 * Copy the entire line below, then add it as the url to a new bookmark.
 * Works with every url that has a pixiv-formatted name like "30874165_p0.jpg" in it.
 */
javascript:(()=>{m=location.href.match(/\/([0-9]+)_p[0-9]+\./);if(m!=null) location.href="https://www.pixiv.net/member_illust.php?mode=medium&illust_id="+m[1];})();
