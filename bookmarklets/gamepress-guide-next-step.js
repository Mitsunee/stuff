/*
 * Copy the entire line below, then add it as the url to a new bookmark (rightclick into bookmarks bar and select paste)
 * This bookmarklet will automatically scroll the next step in a gamepress.gg/grandorder guide into view.
 *
 * Note: For guides with dropdown menus such as Ooku this will only work
 *       if the next checkbox is actually visible and not in a collapsed dropdown menu!
 */
javascript:(() => document.querySelector(".walk-checkbox:not(:checked)").parentElement.parentElement.scrollIntoView())()
