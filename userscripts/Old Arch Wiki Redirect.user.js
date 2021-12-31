// ==UserScript==
// @name         Old Arch Wiki Redirect
// @version      0.1
// @description  Redirects to the Arch Wiki with legacy layout
// @author       Mitsunee
// @match        https://wiki.archlinux.org/*
// @icon         https://www.google.com/s2/favicons?domain=archlinux.org
// ==/UserScript==

(function() {
    'use strict';

    // check current location
    let loc = document.URL;
    const qmarkpos = loc.indexOf("?");
    const query = qmarkpos < 0 ? "" : loc.substring(qmarkpos + 1);
    const hasSkinVersion = query === "" ? false : /useskinversion\=1/.test(query);
    if (hasSkinVersion) return; // all good already :)

    // build new location
    if (/useskinversion\=/.test(loc)) {
        loc = loc.replace(/useskinversion\=[^&]+/, "useskinversion=1");
    } else {
        loc += `${qmarkpos < 0 ? "?" : "&"}useskinversion=1`;
    }

    // actually go there
    window.location.replace(loc);
})();