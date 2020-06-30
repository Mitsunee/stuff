// ==UserScript==
// @name         Remove Fandom Featured Videos
// @version      0.1
// @description  Removes Featured video section in every fandom site
// @author       Mitsunee
// @match        https://*.fandom.com/wiki/*
// @grant        none
// ==/UserScript==

(function() {
    if ($("#featured-video__player").length > 0) {
        $(".featured-video__wrapper").remove()
        console.log("removed video player");
    }
})();
