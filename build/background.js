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

if(!localStorage.rules) localStorage.rules = {};
var rules = localStorage.rules;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getRule") {
    sendResponse(rules[request.key]);
  } else if (request.method == "getRules") {
    sendResponse(rules);
  } else if (request.method == "setRule") {
    rules[request.key] = request.value;
  } else if (request.method == "clearRules") {
    rules = {};
  } else if (request.method == "deleteRule") {
    delete rules[request.key];
  } else {
    sendResponse({error: 'requires method'}); 
  }
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
