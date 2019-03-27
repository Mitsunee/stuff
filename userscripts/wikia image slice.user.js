// ==UserScript==
// @name        wikia image slice
// @version     1
// @author      Mitsunee
// @grant       none
// @run-at      document-end
// @include     https://vignette.wikia.nocookie.net/*.png/*
// @include     https://vignette.wikia.nocookie.net/*.jpg/*
// @icon        https://static.wikia.nocookie.net/qube-assets/f2/3267/favicons/favicon.ico
// ==/UserScript==
if(location.href.indexOf(".png")!=-1) location.href = location.href.slice(0,location.href.indexOf(".png")+4);
if(location.href.indexOf(".jpg")!=-1) location.href = location.href.slice(0,location.href.indexOf(".jpg")+4);