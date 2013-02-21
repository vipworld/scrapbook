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

$("body").append($panel);
$("body").append($highlighter);

var inspectorEnabled = false;
var $inspectorEnabler = $("#scrapbook-inspector");
var $cssSelector = $("#scrapbook-selector");
var $current = $(window);

$(window).mousemove(function (event) {
  $highlighter.hide();
  highlight($(document.elementFromPoint(event.pageX - window.scrollX, event.pageY - window.scrollY)));
});

$cssSelector.keyup(function () {
  $highlighter.hide();
  highlight($($cssSelector.val()).eq(0));
});

$inspectorEnabler.click(function () {
  inspectorEnabled = !$inspectorEnabler.data("enable");
  $inspectorEnabler.data("enable", inspectorEnabled);

  if (inspectorEnabled) {
    $inspectorEnabler.text("disable inspector");
  } else {
    $inspectorEnabler.text("enable inspector");
  }
});

$highlighter.click(function () {
  $cssSelector.val($current.getPath());
  $inspectorEnabler.click();
});

function highlight($selector) {
  if (!inspectorEnabled) return;

  $current = $selector;

  var offset = $selector.offset();

  $highlighter.css("top", offset.top);
  $highlighter.css("left", offset.left);
  $highlighter.width($selector.width());
  $highlighter.height($selector.height());

  $highlighter.show();
}
