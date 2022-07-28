// ==UserScript==
// @name        Force old Reddit
// @description Forces old Reddit if possible, does not apply to new.reddit.com
// @version     2
// @grant       none
// @match     https://www.reddit.com/*
// @match     http://www.reddit.com/*
// @icon        https://www.google.com/s2/favicons?domain=www.reddit.com
// ==/UserScript==
(() => {
    if (location.href.match(/\.com\/gallery/) !== null) return; // galleries are not supported on old reddit
    if (location.href.match(/\.com\/r\/place\/?$/) !== null) return; // r/place didn't work on old reddit last time
    location.href = "https://old" + location.href.slice(location.href.indexOf(".reddit.com"));
})()
