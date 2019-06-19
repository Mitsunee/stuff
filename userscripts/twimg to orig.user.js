// ==UserScript==
// @name        twimg to orig
// @version     2.1.1
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
    let newLoc = loc,
        fileExt = "";
    if (h != -1) {// check if format=ext
        newLoc = loc.substring(0, h-1);
        fileExt = loc.match(/format=([a-zA-Z]+)/);
        if (fileExt === null) alert("Could not convert twitter url to orig");
        newLoc += "." + fileExt[1];//only the actual match
    } else if (i != -1) {// check if : was used
        newLoc = loc.substring(0, i+8);
    } else if (j != -1) {// check if ? was used
        newLoc = loc.substring(0, j);
    }
    return newLoc;
}

if (!loc.endsWith("?name=orig")) {
    let res = twimgToOrig();
    // redirect
    location.href = res + "?name=orig";
}
