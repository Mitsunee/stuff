// ==UserScript==
// @name        discord image slice
// @version     1
// @author      Mitsunee
// @grant       none
// @run-at      document-end
// @include     https://media.discordapp.net/attachments/*.png?*
// @include     https://media.discordapp.net/attachments/*.jpg?*
// @icon        https://discord.com/assets/07dca80a102d4149e9736d4b162cff6f.ico
// ==/UserScript==
if (/(width|height)\=[0-9]+\&(width|height)\=[0-9]+[&]?/.test(location.href)) {
    location.href = location.href.replace(/(width|height)\=[0-9]+\&(width|height)\=[0-9]+[&]?/,'');
}