Scrapbook.Panel.Base.extend("Scrapbook.Panel.Ruleset", function(KLASS, OO){
  
    var HTML = ".panel.ruleset\n  h1 Existing Rulesets\n  ul.ruleset-list\n  button.btn.newRules New Rules\n  form.ruleset-define-form(style=\"display: none;\")\n    input(type=\"text\", name=\"name\", placeholder=\"name\")\n    input(type=\"text\", name=\"table\", placeholder=\"factual table id (optional)\")\n    a(href=\"javascript:void(0)\").btn.addRule Add Rule\n  a(href=\"javascript:void(0)\").clearRules Clear Rules\n  | |\n  a(href=\"javascript:void(0)\").logRules Console Rules";
  

  OO.addMember("NAME", "RULESET");

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRules:first');
    this.$ruleList = this.$root.find('.ruleset-list:first');
    this.$ruleForm = this.$root.find('.ruleset-define-form:first');
    this.$addRule  = this.$root.find('.addRule:first');
    this.$clearRules = this.$root.find('.clearRules:first');
    this.$logRules = this.$root.find('.logRules:first');

    this.populate();
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
      //self.clearForm();

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
  });

  OO.addMember("saveRule", function(form){var self=this;
    var name     = form.find('input[name="name"]').val();
    var table_id = form.find('input[name="table"]').val();
    this.rulestore.saveRule(name, { 
      table_id: table_id,
      timestamp: new Date(),
      site: window.location.href
    });
  });

  OO.addMember("populate", function(rules){var self=this;
    var html = "";
    for (var key in rules) {
      html += "<li>" + key + "</li>"
    }
    this.$ruleList.html(html);
  });
});

