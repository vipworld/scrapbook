chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method) {
      switch (request.method) {
        case "runBook":
          runBook();
          break;
        case "stopBook":
          stopBook();
          break;
      }
    }
  }
);

function runBook() {
  scrapbook.show();
}

function stopBook() {
  scrapbook.hide();
}

var scrapbook = new Scrapbook.Main();
