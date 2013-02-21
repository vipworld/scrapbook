Scrapbook.Panel.Base.extend("Scrapbook.Panel.Ruleset", function(KLASS, OO){
  
    var HTML = ".panel.ruleset\n  h1 Existing Rulesets\n  ul.ruleset-list.unstyled\n  button.btn.newRule New Rule\n  form.ruleset-define-form(style=\"display: none;\")\n    input(type=\"text\", name=\"name\", placeholder=\"name\")\n    input(type=\"text\", name=\"table\", placeholder=\"factual table id (optional)\")\n    button.btn.addRule Add Rule";
  

	OO.addMember("NAME", "RULESET");

  OO.addMember("initHTML", function(){var self=this;
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRule:first');
    this.$addRule  = this.$root.find('.addRule:first');
    this.$ruleForm = this.$root.find('.ruleset-define-form:first');
    this.$ruleList = this.$root.find('.ruleset-list:first');
  });

  OO.addMember("registerEvents", function(){var self=this;
    this.$newRule.click(function() {
      self.$newRule.hide();
      self.$ruleForm.show();
    });

    this.$addRule.click(function(e) {
      e.preventDefault();
      var form = $(e.target).parents('form');
      var vals = form.serializeArray();
      self.saveRule(vals);

      self.$newRule.show();
      self.$ruleForm.fadeOut();
    });
  });

  OO.addMember("saveRule", function(vals){var self=this;
    var html = '';
    html += '<li>'
      + '<a href="javascript:void(0)">'
      + vals[0].value
      + '</a>'
      + '</li>';
    this.$ruleList.append(html);
  });

  OO.addMember("clearForm", function(){var self=this;
    // stub
  });
});

