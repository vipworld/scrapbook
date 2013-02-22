Scrapbook.Panel.Base.extend("Scrapbook.Panel.Rules", function(KLASS, OO){
  
    var HTML = ".panel.rules\n  h1 Rules/Extractions\n  .scrapbook-header\n    button.btn#scrapbook-start-inspector Inspect\n    button.btn.pull-right#scrapbook-back Back\n    button.btn.btn-success.pull-right#scrapbook-save Save\n    p\n    ul#scrapbook-previews\n    p\n    button.btn#scrapbook-add-extractor Add Extractor\n    input.input-xxlarge#scrapbook-selector\n    p\n    ul#scrapbook-extractors\n    p\n    button.btn#scrapbook-extract Extract\n    p\n    ul#scrapbook-extracted-results";
  

	OO.addMember("NAME", "RULES");

  OO.addMember("initialize", function($parent, main){var self=this;
		this.extractors = [];

    this.inspector = new Scrapbook.Inspector();

		this.$super($parent, main);
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$btnStartInspector = this.$root.find("#scrapbook-start-inspector");
    this.$btnAddExtractor = this.$root.find("#scrapbook-add-extractor");
    this.$btnExtract = this.$root.find("#scrapbook-extract");
    this.$btnSave = this.$root.find("#scrapbook-save");
    this.$btnBack = this.$root.find("#scrapbook-back");

    this.$txtSelector = this.$root.find("#scrapbook-selector");

    this.$ulPreviews = this.$root.find("#scrapbook-previews");
    this.$ulExtractors = this.$root.find("#scrapbook-extractors");
    this.$ulResults = this.$root.find("#scrapbook-extracted-results");
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$btnStartInspector.click(function($1,$2,$3){ self.startInspector() });
    this.$btnAddExtractor.click(function($1,$2,$3){ self.addExtractor() });
    this.$btnExtract.click(function($1,$2,$3){ self.extract() });
    this.$btnSave.click(function($1,$2,$3){ self.save() });
    this.$btnBack.click(function($1,$2,$3){ self.back() });
    this.$txtSelector.keyup(function($1,$2,$3){ self.process() });
  });

  OO.addMember("show", function(){var self=this;
    this.$root.show();
  });

  OO.addMember("hide", function(){var self=this;
    this.$root.hide();
  });

  OO.addMember("startInspector", function(){var self=this;
    Scrapbook.highlighter.unHighlight("ALL");
    Scrapbook.inspector.inspect(function($target){
      self.$txtSelector.val($target.getPath("SMART"));
      self.process();
    })
  });

  OO.addMember("process", function(){var self=this;
    Scrapbook.highlighter.unHighlight("ALL");
    this.$ulPreviews.html("");

    var $containers = this.getJqContainers();

    for (var i=0,len=$containers.length; i<len; i++) {
      var $container = $containers.eq(i);
      Scrapbook.highlighter.highlight("container", $container)
      new Scrapbook.Preview(self.$ulPreviews, $container)
    }
  });

  OO.addMember("addExtractor", function(){var self=this;
    this.extractors.push(new Scrapbook.Extractor(this.$ulExtractors));
  });

  OO.addMember("extract", function(){var self=this;
    var $containers = this.getJqContainers();

    var html = ""

    for (var _i_0=0,container=null,_list_0=$containers,_len_0=_list_0.length;(container=_list_0[_i_0])||_i_0<_len_0;_i_0++) {
      var result = self.extractors.map(function($1,$2,$3){ return  $1.extract($(container)) });
      console.log(result);

      html += "<li>";
      result.forEach(function($1,$2,$3){
        html += $1[0] + ": " + $1[1] + "<br/>";
      });
      html += "</li>";
    }

    this.$ulResults.html(html);
  });

  OO.addMember("getJqContainers", function(){var self=this;
    return $(this.$txtSelector.val());
  });

  OO.addMember("save", function(){var self=this;
    if (!this.hash.name) {
      this.hash.name = prompt("Enter Rules' Name:", "Name");
    }
    this.rulestore.saveRule(this.hash.name, this.toHash());
  });

  OO.addMember("toHash", function(){var self=this;
    return {
      name: this.hash.name,
      table_id: this.hash.table_id,
      timestamp: new Date(),
      site: this.hash.site,
      selector: this.$txtSelector.val(),
      extractors: this.extractors.map(function($1,$2,$3){ return  $1.toHash() })
    };
  });

  OO.addMember("fromHash", function(hash){var self=this;
    this.reset();
    this.$txtSelector.val(hash["selector"] || "");
    (hash["extractors"] || []).forEach(function($1,$2,$3){
      self.extractors.push(new Scrapbook.Extractions(self.$ulExtractors, $1));
    });
    this.hash = hash;
  });

  OO.addMember("reset", function(){var self=this;
    this.$ulPreviews.html("");
    Scrapbook.highlighter.unHighlight("ALL");
    this.extractors.forEach(function($1,$2,$3){ $1.remove() })
  });

  OO.addMember("back", function(){var self=this;
    this.main.switchToPanel("RULESET");
  });
});

