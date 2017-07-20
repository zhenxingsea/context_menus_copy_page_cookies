browser.contextMenus.create({
  id: "copy_cookies",
  title: "copy cookies",
  contexts: ["all"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
    // Get cookies!
    console.log(info);
    console.log(tab);
    var cookies = null;
    if(info.frameUrl){
        var cookie_data = getAllCookies(info.frameUrl, function(cookie_data) {
            cookies = JSON.stringify(cookie_data);
        });
    }else{
        var cookie_data = getAllCookies(info.pageUrl, function(cookie_data) {
            cookies = JSON.stringify(cookie_data);
        });
    }
    if (info.menuItemId == "copy_cookies") {
        browser.tabs.query(
            {active: true, currentWindow: true}, 
            function(tabs) {
                chrome.tabs.sendMessage(
                    tab.id,
                    {greeting: cookies},
                    function(response) {  
                        console.log(response.farewell);  
                    }
                );  
            }
        ); 
    }  
});

