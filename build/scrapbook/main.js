$m.Class.extend("Scrapbook.Main", function(KLASS, OO){
  
    var HTML = ".scrapbook\n  .scrapbook-header\n    button#scrapbook-start-inspector Inspect\n    |  | \n    button#scrapbook-add-extractor Add Extractor\n    |  | \n    button#scrapbook-extract Extract\n  .scrapbook-api\n  input#scrapbook-selector\n  ul#scrapbook-extractors\n  ul#scrapbook-extracted-results";
  

  OO.addMember("initialize", function(){var self=this;
    this.inspector = new Scrapbook.Inspector();
    this.highlighters = [];
    this.extractors = [];

    this.initHTML();
    this.api = new Scrapbook.Api(this.$root);
    this.registerEvents();
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $('<div id="scrapbook" class="scrapbook"></div>').appendTo("body");
    this.panel = new Panel(this.$root);

    this.$btnStartInspector = this.$root.find("#scrapbook-start-inspector");
    this.$btnAddExtractor = this.$root.find("#scrapbook-add-extractor");
    this.$btnExtract = this.$root.find("#scrapbook-extract");

    this.$txtSelector = this.$root.find("#scrapbook-selector");

    this.$ulExtractors = this.$root.find("#scrapbook-extractors");
    this.$ulResults = this.$root.find("#scrapbook-extracted-results");
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$btnStartInspector.click(function($1,$2,$3){ self.startInspector() });
    this.$btnAddExtractor.click(function($1,$2,$3){ self.addExtractor() });
    this.$btnExtract.click(function($1,$2,$3){ self.extract() });
    this.$txtSelector.keyup(function($1,$2,$3){ self.highlightAll() });
    this.inspector.on("inspected", function($1,$2,$3){ self.inspect($1) });
  });

  OO.addMember("show", function(){var self=this;
    this.$root.show();
  });

  OO.addMember("hide", function(){var self=this;
    this.$root.hide();
  });

  OO.addMember("startInspector", function(){var self=this;
    this.inspector.enable();
    this.hide();
  });

  OO.addMember("inspect", function($target){var self=this;
    this.inspector.disable();
    this.$txtSelector.val($target.getPath());
    this.highlightAll();
    this.show();
  });

  OO.addMember("highlightAll", function(){var self=this;
    this.removeHighlighters();

    $containers = this.getJqContainers();
    for (var i=0,len=$containers.length; i<len; i++) {
      var $cover = $(jade.compile(".scrapbook-highlight-container")()).appendTo("body");
      this.highlight($containers.eq(i), $cover);
      this.highlighters.push($cover);
    }
  });

  OO.addMember("highlight", function($target, $cover){var self=this;
    var offset = $target.offset();

    $cover.css("top", offset.top);
    $cover.css("left", offset.left);
    $cover.width($target.width());
    $cover.height($target.height());
  });

  OO.addMember("removeHighlighters", function(){var self=this;
    for (var i=0,len=this.highlighters.length; i<len; i++) {
      this.highlighters[i].remove();
    }
  });

  OO.addMember("addExtractor", function(){var self=this;
    this.extractors.push(new Scrapbook.Extractor(this.$ulExtractors));
  });

  OO.addMember("extract", function(){var self=this;
    var results = this.getJqContainers().map(function(index, c){
      return self.extractors.map(function(e) { return  e.extract($(c)) });
    });

    console.log(results);
  });

  OO.addMember("getJqContainers", function(){var self=this;
    return $(this.$txtSelector.val());
  });
});

