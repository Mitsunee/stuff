// ==UserScript==
// @name        Force old Reddit
// @version     1
// @grant       none
// @include     https://www.reddit.com/*
// @include     http://www.reddit.com/*
// @icon        https://www.google.com/s2/favicons?domain=www.reddit.com
// ==/UserScript==
location.href = "https://old" + location.href.slice(location.href.indexOf(".reddit.com"));
