$m.Class.extend("Scrapbook.Highlighter", function(KLASS, OO){
  
    var HTML = ".scrapbook-highlighter(class=type)";
  

  OO.addMember("initialize", function(){var self=this;
    this.tmpl = jade.compile(HTML);
  });

  OO.addMember("highlight", function(type, $target){var self=this;
    var $cover = this.buildCover(type);
    var offset = $target.offset();

    $cover.css("top", offset.top);
    $cover.css("left", offset.left);
    $cover.width($target.width());
    $cover.height($target.height());
  });

  OO.addMember("unHighlight", function(type){var self=this;
    var selector = ".scrapbook-highlighter" + this.getClassByType(type, true);
    $(selector).remove();
  });

  OO.addMember("buildCover", function(type){var self=this;
    return $(this.tmpl({
      type: this.getClassByType(type)
    })).appendTo("body");
  });

  OO.addMember("getClassByType", function(type, css){var self=this;
    var className = ""
    if (type != "ALL") {
      className += "scrapbook-" + type
      if (css) className = "." + className;
    }
    return className;
  });
});

Scrapbook.highlighter = new Scrapbook.Highlighter();

