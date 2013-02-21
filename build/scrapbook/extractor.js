$m.Class.extend("Scrapbook.Extractor", function(KLASS, OO){
  
    var HTML = "li.scrapbook-extractor\n  dt name:\n  dd\n    input.scrapbook-extractor-name\n  dt regexp:\n  dd\n    input.scrapbook-extractor-regexp\n  dt dom:\n  dd\n    input.scrapbook-extractor-dom";
  

  OO.addMember("initialize", function($parent){var self=this;
    this.$parent = $parent;
    this.initHTML();
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);;

    this.$txtName = this.$root.find(".scrapbook-extractor-name");
    this.$txtRegexp = this.$root.find(".scrapbook-extractor-regexp");
    this.$txtDom = this.$root.find(".scrapbook-extractor-dom");

    this.$cover = $(jade.compile(".scrapbook-highlight-extractor")()).appendTo("body");
  });

  OO.addMember("extract", function($target){var self=this;
    var extractor = this.toHash();
    var extracted = "";

    if (extractor.regexp) {
      extracted = $target.html().match(extractor.regexp)[1];
    } else if (extractor.dom) {
      var $subTarget = $target.find(extractor.dom);
      this.highlight($subTarget);
      extracted = $subTarget.text();
    }

    return [ extractor.name, extracted ];
  });

  OO.addMember("toHash", function(){var self=this;
    return {
      name: this.$txtName.val() || "NO NAME",
      regexp: this.$txtRegexp.val(),
      dom: this.$txtDom.val()
    }
  });

  OO.addMember("remove", function(){var self=this;
    this.$cover.remove();
    this.$root.remove();
  });

  OO.addMember("highlight", function($subTarget){var self=this;
    var offset = $subTarget.offset();

    this.$cover.css("top", offset.top);
    this.$cover.css("left", offset.left);
    this.$cover.width($subTarget.width());
    this.$cover.height($subTarget.height());
  });
});

