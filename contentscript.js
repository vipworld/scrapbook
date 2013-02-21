    alert("loaded");
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert("open");
  }
);
