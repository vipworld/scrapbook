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
	chrome.tabs.executeScript(id, { code: "runBook();" });
	//chrome.tabs.insertCSS(null, { file: "main.css" });
}
function stopScrapbook(id) {
	chrome.tabs.executeScript(id, { code: "stopBook();" });
}
