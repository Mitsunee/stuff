// ==UserScript==
// @name        twimg large to orig
// @version     1
// @author      Mitsunee
// @grant       none
// @include     https://pbs.twimg.com/media/*:large
// @icon        https://pbs.twimg.com/favicon.ico
// ==/UserScript==
location.href = location.href.replace(":large","?name=orig");