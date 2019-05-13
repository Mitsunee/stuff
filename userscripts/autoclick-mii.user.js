// ==UserScript==
// @name         Autoclick Mii
// @version      0.2
// @description  Autoclicks Mii every second to gather random platin points
// @author       Mitsunee
// @match        https://my.nintendo.com/
// @grant        none
// @icon        https://my.nintendo.com/favicon.ico
// @run-at      document-end
// ==/UserScript==

// interval to click Mii every 500ms
let miiClicker = setInterval(function() {
    document.querySelector(".MiiStage_btns>a.mii").click();
}, 500);
// timeout to clear the interval after 20 seconds
setTimeout(function() {
    clearInterval(miiClicker);
}, 20000);
