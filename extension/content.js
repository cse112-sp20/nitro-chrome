// content.js

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "fetch_top_domains" ) {
      var urlHash = {}, links = document.links;
      for(var i=0; i<links.length; i++) {
        var domain = links[i].href.split('/')[2]
        if (urlHash[domain]) {
          urlHash[domain] = urlHash[domain] + 1;
        }
        else {
          urlHash[domain] = 1;
        }
      }
      chrome.runtime.sendMessage({"message": "all_urls_fetched", "data": urlHash});
    }
  }
);