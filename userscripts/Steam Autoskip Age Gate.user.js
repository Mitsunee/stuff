// ==UserScript==
// @name         Steam Autoskip Age Gate
// @version      0.1
// @description  Click the button if the Age Gate Screen pops up
// @author       Mitsunee
// @match        https://steamcommunity.com/*
// @grant        none
// ==/UserScript==

(function() {
    let i = document.querySelector("#age_gate_btn_continue");
    if (i) i.click();
})();