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
  $('body').addClass('scrap-run');
}

function stopBook() {
  scrapbook.hide();
  $('body').removeClass('scrap-run');
}

var scrapbook = new Scrapbook.Main();
