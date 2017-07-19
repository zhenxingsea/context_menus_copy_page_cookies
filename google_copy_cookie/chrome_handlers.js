var config = {
    omnibox_keyword: "session_load"
};

/**********************************
 * Set up context menu action for saving page data.
 */
chrome.contextMenus.create({
    title: "copy cookie",
});

/**********************************
 * copyToClipboard(text)
 *
 * Given text, copy it to the clipboard using document.execCommand.
 * This executes through the background page, since Chrome does not give
 * clipboard access otherwise (see http://goo.gl/KlQi7)
 */
var copyToClipboard = function(text) {
    var backgroundPage = chrome.extension.getBackgroundPage();

    var clipboard = backgroundPage.document.getElementById("clipboard");
    clipboard.value = text;
    clipboard.select();

    backgroundPage.document.execCommand("Copy");
};

/**********************************
 * Handler for clicking on the context menu item.
 * When clicked, should generate the cookie data and insert it into the
 * user's clipboard to send to a friend or otherwise.
 */
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    // Get cookies!
    if(info.frameUrl){
        var cookie_data = getAllCookies(info.frameUrl, function(cookie_data) {
            // Action name plus data
            copyToClipboard(
                JSON.stringify(cookie_data)
            );
        });
    }else{
        var cookie_data = getAllCookies(info.pageUrl, function(cookie_data) {
            // Action name plus data
            copyToClipboard(
                JSON.stringify(cookie_data)
            );
        });
    }
});

