chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method) {
      switch (request.method) {
        case "runBook":
          runBook(request.storage);
          break;
        case "stopBook":
          stopBook();
          break;
      }
    }
  }
);

var scrapbook;

function runBook(storage) {
  if (!scrapbook) scrapbook = new Scrapbook.Main();
  $('body').addClass('scrap-run');
}

function stopBook() {
  $('body').removeClass('scrap-run');
}

