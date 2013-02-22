Scrapbook.Panel.Base.extend("Scrapbook.Panel.Ruleset", function(KLASS, OO){
  
    var HTML = ".panel.ruleset\n  h1 Existing Rulesets\n  ul.ruleset\n  button.btn.newRules New Rules\n  form.ruleset-define-form(style=\"display: none;\")\n    input(type=\"text\", name=\"name\", placeholder=\"name\")\n    input(type=\"text\", name=\"table\", placeholder=\"factual table id (optional)\")\n    a(href=\"javascript:void(0)\").btn.addRule Add Rule\n  a.clearRules Clear Rules";
  

  OO.addMember("NAME", "RULESET");

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRules:first');
    this.$ruleList = this.$root.find('.ruleset-list:first');
    this.$ruleForm = this.$root.find('.ruleset-define-form:first');
    this.$addRule  = this.$root.find('.addRule:first');
    this.$clearRules = this.$root.find('.clearRules');

    this.populate();
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$newRule.click(function() {
    });

    chrome.storage.onChanged.addListener(function($1,$2,$3){
      self.populate();
    });

    this.$newRule.click(function() {
      self.$newRule.hide();
      self.$ruleForm.show();
    });

    this.$addRule.click(function(e) {
      e.preventDefault();
      var form     = $(e.target).parents('form');
      self.saveRule(form);
      //self.clearForm();

      self.populate();
      self.$newRule.show();
      self.$ruleForm.fadeOut();
    });

    this.$clearRules.click(function($1,$2,$3){
      //self.clearRules();
      self.getRules();
    });
  });

  OO.addMember("clearRules", function(){var self=this;
    chrome.storage.local.clear();
  });

  OO.addMember("deleteRule", function(key){var self=this;
  });

  OO.addMember("getRules", function(){var self=this;
    chrome.storage.local.get(null, function(keys) {
      console.log(keys);
    });
  });

  OO.addMember("saveRule", function(form){var self=this;
    var name     = form.find('input[name="name"]').val();
    var table_id = form.find('input[name="table"]').val();
    var storage = {
      name: name,
      table_id: table_id || ''
    };
    chrome.storage.local.set(storage);
  });

  OO.addMember("populate", function(){var self=this;
    chrome.storage.local.get(null, function(obj) {
      self.rulesets = obj || {};

      var html = "";
      for (var key in self.ruleset) {
        html += "<li>" + key + "</li>"
      }
      self.$ruleList.html(html);
    });

  });
});

