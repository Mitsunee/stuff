// ==UserScript==
// @name        twimg to orig
// @version     2.1
// @author      Mitsunee
// @grant       none
// @include     https://pbs.twimg.com/media/*
// @icon        https://pbs.twimg.com/favicon.ico
// ==/UserScript==
const loc = location.href;
function twimgToOrig() {
    const h = loc.indexOf('format='),
        i = loc.substring(8).indexOf(':'),
        j = loc.indexOf('?');
    let newLoc = loc;
    // check if format=ext was used and fix it
    if (h != -1) {
        newLoc = loc.substring(0, h-1);
        let fileExt = loc.match(/format=([a-zA-Z]+)/);
        if (fileExt === null) alert("Could not convert twitter url to orig");
        newLoc += "." + fileExt[1];//only the actual match
        return newLoc;
    }
    // check if : already exists and purge it
    if (i != -1) {
        newLoc = loc.substring(0, i+8);
        return newLoc;
    }
    // check if ? already exists and purge it
    if(j != -1) {
        newLoc = loc.substring(0, j);
        return newLoc;
    }
}

if (!loc.endsWith("?name=orig")) {
    let res = twimgToOrig();
    // redirect
    location.href = res + "?name=orig";
}
