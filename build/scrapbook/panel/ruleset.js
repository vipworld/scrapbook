Scrapbook.Panel.Base.extend("Scrapbook.Panel.Ruleset", function(KLASS, OO){
  
    var HTML = ".panel.ruleset\n  h1 Existing Rulesets\n  ul.ruleset\n  button.btn.newRules New Rules";
  

	OO.addMember("NAME", "RULESET");

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRules:first');
    this.$ruleList = this.$root.find('.ruleset:first');

    this.populate();
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$newRule.click(function() {
    });
    chrome.storage.onChanged.addListener(function($1,$2,$3){
      self.populate();
    });
  });

  OO.addMember("populate", function(){var self=this;
    chrome.storage.local.get("ruleset", function(obj) {
      self.ruleset = obj.ruleset || {};

      var html = "";
      for (var key in self.ruleset) {
        html += "<li>" + key + "</li>"
      }
      self.$ruleList.html(html);
    });

  });
});

