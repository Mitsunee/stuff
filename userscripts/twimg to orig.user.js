// ==UserScript==
// @name        twimg to orig
// @version     2
// @author      Mitsunee
// @grant       none
// @include     https://pbs.twimg.com/media/*
// @icon        https://pbs.twimg.com/favicon.ico
// ==/UserScript==
const loc = location.href;
function twimgToOrig() {
    const i = loc.substring(8).indexOf(':'),
        j = loc.indexOf('?');
    let newLoc = loc;
    // check if : already exists and purge it
    if (i != -1) {
        newLoc = location.href.substring(0, i+8);
    }
    // check if ? already exists and purge it
    if(j != -1) {
        newLoc = location.href.substring(0, j);
    }
    // redirect
    location.href = newLoc + "?name=orig";
}

if (!loc.endsWith("?name=orig")) {
    twimgToOrig();
}
