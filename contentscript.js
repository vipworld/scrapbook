chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
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
  $panel.show();
  $highlighter.show();
}

function stopBook() {
  $panel.hide();
  $highlighter.hide();
}


var $panel       = $("<div id=\"scrapbook\">css selector: <input id=\"scrapbook-selector\"/></div>");
var $highlighter = $("<div class=\"scrapbook-highlight\"/>");

$("body").append($panel);
$("body").append($highlighter);

var $cssSelector = $("#scrapbook-selector");
$cssSelector.keyup(function () {
  var $selector = $($cssSelector.val()).eq(0);
  var offset = $selector.offset();

  $highlighter.css("top", offset.top);
  $highlighter.css("left", offset.left);
  $highlighter.width($selector.width());
  $highlighter.height($selector.height());
});
