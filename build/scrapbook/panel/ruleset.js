Scrapbook.Panel.Base.extend("Scrapbook.Panel.Ruleset", function(KLASS, OO){
  
    var HTML = ".panel.ruleset\n  h1 Existing Rulesets\n  button.btn.newRules New Rules\n  form.ruleset-define-form(style=\"display: none;\")\n    .control-group\n      input(type=\"text\", name=\"name\", placeholder=\"name\")\n    .control-group\n      input(type=\"text\", name=\"table\", placeholder=\"factual table id (optional)\")\n    .control-group\n      .controls\n        a(href=\"javascript:void(0)\").btn.addRule Add Rule\n        a(href=\"javascript:void(0)\").btn.cancelAddRule Cancel\n  p\n  a(href=\"javascript:void(0)\").clearRules Clear Rules\n  |  |    \n  a(href=\"javascript:void(0)\").logRules Console Rules\n  hr\n  ul.ruleset-list";

    var RULES_HTML = "li.rules\n  i.icon-remove.icon-white\n  span.name= name";
  

  OO.addMember("NAME", "RULESET");

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.rulesTempl = jade.compile(RULES_HTML);

    this.$newRule  = this.$root.find('.newRules:first');
    this.$ruleList = this.$root.find('.ruleset-list:first');
    this.$ruleForm = this.$root.find('.ruleset-define-form:first');
    this.$addRule  = this.$root.find('.addRule:first');
    this.$cancelAddRule  = this.$root.find('.cancelAddRule:first');
    this.$clearRules = this.$root.find('.clearRules:first');
    this.$logRules   = this.$root.find('.logRules:first');
    this.$nameInput  = this.$ruleForm.find('input[name="name"]');
    this.$tableInput = this.$ruleForm.find('input[name="table"]');

  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$newRule.click(function() {
    });

    this.rulestore.on('load', function($1,$2,$3){
      self.populate($1);
    });

    this.rulestore.on('change', function($1,$2,$3){
      self.rulestore.getRules(function($1,$2,$3){
        self.populate($1);
      });
    });

    this.$newRule.click(function() {
      self.$newRule.hide();
      self.$ruleForm.show();
    });

    this.$addRule.click(function(e) {
      e.preventDefault();
      var form     = $(e.target).parents('form');
      self.saveRule(form);
      self.clearForm();

      self.$newRule.show();
      self.$ruleForm.fadeOut();
    });

    this.$cancelAddRule.click(function($1,$2,$3){
      self.$newRule.show();
      self.$ruleForm.fadeOut();
    });

    this.$clearRules.click(function($1,$2,$3){
      self.rulestore.clearRules(function($1,$2,$3){
        console.log('rules cleared');
      });
    });

    this.$logRules.click(function($1,$2,$3){
      self.rulestore.getRules(function($1,$2,$3){
        console.log($1);
      });
    });

    this.$ruleList.on("click", "li", function($1,$2,$3){
      self.showRulesPanel($(this).text());
    });
  });

  OO.addMember("saveRule", function(form){var self=this;
    var name     = this.$nameInput.val();
    var table_id = this.$tableInput.val();
    this.rulestore.saveRule(name, { 
      name: name,
      table_id: table_id,
      timestamp: new Date(),
      site: window.location.href
    });
  });

  OO.addMember("clearForm", function(){var self=this;
    this.$nameInput.val('');
    this.$tableInput.val('');
  });

  OO.addMember("populate", function(rules){var self=this;
    var html = "";
    for (var key in rules) {
      html += this.rulesTempl({name: key});
    }
    this.$ruleList.html(html);
  });

  OO.addMember("showRulesPanel", function(key){var self=this;
    this.rulestore.getRule(key, function($1,$2,$3){
      self.main.showRulesPanel(key, $1);
    });
  });
});

