// ==UserScript==
// @name         FGO Fandom skip to icons
// @description  I used this script while I was masssaving servant icons for an account manager
// @version      1
// @grant        none
// @match        https://fategrandorder.fandom.com/wiki/*
// ==/UserScript==

(function() {
    let cuteCat = document.querySelector("[title=Icons]")
    cuteCat.scrollIntoView();
    $(cuteCat).click();
    // clear();let cuteCat="",bigCat=[];$("#gallery-2 img").each(function(){bigCat.push(this.src)});for(let kitten of bigCat){cuteCat+="\n";cuteCat+=kitten.slice(0,kitten.indexOf(".png")+4);};console.log(cuteCat);
})();
