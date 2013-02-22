class Scrapbook.Highlighter {
  private {
    var HTML = <<END;
      .scrapbook-highlighter(class=type)
    END
  }

  function initialize() {
    this.tmpl = jade.compile(HTML);
  }

  function highlight(type, $target) {
    var $cover = this.buildCover(type);
    var offset = $target.offset();

    $cover.css("top", offset.top);
    $cover.css("left", offset.left);
    $cover.width($target.width());
    $cover.height($target.height());
  }

  function unHighlight(type) {
    var selector = ".scrapbook-highlighter" + this.getClassByType(type, true);
    $(selector).remove();
  }

  function buildCover(type) {
    return $(this.tmpl({
      type: this.getClassByType(type)
    })).appendTo("body");
  }

  function getClassByType(type, css) {
    var className = ""
    if (type != "ALL") {
      className += "scrapbook-" + type
      if (css) className = "." + className;
    }
    return className;
  }
}

Scrapbook.highlighter = new Scrapbook.Highlighter();
