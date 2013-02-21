var activatedTabs = {};
chrome.browserAction.onClicked.addListener(function(tab) {
  if (!activatedTabs[tab.id]) {
    activatedTabs[tab.id] = true;
    initScrapbook(tab.id);
  } else {
    activatedTabs[tab.id] = false;
    stopScrapbook(tab.id);
  }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getLocalStorage")
    sendResponse({data: localStorage[request.key]});
  else if (request.method == "setLocalStorage")
    localStorage[request.key] = request.value;
  else
    sendResponse({}); 
});

function initScrapbook(id) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { method: "runBook" }, function(response) {
      console.log(response.farewell);
    });
    chrome.tabs.insertCSS(null, { file: "css/scrapboot.css" });
  });
}
function stopScrapbook(id) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { method: "stopBook" }, function(response) {
      console.log(response.farewell);
    });
  });
}
