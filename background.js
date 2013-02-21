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

function initScrapbook(id) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { method: "runBook" }, function(response) {
      console.log(response.farewell);
    });
  });
}
function stopScrapbook(id) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { method: "stopBook" }, function(response) {
      console.log(response.farewell);
    });
  });
}
