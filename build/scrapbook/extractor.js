$m.Class.extend("Scrapbook.Extractor", function(KLASS, OO){
  
    var HTML = "li.scrapbook-extractor\n  .input-append\n    input.scrapbook-extractor-name(name=\"name\", type=\"text\", placeholder=\"field name\")\n    .btn-group\n      button.btn.dropdown-toggle Method\n      ul.dropdown-menu\n        li dom\n        li regex\n  input.scrapbook-extractor-dom(name=\"name\", type=\"text\", placeholder=\"selector/regex\")";
  

  OO.addMember("initialize", function($parent, hash){var self=this;
    this.$parent = $parent;
    this.initHTML();
    this.populateByHash(hash);
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);;

    this.$txtName = this.$root.find(".scrapbook-extractor-name");
    this.$txtRegexp = this.$root.find(".scrapbook-extractor-regexp");
    this.$txtDom = this.$root.find(".scrapbook-extractor-dom");
  });

  OO.addMember("populateByHash", function(hash){var self=this;
    hash = hash || {};

    if (hash.name) this.$txtName.val(hash.name);
    if (hash.regexp) this.$txtRegexp.val(hash.regexp);
    if (hash.dom) this.$txtDom.val(hash.dom);
  });

  OO.addMember("extract", function($target){var self=this;
    var extractor = this.toHash();
    var extracted = "";

    if (extractor.regexp) {
      extracted = $target.html().match(extractor.regexp)[1];
    } else if (extractor.dom) {
      var $subTarget = $target.find(extractor.dom);
      if ($subTarget.length) {
        Scrapbook.highlighter.highlight("extractor", $subTarget);
      }
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
    this.$root.remove();
  });
});

