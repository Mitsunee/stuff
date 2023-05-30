// ==UserScript==
// @name        fandom image slice
// @description Cleans up url of fandom images so they are shown at original size and more convenient to save
// @version     1.2
// @author      Mitsunee
// @grant       none
// @run-at      document-end
// @match       https://static.wikia.nocookie.net/*.png/*
// @match       https://static.wikia.nocookie.net/*.jpg/*
// @match       https://static.wikia.nocookie.net/*.webp/*
// @icon        https://static.wikia.nocookie.net/qube-assets/f2/3267/favicons/favicon.ico
// ==/UserScript==

(() => {
  let i;
  if((i = location.href.indexOf(".png")) != -1) location.href = location.href.slice(0,i + 4);
  if((i = location.href.indexOf(".jpg")) != -1) location.href = location.href.slice(0,i + 4);
  if((i = location.href.indexOf(".webp")) != -1) location.href = location.href.slice(0,i + 5);
})()
