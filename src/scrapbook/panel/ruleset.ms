class Scrapbook.Panel.Ruleset extends Scrapbook.Panel.Base {
  private {
    var HTML = <<END;
      .panel.ruleset
        h1 Existing Rulesets
        button.btn.newRules New Rules
        form.ruleset-define-form(style="display: none;")
          .control-group
            input(type="text", name="name", placeholder="name")
          .control-group
            input(type="text", name="table", placeholder="factual table id (optional)")
          .control-group
            .controls
              a(href="javascript:void(0)").btn.addRule Add Rule
              a(href="javascript:void(0)").btn.cancelAddRule Cancel
        p
        a(href="javascript:void(0)").clearRules Clear Rules
        |  |    
        a(href="javascript:void(0)").logRules Console Rules
        hr
        ul.ruleset-list
    END
  }

  var NAME = "RULESET";

  function initHTML() {
    this.$root = $(jade.compile(HTML)()).appendTo(this.$parent);

    this.$newRule  = this.$root.find('.newRules:first');
    this.$ruleList = this.$root.find('.ruleset-list:first');
    this.$ruleForm = this.$root.find('.ruleset-define-form:first');
    this.$addRule  = this.$root.find('.addRule:first');
    this.$cancelAddRule  = this.$root.find('.cancelAddRule:first');
    this.$clearRules = this.$root.find('.clearRules:first');
    this.$logRules   = this.$root.find('.logRules:first');
    this.$nameInput  = this.$ruleForm.find('input[name="name"]');
    this.$tableInput = this.$ruleForm.find('input[name="table"]');

  }

  function registerEvents() {
    this.$newRule.click(function() {
    });

    this.rulestore.on('load', #{
      self.populate($1);
    });

    this.rulestore.on('change', #{
      self.rulestore.getRules(#{
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

    this.$cancelAddRule.click(#{
      self.$newRule.show();
      self.$ruleForm.fadeOut();
    });

    this.$clearRules.click(#{
      self.rulestore.clearRules(#{
        console.log('rules cleared');
      });
    });

    this.$logRules.click(#{
      self.rulestore.getRules(#{
        console.log($1);
      });
    });

    this.$ruleList.on("click", "li", #{
      self.showRulesPanel($(this).text());
    });
  }

  function saveRule(form) {
    var name     = this.$nameInput.val();
    var table_id = this.$tableInput.val();
    this.rulestore.saveRule(name, { 
      name: name,
      table_id: table_id,
      timestamp: new Date(),
      site: window.location.href
    });
  }

  function clearForm() {
    this.$nameInput.val('');
    this.$tableInput.val('');
  }

  function populate(rules) {
    var html = "";
    for (var key in rules) {
      html += "<li>" + key + "</li>"
    }
    this.$ruleList.html(html);
  }

  function showRulesPanel(key) {
    this.rulestore.getRule(key, #{
      self.main.showRulesPanel(key, $1);
    });
  }
}
