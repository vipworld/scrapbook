chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file: "main.js" });
	chrome.tabs.insertCSS(null, { file: "main.css" });
});

// chrome.browserAction.onClicked.addListener(function() {
//   chrome.windows.getCurrent(function(win) {
//     chrome.tabs.getSelected(win.id, function(tab) {
//       chrome.tabs.sendMessage(tab.id, {}, function(response) {
//       });
//     });
//   });
// });

