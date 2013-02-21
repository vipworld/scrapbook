var $panel       = $("<div id=\"scrapbook\" class=\"scrapbook\"><button id=\"scrapbook-inspector-enabler\">enable inspector</button> | <button id=\"scrapbook-add-extractor\">add extractor</button> | <button id=\"scrapbook-extract\">extract</button><br/>css selector: <input id=\"scrapbook-selector\"/><ul id=\"scrapbook-extractors\"></ul><ul id=\"scrapbook-results\"></ul></div>");
var $inspector   = $("<div class=\"scrapbook-inspector\"/>");

var highlighters = [];

$("body").append($panel);
$("body").append($inspector);

var inspectorEnabled = false;
var $inspectorEnabler = $("#scrapbook-inspector-enabler");
var $addExtractor = $("#scrapbook-add-extractor");
var $extract = $("#scrapbook-extract");
var $extractors = $("#scrapbook-extractors");
var $results = $("#scrapbook-results");
var $cssSelector = $("#scrapbook-selector");
var $current = $(window);

$(window).mousemove(function (event) {
  inspect(event.pageX - window.scrollX, event.pageY - window.scrollY);
});

$cssSelector.keyup(function () {
  highlightAllContainers();
});

$inspectorEnabler.click(function () {
  $panel.hide();
  removeAllContainerCovers();
  inspectorEnabled = true;
});

$inspector.click(function () {
  $cssSelector.val($current.getPath());
  highlight($($cssSelector.val()).eq(0), $inspector);
  $panel.show();
  inspectorEnabled = false;

  highlightAllContainers();
});

$addExtractor.click(function () {
  $extractors.append("<li class=\"extractor\">name: <input class=\"scrapbook-extractor-name\"/><br/>regexp: <input class=\"scrapbook-sub-regexp\"/><br/>css selector: <input class=\"scrapbook-sub-selector\"/></li>");
});

$extract.click(function () {
  extract();
});

function inspect(x, y) {
  $inspector.hide();

  if (!inspectorEnabled) return;

  highlight($(document.elementFromPoint(x, y)), $inspector);
}

function populate() {
}

function extract() {
  highlightAllContainers();

  var extractors = []
  
  $extractors.find(".extractor").each(function (index, ele) {
    var $extractor = $(ele);
    var $name = $extractor.find(".scrapbook-extractor-name");
    var $regexp = $extractor.find(".scrapbook-sub-regexp");
    var $selector = $extractor.find(".scrapbook-sub-selector");

    extractors.push({
      name: $name.val() || "NO NAME - " + index,
      regexp: $regexp.val(),
      selector: $selector.val()
    });
  });

  var html = ""
  var $targets = $($cssSelector.val());

  $targets.each(function (index, target) {
    var $target = $(target);
    var res = {};

    extractors.forEach(function (extractor) {
      var extracted = "";

      if (extractor.regexp) {
        extracted = $target.html().match(extractor.regexp)[1];
      } else if (extractor.selector) {
        var $x = $target.find(extractor.selector);
        var $cover = $("<div class=\"scrapbook-highlight-extractor\"/>").appendTo($("body"));
        highlight($x, $cover);
        highlighters.push($cover);
        extracted = $x.text();
      }

      res[extractor.name] = extracted;
    });

    html += "<li class=\"result\">"
    for (var key in res) {
      html += key
      html += ": "
      html += res[key]
      html += "<br/>"
    }
    html += "</li>"
  });

  $results.html(html);
}

function removeAllContainerCovers() {
  for (var i=0,len=highlighters.length; i<len; i++) {
    highlighters[i].remove();
  }
}

function highlightAllContainers() {
  removeAllContainerCovers();

  var $containers = $($cssSelector.val());

  for (var i=0,len=$containers.length; i<len; i++) {
    var $cover = $("<div class=\"scrapbook-highlight-container\"/>").appendTo($("body"));
    highlight($containers.eq(i), $cover);
    highlighters.push($cover);
  }
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
