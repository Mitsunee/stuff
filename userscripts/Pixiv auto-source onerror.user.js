// ==UserScript==
// @name         Pixiv auto-source onerror
// @version      0.1
// @description  Checks if a hotlink landed you on an errorpage and if so, redirects to the pixiv post page containing the image
// @author       Mitsunee
// @match        https://i.pximg.net/img-original/img/*
// ==/UserScript==

(function() {
    let headerText = document.querySelector("h1");
    if (headerText && headerText.innerText == "403 Forbidden") {
        let m = location.href.match(/\/([0-9]+)_p[0-9]+[\._]{1}/);
        if (m != null) location.href = "https://www.pixiv.net/en/artworks/" + m[1];
    }
})();