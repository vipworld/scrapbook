Scrapbook.Panel.Base.extend("Scrapbook.Panel.Rules", function(KLASS, OO){
  
    var HTML = ".panel.rules\n  h1 Rules/Extractions\n  .scrapbook-header\n    button#scrapbook-start-inspector Inspect\n    |  | \n    button#scrapbook-add-extractor Add Extractor\n    |  | \n    button#scrapbook-extract Extract\n    |  | \n    button#scrapbook-save Save\n  input#scrapbook-selector\n  ul#scrapbook-previews\n  ul#scrapbook-extractors\n  ul#scrapbook-extracted-results";
  

	OO.addMember("NAME", "RULES");

  OO.addMember("initialize", function($parent){var self=this;
		this.highlighters = [];
		this.extractors = [];

    this.inspector = new Scrapbook.Inspector();

		this.$super($parent);
  });

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$btnStartInspector = this.$root.find("#scrapbook-start-inspector");
    this.$btnAddExtractor = this.$root.find("#scrapbook-add-extractor");
    this.$btnExtract = this.$root.find("#scrapbook-extract");
    this.$btnSave = this.$root.find("#scrapbook-save");

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
    //this.hide();
  });

  OO.addMember("inspect", function($target){var self=this;
    this.inspector.disable();
    this.$txtSelector.val($target.getPath());
    this.highlightAll();
    //this.show();
  });

  OO.addMember("highlightAll", function(){var self=this;
    this.removeHighlighters();
    this.$ulPreviews.html("");

    var $containers = this.getJqContainers();
    $containers.each(function($1,$2,$3){ new Scrapbook.Preview(self.$ulPreviews, $($2)) });

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
    var name = prompt("Enter Rules' Name:", "Name");
    chrome.storage.local.get("ruleset", function(ruleset) {
      ruleset = ruleset || {};
      ruleset[name] = self.toHash();
      chrome.storage.local.set({ "ruleset": ruleset }, function($1,$2,$3){
        alert("Saved!");
      });
    });
  });

  OO.addMember("toHash", function(){var self=this;
    return {
      selector: this.$txtSelector.val(),
      extractors: this.extractors.map(function($1,$2,$3){ return  $1.toHash() })
    };
  });

  OO.addMember("fromHash", function(hash){var self=this;
    this.$txtSelector.val(hash["selector"]);
    this.extractors.forEach(function($1,$2,$3){ $1.remove() });
    hash["extractors"].forEach(function($1,$2,$3){
      self.extractors.push(new Scrapbook.Extractions(self.$ulExtractors, $1));
    })
  });
});

