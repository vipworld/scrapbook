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

var $panel       = $("<div id=\"scrapbook\"><button id=\"scrapbook-inspector\">enable inspector</button><br/>css selector: <input id=\"scrapbook-selector\"/></div>");
var $highlighter = $("<div class=\"scrapbook-highlight\"/>");
var $inspector   = $("<div class=\"scrapbook-inspector\"/>");

$("body").append($panel);
$("body").append($highlighter);
$("body").append($inspector);

var inspectorEnabled = false;
var $inspectorEnabler = $("#scrapbook-inspector");
var $cssSelector = $("#scrapbook-selector");
var $current = $(window);

$(window).mousemove(function (event) {
  inspect(event.pageX - window.scrollX, event.pageY - window.scrollY);
});

$cssSelector.keyup(function () {
  highlight($($cssSelector.val()).eq(0), $highlighter);
});

$inspectorEnabler.click(function () {
  $panel.hide();
  $highlighter.hide();
  inspectorEnabled = true;
});

$inspector.click(function () {
  $cssSelector.val($current.getPath());
  highlight($($cssSelector.val()).eq(0), $inspector);
  highlight($($cssSelector.val()).eq(0), $highlighter);
  $panel.show();
  inspectorEnabled = false;
});

function inspect(x, y) {
  $inspector.hide();

  if (!inspectorEnabled) return;

  highlight($(document.elementFromPoint(x, y)), $inspector);
}

function highlight($selector, $cover) {
  $current = $selector;

  var offset = $selector.offset();

  $cover.css("top", offset.top);
  $cover.css("left", offset.left);
  $cover.width($selector.width());
  $cover.height($selector.height());

  $cover.show();
}
