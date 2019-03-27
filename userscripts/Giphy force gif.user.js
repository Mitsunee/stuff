// ==UserScript==
// @name         Giphy force gif
// @version      1
// @description  Replaces giphy webp,mp4 and webm with the gif version
// @author       Mitsunee
// @match        https://media.giphy.com/media/*/giphy.gif
// @grant        none
// @run-at       document-end
// @icon         https://giphy.com/static/img/favicon.png
// ==/UserScript==

setTimeout(function() {
    let imgs = document.getElementsByTagName("img");
    for(let img of imgs) {
        console.log(img);
        if((img.src.endsWith(".webp") || img.src.endsWith(".mp4") || img.src.endsWith(".webm")) && typeof img.onerror == 'function') {
            img.onerror();
            console.log("Attempted to replace with gif");
        }
    }
},5000);