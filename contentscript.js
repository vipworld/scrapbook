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

$("body").append("<div id=\"scrapbook\">css selector: <input id=\"scrapbook-selector\"/></div><div class=\"scrapbook-highlight\"/>");

var $cssSelector = $("#scrapbook-selector");
var $highlighter = $(".scrapbook-highlight");

$cssSelector.keyup(function () {
  var $selector = $($cssSelector.val()).eq(0);
  var offset = $selector.offset();

  console.log($cssSelector.val(), $selector, offset);

  $highlighter.css("top", offset.top);
  $highlighter.css("left", offset.left);
  $highlighter.width($selector.width());
  $highlighter.height($selector.height());
});
