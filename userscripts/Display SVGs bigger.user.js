// ==UserScript==
// @name         Display SVGs bigger
// @version      0.1
// @description  When opening an SVG in a new tab remove the width and height attributes.
// @author       Mitsunee
// @match        *://*/*.svg
// ==/UserScript==

(function() {
  // check that the document is actually an SVG
  const dEl = document.documentElement;
  if (dEl.tagName != "svg") return;

  // save original dimensions in dataset
  dEl.dataset.originalWidth = dEl.getAttribute("width");
  dEl.dataset.originalHeight=dEl.getAttribute("height");

  // remove attributes
  dEl.setAttribute("width", "");
  dEl.setAttribute("height", "");
})();