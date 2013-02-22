Scrapbook.Panel.Base.extend("Scrapbook.Panel.Rules", function(KLASS, OO){
  
    var HTML = ".panel.rules\n  h1 Rules/Extractions\n  .scrapbook-header\n    button.btn#scrapbook-start-inspector Inspect\n    button.btn.pull-right#scrapbook-back Back\n    button.btn.btn-success.pull-right#scrapbook-save Save\n    p\n    #scrapbook-previews\n    p\n    input.input-large#scrapbook-selector\n    p\n    button.btn#scrapbook-add-extractor Add Extractor\n    ul#scrapbook-extractors.unstyled\n    p\n    button.btn#scrapbook-extract Extract Preview\n    ul#scrapbook-extracted-results\n    button.btn#scrapbook-submit Submit to Factual";

    var FACTUAL_URL = "http://api.v3.factual.com";
  

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
    this.$btnSubmit = this.$root.find("#scrapbook-submit");

    this.$txtSelector = this.$root.find("#scrapbook-selector");

    this.$selectorPreviews = this.$root.find("#scrapbook-previews");
    this.$ulExtractors = this.$root.find("#scrapbook-extractors");
    this.$ulResults = this.$root.find("#scrapbook-extracted-results");


    this.previewPane = new Scrapbook.Preview(self.$selectorPreviews);
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$btnStartInspector.click(function($1,$2,$3){ self.startInspector() });
    this.$btnAddExtractor.click(function($1,$2,$3){ self.addExtractor() });
    this.$btnExtract.click(function($1,$2,$3){ self.extract() });
    this.$btnSave.click(function($1,$2,$3){ self.save() });
    this.$btnBack.click(function($1,$2,$3){ self.back() });
    this.$btnSubmit.click(function($1,$2,$3){ self.submit() });
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

    var $containers = this.getJqContainers();

    this.previewPane.populateByTargets($containers);
  });

  OO.addMember("addExtractor", function(){var self=this;
    this.extractors.push(new Scrapbook.Extractor(this.$ulExtractors));
  });

  OO.addMember("extract", function(){var self=this;
    var $containers = this.getJqContainers();

    var html = ""

    for (var _i_0=0,container=null,_list_0=$containers,_len_0=_list_0.length;(container=_list_0[_i_0])||_i_0<_len_0;_i_0++) {
      var result = this.extractors.map(function($1,$2,$3){ return  $1.extract($(container)) });

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
    this.rulestore.saveRule(this.hash.name, this.toHash(), function($1,$2,$3){
      alert("Saved!");
    });
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
      self.extractors.push(new Scrapbook.Extractor(self.$ulExtractors, $1));
    });
    this.hash = hash;
    this.process();
  });

  OO.addMember("reset", function(){var self=this;
    //this.$ulPreviews.html("");
    Scrapbook.highlighter.unHighlight("ALL");
    this.extractors.forEach(function($1,$2,$3){ $1.remove() })
  });

  OO.addMember("back", function(){var self=this;
    this.main.switchToPanel("RULESET");
  });

  OO.addMember("submit", function(){var self=this;
    var $containers = this.getJqContainers();
    var url = FACTUAL_URL + "/t/" + this.hash.table_id + "/submit"
    var queries = [];

    for (var _i_1=0,container=null,_list_1=$containers,_len_1=_list_1.length;(container=_list_1[_i_1])||_i_1<_len_1;_i_1++) {
      var values = {};
      this.extractors.map(function($1,$2,$3){ return  $1.extract($(container)) }).forEach(function($1,$2,$3){
        values[$1[0]] = $1[1];
      });
      queries.push({
        values: values,
        user: "Scrapbook"
      });
    }

    var text = [
      "POST: " + url,
      "Queries:",
      queries.map(function($1,$2,$3){ return  "  " + $2 + ": " + JSON.stringify($1) }).join("\n")
    ].join("\n");

    queries = [ queries[0] ];
    if (confirm("Are you sure you want to post these queries?\n" + text)) {
      queries.forEach(function($1,$2,$3){
        Scrapbook.factualApi.submit(self.hash.table_id, $1.values, function($1,$2,$3){
          console.log($1);
        });
      });
    }
  });
});

