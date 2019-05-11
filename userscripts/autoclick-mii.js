// ==UserScript==
// @name         Autoclick Mii
// @version      0.1
// @description  Autoclicks Mii every second to gather random platin points
// @author       Mitsunee
// @match        https://my.nintendo.com/
// @grant        none
// @icon        https://my.nintendo.com/favicon.ico
// ==/UserScript==

setInterval(function() {
    document.querySelector(".MiiStage_btns>a.mii").click();
    //Note: idk if this clicks the weekly Platin points yet, I already got mine for this week, so I can't check the class names
}, 1000);
