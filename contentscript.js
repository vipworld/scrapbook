chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert("open");
  }
);

function runBook() {
  alert("bookRun");
}

function stopBook() {
  alert("bookStop");
}
